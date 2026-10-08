/* Bài: Tình huống trên mạng — chọn cách ứng xử (bắt nạt, bình tĩnh, nghi thức, người lạ, xin phép đăng ảnh, thời gian dùng thiết bị, catfishing) */
(() => {
  // mỗi lựa chọn: [chữ, mức: 2 = tốt nhất, 1 = tạm được, 0 = không nên, giải thích]
  const SC = [
    { k: [4, 5], tag: 'Bắt nạt trực tuyến · Người lên tiếng', title: 'Nhóm chat của lớp', chat: [['Tuấn', 'Ê mọi người nhìn mặt Nam trong ảnh này xấu chưa 🤣🤣'], ['Tuấn', '📷 [ảnh của Nam]'], ['Vy', '😂😂😂']],
      q: 'Em thấy tin nhắn này. Em sẽ làm gì?', opts: [
        ['Thả thêm 😂 cho vui', 0, 'Cười theo là đang <b>tiếp tay</b> cho việc bắt nạt. Nam sẽ càng buồn hơn.'],
        ['Chửi lại Tuấn thật nặng', 0, 'Chửi lại làm mọi chuyện <b>to hơn</b>, em cũng thành người nói lời xấu.'],
        ['Nhắn riêng hỏi thăm Nam, nói Tuấn dừng lại, và kể cho thầy cô / bố mẹ', 2, 'Đúng rồi! Em là <b>người lên tiếng (Upstander)</b>: bênh vực bạn, không cổ vũ, và <b>báo người lớn</b> để giúp.'],
        ['Im lặng, coi như không thấy', 1, 'Không tiếp tay là tốt, nhưng Nam vẫn đang bị bắt nạt. Hãy <b>giúp bạn</b> và <b>báo người lớn</b>.'] ] },
    { k: [4, 5], tag: 'Bình tĩnh trước khi phản ứng', title: 'Tin nhắn từ Khoa', chat: [['Khoa', 'Bài vẽ của mày xấu nhất lớp luôn 😝']],
      q: 'Em đang rất tức giận. Em sẽ…', opts: [
        ['Nhắn lại ngay một câu thật cay', 0, 'Khi đang giận, mình dễ nói điều <b>sẽ hối hận</b>. Tin nhắn đã gửi thì không rút lại được.'],
        ['Dừng lại, hít thở sâu, đợi bình tĩnh rồi mới quyết định trả lời hay không', 2, 'Tuyệt vời! <b>Dừng – Thở – Nghĩ</b> rồi mới gõ. Nếu bạn cứ trêu mãi thì kể cho người lớn.'],
        ['Đăng lên mạng nói xấu Khoa cho cả trường biết', 0, 'Như vậy em lại trở thành người <b>bắt nạt</b>. Hai sai không thành một đúng.'] ] },
    { k: [4, 5], tag: 'Nghi thức trực tuyến', title: 'Nhắc nhóm nộp bài', chat: [['Em', '(Em muốn nhắc cả nhóm nộp bài trước thứ Sáu)']],
      q: 'Tin nhắn nào lịch sự nhất?', opts: [
        ['NỘP BÀI NGAY ĐI!!!!!', 0, 'Viết <b>HOA toàn bộ</b> trên mạng giống như đang <b>la hét</b>. Nhiều dấu chấm than cũng làm người đọc khó chịu.'],
        ['Các bạn ơi, nhớ nộp bài trước thứ Sáu nha 😊', 2, 'Đúng! Lời lẽ <b>nhẹ nhàng, rõ ràng</b>, có thời hạn cụ thể. Đó là <b>nghi thức trực tuyến</b> tốt.'],
        ['nộp lẹ đi mấy đứa lười', 0, 'Gọi bạn là “lười” là <b>thiếu tôn trọng</b>, dễ gây cãi nhau.'] ] },
    { k: [4, 5], tag: 'An toàn trên mạng · Người lạ', title: 'Tin nhắn từ người lạ', chat: [['GameMaster_99', 'Chào em, anh tặng em skin game xịn miễn phí nè 🎁'], ['GameMaster_99', 'Cho anh xin địa chỉ nhà và số điện thoại của mẹ để gửi quà nhé']],
      q: 'Em sẽ làm gì?', opts: [
        ['Gửi luôn, được quà mà!', 0, '<b>Không bao giờ</b> cho người lạ địa chỉ nhà, số điện thoại, tên trường. Quà miễn phí thường là <b>bẫy</b>.'],
        ['Hỏi anh ấy là ai trước rồi tính', 0, 'Người lạ trên mạng có thể <b>nói dối</b> về bản thân. Trò chuyện thêm chỉ làm em gặp nguy hơn.'],
        ['Không trả lời, chặn tài khoản và kể cho bố mẹ', 2, 'Chính xác! <b>Không trả lời – Chặn – Báo người lớn</b>.'] ] },
    { k: [4, 5], tag: 'Xin phép khi đăng ảnh', title: 'Ảnh chụp chung', chat: [['Em', '📷 [ảnh cả nhóm, Mai đang nhắm mắt 😅]'], ['Em', '(Em muốn đăng ảnh này lên mạng)']],
      q: 'Em nên làm gì?', opts: [
        ['Đăng luôn, ảnh vui mà', 0, 'Ảnh có mặt bạn thì là <b>của cả bạn</b>. Đăng khi chưa hỏi có thể làm bạn buồn, xấu hổ.'],
        ['Hỏi ý các bạn, chỉ đăng khi mọi người đồng ý', 2, 'Đúng! Luôn <b>xin phép</b> trước khi đăng ảnh có người khác.'],
        ['Đăng và gắn tên Mai để trêu bạn', 0, 'Đây là <b>trêu chọc trên mạng</b>, có thể thành bắt nạt.'] ] },
    { k: [4, 5], tag: 'Dùng thiết bị quá lâu', title: 'Chơi máy tính bảng', chat: [['Em', '⏰ Em đã chơi máy tính bảng 3 tiếng liền. Mắt mỏi, cổ đau…']],
      q: 'Em nên làm gì?', opts: [
        ['Chơi tiếp, sắp qua màn rồi', 0, 'Dùng thiết bị quá lâu làm <b>mỏi mắt, đau cổ, khó ngủ</b>.'],
        ['Tắt máy, đứng dậy vận động, nhìn ra xa cho mắt nghỉ', 2, 'Đúng! Cứ <b>20 phút</b> nhìn xa khoảng <b>20 giây</b>, và nghỉ vận động thường xuyên.'],
        ['Kéo màn hình lại gần mắt hơn cho rõ', 0, 'Để màn hình quá gần còn <b>hại mắt hơn</b>. Ngồi thẳng, cách màn hình khoảng một sải tay.'] ] },
    { k: [5], tag: 'Catfishing (giả danh trên mạng)', title: 'Bạn mới trên mạng', chat: [['Bé Na 🎀', 'Chào cậu, tớ cũng học lớp 5 nè, mình làm bạn nha 🥰'], ['Bé Na 🎀', 'Thứ Bảy mình gặp nhau ở công viên nhé. Đừng nói với bố mẹ, bí mật của hai đứa thôi 🤫']],
      q: 'Em nghĩ sao?', opts: [
        ['Đi gặp, bạn ấy dễ thương mà', 0, 'Người trên mạng có thể dùng <b>ảnh và tên giả</b> (catfishing). “Bé Na” có thể là người lớn xấu.'],
        ['Không đi, và kể ngay cho bố mẹ', 2, 'Chính xác! Người tốt <b>không bao giờ</b> bảo em giữ bí mật với bố mẹ. Đó là <b>dấu hiệu nguy hiểm</b>.'],
        ['Rủ thêm một bạn cùng lớp đi chung cho an toàn', 0, 'Hai đứa trẻ vẫn <b>không an toàn</b>. Phải báo bố mẹ.'] ] },
  ];

  BG.add({
    id: 'tinh-huong', icon: '💬', khoi: [4, 5], title: 'Tình huống trên mạng', desc: 'Đọc tin nhắn trên điện thoại giả lập, chọn cách ứng xử đúng.',
    topics: ['LV2 GM1 · CĐ 5, 24: Bắt nạt trên mạng', 'LV2 GM1 · CĐ 18–19: Nghi thức · Bình tĩnh', 'LV2 GM1 · CĐ 23: Dùng thiết bị quá lâu', 'LV2 GM1 · CĐ 33: Tôn trọng và đồng cảm', 'LV2 GM2 · CĐ 16–17, 21, 26: Nghi thức · Upstander', 'LV2 GM2 · CĐ 20, 33: Màn hình · An toàn', 'LV3 GM1 · CĐ 23–24, 30: Xin phép đăng ảnh · Thời gian · Bắt nạt', 'LV3 GM2 · CĐ 10–11, 27: Catfishing · Công dân số · Xin phép'],
    tip: 'Mỗi tình huống: đọc to tin nhắn, cho cả lớp <b>giơ tay chọn</b> trước rồi mới bấm. Có thể bấm thử cả đáp án sai để xem giải thích. Lọc theo khối ở góc trên (Khối 4 không có tình huống catfishing).',
    render(root) {
      const e = BG.esc, COL = ['#e4405f', '#1877f2', '#f59f00', '#12b886', '#7950f2', '#fd7e14', '#0ca678'];
      const avatar = n => { const c = COL[[...n].reduce((a, ch) => a + ch.codePointAt(0), 0) % COL.length]; const L = [...n.replace(/[^\p{L}\p{N}]/gu, '')][0] || '?'; return `<span class="th-av" style="background:${c}">${e(L.toUpperCase())}</span>`; };
      let khoi = 0, list = SC, i = 0;
      root.innerHTML = `<div class="bg-row"><span>Hiện tình huống cho:</span>${[[0, 'Tất cả'], [4, 'Khối 4'], [5, 'Khối 5']].map(([k, t]) => `<button class="bgchip ${k === 0 ? 'on' : ''}" data-k="${k}">${t}</button>`).join('')}</div>
        <div class="th-wrap"><div class="th-phone"><div class="th-screen">
            <div class="th-status"><b>9:41</b><span class="th-notch"></span><span class="th-sig"><i></i><i></i><i></i><i></i></span><span class="th-wifi"></span><span class="th-bat"><i></i></span></div>
            <div class="th-head" id="thHead"></div><div class="th-chat" id="thChat"></div>
            <div class="th-input"><span class="th-ib">${BG.svg('add', 22)}</span><span class="th-ib">${BG.svg('camera', 22)}</span><span class="th-ib">${BG.svg('image', 22)}</span><span class="th-aa">Aa<span>${BG.svg('smile', 20)}</span></span><span class="th-ib">${BG.svg('like', 22)}</span></div>
            <div class="th-home"></div></div></div>
          <div class="th-side"><div class="th-tag" id="thTag"></div><div class="th-q" id="thQ"></div><div class="th-opts" id="thOpts"></div><div class="bg-explain" id="thEx">Chọn một cách ứng xử.</div>
            <div class="bg-row"><button class="bgbtn soft" id="thPrev">◀ Trước</button><span id="thN" class="nx-score"></span><button class="bgbtn" id="thNext">Tình huống tiếp ▶</button></div></div></div>`;
      const $ = s => root.querySelector(s);
      function paint() {
        const s = list[i];
        const others = [...new Set(s.chat.map(c => c[0]).filter(w => w !== 'Em'))];
        const group = others.length > 1, name = group ? s.title : (others[0] || s.title);
        $('#thHead').innerHTML = others.length ? `<span class="th-backb">${BG.svg('back', 24)}</span>${group ? `<span class="th-av grp">${others.slice(0, 2).map(avatar).join('')}</span>` : avatar(name)}
          <span class="th-who"><b>${e(name)}</b><small>${group ? others.length + 1 + ' thành viên' : '● Đang hoạt động'}</small></span>
          <span class="th-hb">${BG.svg('phone', 22)}</span><span class="th-hb">${BG.svg('video', 24)}</span>`
          : `<span class="th-backb">${BG.svg('back', 24)}</span><span class="th-who solo"><b>${e(name)}</b><small>Điều em đang làm</small></span><span class="th-hb">${BG.svg('more', 22)}</span>`;
        let h = 20, m = 14, prev = null;
        $('#thChat').innerHTML = `<div class="th-day">Hôm nay</div>` + s.chat.map(([who, msg], j) => {
          const me = who === 'Em', next = s.chat[j + 1], last = !next || next[0] !== who, first = prev !== who; prev = who;
          const t = `${h}:${String(m += 1 + j).padStart(2, '0')}`;
          if (me && /^[(⏰]/.test(msg)) { prev = null; return `<div class="th-note">${msg.replace(/^\(|\)$/g, '')}</div>`; }
          const photo = /^📷\s*\[(.*)\]$/.exec(msg);
          const inner = photo ? `<div class="th-photo"><span>${BG.svg('image', 46)}</span><i>${e(photo[1])}</i></div>` : `<div class="th-bub">${msg}</div>`;
          return `<div class="th-row ${me ? 'me' : ''} ${first ? 'first' : ''} ${last ? 'last' : ''}">${!me ? `<span class="th-sav">${last ? avatar(who) : ''}</span>` : ''}
            <div class="th-col">${!me && group && first ? `<span class="th-name">${e(who)}</span>` : ''}${inner}${last ? `<span class="th-time">${t}${me ? ' · Đã xem' : ''}</span>` : ''}</div></div>`;
        }).join('');
        $('#thTag').textContent = s.tag; $('#thQ').textContent = s.q;
        $('#thOpts').innerHTML = s.opts.map((o, j) => `<button class="th-o" data-o="${j}"><span>${'ABCD'[j]}</span>${o[0]}</button>`).join('');
        $('#thEx').innerHTML = 'Chọn một cách ứng xử.'; $('#thN').textContent = `${i + 1} / ${list.length}`;
        $('#thPrev').disabled = i === 0; $('#thNext').disabled = i === list.length - 1;
      }
      root.addEventListener('click', ev => {
        const k = ev.target.closest('[data-k]');
        if (k) { khoi = +k.dataset.k; list = khoi ? SC.filter(s => s.k.includes(khoi)) : SC; i = 0; root.querySelectorAll('[data-k]').forEach(b => b.classList.toggle('on', b === k)); return paint(); }
        const o = ev.target.closest('[data-o]');
        if (o) {
          const opt = list[i].opts[+o.dataset.o]; const lv = opt[1];
          o.classList.remove('l0', 'l1', 'l2'); o.classList.add('l' + lv);
          $('#thEx').innerHTML = `<span class="big ${lv === 2 ? 'bg-ok' : lv === 0 ? 'bg-bad' : ''}">${lv === 2 ? '✔ Cách xử lý tốt nhất!' : lv === 1 ? '🤔 Tạm được, nhưng chưa đủ' : '✘ Không nên'}</span>${opt[2]}`;
        }
        if (ev.target.closest('#thNext') && i < list.length - 1) { i++; paint(); }
        if (ev.target.closest('#thPrev') && i > 0) { i--; paint(); }
      });
      paint();
    },
  });
})();
