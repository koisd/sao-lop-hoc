/* Bài Khối 3: Giao tiếp & làm việc nhóm — lời chào email, chọn cách liên lạc, sự thật / ý kiến, cộng tác */
(() => {
  BG.add({
    id: 'giao-tiep-k3', icon: '💬', khoi: [3], title: 'Giao tiếp & làm việc nhóm', desc: 'Chào thầy cô hay chào bạn trong email, chọn cách liên lạc phù hợp, sự thật hay ý kiến, cộng tác.',
    topics: ['LV1 GM1 · CĐ 14: Lời chào gửi thầy cô', 'LV1 GM1 · CĐ 16: Chọn cách liên lạc', 'LV1 GM1 · CĐ 18: Sự thật (facts)', 'LV1 GM1 · CĐ 19: Cộng tác là gì?', 'LV1 GM1 · CĐ 20: Mục tiêu của cộng tác',
      'LV1 GM2 · CĐ 18: Lời chào gửi bạn thân', 'LV1 GM2 · CĐ 19: Truyền thông kỹ thuật số', 'LV1 GM2 · CĐ 20: Liên hệ hỗ trợ khách hàng', 'LV1 GM2 · CĐ 22: Ý kiến (opinions)', 'LV1 GM2 · CĐ 23: Cộng tác kỹ thuật số', 'LV1 GM2 · CĐ 24: Không phải mục tiêu cộng tác'],
    tip: '<b>Sự thật</b> = đúng với mọi người, kiểm tra được. <b>Ý kiến</b> = suy nghĩ, cảm nhận riêng (thường có chữ “rất”, “tuyệt vời”, “đẹp”, “nguy hiểm”). Câu “Nhảy dù rất nguy hiểm” trong đề là <b>ý kiến</b>.',
    render(root) {
      BG.modes(root, [
        { id: 'chao', label: '👋 Lời chào trong email', run: el => BG.choose(el, { rounds: [
          { ic: '👩‍🏫', q: 'Em gửi email cho <b>thầy cô giáo</b>. Lời chào nào phù hợp nhất?', opts: [
            { t: 'Chào! Thế nào rồi? (Hey! How’s it going?)', ok: false, why: 'Quá suồng sã với thầy cô.' },
            { t: 'Thưa giáo sư, / Kính gửi thầy cô, (Dear Professor,)', ok: true, why: 'Gửi người lớn, thầy cô thì chào lễ phép, trang trọng.' },
            { t: 'Khi nào nhiệm vụ đến hạn?', ok: false, why: 'Đây là câu hỏi, không phải lời chào.' },
          ] },
          { ic: '🧒', q: 'Em gửi email cho <b>bạn thân nhất</b>. Lời chào nào phù hợp nhất?', opts: [
            { t: 'Thưa giáo sư, (Dear Professor,)', ok: false, why: 'Bạn thân không phải giáo sư.' },
            { t: 'Có phải là Xuân không? (Is this Xuan?)', ok: false, why: 'Bạn thân thì em biết rồi, không cần hỏi vậy.' },
            { t: 'Chào! Thế nào rồi? (Hey! How’s it going?)', ok: true, why: 'Với bạn thân thì chào thân mật, vui vẻ.' },
          ] },
        ] }) },
        { id: 'cach', label: '📨 Chọn cách liên lạc', run: el => BG.choose(el, { rounds: [
          { ic: '⏰', q: 'Em muốn báo cho bạn biết là em <b>sẽ đến muộn</b>. Dùng cách nào?', opts: [
            { t: '📱 Tin nhắn SMS', ok: true, why: 'Ngắn, nhanh, bạn đọc ngay.' },
            { t: '📧 Email', ok: false, why: 'Bạn có thể chưa mở email kịp.' },
            { t: '✉️ Viết thư gửi bưu điện', ok: false, why: 'Mấy ngày sau mới tới!' },
          ] },
          { ic: '🏃', q: 'Gửi <b>lịch tập mới</b> cho tất cả mọi người trong đội điền kinh. Dùng cách nào?', opts: [
            { t: '📧 Email', ok: true, why: 'Gửi một lần cho nhiều người, kèm được tập tin lịch.' },
            { t: '📹 Gọi video từng người', ok: false, why: 'Mất thời gian, không lưu lại được lịch.' },
            { t: '💬 Tin nhắn trong ứng dụng hỗ trợ', ok: false, why: 'Dùng để hỏi bộ phận hỗ trợ sản phẩm.' },
          ] },
          { ic: '🛠️', q: 'Liên hệ <b>bộ phận hỗ trợ khách hàng</b> để hỏi về một sản phẩm. Cách nào hiệu quả nhất?', opts: [
            { t: '💬 Trò chuyện trực tiếp (Live Chat) / tin nhắn trong ứng dụng', ok: true, why: 'Hỏi gì được trả lời ngay.' },
            { t: '📺 Hội nghị truyền hình (Video Conferencing)', ok: false, why: 'Dùng cho họp nhiều người.' },
            { t: '✉️ Viết một bức thư', ok: false, why: 'Rất lâu mới có trả lời.' },
          ] },
          { ic: '👵', q: 'Bà ở quê muốn <b>nhìn thấy mặt</b> em và nói chuyện. Dùng cách nào?', opts: [
            { t: '📹 Trò chuyện video (Video chat)', ok: true, why: 'Nhìn thấy mặt nhau qua camera.' },
            { t: '📱 Tin nhắn SMS', ok: false, why: 'Chỉ có chữ.' },
            { t: '📧 Email', ok: false, why: 'Không thấy mặt, không nói chuyện trực tiếp.' },
          ] },
          { ic: '🤔', q: 'Cái nào <b>KHÔNG phải</b> truyền thông kỹ thuật số (giao tiếp qua thiết bị điện tử)?', opts: [
            { t: '📹 Trò chuyện video', ok: false, why: 'Có — dùng thiết bị và Internet.' },
            { t: '📧 Thư điện tử (email)', ok: false, why: 'Có — gửi qua Internet.' },
            { t: '✉️ Thư viết tay gửi qua bưu điện', ok: true, why: 'Viết bằng giấy bút, không dùng thiết bị số.' },
          ] },
        ] }) },
        { id: 'su-that', label: '🧐 Sự thật hay ý kiến?', run: el => BG.sortGame(el, {
          intro: '<span class="big">✅ Sự thật = đúng với MỌI người · 💭 Ý kiến = suy nghĩ của MỘT người</span>Mẹo: câu có chữ “rất”, “tuyệt vời”, “đẹp nhất”, “dễ thương”… thường là ý kiến.',
          bins: [{ id: 'that', label: '✅ Sự thật' }, { id: 'y', label: '💭 Ý kiến' }],
          items: [
            { ic: '🕛', name: 'Có 24 giờ trong một ngày', bin: 'that', why: 'Ai đếm cũng ra 24 giờ.' },
            { ic: '🪂', name: 'Nhảy dù rất nguy hiểm', bin: 'y', why: 'Có người thấy nguy hiểm, có người thấy thú vị.' },
            { ic: '🌈', name: 'Thật là một ngày tuyệt vời', bin: 'y', why: 'Là cảm nhận của người nói.' },
            { ic: '📅', name: 'Một tuần có 7 ngày', bin: 'that', why: 'Đúng với mọi người.' },
            { ic: '🏛️', name: 'Hà Nội là thủ đô của Việt Nam', bin: 'that', why: 'Kiểm tra được.' },
            { ic: '🐱', name: 'Mèo dễ thương hơn chó', bin: 'y', why: 'Bạn khác có thể thích chó hơn.' },
            { ic: '💻', name: 'Môn Tin học vui nhất', bin: 'y', why: 'Là ý thích riêng.' },
            { ic: '🐔', name: 'Con gà có hai chân', bin: 'that', why: 'Nhìn là kiểm tra được.' },
          ] }) },
        { id: 'ct', label: '🤝 Cộng tác', run: el => BG.sortGame(el, {
          intro: '<span class="big">🤝 Cộng tác = mọi người cùng làm việc với nhau để hoàn thành một nhiệm vụ</span>Việc nào giúp nhóm cộng tác tốt?',
          bins: [{ id: 'dung', label: '✅ Cộng tác tốt' }, { id: 'sai', label: '❌ Không phải cộng tác' }],
          items: [
            { ic: '🎯', name: 'Làm việc cùng nhau để đạt kết quả chung', bin: 'dung', why: 'Mục tiêu của cộng tác.' },
            { ic: '💡', name: 'Chia sẻ ý tưởng và kiến thức', bin: 'dung', why: 'Mục tiêu của cộng tác.' },
            { ic: '📋', name: 'Đặt mục tiêu mà cả nhóm đều hiểu', bin: 'dung', why: 'Phần quan trọng của cộng tác kỹ thuật số.' },
            { ic: '🙊', name: 'Giữ kín ý tưởng của mình', bin: 'sai', why: 'Không chia sẻ thì nhóm không làm cùng nhau được.' },
            { ic: '📣', name: 'Thuyết phục mọi người phải theo ý mình', bin: 'sai', why: 'Cộng tác là lắng nghe nhau.' },
            { ic: '🏆', name: 'Tranh nhau điểm cao nhất lớp', bin: 'sai', why: 'Đó là cạnh tranh, không phải cộng tác.' },
            { ic: '👑', name: 'Một bạn ra lệnh cho cả nhóm phải làm gì', bin: 'sai', why: 'Cả nhóm cùng bàn bạc mới là cộng tác.' },
          ] }) },
      ]);
    },
  });
})();
