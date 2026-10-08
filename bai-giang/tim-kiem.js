/* Bài: Máy tìm kiếm giả lập — quảng cáo, tinh chỉnh từ khóa, từ đồng nghĩa */
(() => {
  const e = BG.esc;
  const ad = (t, u, d) => ({ ad: true, t, u, d });
  const r = (t, u, d, img) => ({ t, u, d, img });
  const DATA = [
    { q: 'mèo', count: '1.240.000.000', type: 'broad', refine: ['cách chăm sóc mèo con', 'mèo con ăn gì'], res: [
      ad('Mua mèo cảnh giá rẻ – Giao tận nhà', 'www.thucungre.vn', 'Mèo Anh lông ngắn giảm 50% hôm nay! Đặt ngay kẻo hết.'),
      ad('Pate cho mèo – Mua 1 tặng 1', 'www.shoppet.vn', 'Khuyến mãi lớn nhất năm, miễn phí giao hàng.'),
      r('Mèo – Bách khoa toàn thư', 'vi.wikipedia.org/wiki/Mèo', 'Mèo là loài động vật có vú nhỏ, được con người nuôi làm thú cưng…', 'cat'),
      r('100 hình mèo hài hước nhất', 'www.anhvui.vn/meo-hai', 'Tuyển tập ảnh mèo ngộ nghĩnh khiến bạn cười không ngừng.'),
      r('Phim hoạt hình chú mèo và chuột', 'www.phimhoathinh.vn', 'Xem các tập phim hoạt hình vui nhộn…'),
      r('Mèo trong lịch sử Ai Cập cổ đại', 'www.lichsu.vn/meo-ai-cap', 'Người Ai Cập cổ đại rất yêu quý loài mèo…') ] },
    { q: 'cách chăm sóc mèo con', count: '3.150.000', type: 'refined', res: [
      ad('Sữa cho mèo con – Giảm 30%', 'www.shoppet.vn', 'Sữa chuyên dụng cho mèo dưới 3 tháng tuổi.'),
      r('Cách chăm sóc mèo con mới sinh: 7 điều cần biết', 'www.thuy.vn/meo-con', 'Giữ ấm, cho bú đúng giờ, đưa đi khám thú y…', 'kitten'),
      r('Hướng dẫn nuôi mèo con cho người mới', 'www.thucung.edu.vn/nuoi-meo', 'Chuẩn bị chỗ ngủ, cát vệ sinh và lịch tiêm phòng…'),
      r('Mèo con bao nhiêu tuổi thì cai sữa?', 'www.hoibacsithuy.org', 'Mèo con thường cai sữa khi được 4 – 8 tuần tuổi.') ] },
    { q: 'mèo con ăn gì', count: '1.020.000', type: 'refined', res: [
      r('Mèo con ăn gì? Thực đơn theo từng tháng tuổi', 'www.thuy.vn/meo-con-an-gi', 'Dưới 1 tháng: sữa mẹ hoặc sữa chuyên dụng. Từ 2 tháng: pate mềm…', 'kitten'),
      r('Những thức ăn mèo con KHÔNG được ăn', 'www.hoibacsithuy.org/canh-bao', 'Sô-cô-la, hành, tỏi, sữa bò… có thể làm mèo bị bệnh.'),
      r('Bao lâu cho mèo con ăn một lần?', 'www.thucung.edu.vn', 'Mèo con cần ăn 3 – 4 bữa nhỏ mỗi ngày.') ] },
    { q: 'ô tô', count: '602.000.000', type: 'syn', syn: 'xe hơi', res: [
      ad('Ô tô điện giá tốt – Lái thử miễn phí', 'www.otodien-giare.vn', 'Ưu đãi lên đến 100 triệu đồng.'),
      r('Ô tô – Bách khoa toàn thư', 'vi.wikipedia.org/wiki/Ô_tô', 'Ô tô là loại phương tiện có 4 bánh chạy bằng động cơ…', 'car'),
      r('Đồ chơi ô tô điều khiển cho bé', 'www.dochoi.vn/o-to', 'Ô tô đồ chơi chạy pin, nhiều màu sắc.'),
      r('Luật giao thông cho ô tô', 'www.antoangiaothong.gov.vn', 'Những quy định người lái ô tô cần nhớ.') ] },
    { q: 'xe hơi', count: '415.000.000', type: 'syn', syn: 'ô tô', res: [
      r('Lịch sử chiếc xe hơi đầu tiên', 'www.khoahoc.vn/xe-hoi-dau-tien', 'Chiếc xe hơi chạy xăng đầu tiên ra đời năm 1886…', 'car'),
      r('Xe hơi hoạt động như thế nào?', 'www.khoahocvui.edu.vn/xe-hoi', 'Động cơ đốt cháy nhiên liệu để làm bánh xe quay…'),
      r('Vẽ xe hơi đơn giản cho bé', 'www.vetranh.vn/xe-hoi', 'Hướng dẫn vẽ xe hơi qua 5 bước.') ] },
    { q: 'máy tính xách tay', count: '98.400.000', type: 'syn', syn: 'laptop', res: [
      r('Máy tính xách tay là gì?', 'vi.wikipedia.org/wiki/Máy_tính_xách_tay', 'Máy tính nhỏ gọn, có pin, mang đi được…', 'laptop'),
      r('Cách bảo quản máy tính xách tay', 'www.tinhoc.edu.vn/bao-quan', 'Không để nước gần máy, không đè vật nặng lên…') ] },
    { q: 'laptop', count: '1.870.000.000', type: 'syn', syn: 'máy tính xách tay', res: [
      ad('Laptop học sinh – Trả góp 0%', 'www.laptopre.vn', 'Giảm thêm 1 triệu cho học sinh.'),
      r('Laptop – định nghĩa và lịch sử', 'www.congnghe.vn/laptop', 'Chiếc laptop đầu tiên xuất hiện vào những năm 1980…', 'laptop'),
      r('10 mẹo dùng laptop không bị nóng máy', 'www.meovat.vn/laptop', 'Kê cao máy, vệ sinh quạt tản nhiệt…'),
      r('Phím tắt hữu ích trên laptop', 'www.tinhoc.edu.vn/phim-tat', 'Ctrl + C, Ctrl + V, Ctrl + Z…') ] },
    { q: 'khủng long', count: '312.000.000', type: 'broad', refine: ['khủng long ăn cỏ lớn nhất'], res: [
      ad('Đồ chơi khủng long – Sale 50%', 'www.dochoi.vn/khung-long', 'Mô hình khủng long cực đẹp.'),
      r('Khủng long – Bách khoa toàn thư', 'vi.wikipedia.org/wiki/Khủng_long', 'Khủng long sống cách đây hàng trăm triệu năm…', 'dino'),
      r('Phim hoạt hình khủng long', 'www.phimhoathinh.vn/khung-long', 'Những tập phim về các bạn khủng long đáng yêu.'),
      r('Tô màu khủng long', 'www.tomau.vn/khung-long', 'Tải tranh tô màu khủng long miễn phí.') ] },
    { q: 'khủng long ăn cỏ lớn nhất', count: '2.460.000', type: 'refined', res: [
      r('Argentinosaurus – khủng long lớn nhất từng được tìm thấy', 'www.khoahoc.vn/argentinosaurus', 'Dài khoảng 35 mét, nặng bằng 10 con voi…', 'dino'),
      r('Top 5 loài khủng long ăn cỏ khổng lồ', 'www.baotang.org/khung-long-an-co', 'Argentinosaurus, Brachiosaurus, Diplodocus…') ] },
  ];
  const find = q => DATA.find(d => BG.norm(d.q) === BG.norm(q));
  const TIP = {
    broad: d => `<span class="big">😵 ${d.count} kết quả — quá nhiều!</span>Từ khóa <b>quá ngắn, quá chung</b> nên ra đủ thứ không liên quan. Hãy <b>thêm từ</b> cho rõ em muốn tìm gì (<b>tinh chỉnh tìm kiếm</b>).`,
    refined: d => `<span class="big">🎯 Chỉ còn ${d.count} kết quả — đúng ý hơn!</span>Thêm từ vào từ khóa thì kết quả <b>ít hơn nhưng đúng hơn</b>. Đó là <b>tinh chỉnh tìm kiếm</b>.`,
    syn: d => `<span class="big">🔁 Thử từ đồng nghĩa: “${e(d.syn)}”</span>“${e(d.q)}” và “${e(d.syn)}” <b>cùng nghĩa</b> nhưng khác chữ, nên ra <b>những trang khác nhau</b>. Không tìm thấy thứ cần thì thử từ đồng nghĩa.`,
    ads: '<span class="big">📢 Đây là QUẢNG CÁO</span>Kết quả có chữ <b>“Được tài trợ”</b> là người ta <b>trả tiền</b> để đứng đầu. Chưa chắc là trang tốt nhất hay đúng nhất — đọc kỹ trước khi bấm!',
  };
  const COLORS = ['#1a73e8', '#e8710a', '#188038', '#d93025', '#9334e6', '#129eaf', '#c5221f', '#f9ab00'];
  const host = u => u.split('/')[0].replace(/^www\./, '');
  const favOf = u => { const h = host(u); let n = 0; for (const c of h) n += c.charCodeAt(0); return `<span class="tk-fav" style="background:${COLORS[n % COLORS.length]}">${e(h[0].toUpperCase())}</span>`; };
  const crumbs = u => { const [h, ...rest] = u.split('/'); return `https://${e(h)}${rest.length ? ' › ' + rest.map(e).join(' › ') : ''}`; };
  const LOGO = '<span class="tk-logo"><i style="color:#4285f4">T</i><i style="color:#ea4335">ì</i><i style="color:#fbbc05">m</i><i style="color:#4285f4">N</i><i style="color:#34a853">h</i><i style="color:#ea4335">a</i><i style="color:#4285f4">n</i><i style="color:#fbbc05">h</i></span>';
  const box = (q, big) => `<form class="tk-box ${big ? 'big' : ''}" id="tkForm"><span class="tk-mg">${BG.svg('search', 22)}</span>
    <input id="tkQ" value="${e(q || '')}" autocomplete="off" spellcheck="false" aria-label="Tìm kiếm">
    ${q ? `<span class="tk-clr">${BG.svg('close', 22)}</span><span class="tk-sep"></span>` : ''}<span class="tk-mic">${BG.svg('mic', 22)}</span><span class="tk-cam">${BG.svg('camera', 22)}</span></form>`;

  BG.add({
    id: 'tim-kiem', icon: '🔎', khoi: [4], title: 'Tìm kiếm trên mạng', desc: 'Quảng cáo trong kết quả, tinh chỉnh từ khóa, từ đồng nghĩa.',
    topics: ['LV2 GM1 · CĐ 12: Tinh chỉnh tìm kiếm', 'LV2 GM1 · CĐ 13: Quảng cáo khi tìm kiếm', 'LV2 GM1 · CĐ 14: Từ đồng nghĩa', 'LV2 GM2 · CĐ 6: Quảng cáo khi tìm kiếm', 'LV2 GM2 · CĐ 7–8: Từ đồng nghĩa'],
    tip: 'Thứ tự gợi ý: (1) tìm <b>mèo</b> → chỉ con số kết quả khổng lồ, hỏi “có đọc hết được không?”. (2) bấm gợi ý <b>cách chăm sóc mèo con</b> → số kết quả giảm, kết quả đúng ý hơn = tinh chỉnh. (3) bấm <b>📢 Soi quảng cáo</b> để chỉ ra kết quả “Được tài trợ”. (4) tìm <b>ô tô</b> rồi bấm <b>xe hơi</b> → hai từ cùng nghĩa ra trang khác nhau = từ đồng nghĩa. Có thể cho HS tự gõ: mèo, khủng long, laptop, máy tính xách tay…',
    render(root) {
      let showAds = false, cur = null;
      root.innerHTML = `<div class="bg-explain" id="tkEx">Gõ từ khóa rồi bấm <b>Enter</b>, hoặc bấm một từ gợi ý bên dưới.</div>
        <div class="bg-row tk-sugg">Thử: ${['mèo', 'khủng long', 'ô tô', 'laptop'].map(q => `<button class="bgchip" data-q="${q}">${q}</button>`).join('')}
          <span style="flex:1"></span><button class="bgbtn soft" id="tkAds">📢 Soi quảng cáo</button></div>
        ${BG.browser({ url: 'timnhanh.vn', title: 'TìmNhanh', fav: '<span class="tk-tabfav">T</span>', pageId: 'tkPage', cls: 'tk-cw' })}`;
      const $ = id => root.querySelector('#' + id);
      const win = root.querySelector('.cw'); BG.statusHover(win);
      const setUrl = (u, t) => { win.querySelector('.cw-u').innerHTML = u; win.querySelector('.cw-tt').textContent = t; };
      function home() {
        setUrl('timnhanh.vn', 'TìmNhanh');
        $('tkPage').innerHTML = `<div class="tk-home"><div class="tk-hnav"><a>Thư</a><a>Hình ảnh</a><span class="tk-apps">⋮⋮⋮</span><span class="cw-av">A</span></div>
          <div class="tk-hmain">${LOGO}${box('', true)}<div class="tk-hbtn"><button type="button" class="tk-gbtn" id="tkHGo">Tìm với TìmNhanh</button><button type="button" class="tk-gbtn">Xem trang đầu tiên</button></div>
          <div class="tk-lang">TìmNhanh có các thứ tiếng: <a>English</a> <a>Français</a> <a>中文</a></div></div>
          <div class="tk-foot"><span>Việt Nam</span><div><a>Giới thiệu</a><a>Quảng cáo</a><a>Quyền riêng tư</a><a>Điều khoản</a><a>Cài đặt</a></div></div></div>`;
      }
      function search(q, adsTip) {
        cur = find(q);
        setUrl(`timnhanh.vn<span class="dim">/search?q=${e(q.trim().replace(/\s+/g, '+'))}</span>`, `${q} – Tìm với TìmNhanh`);
        const secs = (0.31 + Math.random() * 0.3).toFixed(2).replace('.', ',');
        let main;
        if (!cur) {
          main = `<div class="tk-none"><p>Không tìm thấy kết quả nào khớp với <b>${e(q)}</b> trong bài mẫu.</p><p>Gợi ý — thử một trong các từ khóa:</p><div class="tk-rel">${DATA.map(d => `<button data-q="${d.q}">${BG.svg('search', 18)}<span>${d.q}</span></button>`).join('')}</div></div>`;
          $('tkEx').innerHTML = 'Chọn một từ khóa có sẵn để xem ví dụ nhé.';
        } else {
          const item = x => `<div class="tk-item ${x.ad ? 'ad' : ''} ${x.ad && showAds ? 'mark' : ''}" data-href="https://${e(x.u)}">
            <div class="tk-txt">${x.ad ? '<div class="tk-adtag">Được tài trợ</div>' : ''}
              <div class="tk-src">${favOf(x.u)}<div><div class="tk-site">${e(host(x.u))}</div><div class="tk-url">${crumbs(x.u)} <span class="tk-dots">⋮</span></div></div></div>
              <a class="tk-t">${e(x.t)}</a><div class="tk-d">${e(x.d)}</div></div>
            ${x.img ? `<img class="tk-thumb" src="img/web/${x.img}.jpg" alt="">` : ''}</div>`;
          const ads = cur.res.filter(x => x.ad), org = cur.res.filter(x => !x.ad);
          main = `<div class="tk-count">Khoảng ${cur.count} kết quả (${secs} giây)</div>
            ${ads.map(item).join('')}
            ${org.slice(0, 2).map(item).join('')}
            ${cur.refine ? `<div class="tk-paa"><h3>Mọi người cũng tìm kiếm</h3>${cur.refine.map(q2 => `<button data-q="${q2}"><span>${q2}</span>${BG.svg('search', 18)}</button>`).join('')}</div>` : ''}
            ${org.slice(2).map(item).join('')}
            ${cur.syn ? `<div class="tk-relbox"><h3>Tìm kiếm liên quan</h3><div class="tk-rel"><button data-q="${cur.syn}">${BG.svg('search', 18)}<span><b>${cur.syn}</b></span></button></div></div>` : ''}
            <div class="tk-pages">${LOGO.replace('tk-logo', 'tk-logo sm')}<div><b>1</b><a>2</a><a>3</a><a>4</a><a>5</a><a>Tiếp</a></div></div>`;
          $('tkEx').innerHTML = adsTip && showAds ? TIP.ads : TIP[cur.type](cur);
        }
        $('tkPage').innerHTML = `<div class="tk-rp"><div class="tk-head">${LOGO.replace('tk-logo', 'tk-logo sm')}${box(q)}<span class="tk-apps">⋮⋮⋮</span><span class="cw-av">A</span></div>
          <div class="tk-tabs"><a class="on">${BG.svg('search', 16)} Tất cả</a><a>${BG.svg('image', 16)} Hình ảnh</a><a>${BG.svg('video', 16)} Video</a><a>Tin tức</a><a>Mua sắm</a><a>⋮ Thêm</a><span></span><a>Công cụ</a></div>
          <div class="tk-main">${main}</div></div>`;
      }
      root.addEventListener('submit', ev => { if (ev.target.id !== 'tkForm') return; ev.preventDefault(); const q = $('tkQ').value.trim(); if (q) search(q); });
      root.addEventListener('click', ev => {
        const c = ev.target.closest('[data-q]'); if (c) return search(c.dataset.q);
        if (ev.target.closest('#tkHGo')) { const q = $('tkQ').value.trim(); if (q) search(q); return; }
        if (ev.target.closest('.tk-clr')) { $('tkQ').value = ''; $('tkQ').focus(); return; }
        if (ev.target.closest('.tk-logo') && ev.target.closest('#tkPage')) { cur = null; return home(); }
        if (ev.target.closest('#tkAds')) {
          showAds = !showAds; $('tkAds').classList.toggle('on', showAds); $('tkAds').textContent = showAds ? '📢 Tắt soi quảng cáo' : '📢 Soi quảng cáo';
          if (cur) search(cur.q, true); else if (showAds) $('tkEx').innerHTML = TIP.ads;
        }
      });
      home();
    },
  });
})();

