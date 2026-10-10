/* Bài Khối 3: Giữ gìn thiết bị & sức khỏe — sạc pin an toàn, điều làm hỏng máy, tư thế ngồi, cân bằng thời gian màn hình */
(() => {
  BG.add({
    id: 'suc-khoe-k3', icon: '🔋', khoi: [3], title: 'Giữ gìn thiết bị & sức khỏe', desc: 'Trò xếp nhóm: việc nào làm hỏng máy, việc nào giữ máy an toàn.',
    topics: ['LV1 GM1 · CĐ 23: Điều làm hỏng thiết bị', 'LV1 GM2 · CĐ 27: Điều làm hỏng laptop'],
    tip: 'Trong đề, <b>ngón tay</b> cũng được tính là thứ làm hỏng thiết bị (ngón tay bẩn, ấn mạnh, cào lên màn hình).',
    render(root) {
      BG.modes(root, [
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
      ]);
    },
  });
})();
