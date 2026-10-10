/* Bài Khối 3: Giữ gìn thiết bị & sức khỏe — sạc pin an toàn, điều làm hỏng máy, tư thế ngồi, cân bằng thời gian màn hình */
(() => {
  BG.add({
    id: 'suc-khoe-k3', icon: '🔋', khoi: [3], title: 'Giữ gìn thiết bị & sức khỏe', desc: 'Sạc pin ở đâu cho an toàn, điều gì làm hỏng máy, ngồi đúng tư thế, cân bằng thời gian dùng màn hình.',
    topics: ['LV1 GM1 · CĐ 21: Cân bằng phương tiện', 'LV1 GM1 · CĐ 23: Điều làm hỏng thiết bị', 'LV1 GM1 · CĐ 24: Công thái học (tư thế)', 'LV1 GM1 · CĐ 28: Sạc thiết bị an toàn',
      'LV1 GM2 · CĐ 4: Nơi sạc điện thoại', 'LV1 GM2 · CĐ 27: Điều làm hỏng laptop'],
    tip: '<b>Công thái học</b> = ngồi đúng tư thế để không mỏi, không đau lưng, hại mắt. Cho cả lớp đứng dậy làm theo: chân chạm sàn, lưng thẳng, thả lỏng vai.<br>Trong đề, <b>ngón tay</b> cũng được tính là thứ làm hỏng thiết bị (ngón tay bẩn, ấn mạnh, cào lên màn hình).',
    render(root) {
      BG.modes(root, [
        { id: 'sac', label: '🔌 Sạc pin ở đâu?', run: el => BG.yesNo(el, {
          intro: '<span class="big">Sạc pin an toàn</span>Đặt máy trên <b>mặt phẳng, khô ráo, thoáng mát</b>, gần ổ cắm, dùng <b>đúng bộ sạc đi kèm</b> máy.',
          rows: [
            { ic: '✅', text: 'Trên bề mặt phẳng, nơi không có thức ăn, nước hay nhiệt độ quá cao', yes: true },
            { ic: '🛏️', text: 'Dưới chăn của một chiếc giường', yes: false, why: 'Bị bí hơi, máy nóng lên có thể gây cháy.' },
            { ic: '🧍', text: 'Trên sàn nhà, dùng bộ sạc của người lạ', yes: false, why: 'Sạc lạ có thể không hợp, làm hỏng pin.' },
            { ic: '☀️', text: 'Để ngoài trời, sạc dưới nắng gắt', yes: false, why: 'Nắng nóng làm pin nóng, dễ hỏng.' },
            { ic: '🔌', text: 'Đặt trên sàn, cắm cáp sạc của một thiết bị khác', yes: false, why: 'Phải dùng sạc đi kèm với máy.' },
            { ic: '🏠', text: 'Đặt ở nơi an toàn gần ổ cắm, dùng cáp sạc đi kèm thiết bị', yes: true, why: 'Đây là cách an toàn nhất.' },
          ] }) },
        { id: 'hong', label: '💥 Điều gì làm hỏng máy?', run: el => BG.sortGame(el, {
          intro: '<span class="big">Máy tính, điện thoại rất “sợ”: nước, đồ ăn, nóng – lạnh, va đập</span>Xếp từng việc vào đúng ô.',
          bins: [{ id: 'hong', label: '💥 Làm hỏng máy' }, { id: 'an', label: '🛡️ Giữ máy an toàn' }],
          items: [
            { ic: '👆', name: 'Ngón tay bẩn, ấn mạnh lên màn hình', bin: 'hong', why: 'Làm bẩn, trầy, hỏng màn hình.' },
            { ic: '🌧️', name: 'Mưa, nước', bin: 'hong', why: 'Nước vào máy gây chập điện.' },
            { ic: '🍕', name: 'Vừa ăn vừa dùng máy', bin: 'hong', why: 'Vụn thức ăn, dầu mỡ rơi vào bàn phím.' },
            { ic: '💻', name: 'Xách laptop bằng màn hình', bin: 'hong', why: 'Bản lề và màn hình dễ gãy.' },
            { ic: '🚗', name: 'Để laptop trong xe quá nóng hoặc quá lạnh', bin: 'hong', why: 'Nóng lạnh quá làm hỏng pin và linh kiện.' },
            { ic: '🎒', name: 'Đựng laptop trong túi có đệm, có dây giữ', bin: 'an', why: 'Đệm chống va đập.' },
            { ic: '🧽', name: 'Lau màn hình bằng khăn mềm, khô', bin: 'an', why: 'Sạch mà không trầy.' },
            { ic: '🤲', name: 'Cầm laptop bằng hai tay ở thân máy', bin: 'an', why: 'Chắc chắn, không gãy bản lề.' },
          ] }) },
        { id: 'ngoi', label: '🪑 Ngồi đúng tư thế', run: el => BG.yesNo(el, {
          intro: '<span class="big">Công thái học = ngồi đúng để không đau lưng, mỏi mắt</span>Cả lớp đứng dậy làm theo nào!',
          top: '<div class="sk-tips">' + [['👣', 'Chân chạm sàn'], ['🧍', 'Lưng thẳng, tựa ghế'], ['😌', 'Thả lỏng vai'], ['👀', 'Mắt cách màn hình 1 gang tay rưỡi trở lên'], ['⏰', 'Ngồi lâu thì đứng dậy, nhìn ra xa']].map(([i, t]) => `<div><span>${i}</span>${t}</div>`).join('') + '</div>',
          rows: [
            { ic: '👣', text: 'Giữ chân trên sàn', yes: true },
            { ic: '🙇', text: 'Cúi người về phía trước để xem màn hình', yes: false, why: 'Cúi lâu sẽ đau cổ, đau lưng, hại mắt.' },
            { ic: '🦵', text: 'Bắt chéo chân dưới bàn làm việc', yes: false, why: 'Ngồi lệch, tê chân, cong lưng.' },
            { ic: '😌', text: 'Thư giãn vai của bạn', yes: true },
          ] }) },
        { id: 'cb', label: '⚖️ Cân bằng', run: el => BG.choose(el, { rounds: [
          { ic: '⚖️', q: '<b>Cân bằng phương tiện truyền thông</b> (media balance) là gì?', opts: [
            { t: 'Dành tất cả thời gian rảnh cho điện thoại', ok: false, why: 'Như vậy là mất cân bằng.' },
            { t: 'Bài trình chiếu có hình ảnh, chữ và âm thanh', ok: false, why: 'Đó là bài trình chiếu đa phương tiện.' },
            { t: 'Dùng thiết bị vừa phải để khỏe mạnh, cân bằng với các hoạt động khác', ok: true, why: 'Còn chơi thể thao, đọc sách, ngủ đủ, chơi với gia đình.' },
          ] },
          { ic: '🌞', q: 'Chiều chủ nhật rảnh, bạn nào đang <b>cân bằng</b>?', opts: [
            { t: 'An chơi game từ trưa tới tối, quên ăn cơm', ok: false, why: 'Quá nhiều thời gian màn hình.' },
            { t: 'Bình xem hoạt hình 30 phút rồi ra sân đá bóng', ok: true, why: 'Có xem, có chơi, có vận động.' },
            { t: 'Chi xem video trên điện thoại tới khuya', ok: false, why: 'Thức khuya hại mắt và sức khỏe.' },
          ] },
        ] }) },
      ]);
    },
  });
})();
