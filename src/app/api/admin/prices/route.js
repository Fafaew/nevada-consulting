import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route.js';
import { prisma } from '../../../../lib/prisma.js';
import { serviceItems } from '../../../../lib/servicesConfig.js';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });
  return user?.role === 'ADMIN' ? user : null;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const stored = await prisma.servicePrice.findMany();
  const storedMap = Object.fromEntries(stored.map((p) => [p.slug, p]));

  // Se algum serviço ainda não tem preço no banco, inicializa com as env vars
  const missing = serviceItems.filter((s) => !storedMap[s.slug]);
  if (missing.length > 0) {
    await prisma.servicePrice.createMany({
      data: missing.map((s) => {
        const key = s.slug.toUpperCase().replace(/-/g, '_');
        return {
          slug: s.slug,
          priceBrl: parseFloat(process.env[`PRICE_${key}`] ?? '0'),
          priceUsd: process.env[`PRICE_USD_${key}`]
            ? parseFloat(process.env[`PRICE_USD_${key}`])
            : null,
        };
      }),
      skipDuplicates: true,
    });
  }

  const prices = await prisma.servicePrice.findMany();
  return Response.json({ prices });
}

export async function PUT(request) {
  if (!(await requireAdmin())) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { prices } = await request.json();

  if (!Array.isArray(prices)) {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  for (const { slug, priceBrl, priceUsd } of prices) {
    const brl = parseFloat(priceBrl);
    if (!slug || isNaN(brl) || brl < 0) {
      return Response.json(
        { error: `Valor inválido para ${slug}` },
        { status: 400 },
      );
    }

    await prisma.servicePrice.upsert({
      where: { slug },
      update: {
        priceBrl: brl,
        priceUsd: priceUsd ? parseFloat(priceUsd) : null,
      },
      create: {
        slug,
        priceBrl: brl,
        priceUsd: priceUsd ? parseFloat(priceUsd) : null,
      },
    });
  }

  return Response.json({ success: true });
}
