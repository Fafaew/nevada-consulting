import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  await resend.emails.send({
    from: 'Nevada Consulting <noreply@nevadaconsulting.com.br>',
    to: process.env.GOOGLE_CALENDAR_ID,
    replyTo: email,
    subject: `Contato via site — ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #111; color: #fff; border-radius: 12px;">
        <h2 style="color: #8D519E; margin-bottom: 8px;">Nova mensagem de contato</h2>
        <p style="color: #ccc;"><strong>Nome:</strong> ${name}</p>
        <p style="color: #ccc;"><strong>E-mail:</strong> ${email}</p>
        <div style="background: #1a1a1a; border-radius: 8px; padding: 16px; margin-top: 16px;">
          <p style="color: #fff; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `,
  });

  return Response.json({ success: true });
}
