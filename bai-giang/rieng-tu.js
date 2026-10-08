/* Bài: Quyền riêng tư — ai được xem bài đăng, gắn vị trí, dấu chân kỹ thuật số, bảng cài đặt quyền riêng tư */
(() => {
  const e = BG.esc;
  const AUD = {
    me: ['🔒 Chỉ mình tôi', 'Chỉ <b>mình em</b> xem được.'],
    friends: ['👥 Bạn bè', '<b>Bạn bè</b> em đã kết bạn mới xem được.'],
    public: ['🌍 Công khai', '<b>BẤT KỲ AI</b> trên Internet cũng xem được — kể cả <b>người lạ</b>!'],
  };
  const RINGS = [
    ['me', '🙂', 'Em'],
    ['friends', '👧👦', 'Bạn thân'], ['friends', '👨‍👩‍👧', 'Gia đình'], ['friends', '🧑‍🤝‍🧑', 'Bạn cùng lớp'],
    ['public', '🕵️', 'Người lạ'], ['public', '🧔', 'Người lạ'], ['public', '👤', 'Người lạ'], ['public', '🌏', 'Khắp thế giới'],
  ];
  const SET = [
    ['post', 'Ai xem được bài đăng của em?', ['Công khai', 'Bạn bè', 'Chỉ mình tôi'], 1],
    ['msg', 'Ai được nhắn tin cho em?', ['Mọi người', 'Bạn bè'], 1],
    ['loc', 'Chia sẻ vị trí của em', ['Bật', 'Tắt'], 1],
    ['find', 'Cho người lạ tìm em bằng số điện thoại', ['Bật', 'Tắt'], 1],
    ['tag', 'Người khác gắn tên em vào ảnh', ['Tự động', 'Hỏi em trước'], 1],
  ];

  BG.add({
    id: 'rieng-tu', icon: '🔐', khoi: [5], title: 'Quyền riêng tư khi đăng bài', desc: 'Giả lập đăng bài: chọn ai được xem, có gắn vị trí không. Bài đã đăng thì khó xóa sạch.',
    topics: ['LV3 GM1 · CĐ 8: Cài đặt quyền riêng tư', 'LV3 GM1 · CĐ 9: Ai được xem bài đăng?', 'LV3 GM2 · CĐ 13: Cài đặt vị trí', 'LV3 GM2 · CĐ 14: Cài đặt quyền riêng tư', 'LV3 GM2 · CĐ 26: Quản lý dấu chân số', 'LV2 GM1 · CĐ 6: Dấu chân kỹ thuật số', 'LV2 GM2 · CĐ 2: Dấu chân kỹ thuật số'],
    tip: 'Phần <b>Đăng bài</b>: đăng thử với “Chỉ mình tôi” → “Bạn bè” → “Công khai” + bật vị trí, cho lớp nhìn vòng tròn ai thấy được. Sau đó bấm <b>🗑 Xóa bài</b>: bài mất nhưng <b>ảnh chụp màn hình</b> vẫn còn → <b>dấu chân kỹ thuật số</b>. Phần <b>Cài đặt</b>: cho HS chọn rồi bấm Kiểm tra.',
    render(root) {
      let mode = 'post';
      const draw = () => {
        root.innerHTML = BG.modeBar([{ id: 'post', label: '📝 Đăng bài' }, { id: 'set', label: '⚙️ Cài đặt quyền riêng tư' }], mode) + '<div id="rtBody" class="bg-body"></div>';
        (mode === 'post' ? post : settings)(root.querySelector('#rtBody'));
      };
      root.addEventListener('click', ev => { const m = ev.target.closest('[data-mode]'); if (m) { mode = m.dataset.mode; draw(); } });
      draw();
    },
  });

  function post(el) {
    let aud = 'friends', loc = false, posted = null, timer = null;
    el.innerHTML = `<div class="bg-explain" id="rtEx">Viết bài, chọn <b>ai được xem</b>, rồi bấm <b>Đăng</b>.</div>
      <div class="bg-2col">
        <div class="bg-panel rt-comp">
          <div class="rt-who">🙂 <b>Nguyễn Văn An</b></div>
          <textarea id="rtText">Hôm nay em đi chơi công viên vui quá! 🎡</textarea>
          <div class="rt-photo">📸🎡🌳</div>
          <div class="bg-row">${Object.entries(AUD).map(([k, v]) => `<button class="rt-aud" data-aud="${k}">${v[0]}</button>`).join('')}</div>
          <label class="rt-loc"><input type="checkbox" id="rtLoc"> 📍 Gắn vị trí: <b>Công viên gần nhà em, Quận 8</b></label>
          <div class="bg-row"><button class="bgbtn" id="rtPost">Đăng</button><button class="bgbtn red" id="rtDel" disabled>🗑 Xóa bài</button></div>
        </div>
        <div class="bg-panel"><h3 style="margin:0 0 6px">👀 Ai nhìn thấy bài của em?</h3><div class="rt-rings" id="rtRings"></div><div class="rt-stats" id="rtStats"></div></div>
      </div>`;
    const $ = s => el.querySelector(s);
    function rings() {
      const can = { me: ['me'], friends: ['me', 'friends'], public: ['me', 'friends', 'public'] }[posted ? posted.aud : aud];
      $('#rtRings').innerHTML = `<div class="rt-r r3"></div><div class="rt-r r2"></div><div class="rt-r r1"></div>` + RINGS.map(([g, ic, t], i) => {
        const ang = [0, -60, 60, 180, -25, 25, 155, 205][i] * Math.PI / 180, rad = [0, 26, 26, 26, 44, 44, 44, 44][i];
        return `<div class="rt-p ${posted && can.includes(g) ? 'see' : ''} ${g}" style="left:${50 + rad * Math.sin(ang)}%;top:${50 - rad * Math.cos(ang)}%"><span>${ic}</span>${t}${posted && posted.loc && g === 'public' && can.includes(g) ? '<i>📍</i>' : ''}</div>`;
      }).join('');
      el.querySelectorAll('.rt-aud').forEach(b => b.classList.toggle('on', b.dataset.aud === aud));
    }
    function stats() {
      if (!posted) { $('#rtStats').innerHTML = '<span class="hint">Chưa đăng bài.</span>'; return; }
      $('#rtStats').innerHTML = `👁️ <b>${posted.views.toLocaleString('vi-VN')}</b> lượt xem · 📸 <b>${posted.shots}</b> người đã chụp màn hình${posted.deleted ? ' · <b class="bg-bad">Bài đã xóa</b>' : ''}`;
    }
    el.addEventListener('click', ev => {
      const a = ev.target.closest('[data-aud]'); if (a && !posted) { aud = a.dataset.aud; rings(); $('#rtEx').innerHTML = `<span class="big">${AUD[aud][0]}</span>${AUD[aud][1]}`; return; }
      if (ev.target.closest('#rtPost')) {
        clearInterval(timer); loc = $('#rtLoc').checked;
        posted = { aud, loc, views: 0, shots: 0, deleted: false };
        const max = { me: 1, friends: 38, public: 12480 }[aud];
        timer = setInterval(() => {
          if (posted.deleted) return;
          posted.views = Math.min(max, posted.views + Math.ceil(max / 14));
          if (aud !== 'me' && Math.random() < (aud === 'public' ? .5 : .15)) posted.shots++;
          stats(); if (posted.views >= max) clearInterval(timer);
        }, 260);
        $('#rtPost').disabled = true; $('#rtDel').disabled = false;
        $('#rtEx').innerHTML = aud === 'public' && loc ? '<span class="big bg-bad">⚠️ Nguy hiểm: Công khai + Vị trí!</span><b>Người lạ</b> khắp nơi đều biết <b>em đang ở đâu</b>. Đừng bao giờ đăng vị trí công khai.'
          : aud === 'public' ? '<span class="big">🌍 Bài đăng công khai</span>Rất nhiều người lạ có thể xem, tải về, chụp lại bài của em.'
          : loc ? '<span class="big">📍 Có gắn vị trí</span>Bạn bè biết em đang ở đâu. Chỉ nên chia sẻ vị trí với người thân, và hỏi ý bố mẹ trước.'
          : `<span class="big">✔ Đã đăng — ${AUD[aud][0]}</span>${AUD[aud][1]}`;
        rings(); stats();
      }
      if (ev.target.closest('#rtDel') && posted) {
        posted.deleted = true; clearInterval(timer); $('#rtDel').disabled = true;
        $('#rtEx').innerHTML = posted.shots ? `<span class="big">🗑 Đã xóa bài… nhưng!</span><b>${posted.shots} người đã chụp màn hình</b> — ảnh đó vẫn còn trên máy họ, em không xóa được. Những gì đã đăng lên mạng để lại <b>dấu chân kỹ thuật số</b>, rất khó xóa sạch. <b>Suy nghĩ kỹ trước khi đăng!</b>`
          : '<span class="big">🗑 Đã xóa bài</span>May là chưa ai chụp lại. Nhưng nếu đăng công khai lâu hơn, có thể đã có người lưu bài của em rồi.';
        stats();
        setTimeout(() => { posted = null; $('#rtPost').disabled = false; rings(); }, 2500);
      }
    });
    rings(); stats();
  }

  function settings(el) {
    const val = {};
    el.innerHTML = `<div class="bg-explain" id="rsEx"><span class="big">⚙️ Cài đặt quyền riêng tư</span>Chọn cài đặt cho tài khoản của em, rồi bấm <b>🛡️ Kiểm tra độ an toàn</b>.</div>
      <div class="bg-panel rs-list">${SET.map(([k, q, opts]) => `<div class="rs-row"><b>${q}</b><div class="rs-opts">${opts.map((o, i) => `<button data-k="${k}" data-v="${i}">${o}</button>`).join('')}</div></div>`).join('')}</div>
      <div class="bg-row"><button class="bgbtn green" id="rsCheck">🛡️ Kiểm tra độ an toàn</button><div class="rs-meter"><i id="rsBar"></i></div><b id="rsPct"></b></div>`;
    const $ = s => el.querySelector(s);
    el.addEventListener('click', ev => {
      const b = ev.target.closest('[data-k]');
      if (b) { val[b.dataset.k] = +b.dataset.v; el.querySelectorAll(`[data-k="${b.dataset.k}"]`).forEach(x => x.classList.toggle('on', x === b)); el.querySelectorAll('.rs-row').forEach(r => r.classList.remove('good', 'bad')); }
      if (ev.target.closest('#rsCheck')) {
        let good = 0; const tips = [];
        SET.forEach(([k, q, opts, best], i) => {
          const row = el.querySelectorAll('.rs-row')[i]; const ok = val[k] === best || (k === 'post' && val[k] === 2);
          row.classList.toggle('good', ok); row.classList.toggle('bad', !ok); if (ok) good++; else tips.push(`<b>${q}</b> → nên chọn “${opts[best]}”`);
        });
        const pct = Math.round(good / SET.length * 100); $('#rsBar').style.width = pct + '%'; $('#rsBar').style.background = pct === 100 ? 'var(--plus)' : pct >= 60 ? 'var(--star)' : 'var(--minus)'; $('#rsPct').textContent = pct + '%';
        $('#rsEx').innerHTML = pct === 100 ? '<span class="big bg-ok">🛡️ Tài khoản rất an toàn!</span>Chỉ người quen mới thấy và liên lạc được với em.' : `<span class="big">Còn ${tips.length} chỗ nên sửa</span>${tips.join('<br>')}`;
      }
    });
  }
})();
