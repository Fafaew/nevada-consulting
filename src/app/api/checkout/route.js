import { MercadoPagoConfig, Preference } from 'mercadopago';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route.js';
import { prisma } from '../../../lib/prisma.js';
import { serviceItems } from '../../../lib/servicesConfig.js';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export async function POST(request) {
  const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
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

  const priceEnvKey = `PRICE_${slug.toUpperCase().replace(/-/g, '_')}`;
  const priceValue = process.env[priceEnvKey];
  const price = parseFloat(priceValue);

  if (!priceValue || isNaN(price) || price <= 0) {
    return Response.json(
      { error: `Preço não configurado para o serviço "${slug}". Configure a variável ${priceEnvKey} na Vercel.` },
      { status: 404 },
    );
  }

  const preferenceClient = new Preference(client);
  const preference = await preferenceClient.create({
    body: {
      items: [
        {
          id: slug,
          title: serviceName,
          unit_price: price,
          quantity: 1,
          currency_id: 'BRL',
        },
      ],
      payer: { email: session.user.email },
      back_urls: {
        success: `${APP_URL}/${lang}/booking/success`,
        failure: `${APP_URL}/${lang}/services/${slug}`,
        pending: `${APP_URL}/${lang}/booking/success`,
      },
      ...(APP_URL.startsWith('https') ? { auto_return: 'approved' } : {}),
      external_reference: JSON.stringify({
        slug,
        startTime,
        serviceName,
        userEmail: session.user.email,
        userName: session.user.name ?? '',
        userId: user.id,
        lang,
      }),
      notification_url: `${APP_URL}/api/webhooks/mercadopago`,
      payment_methods: {
        installments: 12,
      },
    },
  });

  return Response.json({ url: preference.init_point });
}
