/* Bài Khối 3: Từ mới — nối từ với nghĩa, lấy đúng các câu "nối" trong đề LV1 GM1 / GM2 */
(() => {
  const GM1 = [
    { title: 'CĐ 1: Tập tin – thư mục – mã QR', pairs: [
      ['📄 Tập tin (Files)', 'Nơi lưu thông tin để chương trình máy tính dùng (một bài văn, một bức ảnh, một bài hát…)'],
      ['🔳 Mã QR (QR Code)', 'Mã gồm các ô vuông đen trắng, máy đọc được, thường chứa địa chỉ trang web (URL)'],
      ['📁 Thư mục (Folders)', 'Chỗ để cất và sắp xếp tập tin, ứng dụng, dữ liệu cho gọn — giống cái cặp hồ sơ'],
    ] },
    { title: 'CĐ 6: Trình duyệt – trang web', pairs: [
      ['🧭 Trình duyệt web (Web Browser)', 'Phần mềm dùng để đi xem các trang trên mạng (Chrome, Edge, Cốc Cốc…)'],
      ['🌐 Trang web (Website)', 'Nhiều trang web gom lại, ai cũng vào được, có chung một tên miền'],
      ['🔎 Công cụ tìm kiếm (Search Engine)', 'Chương trình giúp tìm thông tin trên mạng (Google, Bing…)'],
    ] },
    { title: 'CĐ 15: Email – tin nhắn – gọi video', pairs: [
      ['💬 Tin nhắn trong ứng dụng (In-app messaging)', 'Tin nhắn gửi tới người đang mở và dùng ứng dụng đó'],
      ['📧 Thư điện tử (Email)', 'Thư gửi qua Internet, có thể kèm chữ, hình ảnh và tập tin đính kèm'],
      ['📹 Trò chuyện video (Video chat)', 'Nói chuyện nhìn thấy mặt nhau qua webcam'],
    ] },
    { title: 'CĐ 16: Chọn cách liên lạc', pairs: [
      ['💬 Tin nhắn trong ứng dụng', 'Hỏi bộ phận hỗ trợ trực tuyến về một sản phẩm'],
      ['📧 Email', 'Gửi lịch tập mới cho tất cả mọi người trong đội điền kinh'],
      ['📱 Tin nhắn SMS', 'Báo cho bạn biết là mình sẽ đến muộn'],
    ] },
  ];
  const GM2 = [
    { title: 'CĐ 1: Các loại ứng dụng', pairs: [
      ['🧰 Ứng dụng (Application)', 'Làm được NHIỀU việc khác nhau'],
      ['💽 Ứng dụng máy tính để bàn (Desktop Application)', 'Phải CÀI ĐẶT vào máy tính rồi mới chạy được'],
      ['📱 Ứng dụng (App)', 'Làm MỘT việc thôi, nhẹ, thường chạy trên điện thoại và máy tính bảng'],
    ] },
    { title: 'CĐ 6: Cộng đồng – riêng tư', pairs: [
      ['👨‍👩‍👧‍👦 Cộng đồng kỹ thuật số (Digital Community)', 'Nhóm người nói chuyện với nhau qua Internet vì có chung sở thích'],
      ['🔒 Quyền riêng tư (Privacy)', 'Mức độ thông tin riêng của mình được giữ kín, an toàn khi lên mạng'],
      ['😈 Trò đùa ác ý (Trolling)', 'Cố tình chọc phá người khác bằng bình luận xúc phạm, gây hại'],
    ] },
    { title: 'CĐ 10: Tìm kiếm – trang web', pairs: [
      ['🔎 Công cụ tìm kiếm (Search Engine)', 'Chương trình giúp tìm thông tin trên mạng'],
      ['📃 Trang web (Web Page)', 'Một trang tài liệu mở ra xem được bằng trình duyệt'],
      ['📚 Nghiên cứu (Research)', 'Thu thập thông tin về một chủ đề'],
    ] },
    { title: 'CĐ 15: Tài liệu – định dạng', pairs: [
      ['📄 Tài liệu (Document)', 'Tập tin làm bằng một phần mềm và được sửa bằng chính phần mềm đó'],
      ['🎨 Định dạng (Formatting)', 'Cách chữ và thông tin trông ra sao khi in hoặc hiện trên màn hình'],
      ['🔤 Phông chữ (Font)', 'Kiểu chữ: quyết định hình dạng, cỡ, dáng của chữ và số'],
      ['🖼️ Hình ảnh (Image)', 'Bức ảnh hoặc hình vẽ được lưu trong máy'],
      ['📽️ Trình chiếu (Presentation)', 'Phần mềm dùng để chiếu thông tin thành từng trang cho mọi người xem'],
    ] },
    { title: 'CĐ 17: Phím đặc biệt', pairs: [
      ['⇪ Caps Lock', 'Bật lên thì gõ ra CHỮ HOA liên tục'],
      ['⌫ Backspace / Delete', 'Xóa chữ ở trước / ở sau con trỏ'],
      ['↵ Enter', 'Đưa con trỏ xuống đầu dòng mới; cũng dùng để đồng ý một lệnh'],
      ['⎋ Esc', 'Phím góc trên bên trái, dùng để hủy hoặc đóng một việc đang làm'],
      ['↹ Tab', 'Nhảy sang mục tiếp theo, hoặc lùi chữ vào vài khoảng trống'],
    ] },
    { title: 'CĐ 21: Các phần của email', pairs: [
      ['👋 Lời chào (Greeting)', 'Câu đầu tiên người đọc thấy; trang trọng hay thân mật tùy người nhận'],
      ['👤 Người nhận (Recipient)', 'Người nhận thư — địa chỉ email gõ vào ô "Đến" (To:)'],
      ['🏷️ Dòng chủ đề (Subject)', 'Vài chữ cho biết thư nói về chuyện gì'],
      ['📝 Nội dung thư (Message Body)', 'Nơi viết những điều mình muốn nói'],
    ] },
    { title: 'CĐ 25: Tư thế – mật khẩu', pairs: [
      ['🧍 Tư thế (Posture)', 'Cách giữ đầu, cổ, lưng khi đứng, ngồi hoặc nằm'],
      ['🪪 Dữ liệu cá nhân (Personal Data)', 'Thông tin cho biết mình là ai: địa chỉ nhà, số điện thoại…'],
      ['🔑 Mật khẩu (Password)', 'Dãy ký tự bí mật để chứng minh "đúng là mình" khi đăng nhập'],
      ['📺 Thời gian màn hình (Screentime)', 'Thời gian ngồi trước màn hình: xem TV, dùng máy tính, điện thoại'],
    ] },
    { title: 'CĐ 30: Các loại máy tính', pairs: [
      ['📱 Điện thoại thông minh', 'Có màn hình cảm ứng, vào được Internet, có hệ điều hành'],
      ['🖥️ Máy tính để bàn', 'Đặt cố định trên bàn vì to và phải cắm điện'],
      ['📟 Máy tính bảng', 'Cỡ giữa điện thoại và laptop, màn hình cảm ứng, vào được Internet'],
      ['💻 Máy tính xách tay (Laptop)', 'Mang đi nhiều nơi được, chạy bằng pin hoặc cắm điện'],
      ['🖥️ Máy tính tất cả trong một (All-in-One)', 'Thùng máy và màn hình gộp chung thành MỘT khối'],
    ] },
  ];

  BG.add({
    id: 'tu-moi-k3', icon: '📖', khoi: [3], title: 'Từ mới – nối từ', desc: 'Nối từ tiếng Anh/Việt với nghĩa của nó, đúng các câu “Ghép thuật ngữ” trong đề.',
    topics: [...GM1.map(s => 'LV1 GM1 · ' + s.title), ...GM2.map(s => 'LV1 GM2 · ' + s.title)],
    tip: 'Mỗi nút trên cùng là một câu “ghép” trong đề. Gọi HS lên bấm từ rồi bấm nghĩa; nối đúng thì hai ô cùng màu. Nghĩa đã được viết lại cho dễ hiểu nhưng giữ đúng ý đáp án của đề.',
    render(root) {
      BG.modes(root, [
        { id: 'g1', label: '📘 GM1', run: el => BG.match(el, GM1) },
        { id: 'g2', label: '📗 GM2', run: el => BG.match(el, GM2) },
      ]);
    },
  });
})();
