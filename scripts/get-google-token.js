/**
 * One-time script to obtain a Google Calendar refresh token.
 *
 * Usage:
 *   node --env-file=.env scripts/get-google-token.js
 *
 * Before running:
 *   1. In Google Cloud Console, enable the Google Calendar API
 *   2. Add http://localhost:3456 as an Authorized Redirect URI on your OAuth2 client
 *   3. Make sure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set in .env
 */

import http from 'http';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { google } = require('googleapis');

const PORT = 3456;
const REDIRECT_URI = `http://localhost:${PORT}`;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/calendar'],
  prompt: 'consent',
});

console.log('\n━━━ Google Calendar Authorization ━━━\n');
console.log('Open this URL in your browser (logged in as Juliana):\n');
console.log(authUrl);
console.log('\nWaiting for Google to redirect back...\n');

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get('code');

  if (!code) {
    res.writeHead(400);
    res.end('No authorization code found. Close this tab and try again.');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h2 style="font-family:sans-serif;text-align:center;margin-top:80px">✅ Autorizado! Pode fechar esta aba e voltar ao terminal.</h2>');
  server.close();

  try {
    const { tokens } = await oauth2Client.getToken(code);

    console.log('━━━ Adicione estas variáveis ao seu .env ━━━\n');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('\nPara o GOOGLE_CALENDAR_ID:');
    console.log('  Acesse calendar.google.com → Configurações (engrenagem) → selecione o calendário');
    console.log('  Role até "Integrar agenda" → copie o ID do calendário (geralmente é o email)');
    console.log('\nPronto!\n');
  } catch (err) {
    console.error('\nErro ao trocar o code pelo token:', err.message);
  }

  process.exit(0);
});

server.listen(PORT, () => {
  console.log(`Servidor aguardando em http://localhost:${PORT} ...`);
});
