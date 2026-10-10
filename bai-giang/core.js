/* Khung chung cho các bài giảng tương tác. Mỗi bài là 1 file, tự đăng ký bằng BG.add({...}).
   Thuộc tính một bài: id, icon, title, desc, khoi: [4,5], topics: ['LV2 GM1 · CĐ 8: ...'], tip (HTML, gợi ý cho GV), keys (từ khóa tìm kiếm thêm), render(root) */
(() => {
  /* biểu tượng kiểu Material (24x24), tô bằng currentColor */
  const P = {
    back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
    fwd: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
    reload: 'M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
    home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    starO: 'M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z',
    lock: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
    info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    more: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
    search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
    close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    mic: 'M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z',
    camera: 'M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z',
    menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
    attach: 'M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 015 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 005 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z',
    send: 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z',
    reply: 'M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z',
    inbox: 'M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z',
    edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    trash: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
    phone: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
    video: 'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z',
    image: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
    pin: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z',
    globe: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    people: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    lockS: 'M12 17a2 2 0 100-4 2 2 0 000 4zm6-9h-1V6A5 5 0 007 6v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2zM9 6a3 3 0 016 0v2H9V6z',
    like: 'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z',
    comment: 'M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z',
    share: 'M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z',
    smile: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
    gear: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
    check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  window.BG = {
    list: [],
    add(lesson) { this.list.push(lesson); },
    esc,
    shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    norm: s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim(),
    /* thanh chuyển chế độ trong 1 bài: modes = [{id,label}] */
    modeBar(modes, cur) { return `<div class="bg-modes">${modes.map(m => `<button data-mode="${m.id}" class="${m.id === cur ? 'on' : ''}">${m.label}</button>`).join('')}</div>`; },
    /* biểu tượng SVG: BG.svg('back', 20) */
    svg: (name, size = 20) => `<svg class="ico" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="${P[name] || ''}"/></svg>`,
    /* biểu tượng trang web (favicon) dạng ô vuông bo tròn có chữ */
    fav: (txt, bg = '#1a73e8', fg = '#fff') => `<span class="cw-favi" style="background:${bg};color:${fg}">${esc(txt)}</span>`,
    /* Khung cửa sổ trình duyệt (tĩnh) bao quanh một trang web mẫu.
       o = {url, title, fav (HTML), body (HTML), cls, pageId} — trang nằm trong .cw-page, có .cw-status để hiện địa chỉ link khi rê chuột */
    browser(o) {
      const s = BG.svg;
      return `<div class="cw ${o.cls || ''}">
        <div class="cw-tabs"><div class="cw-tab"><span class="cw-tfav">${o.fav || ''}</span><span class="cw-tt">${esc(o.title || '')}</span>${s('close', 14)}</div>
          <span class="cw-new">${s('add', 18)}</span><span class="cw-win"><i class="mn"></i><i class="mx"></i>${s('close', 16)}</span></div>
        <div class="cw-bar"><span class="cw-b">${s('back')}</span><span class="cw-b dis">${s('fwd')}</span><span class="cw-b">${s('reload')}</span>
          <div class="cw-omni"><span class="cw-lk">${s('lock', 15)}</span><span class="cw-u">${o.urlHtml || esc(o.url || '')}</span><span class="cw-st">${s('starO', 18)}</span></div>
          <span class="cw-av">A</span><span class="cw-b">${s('more')}</span></div>
        <div class="cw-page" ${o.pageId ? `id="${o.pageId}"` : ''}>${o.body || ''}</div>
        <div class="cw-status"></div>
      </div>`;
    },
    /* Bài có nhiều chế độ: modes = [{id, label, run(el)}] — vẽ thanh chế độ + thân, bấm để đổi */
    modes(root, modes) {
      let cur = modes[0].id;
      const draw = () => {
        root.innerHTML = (modes.length > 1 ? BG.modeBar(modes, cur) : '') + '<div class="bg-body bg-mbody"></div>';
        modes.find(m => m.id === cur).run(root.querySelector('.bg-mbody'));
      };
      root.addEventListener('click', ev => { const m = ev.target.closest('.bg-modes [data-mode]'); if (m && m.parentNode.parentNode === root) { cur = m.dataset.mode; draw(); } });
      draw();
    },
    /* Trò xếp nhóm: o = {intro (HTML), bins: [{id, label}], items: [{ic, name, bin, why}]} — bấm thẻ rồi bấm ô, hoặc kéo thả */
    sortGame(el, o) {
      const N = o.items.length; let pool, placed, sel, wrong;
      const start = () => { pool = BG.shuffle(o.items.map((_, i) => i)); placed = {}; sel = null; wrong = 0; };
      start();
      el.innerHTML = `<div class="bg-explain sg-ex">${o.intro}</div><div class="sg-pool"></div>
        <div class="sg-bins" style="grid-template-columns:repeat(${o.bins.length},1fr)">${o.bins.map(b => `<div class="sg-bin" data-bin="${b.id}"><h3>${b.label}</h3><div class="sg-in"></div></div>`).join('')}</div>
        <div class="bg-row"><span class="sg-score"></span><span style="flex:1"></span><button class="bgbtn soft sg-reset">↺ Chơi lại</button></div>`;
      const $ = q => el.querySelector(q), lab = id => o.bins.find(b => b.id === id).label;
      const card = (i, cls = '') => { const it = o.items[i]; return `<div class="sg-card ${cls}" draggable="true" data-i="${i}">${it.ic ? `<span>${it.ic}</span>` : ''}${esc(it.name)}</div>`; };
      const paint = () => {
        $('.sg-pool').innerHTML = pool.length ? pool.map(i => card(i, sel === i ? 'sel' : '')).join('') : '<div class="sg-done">🎉 Xếp xong hết rồi!</div>';
        el.querySelectorAll('.sg-bin').forEach(b => { b.querySelector('.sg-in').innerHTML = Object.keys(placed).filter(i => placed[i] === b.dataset.bin).map(i => card(+i, 'ok')).join(''); b.classList.toggle('ready', sel !== null); });
        $('.sg-score').innerHTML = `Đúng <b>${Object.keys(placed).length}/${N}</b> · Sai <b>${wrong}</b> lần`;
      };
      const drop = (i, bin) => {
        const it = o.items[i], b = el.querySelector(`.sg-bin[data-bin="${bin}"]`);
        if (it.bin === bin) { placed[i] = bin; pool = pool.filter(x => x !== i); sel = null; $('.sg-ex').innerHTML = `<span class="big bg-ok">✔ Đúng! ${it.ic || ''} ${esc(it.name)} → ${lab(bin)}</span>${it.why || ''}`; }
        else { wrong++; b.classList.remove('bg-shake'); void b.offsetWidth; b.classList.add('bg-shake'); $('.sg-ex').innerHTML = `<span class="big bg-bad">✘ Chưa đúng, thử ô khác nhé!</span>${esc(it.name)} không thuộc “${lab(bin)}”.`; }
        paint();
      };
      el.addEventListener('click', ev => {
        const c = ev.target.closest('.sg-pool .sg-card'), b = ev.target.closest('.sg-bin');
        if (c) { sel = sel === +c.dataset.i ? null : +c.dataset.i; return paint(); }
        if (b && sel !== null) return drop(sel, b.dataset.bin);
        if (ev.target.closest('.sg-reset')) { start(); $('.sg-ex').innerHTML = o.intro; paint(); }
      });
      el.addEventListener('dragstart', ev => { const c = ev.target.closest('.sg-pool .sg-card'); if (c) ev.dataTransfer.setData('text', c.dataset.i); });
      el.addEventListener('dragover', ev => { if (ev.target.closest('.sg-bin')) ev.preventDefault(); });
      el.addEventListener('drop', ev => { const b = ev.target.closest('.sg-bin'), i = ev.dataTransfer.getData('text'); if (b && i !== '') { ev.preventDefault(); drop(+i, b.dataset.bin); } });
      paint();
    },
    /* rê chuột lên phần tử có data-href → hiện địa chỉ ở góc dưới trái, như trình duyệt thật */
    statusHover(win) {
      win.addEventListener('mouseover', ev => {
        const st = win.querySelector('.cw-status'); if (!st) return;
        const a = ev.target.closest('[data-href]');
        st.textContent = a ? a.dataset.href : ''; st.classList.toggle('on', !!a);
      });
    },
  };
})();
