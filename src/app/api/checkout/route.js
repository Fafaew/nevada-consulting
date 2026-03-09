import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route.js';
import { prisma } from '../../../lib/prisma.js';
import { serviceItems } from '../../../lib/servicesConfig.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { slug, startTime, serviceName, lang } = body;

  if (!slug || !startTime || !serviceName || !lang) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  const service = serviceItems.find((s) => s.slug === slug);
  if (!service) {
    return Response.json({ error: 'Unknown service slug' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  const isBRL = lang === 'pt';
  const currency = isBRL ? 'brl' : 'usd';

  // Busca o produto no Stripe pelo metadado "slug" configurado no Dashboard
  // Usa list() em vez de search() para evitar delay de indexação
  const allProducts = await stripe.products.list({ active: true, limit: 100 });
  const product = allProducts.data.find((p) => p.metadata?.slug === slug);

  if (!product) {
    return Response.json(
      {
        error: `Produto não encontrado no Stripe para o serviço "${slug}". Adicione o metadado slug ao produto no Dashboard.`,
      },
      { status: 404 },
    );
  }

  // Busca o preço ativo do produto na moeda correta
  const prices = await stripe.prices.list({
    product: product.id,
    currency,
    active: true,
    limit: 1,
  });

  if (prices.data.length === 0) {
    return Response.json(
      {
        error: `Nenhum preço ativo em ${currency.toUpperCase()} para este serviço. Configure um preço no Stripe Dashboard.`,
      },
      { status: 404 },
    );
  }

  const priceId = prices.data[0].id;

  const locale = isBRL ? 'pt-BR' : 'en-US';
  const TZ = 'America/Sao_Paulo';
  const formattedDate = new Date(startTime).toLocaleString(locale, {
    timeZone: TZ,
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    client_reference_id: user.id,
    metadata: {
      slug,
      startTime,
      serviceName,
      userEmail: session.user.email,
      userName: session.user.name ?? '',
      lang,
    },
    custom_text: {
      submit: {
        message: isBRL
          ? `Agendamento: ${formattedDate}`
          : `Appointment: ${formattedDate}`,
      },
    },
    success_url: `${APP_URL}/${lang}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_URL}/${lang}/services/${slug}`,
    payment_method_types: ['card'],
    locale: isBRL ? 'pt-BR' : 'en',
  });

  return Response.json({ url: checkoutSession.url });
}
