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
  /* phần hiển thị: biểu tượng, mô tả */
  const AUD_IC = { me: 'lockS', friends: 'people', public: 'globe' };
  const AUD_DESC = { me: 'Chỉ mình em', friends: 'Bạn bè của em trên mạng xã hội', public: 'Bất kỳ ai, kể cả người em không quen' };
  const SET_UI = { post: ['globe', '#1877f2', 'Những ai nhìn thấy các bài viết mới của em'], msg: ['comment', '#7950f2', 'Người lạ có gửi tin nhắn cho em được không'], loc: ['pin', '#e4405f', 'Cho ứng dụng biết em đang ở đâu'], find: ['phone', '#12b886', 'Người khác nhập số điện thoại để tìm ra em'], tag: ['image', '#f59f00', 'Ảnh có tên em hiện lên trang của em'] };
  const PLACE = 'Công viên gần nhà em, Quận 8';
  const audLabel = k => AUD[k][0].replace(/^\S+\s/, '');
  const fmt = n => n.toLocaleString('vi-VN');

  BG.add({
    id: 'rieng-tu', icon: '🔐', khoi: [5], title: 'Quyền riêng tư khi đăng bài', desc: 'Giả lập đăng bài: chọn ai được xem, có gắn vị trí không. Bài đã đăng thì khó xóa sạch.',
    topics: ['LV3 GM1 · CĐ 8: Cài đặt quyền riêng tư', 'LV3 GM1 · CĐ 9: Ai được xem bài đăng?', 'LV3 GM2 · CĐ 13: Cài đặt vị trí', 'LV3 GM2 · CĐ 14: Cài đặt quyền riêng tư', 'LV3 GM2 · CĐ 26: Quản lý dấu chân số', 'LV2 GM1 · CĐ 6: Dấu chân kỹ thuật số', 'LV2 GM2 · CĐ 2: Dấu chân kỹ thuật số'],
    tip: 'Phần <b>Đăng bài</b>: bấm nút <b>▾</b> dưới tên để chọn ai được xem, đăng thử với “Chỉ mình tôi” → “Bạn bè” → “Công khai” + bấm <b>📍</b> gắn vị trí, cho lớp nhìn vòng tròn ai thấy được. Sau đó bấm <b>⋯ → Xóa bài viết</b>: bài mất nhưng <b>ảnh chụp màn hình</b> vẫn còn → <b>dấu chân kỹ thuật số</b>. Phần <b>Cài đặt</b>: cho HS chọn rồi bấm Kiểm tra.',
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
    let aud = 'friends', loc = false, text = 'Hôm nay em đi chơi công viên vui quá! 🎡', posted = null, timer = null, menu = false, more = false, liked = false;
    el.innerHTML = `<div class="bg-explain" id="rtEx">Viết bài, bấm nút <b>▾</b> dưới tên để chọn <b>ai được xem</b>, rồi bấm <b>Đăng</b>.</div>
      <div class="bg-2col">
        <div class="rt-card" id="rtCard"></div>
        <div class="bg-panel rt-side"><h3>👀 Ai nhìn thấy bài của em?</h3><div class="rt-rings" id="rtRings"></div><div class="rt-stats" id="rtStats"></div></div>
      </div>`;
    const $ = s => el.querySelector(s);
    const avatar = '<span class="rt-av">A</span>';
    const at = l => l ? ` <span class="rt-at">đang ở <b>📍 ${PLACE}</b></span>` : '';
    function card() {
      const c = $('#rtCard');
      if (!posted) {
        c.innerHTML = `<div class="rt-hd"><b>Tạo bài viết</b><span class="rt-x">${BG.svg('close', 22)}</span></div>
          <div class="rt-body">
            <div class="rt-me">${avatar}<div class="rt-meta"><div><b>Nguyễn Văn An</b>${at(loc)}</div>
              <div class="rt-pickw"><button class="rt-pill" id="rtPill">${BG.svg(AUD_IC[aud], 15)} ${audLabel(aud)} ▾</button>
                <div class="rt-menu ${menu ? 'open' : ''}"><div class="rt-mh">Ai có thể xem bài viết của em?</div>${Object.keys(AUD).map(k => `<button class="rt-aud ${k === aud ? 'on' : ''}" data-aud="${k}"><span class="rt-mi">${BG.svg(AUD_IC[k], 22)}</span><span class="rt-mt"><b>${audLabel(k)}</b><small>${AUD_DESC[k]}</small></span><i></i></button>`).join('')}</div></div></div></div>
            <textarea id="rtText" spellcheck="false" placeholder="An ơi, bạn đang nghĩ gì thế?">${e(text)}</textarea>
            <div class="rt-photo"><img src="img/web/wheel.jpg" alt=""><span>${BG.svg('close', 18)}</span></div>
            <div class="rt-add"><span class="rt-addt">Thêm vào bài viết của bạn</span>
              <span class="rt-ai" style="color:#45bd62">${BG.svg('image', 26)}</span><span class="rt-ai" style="color:#1877f2">${BG.svg('people', 26)}</span><span class="rt-ai" style="color:#f7b928">${BG.svg('smile', 26)}</span>
              <label class="rt-ai rt-loc ${loc ? 'on' : ''}" title="Gắn vị trí (check-in)"><input type="checkbox" id="rtLoc" ${loc ? 'checked' : ''}>${BG.svg('pin', 26)}</label></div>
            <button class="rt-post" id="rtPost">Đăng</button>
          </div>`;
        return;
      }
      if (posted.deleted) { c.innerHTML = `<div class="rt-gone">${BG.svg('trash', 44)}<b>Bài viết đã bị xóa</b><span>Bài không còn trên trang của em nữa…</span></div>`; return; }
      const pub = posted.aud === 'public';
      const likes = Math.round(posted.views * (pub ? .08 : .45)) + (liked ? 1 : 0), cmts = Math.round(posted.views * (pub ? .012 : .12)), shares = pub ? Math.round(posted.views * .006) : 0;
      c.innerHTML = `<div class="rt-fp">
          <div class="rt-me">${avatar}<div class="rt-meta"><div><b>Nguyễn Văn An</b>${at(posted.loc)}</div><small>Vừa xong · ${BG.svg(AUD_IC[posted.aud], 13)}</small></div>
            <div class="rt-morew"><button class="rt-more" id="rtMore" title="Tùy chọn">${BG.svg('more', 22)}</button>
              <div class="rt-menu sm ${more ? 'open' : ''}"><button id="rtDel"><span class="rt-mi">${BG.svg('trash', 20)}</span><b>Xóa bài viết</b></button></div></div></div>
          <div class="rt-txt">${e(posted.text)}</div>
          <img class="rt-img" src="img/web/wheel.jpg" alt="">
          <div class="rt-cnt"><span>${likes ? `<i class="rt-r1">👍</i><i class="rt-r2">❤️</i> ${fmt(likes)}` : ''}</span><span>${cmts ? fmt(cmts) + ' bình luận' : ''}${shares ? ` · ${fmt(shares)} lượt chia sẻ` : ''}</span></div>
          <div class="rt-acts"><button id="rtLike" class="${liked ? 'on' : ''}">${BG.svg('like', 20)} Thích</button><button>${BG.svg('comment', 20)} Bình luận</button><button>${BG.svg('share', 20)} Chia sẻ</button></div>
        </div>`;
    }
    function rings() {
      const can = { me: ['me'], friends: ['me', 'friends'], public: ['me', 'friends', 'public'] }[posted ? posted.aud : aud];
      $('#rtRings').innerHTML = `<div class="rt-r r3"></div><div class="rt-r r2"></div><div class="rt-r r1"></div>` + RINGS.map(([g, ic, t], i) => {
        const ang = [0, -60, 60, 180, -25, 25, 155, 205][i] * Math.PI / 180, rad = [0, 26, 26, 26, 44, 44, 44, 44][i];
        return `<div class="rt-p ${posted && can.includes(g) ? 'see' : ''} ${g}" style="left:${50 + rad * Math.sin(ang)}%;top:${50 - rad * Math.cos(ang)}%"><span>${ic}</span>${t}${posted && posted.loc && g === 'public' && can.includes(g) ? '<i>📍</i>' : ''}</div>`;
      }).join('');
    }
    function stats() {
      if (!posted) { $('#rtStats').innerHTML = '<span class="hint">Chưa đăng bài.</span>'; return; }
      $('#rtStats').innerHTML = `👁️ <b>${fmt(posted.views)}</b> lượt xem · 📸 <b>${posted.shots}</b> người đã chụp màn hình${posted.deleted ? ' · <b class="bg-bad">Bài đã xóa</b>' : ''}`;
    }
    el.addEventListener('input', ev => { if (ev.target.id === 'rtText') text = ev.target.value; });
    el.addEventListener('change', ev => {
      if (ev.target.id !== 'rtLoc') return;
      loc = ev.target.checked; card();
      $('#rtEx').innerHTML = loc ? `<span class="big">📍 Gắn vị trí (check-in)</span>Bài sẽ cho mọi người xem biết em đang ở <b>${PLACE}</b>.` : 'Đã bỏ gắn vị trí.';
    });
    el.addEventListener('click', ev => {
      if (ev.target.closest('#rtPill')) { menu = !menu; return card(); }
      const a = ev.target.closest('[data-aud]');
      if (a && !posted) { aud = a.dataset.aud; menu = false; card(); rings(); $('#rtEx').innerHTML = `<span class="big">${AUD[aud][0]}</span>${AUD[aud][1]}`; return; }
      if (ev.target.closest('#rtMore')) { more = !more; return card(); }
      if (ev.target.closest('#rtLike')) { liked = !liked; return card(); }
      if (ev.target.closest('#rtPost')) {
        clearInterval(timer); menu = false; more = false; liked = false;
        posted = { aud, loc, text, views: 0, shots: 0, deleted: false };
        const max = { me: 1, friends: 38, public: 12480 }[aud];
        timer = setInterval(() => {
          if (posted.deleted) return;
          posted.views = Math.min(max, posted.views + Math.ceil(max / 14));
          if (aud !== 'me' && Math.random() < (aud === 'public' ? .5 : .15)) posted.shots++;
          stats(); if (!more) card(); if (posted.views >= max) clearInterval(timer);
        }, 260);
        $('#rtEx').innerHTML = (aud === 'public' && loc ? '<span class="big bg-bad">⚠️ Nguy hiểm: Công khai + Vị trí!</span><b>Người lạ</b> khắp nơi đều biết <b>em đang ở đâu</b>. Đừng bao giờ đăng vị trí công khai.'
          : aud === 'public' ? '<span class="big">🌍 Bài đăng công khai</span>Rất nhiều người lạ có thể xem, tải về, chụp lại bài của em.'
          : loc ? '<span class="big">📍 Có gắn vị trí</span>Bạn bè biết em đang ở đâu. Chỉ nên chia sẻ vị trí với người thân, và hỏi ý bố mẹ trước.'
          : `<span class="big">✔ Đã đăng — ${AUD[aud][0]}</span>${AUD[aud][1]}`) + ' <span class="rt-hint">(Muốn xóa: bấm <b>⋯</b> trên bài → <b>Xóa bài viết</b>)</span>';
        card(); rings(); stats(); return;
      }
      if (ev.target.closest('#rtDel') && posted && !posted.deleted) {
        posted.deleted = true; clearInterval(timer); more = false;
        $('#rtEx').innerHTML = posted.shots ? `<span class="big">🗑 Đã xóa bài… nhưng!</span><b>${posted.shots} người đã chụp màn hình</b> — ảnh đó vẫn còn trên máy họ, em không xóa được. Những gì đã đăng lên mạng để lại <b>dấu chân kỹ thuật số</b>, rất khó xóa sạch. <b>Suy nghĩ kỹ trước khi đăng!</b>`
          : '<span class="big">🗑 Đã xóa bài</span>May là chưa ai chụp lại. Nhưng nếu đăng công khai lâu hơn, có thể đã có người lưu bài của em rồi.';
        stats(); card();
        setTimeout(() => { posted = null; card(); rings(); }, 2500);
        return;
      }
      /* bấm ra ngoài thì đóng menu đang mở */
      if ((menu || more) && !ev.target.closest('.rt-menu')) { menu = more = false; card(); }
    });
    card(); rings(); stats();
  }

  function settings(el) {
    const val = {};
    el.innerHTML = `<div class="bg-explain" id="rsEx"><span class="big">⚙️ Cài đặt quyền riêng tư</span>Chọn cài đặt cho tài khoản của em, rồi bấm <b>🛡️ Kiểm tra độ an toàn</b>.</div>
      <div class="rs-page"><div class="rs-top">${BG.svg('back', 22)}<b>Quyền riêng tư</b>${BG.svg('search', 22)}</div>
        <div class="rs-acc"><span class="rt-av">A</span><div><b>Nguyễn Văn An</b><small>Tài khoản của em</small></div></div>
        <div class="rs-sec">Ai có thể thấy và liên lạc với em</div>
        <div class="rs-list">${SET.map(([k, q, opts]) => `<div class="rs-row"><span class="rs-ic" style="background:${SET_UI[k][1]}">${BG.svg(SET_UI[k][0], 22)}</span><div class="rs-tx"><b>${q}</b><small>${SET_UI[k][2]}</small></div><div class="rs-opts">${opts.map((o, i) => `<button data-k="${k}" data-v="${i}">${o}</button>`).join('')}</div></div>`).join('')}</div>
        <div class="rs-foot"><button class="rs-check" id="rsCheck">🛡️ Kiểm tra độ an toàn</button><div class="rs-meter"><i id="rsBar"></i></div><b id="rsPct"></b></div></div>`;
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
