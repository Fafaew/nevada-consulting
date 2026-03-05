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

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  const isBRL = lang === 'pt';
  const currency = isBRL ? 'brl' : 'usd';
  const unit_amount = isBRL ? service.priceBRL : service.priceUSD;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount,
          product_data: { name: serviceName },
        },
      },
    ],
    client_reference_id: user.id,
    metadata: {
      slug,
      startTime,
      serviceName,
      userEmail: session.user.email,
      userName: session.user.name ?? '',
      lang,
    },
    success_url: `${APP_URL}/${lang}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_URL}/${lang}/services/${slug}`,
    payment_method_types: ['card'],
    locale: lang === 'pt' ? 'pt-BR' : 'en',
  });

  return Response.json({ url: checkoutSession.url });
}
