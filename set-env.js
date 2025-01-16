const fs = require('fs');
const os = require('os');

const interfaces = os.networkInterfaces();
let ipAddress = '';

for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name]) {
    if (iface.family === 'IPv4' && !iface.internal) {
      ipAddress = iface.address;
      break;
    }
  }
}

if (ipAddress) {
  const envContent = `EXPO_PUBLIC_BACKEND_URL=http://${ipAddress}:5000\n`;
  fs.writeFileSync('.env', envContent, { encoding: 'utf8' });
  console.log(`Generated .env file with: ${envContent}`);
} else {
  console.error('No IPv4 address found.');
}
