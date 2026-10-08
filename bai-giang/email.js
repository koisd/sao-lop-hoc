/* Bài: Email — các phần của email, thử viết email, nhận diện email lừa đảo */
(() => {
  const e = BG.esc;
  const PARTS = [
    ['to', 'Người nhận (Đến)', 'Địa chỉ email của người em muốn gửi. Luôn có dấu <b>@</b>, ví dụ <b>colan@truonghocvui.edu.vn</b>.'],
    ['cc', 'CC (Gửi kèm)', 'Gửi <b>một bản sao</b> cho người khác cùng biết — ví dụ gửi bài cho cô và CC cho bố mẹ.'],
    ['subject', 'Chủ đề (Subject)', 'Một dòng <b>ngắn gọn</b> cho biết email nói về gì. Người nhận đọc chủ đề là biết có nên mở ngay không.'],
    ['greet', 'Lời chào', 'Mở đầu lịch sự: “Em chào cô ạ”, “Chào bạn Minh”.'],
    ['body', 'Nội dung', 'Phần chính: viết <b>rõ ràng, đủ ý, lịch sự</b>. Mỗi ý một đoạn.'],
    ['close', 'Lời kết', 'Kết thúc lịch sự: “Em cảm ơn cô ạ”, “Hẹn gặp lại bạn”.'],
    ['sign', 'Chữ ký', 'Tên của em (và lớp) ở cuối email, để người nhận biết <b>ai gửi</b>.'],
    ['attach', 'Tệp đính kèm', 'Tệp gửi kèm theo email (bài làm, hình ảnh). Biểu tượng <b>📎 cái kẹp giấy</b>.'],
    ['send', 'Nút Gửi', 'Kiểm tra lại người nhận, chủ đề, nội dung rồi mới bấm <b>Gửi</b>. Đã gửi thì không lấy lại được!'],
  ];
  const INBOX = [
    { id: 1, from: 'Cô Lan', addr: 'colan@truonghocvui.edu.vn', subj: 'Bài tập Tin học tuần này', safe: true,
      body: 'Chào các em,<br><br>Tuần này các em làm bài số 3 trong sách và nộp vào thứ Sáu nhé.<br><br>Cô Lan',
      why: ['Người gửi là <b>cô giáo</b>, địa chỉ email của <b>trường</b> (.edu.vn).', 'Nội dung bình thường, không đòi mật khẩu, không giục gấp.'] },
    { id: 2, from: 'Quản trị Game Thế Giới Khối', addr: 'support@the-gioi-k0i-free.xyz', subj: '🎁 BẠN ĐÃ TRÚNG 10.000 KIM CƯƠNG!!! Nhận trong 24 GIỜ', safe: false,
      body: 'CHÚC MỪNG!!! Bạn là người may mắn nhất hôm nay.<br><br>Hãy <span class="em-sign" data-n="3">đăng nhập bằng tên và mật khẩu game</span> tại đây để nhận quà:<br><a class="em-link" data-real="http://the-gioi-k0i-free.xyz/lay-mat-khau">👉 NHẬN QUÀ NGAY</a><br><br><span class="em-sign" data-n="2">Chỉ còn 24 giờ, nhanh lên kẻo mất!</span>',
      why: ['<b>Địa chỉ lạ</b>: “k<b>0</b>i” dùng số 0, đuôi <b>.xyz</b>.', '<b>Giục gấp</b> (“24 giờ”, “nhanh lên”) để em không kịp suy nghĩ.', 'Đòi <b>mật khẩu</b> — trang thật không bao giờ hỏi mật khẩu qua email.', 'Trúng thưởng <b>quá hời</b> mà em chẳng tham gia gì.'] },
    { id: 3, from: 'Thư viện trường', addr: 'thuvien@truonghocvui.edu.vn', subj: 'Nhắc trả sách “Dế Mèn phiêu lưu ký”', safe: true,
      body: 'Chào em,<br><br>Sách em mượn đã tới hạn trả. Em nhớ mang sách tới thư viện trong tuần này nhé.<br><br>Thư viện trường',
      why: ['Địa chỉ email của <b>trường</b>.', 'Không có đường link lạ, không xin thông tin gì.'] },
    { id: 4, from: 'Ngân hàng ABC', addr: 'thongbao@nganhang-abc-xacminh.top', subj: '⚠️ Tài khoản của bạn đã bị KHÓA', safe: false,
      body: 'Tài khoản của bạn có vấn đề và <span class="em-sign" data-n="2">sẽ bị xóa trong 1 giờ</span>.<br><br>Bấm vào đây để mở khóa: <a class="em-link em-sign" data-n="4" data-real="http://nganhang-abc-xacminh.top/nhap-the">www.nganhang-abc.com.vn</a><br><br>Vui lòng <span class="em-sign" data-n="3">nhập số thẻ và mật khẩu</span>.',
      why: ['<b>Địa chỉ giả</b>: tên miền thật là <b>nganhang-abc-xacminh.top</b>.', '<b>Dọa nạt, giục gấp</b> (“bị xóa trong 1 giờ”).', 'Đòi <b>số thẻ, mật khẩu</b>.', '<b>Đường link lừa</b>: chữ hiện là trang ngân hàng nhưng đưa chuột vào mới thấy địa chỉ thật khác hẳn (xem dòng dưới cùng).'] },
    { id: 5, from: 'Mẹ', addr: 'me.cua.an@gmail.com', subj: 'Chiều nay mẹ đón con nhé', safe: true,
      body: 'Chiều nay 5 giờ mẹ đón con ở cổng trường nha.<br><br>Mẹ',
      why: ['Người quen, nội dung bình thường.', 'Không đòi gì, không có tệp hay link lạ.'] },
    { id: 6, from: 'xyz8821', addr: 'xyz8821@mail-la.ru', subj: 'Hình của bạn nè 😂😂', safe: false,
      body: 'Xem hình này đi, buồn cười lắm!!!<br><br><span class="em-att em-sign" data-n="3">📎 hinh_cua_ban.jpg.exe</span>',
      why: ['<b>Người lạ</b>, tên và địa chỉ vô nghĩa.', 'Tiêu đề tò mò để <b>dụ em mở</b>.', 'Tệp đính kèm đuôi <b>.exe</b> (chương trình) giả làm hình .jpg → có thể là <b>virus</b>!'] },
  ];

  BG.add({
    id: 'email', icon: '📧', khoi: [4, 5], title: 'Email', desc: 'Các phần của một email, thử viết email đúng cách, nhận diện email lừa đảo.',
    topics: ['LV2 GM1 · CĐ 25: Liên kết lạ trong email', 'LV3 GM1 · CĐ 19: Chủ đề của email', 'LV3 GM2 · CĐ 24: Chữ ký email', 'LV3 GM2 · CĐ 29: Tin nhắn không an toàn', 'LV3 GM1 · CĐ 16: Giao tiếp kỹ thuật số'],
    tip: '<b>Các phần của email</b>: bấm số trên email mẫu. <b>Thử viết</b>: cho HS viết email xin nghỉ học gửi cô, bấm Kiểm tra. <b>Email nào nguy hiểm?</b>: mở từng email, cả lớp đoán An toàn / Nguy hiểm rồi mới bấm; ở email ngân hàng, cho HS <b>rê chuột lên đường link</b> để thấy địa chỉ thật hiện ở dòng dưới cùng.',
    render(root) {
      let mode = 'parts';
      const draw = () => {
        root.innerHTML = BG.modeBar([{ id: 'parts', label: '🔢 Các phần của email' }, { id: 'write', label: '✍️ Thử viết email' }, { id: 'phish', label: '🎣 Email nào nguy hiểm?' }], mode) + '<div id="emBody" class="bg-body"></div>';
        ({ parts, write, phish })[mode](root.querySelector('#emBody'));
      };
      root.addEventListener('click', ev => { const m = ev.target.closest('[data-mode]'); if (m) { mode = m.dataset.mode; draw(); } });
      draw();
    },
  });

  const n = k => PARTS.findIndex(p => p[0] === k) + 1;
  function parts(el) {
    const tag = k => `<button class="em-num" data-p="${k}">${n(k)}</button>`;
    el.innerHTML = `<div class="bg-explain" id="emEx">Bấm vào các <b>số tròn</b> trên email để biết tên từng phần.</div>
      <div class="em-win">
        <div class="em-top">✉️ Thư mới</div>
        <div class="em-f" data-pp="to">${tag('to')}<span>Đến:</span><b>colan@truonghocvui.edu.vn</b></div>
        <div class="em-f" data-pp="cc">${tag('cc')}<span>CC:</span><b>me.cua.an@gmail.com</b></div>
        <div class="em-f" data-pp="subject">${tag('subject')}<span>Chủ đề:</span><b>Em xin nộp bài tập Tin học tuần 3</b></div>
        <div class="em-msg">
          <p data-pp="greet">${tag('greet')}Em chào cô Lan ạ,</p>
          <p data-pp="body">${tag('body')}Em gửi cô bài tập Tin học tuần 3. Bài em làm về chủ đề “An toàn trên mạng”. Nếu bài có chỗ nào chưa đúng, cô góp ý giúp em nhé.</p>
          <p data-pp="close">${tag('close')}Em cảm ơn cô ạ!</p>
          <p data-pp="sign" class="em-signbox">${tag('sign')}Nguyễn Văn An<br>Lớp 5A</p>
          <div data-pp="attach" class="em-attach">${tag('attach')}📎 bai-tap-tuan-3.docx</div>
        </div>
        <div class="em-bot" data-pp="send">${tag('send')}<span class="em-send">Gửi ➤</span></div>
      </div>`;
    el.addEventListener('click', ev => {
      const b = ev.target.closest('[data-p]'); if (!b) return;
      const p = PARTS.find(x => x[0] === b.dataset.p);
      el.querySelectorAll('[data-pp]').forEach(x => x.classList.toggle('hl', x.dataset.pp === p[0]));
      el.querySelector('#emEx').innerHTML = `<span class="big">${n(p[0])}. ${p[1]}</span>${p[2]}`;
    });
  }

  function write(el) {
    el.innerHTML = `<div class="bg-explain" id="emWEx"><span class="big">✍️ Nhiệm vụ: viết email xin cô cho nghỉ học 1 buổi</span>Điền đủ các phần rồi bấm <b>✔ Kiểm tra</b>.</div>
      <div class="em-win em-write">
        <div class="em-top">✉️ Thư mới</div>
        <div class="em-f"><span>Đến:</span><input id="wTo" placeholder="địa chỉ email của cô"></div>
        <div class="em-f"><span>Chủ đề:</span><input id="wSub" placeholder="email này nói về gì?"></div>
        <textarea id="wBody" placeholder="Lời chào…&#10;&#10;Nội dung…&#10;&#10;Lời kết…&#10;Chữ ký (tên, lớp)"></textarea>
        <div class="em-bot"><button class="bgbtn green" id="wCheck">✔ Kiểm tra</button><button class="bgbtn soft" id="wSample">Xem email mẫu</button></div>
      </div>
      <div class="bg-panel em-check" id="wRes"></div>`;
    const $ = s => el.querySelector(s);
    el.addEventListener('click', ev => {
      if (ev.target.closest('#wSample')) {
        $('#wTo').value = 'colan@truonghocvui.edu.vn'; $('#wSub').value = 'Em xin nghỉ học thứ Hai (10/11)';
        $('#wBody').value = 'Em chào cô Lan ạ,\n\nThứ Hai tuần sau em bị ốm nên xin phép cô cho em nghỉ học một buổi. Em sẽ xem lại bài và hỏi bạn để làm bài tập đầy đủ.\n\nEm cảm ơn cô ạ!\nNguyễn Văn An\nLớp 5A';
      }
      if (!ev.target.closest('#wCheck') && !ev.target.closest('#wSample')) return;
      const to = $('#wTo').value.trim(), sub = $('#wSub').value.trim(), body = $('#wBody').value.trim();
      const lines = body.split(/\n/).map(x => x.trim()).filter(Boolean); const nb = BG.norm(body);
      const checks = [
        [/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to), 'Người nhận có địa chỉ email đúng dạng (có dấu @)', 'Địa chỉ người nhận phải có dạng <b>ten@tenmien.vn</b>'],
        [sub.length >= 6 && !/^(hi|hello|alo|e|chao|email)$/i.test(BG.norm(sub)), 'Có chủ đề rõ ràng', 'Thiếu chủ đề hoặc chủ đề quá ngắn — viết rõ email nói về gì'],
        [sub.length <= 70, 'Chủ đề ngắn gọn', 'Chủ đề quá dài — chỉ cần 1 dòng ngắn'],
        [/^(em )?(xin )?(chao|kinh|thua|gui|dear|hello|hi)/.test(BG.norm(lines[0] || '')), 'Có lời chào ở đầu', 'Thiếu lời chào (vd: “Em chào cô ạ”)'],
        [lines.length >= 3 && body.length >= 40, 'Có nội dung đủ ý', 'Nội dung còn ngắn quá'],
        [/cam on|tran trong|than ai|hen gap/.test(nb), 'Có lời kết lịch sự', 'Thiếu lời kết (vd: “Em cảm ơn cô ạ”)'],
        [lines.length >= 2 && lines[lines.length - 1].length <= 40 && !/cam on/.test(BG.norm(lines[lines.length - 1])), 'Có chữ ký (tên em) ở cuối', 'Thiếu chữ ký — ghi tên và lớp ở dòng cuối'],
        [body === '' || body.replace(/[^A-ZÀ-Ỹ]/g, '').length < body.replace(/[^a-zA-ZÀ-ỹ]/g, '').length * 0.5, 'Không viết HOA toàn bộ', 'Viết HOA hết giống như đang <b>la hét</b> — không lịch sự'],
      ];
      const ok = checks.filter(c => c[0]).length;
      $('#wRes').innerHTML = `<h3>${ok === checks.length ? '🎉 Tuyệt vời! Email đầy đủ và lịch sự.' : `Đạt ${ok}/${checks.length} — sửa thêm một chút nhé!`}</h3>` + checks.map(c => `<div class="${c[0] ? 'bg-ok' : 'bg-bad'}">${c[0] ? '✔ ' + c[1] : '✘ ' + c[2]}</div>`).join('');
    });
  }

  function phish(el) {
    const ans = {};
    el.innerHTML = `<div class="bg-explain" id="pEx"><span class="big">🎣 Email nào nguy hiểm?</span>Mở từng email, đoán <b>An toàn</b> hay <b>Nguy hiểm</b>.</div>
      <div class="em-mail"><div class="em-list" id="pList"></div><div class="em-view" id="pView"><div class="tk-empty">← Chọn một email để đọc</div></div></div>
      <div class="em-status" id="pStatus">&nbsp;</div>`;
    const $ = s => el.querySelector(s);
    const list = () => { $('#pList').innerHTML = INBOX.map(m => `<button class="em-item ${ans[m.id] ? (ans[m.id] === 'ok' ? 'r-ok' : 'r-bad') : ''}" data-m="${m.id}"><b>${e(m.from)}</b><span>${e(m.subj)}</span></button>`).join('') + `<div class="em-sc">Đúng ${Object.values(ans).filter(x => x === 'ok').length} / ${Object.keys(ans).length}</div>`; };
    function open(id) {
      const m = INBOX.find(x => x.id === id); const done = ans[id];
      el.querySelectorAll('.em-item').forEach(b => b.classList.toggle('on', +b.dataset.m === id));
      $('#pView').innerHTML = `<div class="em-h"><div class="em-subj">${e(m.subj)}</div><div class="em-from"><b>${e(m.from)}</b> <span class="${done && !m.safe ? 'em-sign' : ''}" data-n="1">&lt;${e(m.addr)}&gt;</span></div></div>
        <div class="em-txt ${done ? 'reveal' : ''}">${m.body}</div>
        <div class="em-act">${done ? `<div class="em-why ${m.safe ? 'safe' : 'bad'}"><b>${m.safe ? '✅ Email AN TOÀN' : '⚠️ Email NGUY HIỂM'}</b><ol>${m.why.map(w => `<li>${w}</li>`).join('')}</ol></div>`
          : `<button class="bgbtn green" data-a="1">✅ An toàn</button><button class="bgbtn red" data-a="0">⚠️ Nguy hiểm</button>`}</div>`;
      $('#pView').dataset.id = id;
    }
    el.addEventListener('click', ev => {
      const it = ev.target.closest('[data-m]'); if (it) return open(+it.dataset.m);
      const a = ev.target.closest('[data-a]');
      if (a) {
        const id = +$('#pView').dataset.id; const m = INBOX.find(x => x.id === id); const ok = (a.dataset.a === '1') === m.safe;
        ans[id] = ok ? 'ok' : 'bad'; list(); open(id);
        $('#pEx').innerHTML = `<span class="big ${ok ? 'bg-ok' : 'bg-bad'}">${ok ? '✔ Đoán đúng!' : '✘ Chưa đúng!'}</span>${m.safe ? 'Email này an toàn.' : 'Các <b>dấu hiệu nguy hiểm</b> được đánh số đỏ trong email.'}`;
      }
      if (ev.target.closest('.em-link')) { ev.preventDefault(); $('#pEx').innerHTML = '<span class="big bg-bad">🛑 Dừng lại!</span>Đừng bấm vào đường link trong email lạ. Hãy rê chuột lên để xem địa chỉ thật trước.'; }
    });
    el.addEventListener('mouseover', ev => { const l = ev.target.closest('.em-link'); $('#pStatus').textContent = l ? '🔗 Địa chỉ thật: ' + l.dataset.real : ' '; });
    list();
  }
})();
