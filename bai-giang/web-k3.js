/* Bài Khối 3: Internet & trang web — kết nối Internet, giao diện trình duyệt, trang web / ứng dụng web, trang tin được không */
(() => {
  const PARTS = [
    ['title', '📰 Tiêu đề', true, 'Tiêu đề cho biết bài viết nói về gì, có rõ ràng, nghiêm túc không.'],
    ['author', '✍️ Tác giả', true, 'Biết AI viết (bác sĩ, thầy cô, cơ quan…) thì biết có đáng tin không.'],
    ['date', '📅 Ngày đăng', true, 'Bài mới hay đã cũ lâu rồi? Thông tin cũ có thể không còn đúng.'],
    ['layout', '🌈 Cách trình bày', false, 'Màu sắc đẹp, chữ to, hình nhấp nháy KHÔNG chứng tỏ thông tin đúng. Trang lừa đảo cũng làm đẹp được!'],
  ];

  BG.add({
    id: 'web-k3', icon: '🌍', khoi: [3], title: 'Internet & trang web', desc: 'Kết nối Internet bằng gì, các phần của trình duyệt, trang web hay ứng dụng web, trang nào tin được.',
    topics: ['LV1 GM1 · CĐ 3: Điện thoại kết nối Internet', 'LV1 GM1 · CĐ 7: Giao diện trình duyệt', 'LV1 GM1 · CĐ 10: Ví dụ về trang web',
      'LV1 GM2 · CĐ 5: Máy tính bảng kết nối Internet', 'LV1 GM2 · CĐ 12: Kiểm tra trang web tin được', 'LV1 GM2 · CĐ 14: Ứng dụng web'],
    tip: '<b>Ứng dụng web</b> = dùng ngay trong trình duyệt, không cần cài (Gmail, Yahoo Mail). <b>Trang web</b> = trang để đọc, xem (trang chủ của trường). Trò chơi tải về máy là <b>ứng dụng cài đặt</b>.<br>Trong đề, “Công cụ tìm kiếm”, “Tác giả trang web”, “Các ứng dụng” KHÔNG phải là phần của giao diện trình duyệt.',
    render(root) {
      BG.modes(root, [
        { id: 'net', label: '📶 Kết nối Internet', run: el => BG.yesNo(el, {
          intro: '<span class="big">Điện thoại, máy tính bảng vào mạng bằng gì?</span>Không có dây cắm: dùng <b>Wi-Fi</b> 📶 hoặc <b>gói dữ liệu di động</b> (3G/4G/5G) 📡 của nhà mạng.',
          top: '<div class="wk-net"><div><span>📶</span><b>Wi-Fi</b><small>sóng từ cục phát ở nhà, trường, quán</small></div><div><span>📡</span><b>Gói dữ liệu di động</b><small>sóng 4G/5G từ cột sóng nhà mạng</small></div><div class="no"><span>🔌</span><b>Cáp mạng Ethernet</b><small>dây cắm vào máy để bàn — điện thoại, máy tính bảng không có lỗ cắm</small></div></div>',
          rows: [
            { ic: '📱', text: 'Điện thoại vào Internet bằng Wi-Fi', yes: true },
            { ic: '📱', text: 'Điện thoại vào Internet bằng gói dữ liệu của nhà mạng di động', yes: true },
            { ic: '📱', text: 'Điện thoại vào Internet bằng cáp USB', yes: false, why: 'Cáp USB dùng để sạc, chép tập tin.' },
            { ic: '📱', text: 'Điện thoại vào Internet bằng cáp Ethernet', yes: false, why: 'Điện thoại không có lỗ cắm cáp mạng.' },
            { ic: '📟', text: 'Máy tính bảng dùng gói dữ liệu từ nhà cung cấp dịch vụ di động', yes: true },
            { ic: '📟', text: 'Máy tính bảng dùng Wi-Fi công cộng', yes: true },
            { ic: '📟', text: 'Cắm cáp Ethernet vào máy tính bảng và vào tường', yes: false, why: 'Máy tính bảng không có lỗ cắm cáp mạng.' },
          ] }) },
        { id: 'br', label: '🧭 Giao diện trình duyệt', run: browserParts },
        { id: 'app', label: '🌐 Trang web hay ứng dụng?', run: el => BG.sortGame(el, {
          intro: '<span class="big">🌐 Trang web = để đọc, xem · 🧩 Ứng dụng web = làm việc ngay trong trình duyệt</span>Còn 💽 ứng dụng cài đặt thì phải tải về máy mới dùng được.',
          bins: [{ id: 'web', label: '🌐 Trang web' }, { id: 'wapp', label: '🧩 Ứng dụng web' }, { id: 'inst', label: '💽 Ứng dụng tải về / cài đặt' }],
          items: [
            { ic: '🏫', name: 'Trang chủ của trường', bin: 'web', why: 'Ví dụ về trang web trong đề.' },
            { ic: '📰', name: 'Trang báo tin tức', bin: 'web', why: 'Vào để đọc tin.' },
            { ic: '📖', name: 'Trang từ điển trực tuyến', bin: 'web', why: 'Vào để tra, đọc nghĩa.' },
            { ic: '📧', name: 'Gmail, Yahoo, Hotmail', bin: 'wapp', why: 'Chương trình email chạy ngay trong trình duyệt — ví dụ về ứng dụng web trong đề.' },
            { ic: '🗺️', name: 'Bản đồ chỉ đường trực tuyến', bin: 'wapp', why: 'Dùng ngay trên trình duyệt, không cần cài.' },
            { ic: '📝', name: 'Soạn văn bản trực tuyến', bin: 'wapp', why: 'Gõ, lưu bài ngay trên trình duyệt.' },
            { ic: '🎮', name: 'Trò chơi tải về máy tính để bàn', bin: 'inst', why: 'Phải tải về, cài đặt mới chơi.' },
            { ic: '📱', name: 'Ứng dụng tải về điện thoại', bin: 'inst', why: 'Tải từ kho ứng dụng rồi cài.' },
          ] }) },
        { id: 'tin', label: '✅ Trang này tin được không?', run: trust },
      ]);
    },
  });

  function browserParts(el) {
    el.innerHTML = `<div class="bg-explain wk-ex"><span class="big">Các phần của trình duyệt</span>Bấm vào từng nhãn màu để xem nó nằm ở đâu.</div>
      <div class="bg-row wk-lab">${[['tab', '🗂️ Thẻ (Tab)', 'Mỗi thẻ là một trang đang mở. Bấm dấu + để mở thêm thẻ.'], ['addr', '🔗 Thanh địa chỉ (Address Bar)', 'Nơi hiện và gõ địa chỉ (URL) của trang web. Muốn chép URL thì chép ở đây.'], ['win', '🪟 Cửa sổ (Window)', 'Cả khung trình duyệt là một cửa sổ, có nút — ☐ ✕ ở góc phải.']].map(([k, t, d]) => `<button class="bgchip" data-k="${k}" data-d="${d}">${t}</button>`).join('')}</div>
      <div class="wk-br">${BG.browser({ url: 'truonghocvui.edu.vn', title: 'Trường Tiểu học Vui', fav: BG.fav('T', '#e17055'), body: '<div class="wk-page"><h3>🏫 Trường Tiểu học Vui</h3><p>Chào mừng các em đến với trang web của trường!</p></div>' })}</div>
      <div class="wk-q"></div>`;
    const br = el.querySelector('.wk-br');
    el.addEventListener('click', ev => {
      const b = ev.target.closest('.wk-lab [data-k]'); if (!b) return;
      el.querySelectorAll('.wk-lab .bgchip').forEach(x => x.classList.toggle('on', x === b));
      br.dataset.hl = b.dataset.k;
      el.querySelector('.wk-ex').innerHTML = `<span class="big">${b.textContent}</span>${b.dataset.d}`;
    });
    BG.yesNo(el.querySelector('.wk-q'), { intro: '<span class="big">Phần nào thuộc giao diện trình duyệt?</span>', rows: [
      { ic: '🗂️', text: 'Thẻ (Tab)', yes: true },
      { ic: '🪟', text: 'Cửa sổ (Window)', yes: true },
      { ic: '🔗', text: 'Thanh địa chỉ (Address Bar)', yes: true },
      { ic: '🔎', text: 'Công cụ tìm kiếm (Search Engine)', yes: false, why: 'Là một trang web khác (Google…) mở BÊN TRONG trình duyệt, không phải một phần của trình duyệt.' },
      { ic: '✍️', text: 'Tác giả trang Web (Site Author)', yes: false, why: 'Là người viết trang web.' },
      { ic: '🧩', text: 'Các ứng dụng (Applications)', yes: false, why: 'Là phần mềm khác trong máy.' },
    ] });
  }

  function trust(el) {
    el.innerHTML = `<div class="bg-explain wk-ex"><span class="big">Dựa vào đâu để biết trang web đáng tin?</span>Bấm vào từng phần của bài viết bên dưới.</div>
      <div class="wk-art">
        <div class="wk-p" data-p="layout"><div class="wk-ban">✨ Chào mừng bạn! ✨</div></div>
        <h2 class="wk-p" data-p="title">Vì sao cần ngủ đủ 9–10 tiếng mỗi đêm?</h2>
        <div class="wk-meta"><span class="wk-p" data-p="author">✍️ Bác sĩ Nguyễn Văn An — Bệnh viện Nhi</span><span class="wk-p" data-p="date">📅 Đăng ngày 12/09/2026</span></div>
        <p>Học sinh tiểu học cần ngủ đủ giấc để lớn nhanh, học tốt và ít ốm vặt…</p>
      </div>
      <div class="wk-sum">${PARTS.map(([k, t]) => `<div data-s="${k}">${t}<b>?</b></div>`).join('')}</div>`;
    el.addEventListener('click', ev => {
      const p = ev.target.closest('.wk-p'); if (!p) return;
      const [k, t, ok, d] = PARTS.find(x => x[0] === p.dataset.p);
      el.querySelectorAll('.wk-p').forEach(x => x.classList.toggle('on', x === p));
      el.querySelector('.wk-ex').innerHTML = `<span class="big ${ok ? 'bg-ok' : 'bg-bad'}">${t}: ${ok ? '✔ DÙNG để kiểm tra' : '✘ KHÔNG dùng để kiểm tra'}</span>${d}`;
      const s = el.querySelector(`[data-s="${k}"]`); s.className = ok ? 'ok' : 'no'; s.querySelector('b').textContent = ok ? '✔' : '✘';
    });
  }
})();
