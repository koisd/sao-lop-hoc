/* Bài Khối 3: Máy tính & ứng dụng — loại máy, thiết bị ngoại vi, mở/đóng ứng dụng (màn hình giả), tập tin & thư mục */
(() => {
  const e = BG.esc;
  const APPS = [
    { id: 've', ic: '🎨', name: 'Vẽ tranh', body: '<div class="dk-paint"><span style="background:#ff7675"></span><span style="background:#fdcb6e"></span><span style="background:#55efc4"></span><span style="background:#74b9ff"></span><b>🖌️ 🌈 ☀️ 🏠 🌳</b></div>' },
    { id: 'gc', ic: '📝', name: 'Ghi chú', body: '<textarea class="dk-note" spellcheck="false">Hôm nay em học mở và đóng ứng dụng.</textarea>' },
    { id: 'mt', ic: '🧮', name: 'Máy tính', body: '<div class="dk-calc"><div>12 + 7 = 19</div>' + '789÷456×123−0.=+'.split('').map(c => `<i>${c}</i>`).join('') + '</div>' },
  ];

  BG.add({
    id: 'may-tinh-k3', icon: '🖥️', khoi: [3], title: 'Máy tính & ứng dụng', desc: 'Tập mở – đóng ứng dụng trên màn hình Windows giả, xếp tập tin vào đúng thư mục.',
    topics: ['LV1 GM1 · CĐ 1: Tập tin và thư mục', 'LV1 GM1 · CĐ 27: Cách thoát ứng dụng', 'LV1 GM2 · CĐ 3: Cách mở ứng dụng'],
    tip: '<b>Mở – đóng ứng dụng</b>: cho HS tự tay nhấp ĐÚP để mở, bấm ✕ để đóng, nhấp chuột PHẢI vào biểu tượng dưới thanh tác vụ. Hai nút “bẫy” cho thấy vì sao đáp án sai: <i>chọn hết rồi Enter</i> mở tung mọi thứ, <i>rút phích màn hình</i> chỉ làm tối màn hình chứ ứng dụng vẫn chạy.',
    render(root) {
      BG.modes(root, [
        { id: 'dk', label: '🪟 Mở – đóng ứng dụng', run: desktop },
        { id: 'tm', label: '📁 Tập tin & thư mục', run: el => BG.sortGame(el, {
          intro: '<span class="big">📄 Tập tin = một tờ giấy · 📁 Thư mục = cái cặp đựng giấy</span>Kéo (hoặc bấm) từng tập tin bỏ vào đúng thư mục cho gọn gàng.',
          bins: [{ id: 'anh', label: '📁 Hình ảnh' }, { id: 'nhac', label: '📁 Âm nhạc' }, { id: 'bt', label: '📁 Bài tập' }],
          items: [
            { ic: '🖼️', name: 'con-meo.jpg', bin: 'anh', why: 'Đuôi .jpg là tập tin ảnh.' },
            { ic: '🖼️', name: 'sinh-nhat.png', bin: 'anh', why: 'Đuôi .png cũng là ảnh.' },
            { ic: '🖼️', name: 'tranh-em-ve.jpg', bin: 'anh', why: 'Bức tranh lưu thành tập tin ảnh.' },
            { ic: '🎵', name: 'bai-hat-thieu-nhi.mp3', bin: 'nhac', why: 'Đuôi .mp3 là tập tin âm thanh.' },
            { ic: '🎵', name: 'tieng-chim-hot.mp3', bin: 'nhac', why: 'Âm thanh → thư mục Âm nhạc.' },
            { ic: '📄', name: 'bai-van-ta-me.docx', bin: 'bt', why: 'Bài văn soạn bằng phần mềm văn bản.' },
            { ic: '📊', name: 'trinh-chieu-nhom.pptx', bin: 'bt', why: 'Bài trình chiếu của nhóm.' },
            { ic: '📄', name: 'toan-tuan-5.docx', bin: 'bt', why: 'Bài tập toán.' },
          ] }) },
      ]);
    },
  });

  /* Màn hình Windows giả: nhấp đúp biểu tượng để mở, ✕ để đóng, chuột phải trên thanh tác vụ */
  function desktop(el) {
    const open = new Set(); let sel = null, dark = false;
    el.innerHTML = `<div class="bg-explain dk-ex"><span class="big">Thử mở một ứng dụng nào!</span>Nhấp <b>ĐÚP</b> (2 lần thật nhanh) vào biểu tượng trên màn hình nền.</div>
      <div class="dk"><div class="dk-desk">${APPS.map(a => `<div class="dk-icon" data-app="${a.id}"><span>${a.ic}</span>${a.name}</div>`).join('')}<div class="dk-wins"></div><div class="dk-off">🔌 Màn hình bị rút phích — tối thui!<br><small>Nhưng ứng dụng bên trong VẪN ĐANG CHẠY. Bấm để cắm lại.</small></div></div>
        <div class="dk-bar"><span class="dk-start">⊞</span>${APPS.map(a => `<span class="dk-tb" data-app="${a.id}">${a.ic}</span>`).join('')}<span style="flex:1"></span><span class="dk-clock">08:30</span></div><div class="dk-menu"></div></div>
      <div class="bg-row"><b>Thử cách “bẫy”:</b><button class="bgbtn soft" data-trap="all">Chọn hết biểu tượng + Enter</button><button class="bgbtn soft" data-trap="plug">🔌 Rút phích cắm màn hình</button><button class="bgbtn soft" data-trap="reset">↺ Đóng hết</button></div>`;
    const $ = q => el.querySelector(q), say = (h, cls = '') => { $('.dk-ex').innerHTML = `<span class="big ${cls}">${h[0]}</span>${h[1] || ''}`; };
    const app = id => APPS.find(a => a.id === id);
    const paint = () => {
      $('.dk-wins').innerHTML = [...open].map((id, i) => { const a = app(id); return `<div class="dk-win" data-app="${id}" style="left:${20 + i * 8}%;top:${6 + i * 9}%"><div class="dk-tt"><span>${a.ic} ${a.name}</span><i>—</i><i>☐</i><i class="x" title="Đóng">✕</i></div><div class="dk-wb">${a.body}</div></div>`; }).join('');
      el.querySelectorAll('.dk-icon').forEach(i => i.classList.toggle('sel', i.dataset.app === sel || sel === '*'));
      el.querySelectorAll('.dk-tb').forEach(t => t.classList.toggle('on', open.has(t.dataset.app)));
      $('.dk').classList.toggle('dark', dark);
    };
    const menu = (x, y, id) => {
      const m = $('.dk-menu'), a = app(id);
      m.innerHTML = `<b>${a.ic} ${a.name}</b>` + (open.has(id) ? '<button data-m="close">✕ Đóng cửa sổ (Close)</button>' : '<button data-m="open">▶ Mở (Open)</button>');
      m.dataset.app = id; m.style.left = x + 'px'; m.style.top = y + 'px'; m.classList.add('on');
    };
    el.addEventListener('click', ev => {
      $('.dk-menu').classList.remove('on');
      const t = ev.target;
      if (t.closest('.dk-off')) { dark = false; paint(); return say(['💡 Đã cắm lại màn hình', 'Thấy chưa: ứng dụng vẫn mở y nguyên. Rút phích màn hình <b>KHÔNG</b> phải cách thoát ứng dụng.']); }
      const mb = t.closest('.dk-menu button');
      if (mb) { const id = $('.dk-menu').dataset.app; if (mb.dataset.m === 'open') { open.add(id); say(['✔ Đã mở bằng chuột phải → Mở (Open)', 'Nhấp chuột phải vào biểu tượng trên thanh tác vụ rồi chọn Mở cũng là một cách mở ứng dụng.'], 'bg-ok'); } else { open.delete(id); say(['✔ Đã đóng bằng chuột phải → Đóng', 'Nhấp chuột phải vào biểu tượng trên thanh tác vụ rồi chọn Close cũng thoát được ứng dụng.'], 'bg-ok'); } return paint(); }
      if (t.closest('.dk-tt .x')) { open.delete(t.closest('.dk-win').dataset.app); paint(); return say(['✔ Đã đóng bằng nút ✕', 'Nút <b>✕</b> ở góc phải trên cùng cửa sổ dùng để <b>thoát</b> ứng dụng.'], 'bg-ok'); }
      const ic = t.closest('.dk-icon');
      if (ic) { sel = ic.dataset.app; paint(); return say(['Mới CHỌN thôi, chưa mở đâu!', 'Nhấp 1 lần chỉ để chọn (biểu tượng sáng xanh). Muốn mở thì nhấp <b>ĐÚP</b>.']); }
      const tb = t.closest('.dk-tb');
      if (tb) { const r = tb.getBoundingClientRect(), d = $('.dk').getBoundingClientRect(); menu(r.left - d.left, r.top - d.top - 96, tb.dataset.app); return say(['Mẹo: nhấp chuột PHẢI vào biểu tượng ở thanh tác vụ', 'sẽ hiện bảng chọn Mở / Đóng.']); }
      const tr = t.closest('[data-trap]'); if (!tr) return;
      if (tr.dataset.trap === 'all') { sel = '*'; APPS.forEach(a => open.add(a.id)); paint(); say(['😵 Ối! Mở tung TẤT CẢ cùng lúc', 'Chọn hết biểu tượng rồi bấm Enter <b>không phải</b> cách mở một ứng dụng — đáp án <b>Không</b>.'], 'bg-bad'); }
      if (tr.dataset.trap === 'plug') { dark = true; paint(); say(['🔌 Rút phích cắm màn hình…', 'Màn hình tối nhưng ứng dụng vẫn chạy bên trong. Bấm vào màn hình để cắm lại.'], 'bg-bad'); }
      if (tr.dataset.trap === 'reset') { open.clear(); sel = null; dark = false; paint(); say(['Màn hình nền trống', 'Nhấp ĐÚP vào biểu tượng để mở lại.']); }
    });
    el.addEventListener('dblclick', ev => {
      const ic = ev.target.closest('.dk-icon'); if (!ic) return;
      open.add(ic.dataset.app); sel = ic.dataset.app; paint();
      say([`✔ Đã mở ${app(ic.dataset.app).name}!`, 'Nhấp đúp vào biểu tượng lối tắt trên màn hình nền là cách mở ứng dụng.'], 'bg-ok');
    });
    el.addEventListener('contextmenu', ev => {
      const tb = ev.target.closest('.dk-tb'); if (!tb) return;
      ev.preventDefault(); const r = tb.getBoundingClientRect(), d = $('.dk').getBoundingClientRect(); menu(r.left - d.left, r.top - d.top - 96, tb.dataset.app);
    });
    paint();
  }
})();
