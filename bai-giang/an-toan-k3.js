/* Bài Khối 3: An toàn & công dân số — thông tin bí mật, mật khẩu, bạn trên mạng, công dân số, dấu chân số */
(() => {
  const e = BG.esc;
  const EASY = ['123456', '12345678', '123456789', 'password', 'matkhau', 'abc123', 'qwerty', '111111', '000000', 'iloveyou'];

  BG.add({
    id: 'an-toan-k3', icon: '🛡️', khoi: [3], title: 'An toàn & công dân số', desc: 'Thông tin nào không được chia sẻ, thử độ mạnh mật khẩu, công dân số tích cực hay tiêu cực.',
    topics: ['LV1 GM1 · CĐ 5: Công dân số tích cực', 'LV1 GM1 · CĐ 22: Mật khẩu an toàn', 'LV1 GM1 · CĐ 25: Bắt nạt trên mạng', 'LV1 GM1 · CĐ 26: Thông tin không nên chia sẻ',
      'LV1 GM2 · CĐ 7: Công dân số tiêu cực', 'LV1 GM2 · CĐ 26: Bảo mật mật khẩu'],
    tip: 'Câu hay sai: trong đề, <b>Tuổi</b> cũng là thông tin KHÔNG nên chia sẻ; Mật khẩu an toàn = <b>khó đoán</b> với cả người và máy tính (không phải “có cả số và chữ” là đủ).',
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
      ]);
    },
  });

  function password(el) {
    el.innerHTML = `<div class="bg-explain"><span class="big">🔑 Mật khẩu an toàn = KHÓ ĐOÁN</span>Khó đoán với cả <b>người</b> lẫn <b>máy tính</b>. Gõ thử một mật khẩu (đừng gõ mật khẩu thật nhé!).</div>
      <div class="pw-box"><input class="pw-in" type="text" autocomplete="off" spellcheck="false" placeholder="Gõ thử mật khẩu…"><div class="pw-bar"><i></i></div><div class="pw-lv"></div></div>
      <div class="bg-row">Thử nhanh: ${['123456', 'meocon', 'MeoCon2016', 'M3o-Con!Bay#7'].map(x => `<button class="bgchip" data-pw="${e(x)}">${e(x)}</button>`).join('')}</div>
      <div class="pw-ck"></div>`;
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
  }
})();
