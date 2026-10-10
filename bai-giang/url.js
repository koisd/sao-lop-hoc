/* Bài: Các phần của URL, HTTPS, tên miền đáng tin; trò chơi "trang nào đáng tin hơn?" */
(() => {
  const e = BG.esc;
  const SLD = ['gov', 'edu', 'com', 'org', 'net', 'ac'];
  const TLD_INFO = {
    gov: 'Đuôi <b>.gov</b> = <b>cơ quan Nhà nước</b> (government). Chỉ cơ quan nhà nước mới được dùng → <b>rất đáng tin cậy</b>.',
    edu: 'Đuôi <b>.edu</b> = <b>trường học</b>, cơ sở giáo dục (education) → <b>đáng tin cậy</b>.',
    org: 'Đuôi <b>.org</b> = <b>tổ chức</b> (organization), thường là tổ chức phi lợi nhuận.',
    com: 'Đuôi <b>.com</b> = <b>công ty, buôn bán</b> (commercial). <b>Ai cũng mua được</b>, nên phải xem kỹ tên trang.',
    net: 'Đuôi <b>.net</b> = ban đầu dành cho <b>mạng lưới</b> (network), giờ ai cũng mua được.',
    vn: 'Đuôi <b>.vn</b> = trang web của <b>Việt Nam</b>.',
    other: t => `Đuôi <b>.${e(t)}</b> là đuôi ít gặp. Trang lạ dùng đuôi lạ thì <b>cẩn thận</b>.`,
  };
  const SAMPLES = ['https://www.thuvien.gov.vn/sach/truyen-co-tich?trang=2', 'https://www.hocvui.edu.vn/bai-tap/toan', 'https://www.google.com/search?q=khung+long', 'http://www.game-mien-phi.xyz/nhan-qua'];
  const PAIRS = [
    ['https://www.chinhphu.vn', 'http://chinhphu-tinmoi.xyz', 0, 'Trang 1 có <b>https</b> 🔒 và là tên miền thật của Chính phủ. Trang 2 dùng <b>http</b> (không an toàn) và đuôi lạ <b>.xyz</b>.'],
    ['https://www.g00gle.com', 'https://www.google.com', 1, 'Nhìn kỹ: “g<b>00</b>gle” dùng <b>số 0</b> thay chữ o! Kẻ gian hay làm tên giống hệt để lừa.'],
    ['https://moet.gov.vn', 'https://moet-gov-vn.info', 0, 'Đuôi <b>.gov.vn</b> chỉ cơ quan Nhà nước mới có. Trang 2 chỉ <b>giả vờ</b> có chữ “gov” trong tên, còn đuôi thật là <b>.info</b>.'],
    ['http://youtube.com.xem-free.ru/video', 'https://www.youtube.com/watch', 1, 'Đọc tên miền <b>từ phải sang trái</b>, tới dấu “/” đầu tiên: trang 1 thật ra là <b>xem-free.ru</b>, chữ “youtube.com” chỉ là mồi nhử.'],
    ['http://hocvui.edu.vn/dang-nhap', 'https://hocvui.edu.vn/dang-nhap', 1, 'Cùng trang nhưng trang 2 có <b>https</b> 🔒 → mật khẩu được <b>mã hóa</b>. Trang 1 là <b>http</b> → đừng nhập mật khẩu.'],
    ['https://www.nganhang-abc.com.vn', 'https://nganhang-abc.khuyenmai-tang-qua.top', 0, 'Trang 2 có tên miền thật là <b>khuyenmai-tang-qua.top</b> — đuôi lạ, chữ “tặng quà” để dụ. Trang 1 là tên miền chính thức.'],
  ];
  function parse(raw) {
    let s = raw.trim(); if (!/^[a-z]+:\/\//i.test(s)) s = 'https://' + s;
    let u; try { u = new URL(s); } catch (err) { return null; }
    const host = u.hostname.split('.'); const parts = [];
    parts.push({ k: 'proto', t: u.protocol + '//' });
    let tldStart = host.length - 1;
    if (host.length >= 3 && SLD.includes(host[host.length - 2]) && host[host.length - 1].length === 2) tldStart = host.length - 2;
    // tên miền chính = nhãn ngay trước đuôi; mọi thứ đứng trước nó là tên miền phụ
    const sub = host.slice(0, Math.max(0, tldStart - 1));
    if (sub.length) parts.push({ k: 'sub', t: sub.join('.') + '.' });
    if (tldStart > 0) parts.push({ k: 'name', t: host[tldStart - 1] });
    parts.push({ k: 'tld', t: '.' + host.slice(tldStart).join('.') });
    if (u.pathname && u.pathname !== '/') parts.push({ k: 'path', t: u.pathname });
    if (u.search) parts.push({ k: 'query', t: u.search });
    return { parts, u, tlds: host.slice(tldStart) };
  }
  function explain(k, p) {
    if (k === 'proto') return p.u.protocol === 'https:' ? '<span class="big">🔒 https:// — Giao thức an toàn</span><b>S = Secure = an toàn</b>. Dữ liệu giữa máy em và trang web được <b>mã hóa</b> (khóa lại), kẻ gian không đọc trộm được.' : '<span class="big">⚠️ http:// — KHÔNG có chữ S</span>Dữ liệu <b>không được mã hóa</b>. Đừng bao giờ nhập <b>mật khẩu</b> hay thông tin cá nhân ở trang http.';
    if (k === 'sub') { const t = p.parts.find(x => x.k === 'sub').t; return t === 'www.' ? '<span class="big">www. — Tên miền phụ</span><b>World Wide Web</b> (mạng toàn cầu). Nhiều trang có hoặc không có www đều vào được.' : `<span class="big">${e(t)} — Tên miền phụ</span>Phần đứng <b>trước</b> tên miền chính chỉ là tên miền phụ, <b>không phải tên thật</b> của trang. Kẻ gian hay đặt tên trang nổi tiếng ở đây để lừa — tên thật là phần <b>màu xanh dương</b>.`; }
    if (k === 'name') return `<span class="big">${e(p.parts.find(x => x.k === 'name').t)} — Tên miền chính</span>Đây là <b>tên của trang web</b>, giống <b>tên người</b> trong danh bạ. Phải nhìn kỹ từng chữ để tránh trang giả.`;
    if (k === 'tld') { const t = p.tlds; const main = t[0]; const info = TLD_INFO[main] || TLD_INFO.other(main); return `<span class="big">${e('.' + t.join('.'))} — Đuôi tên miền</span>${info}${t.length > 1 && t[1] === 'vn' ? ' Thêm <b>.vn</b> = ở Việt Nam.' : ''}`; }
    if (k === 'path') return '<span class="big">Đường dẫn (path)</span>Chỉ tới <b>trang cụ thể</b> bên trong trang web — giống <b>số phòng</b> trong một tòa nhà. Các thư mục cách nhau bằng dấu <b>/</b>.';
    if (k === 'query') return '<span class="big">Tham số (query)</span>Bắt đầu bằng dấu <b>?</b>, chứa thông tin thêm — ví dụ <b>trang số mấy</b>, hay <b>từ khóa</b> em vừa tìm.';
    return '';
  }
  const LABEL = { proto: 'Giao thức', sub: 'Tên miền phụ', name: 'Tên miền chính', tld: 'Đuôi tên miền', path: 'Đường dẫn', query: 'Tham số' };

  BG.add({
    id: 'url', icon: '🔗', khoi: [4, 5], title: 'Các phần của URL', desc: 'Tách địa chỉ web thành từng phần có màu: https, tên miền, đuôi .vn .gov, đường dẫn.',
    topics: ['LV2 GM1 · CĐ 11: URL – địa chỉ trang web', 'LV2 GM2 · CĐ 5: URL – địa chỉ web', 'LV3 GM1 · CĐ 3: Đường dẫn trang web (URL)', 'LV3 GM1 · CĐ 12: Tên miền đáng tin (.gov)', 'LV3 GM2 · CĐ 1: Các phần của URL', 'LV3 GM2 · CĐ 16: HTTPS'],
    tip: 'Phần <b>Mổ xẻ URL</b>: bấm vào từng phần có màu để giải thích; có thể gõ địa chỉ bất kỳ (vd trang của trường). Nhấn mạnh mẹo: <b>đọc tên miền từ phải sang trái, dừng ở dấu “/” đầu tiên</b>.',
    render(root) { cut(root); },
  });

  function cut(el) {
    let p = null;
    el.innerHTML = `<div class="bg-row">${SAMPLES.map((s, i) => `<button class="bgchip" data-s="${i}">Ví dụ ${i + 1}</button>`).join('')}
        <form id="urlF" class="url-form"><input id="urlIn" placeholder="…hoặc gõ một địa chỉ web" autocomplete="off" spellcheck="false"><button class="bgbtn">Tách</button></form></div>
      <div class="bg-panel url-big" id="urlBig"></div>
      <div class="url-legend" id="urlLeg"></div>
      <div class="bg-explain" id="urlEx">Bấm vào từng phần có màu để xem giải thích.</div>`;
    const $ = s => el.querySelector(s);
    function show(raw) {
      p = parse(raw); if (!p) { $('#urlEx').innerHTML = 'Địa chỉ này không hợp lệ, thử lại nhé.'; return; }
      $('#urlBig').innerHTML = (p.u.protocol === 'https:' ? '<span class="url-lock">🔒</span>' : '<span class="url-lock bad">⚠️</span>') + p.parts.map(x => `<span class="url-seg url-${x.k}" data-k="${x.k}">${e(x.t)}</span>`).join('');
      $('#urlLeg').innerHTML = p.parts.map(x => `<button class="url-lg url-${x.k}" data-k="${x.k}">${LABEL[x.k]}</button>`).join('');
      $('#urlEx').innerHTML = 'Bấm vào từng phần có màu để xem giải thích.';
    }
    el.addEventListener('click', ev => {
      const s = ev.target.closest('[data-s]'); if (s) { $('#urlIn').value = ''; return show(SAMPLES[+s.dataset.s]); }
      const k = ev.target.closest('[data-k]'); if (k && p) {
        el.querySelectorAll('.url-seg,.url-lg').forEach(x => x.classList.toggle('on', x.dataset.k === k.dataset.k));
        $('#urlEx').innerHTML = explain(k.dataset.k, p);
      }
    });
    $('#urlF').addEventListener('submit', ev => { ev.preventDefault(); if ($('#urlIn').value.trim()) show($('#urlIn').value); });
    show(SAMPLES[0]);
  }

})();
