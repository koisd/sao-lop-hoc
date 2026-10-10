/* Bài Khối 3: An toàn & công dân số — thông tin bí mật, mật khẩu, bạn trên mạng, công dân số, dấu chân số */
(() => {
  const e = BG.esc;
  const EASY = ['123456', '12345678', '123456789', 'password', 'matkhau', 'abc123', 'qwerty', '111111', '000000', 'iloveyou'];

  BG.add({
    id: 'an-toan-k3', icon: '🛡️', khoi: [3], title: 'An toàn & công dân số', desc: 'Thông tin nào không được chia sẻ, mật khẩu mạnh, kết bạn trên mạng, công dân số tích cực, dấu chân số.',
    topics: ['LV1 GM1 · CĐ 4: Dấu chân kỹ thuật số', 'LV1 GM1 · CĐ 5: Công dân số tích cực', 'LV1 GM1 · CĐ 22: Mật khẩu an toàn', 'LV1 GM1 · CĐ 25: Bắt nạt trên mạng',
      'LV1 GM1 · CĐ 26: Thông tin không nên chia sẻ', 'LV1 GM1 · CĐ 29: Kết bạn trên mạng', 'LV1 GM1 · CĐ 30: Trên mạng là mãi mãi',
      'LV1 GM2 · CĐ 7: Công dân số tiêu cực', 'LV1 GM2 · CĐ 8: Email trúng thưởng', 'LV1 GM2 · CĐ 9: Trên mạng là mãi mãi', 'LV1 GM2 · CĐ 26: Bảo mật mật khẩu', 'LV1 GM2 · CĐ 28: Bạn trên mạng'],
    tip: 'Câu hay sai: trong đề, <b>Tuổi</b> cũng là thông tin KHÔNG nên chia sẻ; <b>Họ và tên</b> đứng một mình KHÔNG được tính là dấu chân số (dấu chân số là những gì mình <i>làm</i> trên mạng: bình luận, email đã gửi, ảnh đã đăng). Mật khẩu an toàn = <b>khó đoán</b> với cả người và máy tính (không phải “có cả số và chữ” là đủ).',
    render(root) {
      BG.modes(root, [
        { id: 'tt', label: '🤐 Chia sẻ được không?', run: el => BG.sortGame(el, {
          intro: '<span class="big">Thông tin nào được kể trên mạng?</span>Thông tin giúp người lạ <b>tìm ra em</b> (em ở đâu, bao nhiêu tuổi, sinh ngày nào) thì <b>giữ bí mật</b>.',
          bins: [{ id: 'ok', label: '✅ Chia sẻ được' }, { id: 'no', label: '🚫 KHÔNG chia sẻ' }],
          items: [
            { ic: '🎂', name: 'Ngày sinh', bin: 'no', why: 'Người lạ biết ngày sinh có thể giả làm người quen.' },
            { ic: '🏠', name: 'Địa chỉ nhà', bin: 'no', why: 'Người lạ có thể tìm tới nhà em.' },
            { ic: '🔢', name: 'Tuổi', bin: 'no', why: 'Đề thi tính tuổi là thông tin không nên chia sẻ.' },
            { ic: '📞', name: 'Số điện thoại', bin: 'no', why: 'Người lạ có thể gọi, nhắn tin làm phiền.' },
            { ic: '🔑', name: 'Mật khẩu', bin: 'no', why: 'Mật khẩu chỉ mình em (và bố mẹ) biết.' },
            { ic: '🏫', name: 'Tên trường, lớp em học', bin: 'no', why: 'Người lạ biết chỗ tìm em mỗi ngày.' },
            { ic: '🎨', name: 'Màu em thích', bin: 'ok', why: 'Không giúp ai tìm ra em.' },
            { ic: '🐶', name: 'Con vật em thích', bin: 'ok', why: 'Kể thoải mái.' },
            { ic: '🍜', name: 'Món ăn em thích', bin: 'ok', why: 'Kể thoải mái.' },
            { ic: '📺', name: 'Phim hoạt hình yêu thích', bin: 'ok', why: 'Kể thoải mái.' },
          ] }) },
        { id: 'mk', label: '🔑 Mật khẩu mạnh', run: password },
        { id: 'ban', label: '🤝 Bạn trên mạng', run: el => BG.choose(el, { rounds: [
          { ic: '🤝', q: 'Ai là người <b>an toàn nhất</b> để kết bạn trên mạng?', opts: [
            { t: 'Người lạ nhắn tin trên mạng xã hội xin số điện thoại của em', ok: false, why: 'Người lạ xin thông tin riêng là dấu hiệu nguy hiểm.' },
            { t: 'Người gửi email nói em trúng thưởng, cần gửi thông tin cá nhân', ok: false, why: 'Đây là trò lừa đảo.' },
            { t: 'Bạn học cùng lớp, cuối tuần hay chơi trò chơi trực tuyến với em', ok: true, why: 'Em biết rõ bạn ấy ngoài đời thật.' },
          ] },
          { ic: '🌟', q: 'Ai <b>phù hợp</b> để làm bạn trên mạng?', opts: [
            { t: 'Một người nổi tiếng trên mạng (vlogger, ngôi sao)', ok: false, why: 'Em không quen biết họ ngoài đời.' },
            { t: 'Người nhắn tin trong ứng dụng hỏi thông tin riêng của em', ok: false, why: 'Không bao giờ kể thông tin riêng cho người lạ.' },
            { t: 'Bạn cùng lớp đi học với em và cùng chơi trò chơi vào cuối tuần', ok: true, why: 'Người em quen ngoài đời thật.' },
          ] },
          { ic: '🎁', q: 'Em nhận được email lạ: “Bạn đã TRÚNG THƯỞNG! Hãy gửi tên, địa chỉ, số điện thoại”. Em nên làm gì?', opts: [
            { t: 'Trả lời và gửi thông tin họ hỏi', ok: false, why: 'Kẻ xấu sẽ lấy được thông tin của em.' },
            { t: 'Nói với người lớn rằng em nhận được email giống trò lừa đảo', ok: true, why: 'Luôn hỏi bố mẹ, thầy cô khi gặp điều lạ.' },
            { t: 'Trả lời hỏi thêm thông tin về giải thưởng', ok: false, why: 'Trả lời là cho kẻ xấu biết email của em đang dùng.' },
          ] },
          { ic: '📸', q: 'Bạn em đăng ảnh gia đình em lên mạng. Làm sao để <b>xóa vĩnh viễn</b> ảnh đó khỏi Internet?', opts: [
            { t: 'Lén vào máy tính của bạn để xóa', ok: false, why: 'Vào máy người khác khi chưa được phép là sai.' },
            { t: 'Gửi yêu cầu tới bộ phận hỗ trợ của mạng xã hội', ok: false, why: 'Có thể gỡ bài, nhưng ảnh có thể đã bị người khác lưu lại.' },
            { t: 'Không thể xóa hoàn toàn — Internet là mạng công cộng, đã lên mạng là mãi mãi', ok: true, why: 'Vì vậy phải suy nghĩ thật kỹ trước khi gửi ảnh.' },
            { t: 'Dọa bạn: không gỡ ảnh thì nghỉ chơi', ok: false, why: 'Dọa nạt cũng là cách cư xử không tốt.' },
          ] },
        ] }) },
        { id: 'cd', label: '👍 Công dân số', run: el => BG.sortGame(el, {
          intro: '<span class="big">Công dân số = người dùng mạng</span>👍 Tích cực: tử tế, an toàn, giúp đỡ. 👎 Tiêu cực: làm người khác buồn, gặp nguy hiểm.<br><b>Bắt nạt trên mạng</b> = dùng công nghệ để quấy rối, đe dọa, làm người khác xấu hổ.',
          bins: [{ id: 'tot', label: '👍 Tích cực' }, { id: 'xau', label: '👎 Tiêu cực' }],
          items: [
            { ic: '🚩', name: 'Báo cáo bắt nạt trên mạng', bin: 'tot', why: 'Giúp bảo vệ bạn bị bắt nạt.' },
            { ic: '🧑‍🏫', name: 'Kể với người lớn khi bị bắt nạt trên mạng', bin: 'tot', why: 'Người lớn sẽ giúp em.' },
            { ic: '🔒', name: 'Giữ kín thông tin cá nhân khi lên mạng', bin: 'tot', why: 'Bảo vệ bản thân.' },
            { ic: '💬', name: 'Khen bài vẽ của bạn một cách lịch sự', bin: 'tot', why: 'Lời nói tử tế.' },
            { ic: '🙋', name: 'Xin phép trước khi đăng ảnh của bạn', bin: 'tot', why: 'Tôn trọng người khác.' },
            { ic: '📢', name: 'Chia sẻ tên, địa chỉ của người khác', bin: 'xau', why: 'Làm người khác gặp nguy hiểm.' },
            { ic: '😡', name: 'Viết bình luận gây tổn thương về ai đó', bin: 'xau', why: 'Làm người khác buồn.' },
            { ic: '😈', name: 'Cố tình chọc phá, xúc phạm người khác (trolling)', bin: 'xau', why: 'Đây là trò đùa ác ý.' },
            { ic: '🤳', name: 'Đăng ảnh xấu của bạn để chế giễu', bin: 'xau', why: 'Là bắt nạt trên mạng.' },
          ] }) },
        { id: 'dc', label: '👣 Dấu chân số', run: el => BG.yesNo(el, {
          intro: '<span class="big">👣 Dấu chân số = dấu vết em để lại trên mạng</span>Mỗi lần em <b>bình luận, gửi email, đăng ảnh</b>… là để lại một dấu chân. Dấu chân này rất khó xóa — <b>trên mạng là mãi mãi</b>.',
          rows: [
            { ic: '💬', text: 'Nhận xét của em trên bài đăng của bạn là dấu chân số', yes: true },
            { ic: '📧', text: 'Email em đã gửi là dấu chân số', yes: true },
            { ic: '📸', text: 'Ảnh em đã đăng lên mạng xã hội là dấu chân số', yes: true },
            { ic: '🪪', text: 'Họ và tên của em (đứng một mình) là dấu chân số', yes: false, why: 'Đề không tính — dấu chân số là những việc em LÀM trên mạng.' },
            { ic: '♾️', text: 'Trực tuyến (trên mạng) là mãi mãi', yes: true, why: 'Người khác có thể đã lưu, chụp lại.' },
            { ic: '🗑️', text: 'Em có thể xóa vĩnh viễn tin nhắn, bài đăng xấu khỏi Internet', yes: false, why: 'Không xóa hoàn toàn được.' },
            { ic: '🏠', text: 'Không nên đăng địa chỉ, số điện thoại lên mạng', yes: true },
            { ic: '🔑', text: 'Nên nhắn mật khẩu cho bạn cùng lớp phòng khi em quên', yes: false, why: 'Mật khẩu không đưa cho bạn bè.' },
          ] }) },
      ]);
    },
  });

  function password(el) {
    el.innerHTML = `<div class="bg-explain"><span class="big">🔑 Mật khẩu an toàn = KHÓ ĐOÁN</span>Khó đoán với cả <b>người</b> lẫn <b>máy tính</b>. Gõ thử một mật khẩu (đừng gõ mật khẩu thật nhé!).</div>
      <div class="pw-box"><input class="pw-in" type="text" autocomplete="off" spellcheck="false" placeholder="Gõ thử mật khẩu…"><div class="pw-bar"><i></i></div><div class="pw-lv"></div></div>
      <div class="bg-row">Thử nhanh: ${['123456', 'meocon', 'MeoCon2016', 'M3o-Con!Bay#7'].map(x => `<button class="bgchip" data-pw="${e(x)}">${e(x)}</button>`).join('')}</div>
      <div class="pw-ck"></div><div class="pw-q"></div>`;
    const inp = el.querySelector('.pw-in');
    const check = () => {
      const v = inp.value, low = v.toLowerCase();
      const rules = [
        [v.length >= 8, 'Dài từ 8 ký tự trở lên'],
        [/[A-Z]/.test(v), 'Có chữ HOA'],
        [/[a-z]/.test(v), 'Có chữ thường'],
        [/\d/.test(v), 'Có số'],
        [/[^A-Za-z0-9]/.test(v), 'Có ký hiệu (! @ # - …)'],
        [v && !EASY.includes(low) && !/^(\d)\1+$/.test(v), 'Không phải mật khẩu ai cũng đoán được (123456…)'],
      ];
      const n = v ? rules.filter(r => r[0]).length : 0;
      const lv = !v ? ['', '#ddd', 0] : n <= 2 ? ['😱 Rất dễ đoán', '#d63031', 20] : n <= 4 ? ['😐 Tạm được', '#fdcb6e', 55] : n === 5 ? ['🙂 Khá mạnh', '#00b894', 80] : ['💪 Rất mạnh!', '#00a86b', 100];
      el.querySelector('.pw-bar i').style.cssText = `width:${lv[2]}%;background:${lv[1]}`;
      el.querySelector('.pw-lv').innerHTML = lv[0];
      el.querySelector('.pw-ck').innerHTML = rules.map(([ok, t]) => `<div class="${v && ok ? 'ok' : ''}">${v && ok ? '✔' : '○'} ${t}</div>`).join('');
    };
    inp.addEventListener('input', check);
    el.addEventListener('click', ev => { const b = ev.target.closest('[data-pw]'); if (b) { inp.value = b.dataset.pw; check(); } });
    check();
    BG.yesNo(el.querySelector('.pw-q'), { intro: '<span class="big">Việc nào giúp bảo mật?</span>', rows: [
      { ic: '🤫', text: 'Không chia sẻ mật khẩu với người khác', yes: true },
      { ic: '💾', text: 'Lưu trữ mật khẩu trên máy tính', yes: false, why: 'Người khác dùng máy sẽ thấy.' },
      { ic: '🔑', text: 'Dùng một mật khẩu khác nhau cho mỗi tài khoản', yes: true, why: 'Lộ một cái thì các cái khác vẫn an toàn.' },
      { ic: '🗣️', text: 'Nói mật khẩu cho ai đó để họ cũng dùng được', yes: false },
    ] });
  }
})();
