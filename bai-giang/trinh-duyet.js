/* Bài: Trình duyệt web giả lập — URL, tải lại, trang tải một nửa, dấu trang, lùi/tiến */
(() => {
  const e = BG.esc, svg = BG.svg;
  const IMG = n => `img/web/${n}.jpg`;
  /* liên kết trong trang: bấm thì chuyển trang, rê chuột thì hiện địa chỉ ở góc dưới */
  const A = (url, inner, cls = '') => `<a class="${cls}" data-go="${url}" data-href="https://${url}">${inner}</a>`;

  /* ---------- Học Vui (trang chủ) ---------- */
  const hvHead = cur => `<header class="hv-h"><div class="hv-in">
      ${A('www.hocvui.vn', '<span class="hv-logo">🎒</span><b>Học<i>Vui</i></b>', 'hv-brand')}
      <nav>${[['www.hocvui.vn', 'Trang chủ'], ['www.vuonthu.vn', 'Vườn thú'], ['www.thoitiet.vn', 'Thời tiết'], ['www.truyencotich.vn', 'Truyện cổ tích']].map(([u, t]) => A(u, t, u === cur ? 'on' : '')).join('')}</nav>
      <span class="hv-search">${svg('search', 18)}<span>Tìm bài học…</span></span><span class="hv-login">Đăng nhập</span></div></header>`;
  const hvFoot = `<footer class="hv-f"><div class="hv-in"><div><b>🎒 Học Vui</b><br>Cổng học tập vui cho học sinh tiểu học.</div>
      <div><b>Chuyên mục</b><br>${A('www.vuonthu.vn', 'Vườn thú')} · ${A('www.thoitiet.vn', 'Thời tiết')} · ${A('www.truyencotich.vn', 'Truyện cổ tích')}</div>
      <div><b>Liên hệ</b><br>lienhe@hocvui.vn<br>© 2026 Học Vui</div></div></footer>`;
  const hocvui = `${hvHead('www.hocvui.vn')}
    <section class="hv-hero"><div class="hv-in">
      <div class="hv-ht"><span class="hv-pill">✨ Mới: Chuyên mục Vườn thú</span><h1>Học mà chơi,<br>chơi mà học!</h1>
        <p>Xem con vật, xem thời tiết, đọc truyện cổ tích — tất cả trong một trang.</p>${A('www.vuonthu.vn', 'Khám phá ngay →', 'hv-cta')}</div>
      <div class="hv-hi"><img src="${IMG('kids')}" alt=""></div></div></section>
    <section class="hv-in hv-sec"><h2>Chuyên mục nổi bật</h2><div class="hv-cards">
      ${[['www.vuonthu.vn', `<img src="${IMG('lion')}" alt="">`, 'Vườn thú', 'Gặp sư tử, voi, hươu cao cổ và nhiều bạn thú khác.'],
         ['www.thoitiet.vn', '<div class="hv-sky">⛅<b>32°</b></div>', 'Thời tiết', 'Hôm nay nắng hay mưa? Xem dự báo 7 ngày tới.'],
         ['www.truyencotich.vn', `<img src="${IMG('bamboo')}" alt="">`, 'Truyện cổ tích', 'Cây tre trăm đốt, Sọ Dừa, Tấm Cám…']]
        .map(([u, pic, t, d]) => A(u, `<div class="hv-cimg">${pic}</div><div class="hv-cb"><h3>${t}</h3><p>${d}</p><span>Xem thêm →</span></div>`, 'hv-card')).join('')}
    </div></section>${hvFoot}`;

  /* ---------- Vườn thú ---------- */
  const ANIMALS = [['lion', 'Sư tử', 'Châu Phi', 'Chúa sơn lâm, tiếng gầm nghe xa tới 8 km.'], ['tiger', 'Hổ', 'Châu Á', 'Mỗi con hổ có bộ vằn không giống con nào.'],
    ['elephant', 'Voi', 'Châu Á', 'Dùng vòi để uống nước, tắm và nhặt đồ.'], ['giraffe', 'Hươu cao cổ', 'Châu Phi', 'Cao nhất thế giới, tới 5–6 mét.'],
    ['panda', 'Gấu trúc', 'Trung Quốc', 'Ăn tre suốt khoảng 12 tiếng mỗi ngày.'], ['zebra', 'Ngựa vằn', 'Châu Phi', 'Sọc vằn giúp chúng lẫn vào nhau khi chạy.'],
    ['monkey', 'Khỉ', 'Châu Á', 'Rất thông minh, sống theo đàn.'], ['parrot', 'Vẹt', 'Nam Mỹ', 'Có thể bắt chước tiếng người.']];
  const vuonthu = `<header class="vt-h"><div class="hv-in">${A('www.vuonthu.vn', '<span>🦁</span><b>Vườn Thú Xanh</b>', 'vt-brand')}
      <nav><span>Giới thiệu</span><span class="on">Các loài vật</span><span>Bản đồ</span><span>Tin tức</span></nav><span class="vt-ticket">🎟 Mua vé</span></div></header>
    <section class="vt-hero" style="background-image:linear-gradient(90deg,rgba(0,40,20,.78),rgba(0,40,20,.15)),url(${IMG('elephant')})"><div class="hv-in">
      <h1>Khám phá thế giới động vật</h1><p>Hơn 120 loài vật đang chờ em đến thăm · Mở cửa 7:00 – 17:00 mỗi ngày</p></div></section>
    <section class="hv-in hv-sec"><div class="vt-row"><h2>Các loài vật</h2><span class="vt-filter"><b>Tất cả</b><span>Châu Phi</span><span>Châu Á</span><span>Chim</span></span></div>
      <div class="vt-grid">${ANIMALS.map(([img, n, where, fact]) => `<article class="vt-card"><div class="vt-img"><img src="${IMG(img)}" alt=""><span>${where}</span></div><h3>${n}</h3><p>${fact}</p></article>`).join('')}</div>
      <div class="vt-info"><div><b>🕖 Giờ mở cửa</b>7:00 – 17:00, tất cả các ngày trong tuần</div><div><b>🎟 Giá vé</b>Trẻ em: 30.000đ · Người lớn: 60.000đ</div><div><b>📍 Địa chỉ</b>Số 2 Đường Vườn Thú, TP. Hồ Chí Minh</div></div></section>
    <footer class="vt-f"><div class="hv-in">© 2026 Vườn Thú Xanh · Trang được giới thiệu bởi ${A('www.hocvui.vn', 'Học Vui')}</div></footer>`;

  /* ---------- Thời tiết ---------- */
  const DAYS = [['Hôm nay', '⛅', 33, 26, 40], ['Thứ Năm', '🌧️', 30, 25, 80], ['Thứ Sáu', '⛈️', 29, 25, 90], ['Thứ Bảy', '🌦️', 31, 25, 60], ['Chủ Nhật', '☀️', 34, 26, 10], ['Thứ Hai', '☀️', 35, 27, 10], ['Thứ Ba', '⛅', 33, 26, 30]];
  const HOURS = [['Bây giờ', '⛅', 32], ['15:00', '☀️', 33], ['16:00', '⛅', 32], ['17:00', '🌦️', 30], ['18:00', '🌧️', 28], ['19:00', '🌧️', 27], ['20:00', '☁️', 27], ['21:00', '☁️', 26]];
  const thoitiet = `<header class="tt-h"><div class="hv-in">${A('www.thoitiet.vn', '<span>⛅</span><b>ThờiTiết<i>24h</i></b>', 'tt-brand')}
      <span class="tt-search">${svg('search', 18)}<span>Tìm tỉnh, thành phố…</span></span><nav><span class="on">Hôm nay</span><span>Theo giờ</span><span>7 ngày</span><span>Bản đồ mưa</span></nav></div></header>
    <div class="tt-bg"><section class="hv-in tt-main">
      <div class="tt-now"><div class="tt-loc">📍 TP. Hồ Chí Minh <small>Cập nhật lúc 14:00</small></div>
        <div class="tt-big"><span class="tt-ic">⛅</span><span class="tt-deg">32°</span><div><b>Có mây</b><br>Cảm giác như 37°<br>Cao 33° · Thấp 26°</div></div>
        <div class="tt-stats">${[['💧', 'Độ ẩm', '70%'], ['💨', 'Gió', '12 km/h'], ['☂️', 'Khả năng mưa', '40%'], ['🔆', 'Chỉ số UV', '8 · Rất cao']].map(([i, k, v]) => `<div><span>${i} ${k}</span><b>${v}</b></div>`).join('')}</div></div>
      <div class="tt-card"><h3>Dự báo theo giờ</h3><div class="tt-hours">${HOURS.map(([h, i, t]) => `<div><small>${h}</small><span>${i}</span><b>${t}°</b></div>`).join('')}</div></div>
      <div class="tt-card"><h3>Dự báo 7 ngày</h3>${DAYS.map(([d, i, hi, lo, rain]) => `<div class="tt-day"><b>${d}</b><span class="tt-di">${i}</span><span class="tt-rain">☂ ${rain}%</span><span class="tt-lo">${lo}°</span><span class="tt-bar"><i style="left:${(lo - 24) * 9}%;right:${(36 - hi) * 9}%"></i></span><span class="tt-hi">${hi}°</span></div>`).join('')}</div>
    </section></div>
    <footer class="tt-f"><div class="hv-in">Nguồn số liệu: Trạm khí tượng mẫu · ${A('www.hocvui.vn', '← Về Học Vui')}</div></footer>`;

  /* ---------- Truyện cổ tích ---------- */
  const STORIES = [
    ['cay-tre-tram-dot', 'bamboo', 'Cây tre trăm đốt', '5 phút đọc', '24.180',
      'Anh Khoai hiền lành, chăm chỉ làm thuê cho phú ông. Phú ông hứa: làm đủ ba năm sẽ gả con gái cho anh.',
      ['Anh Khoai hiền lành, chăm chỉ làm thuê cho nhà phú ông. Phú ông hứa hẹn: “Con chịu khó làm lụng, đủ ba năm ta sẽ gả con gái cho.” Anh Khoai tin lời, làm việc quần quật suốt ngày.',
        'Hết ba năm, phú ông nuốt lời, bắt anh vào rừng tìm cây tre có đủ một trăm đốt mới cho cưới. Anh Khoai tìm mãi không thấy, ngồi khóc. Ông Bụt hiện lên, bảo anh chặt đủ một trăm đốt tre rồi đọc “Khắc nhập, khắc nhập!” — các đốt tre liền nối lại thành một cây.',
        'Anh vác cây tre về. Phú ông chạm vào cây tre, anh đọc “Khắc nhập!” thế là phú ông dính chặt. Phú ông xin tha và giữ lời hứa. Anh đọc “Khắc xuất!”, cây tre rời ra, và anh cưới được vợ.'],
      'Người chăm chỉ, thật thà sẽ được giúp đỡ; kẻ gian dối, nuốt lời sẽ bị trừng phạt.'],
    ['so-dua', 'coconut', 'Sọ Dừa', '6 phút đọc', '18.042',
      'Một cậu bé sinh ra không có chân tay, tròn như quả dừa, nhưng rất tài giỏi và tốt bụng.',
      ['Ngày xưa có hai vợ chồng nghèo đi ở cho nhà phú ông. Họ sinh được một cậu con trai không chân không tay, tròn lông lốc như quả dừa, nên đặt tên là Sọ Dừa.',
        'Sọ Dừa xin đi chăn dê cho phú ông. Cậu chăn giỏi đến mức đàn dê con nào cũng no căng. Cô con gái út của phú ông thấy Sọ Dừa thổi sáo hay, tốt bụng, nên đem lòng thương mến.',
        'Sau này Sọ Dừa hiện ra là một chàng trai khôi ngô, chăm học, thi đỗ trạng nguyên và sống hạnh phúc bên cô út.'],
      'Đừng đánh giá người khác qua vẻ bề ngoài — điều quý nhất là tài năng và tấm lòng.'],
    ['tam-cam', 'carp', 'Tấm Cám', '8 phút đọc', '31.507',
      'Cô Tấm hiền lành, chăm chỉ, bị dì ghẻ và Cám hắt hủi, nhưng cuối cùng được hạnh phúc.',
      ['Tấm mồ côi mẹ, sống với dì ghẻ và em cùng cha khác mẹ là Cám. Tấm phải làm lụng vất vả, còn Cám được nuông chiều.',
        'Một lần đi bắt tép, Cám lừa Tấm để lấy giỏ tép. Bụt hiện lên giúp Tấm, cho cô con cá bống nhỏ để nuôi làm bạn.',
        'Trải qua nhiều khó khăn, nhờ hiền lành và kiên trì, Tấm trở thành hoàng hậu và sống hạnh phúc.'],
      'Ở hiền thì gặp lành.'],
  ];
  const tcHead = `<header class="ct-h"><div class="hv-in">${A('www.truyencotich.vn', '<span>📖</span><b>Truyện Cổ Tích</b><small>Việt Nam</small>', 'ct-brand')}
      <nav><span class="on">Cổ tích</span><span>Ngụ ngôn</span><span>Thần thoại</span><span>Truyện cười</span></nav></div></header>`;
  const tcFoot = `<footer class="ct-f"><div class="hv-in">© 2026 Truyện Cổ Tích Việt Nam · ${A('www.hocvui.vn', 'Học Vui')}</div></footer>`;
  const truyen = `${tcHead}<div class="hv-in ct-wrap"><div class="ct-crumb">${A('www.truyencotich.vn', 'Trang chủ')} › Cổ tích</div><h1 class="ct-h1">Truyện cổ tích Việt Nam</h1>
      ${STORIES.map(([p, img, t, read, views, sum]) => A('www.truyencotich.vn/' + p, `<img src="${IMG(img)}" alt=""><div><h2>${t}</h2><p>${sum}</p><small>⏱ ${read} · 👁 ${views} lượt xem</small></div>`, 'ct-item')).join('')}
    </div>${tcFoot}`;
  const story = ([p, img, t, read, views, , paras, moral]) => `${tcHead}<div class="hv-in ct-wrap ct-art">
      <div class="ct-crumb">${A('www.truyencotich.vn', 'Trang chủ')} › ${A('www.truyencotich.vn', 'Cổ tích')} › ${t}</div>
      <h1 class="ct-h1">${t}</h1><div class="ct-meta">⏱ ${read} · 👁 ${views} lượt xem · ❤ Yêu thích</div>
      <img class="ct-hero" src="${IMG(img)}" alt="">
      ${paras.map(x => `<p>${x}</p>`).join('')}
      <div class="ct-moral"><b>💡 Bài học</b>${moral}</div>
      <h3>Truyện khác</h3><div class="ct-more">${STORIES.filter(s => s[0] !== p).map(s => A('www.truyencotich.vn/' + s[0], `<img src="${IMG(s[1])}" alt=""><b>${s[2]}</b>`, 'ct-mini')).join('')}</div>
    </div>${tcFoot}`;

  const SITES = {
    'www.hocvui.vn': { title: 'Học Vui – Cổng học tập cho học sinh tiểu học', fav: BG.fav('H', '#ff7a1c'), body: hocvui },
    'www.vuonthu.vn': { title: 'Vườn Thú Xanh – Các loài vật', fav: BG.fav('V', '#1e8e3e'), body: vuonthu },
    'www.thoitiet.vn': { title: 'Thời tiết TP. Hồ Chí Minh hôm nay – ThờiTiết24h', fav: BG.fav('T', '#1a73e8'), body: thoitiet },
    'www.truyencotich.vn': { title: 'Truyện cổ tích Việt Nam', fav: BG.fav('C', '#8d5524'), body: truyen },
  };
  STORIES.forEach(s => { SITES['www.truyencotich.vn/' + s[0]] = { title: s[2] + ' – Truyện cổ tích Việt Nam', fav: BG.fav('C', '#8d5524'), body: story(s) }; });
  const HOME = 'www.hocvui.vn';
  const EXPLAIN = {
    back: '<span class="big">◀ Quay lại (Back)</span>Về <b>trang vừa xem trước đó</b>.',
    fwd: '<span class="big">▶ Tiến tới (Forward)</span>Đi tới trang em đã xem rồi bấm Quay lại. Chưa bấm Quay lại thì nút này mờ.',
    reload: '<span class="big">⟳ Tải lại (Reload / Refresh)</span>Tải lại trang <b>từ đầu</b>. Dùng khi trang <b>tải một nửa</b>, bị đứng hoặc hiện thiếu hình. Phím tắt: <b>F5</b>.',
    star: '<span class="big">☆ Dấu trang (Bookmark)</span>Lưu trang lại trên <b>thanh dấu trang</b>, lần sau chỉ cần bấm 1 cái là mở, khỏi gõ địa chỉ. Phím tắt: <b>Ctrl + D</b>.',
    unstar: '<span class="big">★ Bỏ dấu trang</span>Ngôi sao đang tô màu = trang đã được lưu. Bấm lại để bỏ lưu.',
    home: '<span class="big">🏠 Trang chủ</span>Về trang mở đầu của trình duyệt.',
    url: '<span class="big">Thanh địa chỉ (URL)</span>Gõ <b>địa chỉ trang web</b> rồi bấm <b>Enter</b>. Phải gõ <b>đúng từng chữ</b>, sai 1 chữ là không vào được.',
    bad: u => `<span class="big">❌ Không tìm thấy trang</span>Địa chỉ “<b>${e(u)}</b>” không có. Kiểm tra xem em có <b>gõ sai chữ nào</b> không.`,
    half: '<span class="big">🐌 Trang mới tải một nửa!</span>Mạng chậm nên trang bị thiếu, hình chưa hiện. Hãy bấm nút <b>⟳ Tải lại</b>.',
    link: '<span class="big">🔗 Liên kết (Link)</span>Bấm vào chữ / hình có liên kết là chuyển sang trang khác. Địa chỉ trên thanh URL cũng đổi theo. Rê chuột lên liên kết, góc dưới bên trái sẽ hiện địa chỉ của nó.',
    bm: '<span class="big">🔖 Mở từ dấu trang</span>Bấm vào dấu trang là vào thẳng trang đã lưu, không cần gõ địa chỉ.',
  };
  const err404 = u => `<div class="tdv-err"><div class="tdv-err-ic"></div><h1>Không thể truy cập trang web này</h1>
      <p>Không tìm thấy địa chỉ IP máy chủ của <b>${e(u)}</b>.</p><p>Hãy thử:</p>
      <ul><li>Kiểm tra xem có <b>lỗi chính tả</b> trong địa chỉ <b>${e(u)}</b> không.</li><li>Kiểm tra kết nối mạng.</li></ul>
      <p class="code">DNS_PROBE_FINISHED_NXDOMAIN</p><button class="tdv-errbtn" data-b="reload">Tải lại</button></div>`;

  BG.add({
    id: 'trinh-duyet', icon: '🌐', khoi: [3, 4], title: 'Trình duyệt web', desc: 'Thanh địa chỉ, quay lại / tiến tới, tải lại trang, dấu trang.',
    topics: ['LV1 GM1 · CĐ 8: URL là gì?', 'LV1 GM1 · CĐ 9: Dấu trang (Bookmark)', 'LV1 GM2 · CĐ 11: URL ở thanh địa chỉ', 'LV1 GM2 · CĐ 13: Dấu trang / Mục yêu thích', 'LV2 GM1 · CĐ 8: Tải lại trang web', 'LV2 GM1 · CĐ 9: Dấu trang', 'LV2 GM1 · CĐ 11: URL', 'LV2 GM2 · CĐ 4: Trang web tải một nửa', 'LV2 GM2 · CĐ 5: URL', 'LV2 GM2 · CĐ 30: Dấu trang, tải lại, điều hướng'],
    tip: 'Cho HS lên bấm thử: (1) gõ <b>www.vuonthu.vn</b> vào thanh địa chỉ rồi Enter. (2) Gõ sai 1 chữ (vd <b>www.vuonthu.com</b>) để thấy trang báo lỗi. (3) Bật <b>🐌 Mạng chậm</b> → mở trang khác → trang chỉ hiện một nửa, thiếu hình → hỏi “giờ bấm nút nào?” → <b>Tải lại</b>. (4) Bấm ☆ trong thanh địa chỉ để lưu dấu trang, đi trang khác rồi bấm dấu trang để quay về. (5) Đi qua 3 trang rồi bấm ◀ ▶ để thấy lịch sử. (6) Rê chuột lên một liên kết → góc dưới trái hiện địa chỉ.',
    render(root) {
      const st = { hist: [], idx: -1, bm: ['www.hocvui.vn'], slow: false, loading: false, half: false, timer: null };
      root.innerHTML = `
        <div class="bg-explain" id="tdvEx">Bấm thử các nút trên trình duyệt, lời giải thích sẽ hiện ở đây.</div>
        <div class="bg-row"><label class="tdv-slow"><input type="checkbox" id="tdvSlow"> 🐌 Giả lập mạng chậm</label><span class="hint">(công tắc của thầy/cô, không có trên trình duyệt thật)</span></div>
        <div class="cw tdv-win">
          <div class="cw-tabs"><div class="cw-tab"><span class="cw-tfav" id="tdvTabIc"></span><span class="cw-tt" id="tdvTabT"></span>${svg('close', 14)}</div>
            <span class="cw-new">${svg('add', 18)}</span><span class="cw-win"><i class="mn"></i><i class="mx"></i>${svg('close', 16)}</span></div>
          <div class="cw-bar">
            <button data-b="back" title="Quay lại">${svg('back')}</button><button data-b="fwd" title="Tiến tới">${svg('fwd')}</button><button data-b="reload" title="Tải lại">${svg('reload')}</button><button data-b="home" title="Trang chủ">${svg('home')}</button>
            <form class="cw-omni" id="tdvForm"><span class="cw-lk">${svg('lock', 15)}</span><input id="tdvUrl" spellcheck="false" autocomplete="off"><span class="cw-st" data-b="star" id="tdvStar" title="Lưu dấu trang (Ctrl + D)">${svg('starO', 19)}</span></form>
            <span class="cw-av">A</span><span class="cw-b">${svg('more')}</span>
          </div>
          <div class="tdv-bms" id="tdvBms"></div>
          <div class="tdv-prog"><i id="tdvProg"></i></div>
          <div class="cw-page tdv-page" id="tdvPage"></div>
          <div class="cw-status"></div>
        </div>`;
      const $ = id => root.querySelector('#' + id);
      const ex = html => { $('tdvEx').innerHTML = html; };
      const cur = () => st.hist[st.idx];
      const clean = u => u.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '');
      const resolve = u => { u = clean(u); if (SITES[u]) return u; if (SITES['www.' + u]) return 'www.' + u; return null; };
      BG.statusHover(root.querySelector('.tdv-win'));

      function drawChrome() {
        const u = cur(); const s = SITES[u];
        if (document.activeElement !== $('tdvUrl')) $('tdvUrl').value = u ? 'https://' + u : '';
        $('tdvTabIc').innerHTML = st.loading ? '<span class="tdv-spin"></span>' : (s ? s.fav : '<span class="tdv-sad"></span>');
        $('tdvTabT').textContent = st.loading ? (s ? s.title : u) : (s ? s.title : u);
        root.querySelector('[data-b=back]').disabled = st.idx <= 0;
        root.querySelector('[data-b=fwd]').disabled = st.idx >= st.hist.length - 1;
        const on = st.bm.includes(u);
        $('tdvStar').innerHTML = svg(on ? 'star' : 'starO', 19); $('tdvStar').classList.toggle('on', on);
        $('tdvBms').innerHTML = st.bm.length ? st.bm.map(b => `<button data-bm="${b}">${SITES[b] ? SITES[b].fav + ' ' + e(SITES[b].title.split(' – ')[0]) : e(b)}</button>`).join('') : '<span>Thanh dấu trang: bấm ☆ trong thanh địa chỉ để lưu trang ở đây</span>';
      }
      function show(u, isReload) {
        clearTimeout(st.timer);
        const page = $('tdvPage'); const prog = $('tdvProg');
        st.loading = true; st.half = false; drawChrome();
        page.classList.add('loading'); prog.style.transition = 'none'; prog.style.opacity = '1'; prog.style.width = '0'; void prog.offsetWidth;
        const slowNow = st.slow && !isReload;
        prog.style.transition = `width ${slowNow ? 600 : 700}ms ease-out`; prog.style.width = slowNow ? '48%' : '100%';
        st.timer = setTimeout(() => {
          page.classList.remove('loading');
          const s = SITES[u];
          page.innerHTML = s ? s.body : err404(u); page.scrollTop = 0;
          if (slowNow && s) {
            st.half = true; page.classList.add('half');
            ex(EXPLAIN.half);
          } else {
            page.classList.remove('half');
            setTimeout(() => { prog.style.transition = 'opacity .3s'; prog.style.opacity = '0'; }, 250);
            if (!s) ex(EXPLAIN.bad(u));
          }
          st.loading = st.half; drawChrome();
        }, slowNow ? 650 : 750);
      }
      function go(u, why) {
        st.hist = st.hist.slice(0, st.idx + 1); st.hist.push(u); st.idx++;
        show(u); if (why) ex(why);
      }
      root.addEventListener('click', ev => {
        const b = ev.target.closest('[data-b]'); const g = ev.target.closest('[data-go]'); const m = ev.target.closest('[data-bm]');
        if (g) { ev.preventDefault(); return go(g.dataset.go, EXPLAIN.link); }
        if (m) return go(m.dataset.bm, EXPLAIN.bm);
        if (!b || b.disabled) return;
        const k = b.dataset.b;
        if (k === 'back') { st.idx--; show(cur()); ex(EXPLAIN.back); }
        if (k === 'fwd') { st.idx++; show(cur()); ex(EXPLAIN.fwd); }
        if (k === 'reload') { show(cur(), true); ex(EXPLAIN.reload); }
        if (k === 'home') go(HOME, EXPLAIN.home);
        if (k === 'star') {
          const u = cur(); if (!SITES[u]) return;
          if (st.bm.includes(u)) { st.bm = st.bm.filter(x => x !== u); ex(EXPLAIN.unstar); } else { st.bm.push(u); ex(EXPLAIN.star); }
          drawChrome();
        }
      });
      $('tdvUrl').addEventListener('focus', () => { ex(EXPLAIN.url); setTimeout(() => $('tdvUrl').select(), 0); });
      $('tdvUrl').addEventListener('blur', () => { if (cur()) $('tdvUrl').value = 'https://' + cur(); });
      $('tdvForm').addEventListener('submit', ev => {
        ev.preventDefault(); const raw = $('tdvUrl').value; if (!raw.trim()) return;
        const u = resolve(raw); $('tdvUrl').blur();
        go(u || clean(raw), u ? '<span class="big">✔ Vào được rồi!</span>Em đã gõ đúng địa chỉ và bấm <b>Enter</b>.' : null);
        $('tdvUrl').value = 'https://' + cur();
      });
      $('tdvSlow').addEventListener('change', ev => { st.slow = ev.target.checked; ex(st.slow ? '🐌 Đã bật <b>mạng chậm</b>. Giờ mở một trang bất kỳ, trang sẽ chỉ tải được <b>một nửa</b>.' : 'Đã tắt mạng chậm.'); });
      go(HOME);
    },
  });
})();
