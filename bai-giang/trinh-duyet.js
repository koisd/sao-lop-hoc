/* Bài: Trình duyệt web giả lập — URL, tải lại, trang tải một nửa, dấu trang, lùi/tiến */
(() => {
  const e = BG.esc;
  const link = (url, label) => `<a class="tdv-link" data-go="${url}">${label}</a>`;
  const tiles = arr => `<div class="tdv-tiles">${arr.map(([ic, t]) => `<div class="tdv-tile"><span>${ic}</span>${t}</div>`).join('')}</div>`;
  const SITES = {
    'www.hocvui.vn': { title: 'Học Vui', ic: '🎒', body: `<h1>🎒 Chào mừng đến Học Vui!</h1><p>Chọn một trang để xem nhé:</p>
      <div class="tdv-tiles">${[['www.vuonthu.vn', '🦁', 'Vườn thú'], ['www.thoitiet.vn', '⛅', 'Thời tiết'], ['www.truyencotich.vn', '📖', 'Truyện cổ tích']].map(([u, ic, t]) => `<a class="tdv-tile tdv-link" data-go="${u}"><span>${ic}</span>${t}</a>`).join('')}</div>` },
    'www.vuonthu.vn': { title: 'Vườn thú', ic: '🦁', body: `<h1>🦁 Vườn thú vui nhộn</h1>${tiles([['🦁', 'Sư tử'], ['🐘', 'Voi'], ['🦒', 'Hươu cao cổ'], ['🐼', 'Gấu trúc'], ['🦓', 'Ngựa vằn'], ['🐒', 'Khỉ'], ['🦜', 'Vẹt'], ['🐊', 'Cá sấu']])}<p>${link('www.hocvui.vn', '← Về trang Học Vui')}</p>` },
    'www.thoitiet.vn': { title: 'Thời tiết', ic: '⛅', body: `<h1>⛅ Thời tiết TP. Hồ Chí Minh</h1>${tiles([['☀️', 'Thứ Hai<br>34°C'], ['⛅', 'Thứ Ba<br>32°C'], ['🌧️', 'Thứ Tư<br>29°C'], ['⛈️', 'Thứ Năm<br>28°C'], ['🌦️', 'Thứ Sáu<br>30°C'], ['☀️', 'Thứ Bảy<br>33°C']])}<p>${link('www.hocvui.vn', '← Về trang Học Vui')}</p>` },
    'www.truyencotich.vn': { title: 'Truyện cổ tích', ic: '📖', body: `<h1>📖 Truyện cổ tích Việt Nam</h1>
      <div class="tdv-tiles">${[['cay-tre-tram-dot', '🎋', 'Cây tre trăm đốt'], ['so-dua', '🥥', 'Sọ Dừa'], ['tam-cam', '🐟', 'Tấm Cám']].map(([p, ic, t]) => `<a class="tdv-tile tdv-link" data-go="www.truyencotich.vn/${p}"><span>${ic}</span>${t}</a>`).join('')}</div><p>${link('www.hocvui.vn', '← Về trang Học Vui')}</p>` },
    'www.truyencotich.vn/cay-tre-tram-dot': { title: 'Cây tre trăm đốt', ic: '🎋', body: `<h1>🎋 Cây tre trăm đốt</h1>${tiles([['👨‍🌾', 'Anh Khoai'], ['🎋', 'Cây tre'], ['🧙', 'Ông Bụt'], ['✨', 'Khắc nhập!']])}<p>Anh Khoai chăm chỉ làm thuê. Nhờ ông Bụt dạy câu thần chú “khắc nhập, khắc xuất”, anh ghép đủ cây tre trăm đốt và cưới được vợ.</p><p>${link('www.truyencotich.vn', '← Danh sách truyện')}</p>` },
    'www.truyencotich.vn/so-dua': { title: 'Sọ Dừa', ic: '🥥', body: `<h1>🥥 Sọ Dừa</h1>${tiles([['🥥', 'Sọ Dừa'], ['🐐', 'Chăn dê'], ['👧', 'Cô út'], ['🎓', 'Đỗ trạng']])}<p>Sọ Dừa trông lạ nhưng rất tài giỏi và tốt bụng. Câu chuyện dạy em: đừng đánh giá người khác qua vẻ bề ngoài.</p><p>${link('www.truyencotich.vn', '← Danh sách truyện')}</p>` },
    'www.truyencotich.vn/tam-cam': { title: 'Tấm Cám', ic: '🐟', body: `<h1>🐟 Tấm Cám</h1>${tiles([['👧', 'Cô Tấm'], ['🐟', 'Cá bống'], ['🐦', 'Chim vàng anh'], ['🍑', 'Quả thị']])}<p>Cô Tấm hiền lành, chăm chỉ, dù gặp nhiều khó khăn nhưng cuối cùng được hạnh phúc. Ở hiền thì gặp lành.</p><p>${link('www.truyencotich.vn', '← Danh sách truyện')}</p>` },
  };
  const HOME = 'www.hocvui.vn';
  const EXPLAIN = {
    back: '<span class="big">◀ Quay lại (Back)</span>Về <b>trang vừa xem trước đó</b>.',
    fwd: '<span class="big">▶ Tiến tới (Forward)</span>Đi tới trang em đã xem rồi bấm Quay lại. Chưa bấm Quay lại thì nút này mờ.',
    reload: '<span class="big">⟳ Tải lại (Reload / Refresh)</span>Tải lại trang <b>từ đầu</b>. Dùng khi trang <b>tải một nửa</b>, bị đứng hoặc hiện thiếu hình. Phím tắt: <b>F5</b>.',
    star: '<span class="big">☆ Dấu trang (Bookmark)</span>Lưu trang lại trên <b>thanh dấu trang</b>, lần sau chỉ cần bấm 1 cái là mở, khỏi gõ địa chỉ. Phím tắt: <b>Ctrl + D</b>.',
    unstar: '<span class="big">★ Bỏ dấu trang</span>Ngôi sao đang vàng = trang đã được lưu. Bấm lại để bỏ lưu.',
    home: '<span class="big">🏠 Trang chủ</span>Về trang mở đầu của trình duyệt.',
    url: '<span class="big">Thanh địa chỉ (URL)</span>Gõ <b>địa chỉ trang web</b> rồi bấm <b>Enter</b>. Phải gõ <b>đúng từng chữ</b>, sai 1 chữ là không vào được.',
    bad: u => `<span class="big">❌ Không tìm thấy trang</span>Địa chỉ “<b>${e(u)}</b>” không có. Kiểm tra xem em có <b>gõ sai chữ nào</b> không.`,
    half: '<span class="big">🐌 Trang mới tải một nửa!</span>Mạng chậm nên trang bị thiếu. Hãy bấm nút <b>⟳ Tải lại</b>.',
    link: '<span class="big">🔗 Liên kết (Link)</span>Bấm vào chữ / hình có liên kết là chuyển sang trang khác. Địa chỉ trên thanh URL cũng đổi theo.',
    bm: '<span class="big">🔖 Mở từ dấu trang</span>Bấm vào dấu trang là vào thẳng trang đã lưu, không cần gõ địa chỉ.',
  };

  BG.add({
    id: 'trinh-duyet', icon: '🌐', khoi: [4], title: 'Trình duyệt web', desc: 'Thanh địa chỉ, quay lại / tiến tới, tải lại trang, dấu trang.',
    topics: ['LV2 GM1 · CĐ 8: Tải lại trang web', 'LV2 GM1 · CĐ 9: Dấu trang', 'LV2 GM1 · CĐ 11: URL', 'LV2 GM2 · CĐ 4: Trang web tải một nửa', 'LV2 GM2 · CĐ 5: URL', 'LV2 GM2 · CĐ 30: Dấu trang, tải lại, điều hướng'],
    tip: 'Cho HS lên bấm thử: (1) gõ <b>www.vuonthu.vn</b> vào thanh địa chỉ rồi Enter. (2) Gõ sai 1 chữ (vd <b>www.vuonthu.com</b>) để thấy trang báo lỗi. (3) Bật <b>🐌 Mạng chậm</b> → mở trang khác → trang chỉ hiện một nửa → hỏi “giờ bấm nút nào?” → <b>Tải lại</b>. (4) Bấm ☆ để lưu dấu trang, đi trang khác rồi bấm dấu trang để quay về. (5) Đi qua 3 trang rồi bấm ◀ ▶ để thấy lịch sử.',
    render(root) {
      const st = { hist: [], idx: -1, bm: ['www.hocvui.vn'], slow: false, loading: false, half: false, timer: null };
      root.innerHTML = `
        <div class="bg-explain" id="tdvEx">Bấm thử các nút trên trình duyệt, lời giải thích sẽ hiện ở đây.</div>
        <div class="tdv-win">
          <div class="tdv-tabs"><div class="tdv-tab"><span id="tdvTabIc"></span><span id="tdvTabT"></span></div>
            <label class="tdv-slow"><input type="checkbox" id="tdvSlow"> 🐌 Giả lập mạng chậm</label></div>
          <div class="tdv-bar">
            <button data-b="back" title="Quay lại">◀</button><button data-b="fwd" title="Tiến tới">▶</button><button data-b="reload" title="Tải lại">⟳</button><button data-b="home" title="Trang chủ">🏠</button>
            <form class="tdv-url" id="tdvForm"><span class="lock">🔒</span><input id="tdvUrl" spellcheck="false" autocomplete="off"></form>
            <button data-b="star" id="tdvStar" title="Dấu trang">☆</button>
          </div>
          <div class="tdv-bms" id="tdvBms"></div>
          <div class="tdv-prog"><i id="tdvProg"></i></div>
          <div class="tdv-page" id="tdvPage"></div>
        </div>`;
      const $ = id => root.querySelector('#' + id);
      const ex = html => { $('tdvEx').innerHTML = html; };
      const cur = () => st.hist[st.idx];
      const clean = u => u.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '');
      const resolve = u => { u = clean(u); if (SITES[u]) return u; if (SITES['www.' + u]) return 'www.' + u; return null; };

      function drawChrome() {
        const u = cur(); const s = SITES[u];
        $('tdvUrl').value = u ? 'https://' + u : '';
        $('tdvTabIc').textContent = st.loading ? '⏳' : (s ? s.ic : '⚠️');
        $('tdvTabT').textContent = st.loading ? 'Đang tải…' : (s ? s.title : 'Không tìm thấy trang');
        root.querySelector('[data-b=back]').disabled = st.idx <= 0;
        root.querySelector('[data-b=fwd]').disabled = st.idx >= st.hist.length - 1;
        const on = st.bm.includes(u);
        $('tdvStar').textContent = on ? '★' : '☆'; $('tdvStar').classList.toggle('on', on);
        $('tdvBms').innerHTML = st.bm.length ? st.bm.map(b => `<button data-bm="${b}">${SITES[b] ? SITES[b].ic + ' ' + SITES[b].title : b}</button>`).join('') : '<span>Thanh dấu trang (chưa có trang nào được lưu)</span>';
      }
      function show(u, isReload) {
        clearTimeout(st.timer);
        const page = $('tdvPage'); const prog = $('tdvProg');
        st.loading = true; st.half = false; drawChrome();
        page.classList.add('loading'); prog.style.transition = 'none'; prog.style.width = '0'; void prog.offsetWidth;
        const slowNow = st.slow && !isReload;
        prog.style.transition = `width ${slowNow ? 600 : 700}ms ease-out`; prog.style.width = slowNow ? '48%' : '100%';
        st.timer = setTimeout(() => {
          page.classList.remove('loading');
          const s = SITES[u];
          page.innerHTML = s ? s.body : `<div class="tdv-404"><div>🔍❓</div><h1>Không tìm thấy trang web</h1><p>Không có trang nào tên là <b>${e(u)}</b>.<br>Kiểm tra lại địa chỉ xem có gõ sai chữ nào không.</p></div>`;
          if (slowNow && s) {
            st.half = true; page.classList.add('half');
            ex(EXPLAIN.half);
          } else {
            page.classList.remove('half'); st.loading = false;
            setTimeout(() => { prog.style.transition = 'opacity .3s'; prog.style.width = '0'; }, 250);
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
      $('tdvForm').addEventListener('submit', ev => {
        ev.preventDefault(); const raw = $('tdvUrl').value; if (!raw.trim()) return;
        const u = resolve(raw); $('tdvUrl').blur();
        go(u || clean(raw), u ? '<span class="big">✔ Vào được rồi!</span>Em đã gõ đúng địa chỉ và bấm <b>Enter</b>.' : null);
      });
      $('tdvSlow').addEventListener('change', ev => { st.slow = ev.target.checked; ex(st.slow ? '🐌 Đã bật <b>mạng chậm</b>. Giờ mở một trang bất kỳ, trang sẽ chỉ tải được <b>một nửa</b>.' : 'Đã tắt mạng chậm.'); });
      go(HOME);
    },
  });
})();
