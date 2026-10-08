// Mã hóa ds.json (danh sách học sinh, KHÔNG đưa lên GitHub) thành ds.enc.json bằng mật khẩu trong .matkhau
// Chạy: node cap_nhat_ds.js   rồi commit + push ds.enc.json
const fs = require('fs'), { webcrypto: c } = require('crypto');
(async () => {
  const pw = fs.readFileSync(__dirname + '/.matkhau', 'utf8').trim();
  const ds = JSON.parse(fs.readFileSync(__dirname + '/ds.json', 'utf8'));
  ds.updated = new Date().toISOString();
  const iter = 250000, salt = c.getRandomValues(new Uint8Array(16)), iv = c.getRandomValues(new Uint8Array(12));
  const base = await c.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
  const key = await c.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: iter, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
  const data = await c.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(ds)));
  const b64 = u => Buffer.from(u).toString('base64');
  fs.writeFileSync(__dirname + '/ds.enc.json', JSON.stringify({ v: 1, iter, salt: b64(salt), iv: b64(iv), data: b64(new Uint8Array(data)) }));
  console.log('Đã mã hóa', ds.classes.map(x => `${x.name}: ${x.students.length}`).join(' | '));
})();
