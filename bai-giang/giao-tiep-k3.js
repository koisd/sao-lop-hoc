/* Bài Khối 3: Giao tiếp & làm việc nhóm — lời chào email, chọn cách liên lạc, sự thật / ý kiến, cộng tác */
(() => {
  BG.add({
    id: 'giao-tiep-k3', icon: '💬', khoi: [3], title: 'Giao tiếp & làm việc nhóm', desc: 'Trò xếp nhóm: sự thật hay ý kiến, việc nào là cộng tác tốt.',
    topics: ['LV1 GM1 · CĐ 18: Sự thật (facts)', 'LV1 GM1 · CĐ 19: Cộng tác là gì?', 'LV1 GM1 · CĐ 20: Mục tiêu của cộng tác',
      'LV1 GM2 · CĐ 22: Ý kiến (opinions)', 'LV1 GM2 · CĐ 23: Cộng tác kỹ thuật số', 'LV1 GM2 · CĐ 24: Không phải mục tiêu cộng tác'],
    tip: '<b>Sự thật</b> = đúng với mọi người, kiểm tra được. <b>Ý kiến</b> = suy nghĩ, cảm nhận riêng (thường có chữ “rất”, “tuyệt vời”, “đẹp”, “nguy hiểm”). Câu “Nhảy dù rất nguy hiểm” trong đề là <b>ý kiến</b>.',
    render(root) {
      BG.modes(root, [
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
