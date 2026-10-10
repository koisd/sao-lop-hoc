/* Bài Khối 3: Văn bản & trình chiếu — chọn đúng công cụ, soạn thử văn bản (cỡ chữ, tô sáng, phím Enter…) */
(() => {
  const KEYS = {
    Enter: ['↵ Enter', 'Xuống dòng, bắt đầu một ĐOẠN MỚI'],
    Backspace: ['⌫ Backspace', 'Xóa chữ ở BÊN TRÁI con trỏ'],
    Delete: ['⌦ Delete', 'Xóa chữ ở BÊN PHẢI con trỏ'],
    CapsLock: ['⇪ Caps Lock', 'Bật/tắt gõ CHỮ HOA liên tục'],
    Tab: ['↹ Tab', 'Lùi chữ vào một khoảng'],
    Escape: ['⎋ Esc', 'Hủy, thoát việc đang làm'],
  };
  BG.add({
    id: 'van-ban-k3', icon: '📄', khoi: [3], title: 'Văn bản & trình chiếu', desc: 'Khi nào dùng văn bản, khi nào dùng trình chiếu. Soạn thử: phóng to chữ, tô sáng, Enter xuống đoạn mới.',
    topics: ['LV1 GM1 · CĐ 11: Làm gì với văn bản?', 'LV1 GM1 · CĐ 12: Khi nào dùng trình chiếu', 'LV1 GM1 · CĐ 13: Phím Enter',
      'LV1 GM2 · CĐ 15: Tài liệu, định dạng, phông chữ', 'LV1 GM2 · CĐ 16: Khi nào dùng văn bản', 'LV1 GM2 · CĐ 17: Các phím đặc biệt'],
    tip: 'Ở phần <b>Soạn thử</b>, gọi HS lên: bôi đen một chữ rồi bấm <b>A+</b> hoặc <b>🖍️ Tô sáng</b>; bấm <b>Enter</b> để thấy đoạn mới. Bấm phím nào thì bảng bên phải sáng phím đó và giải thích.<br>“Đổi mật khẩu email” KHÔNG phải việc làm trong văn bản.',
    render(root) {
      BG.modes(root, [
        { id: 'chon', label: '🎯 Dùng cái nào?', run: el => BG.choose(el, { rounds: [
          { ic: '🎤', q: 'Em sắp <b>phát biểu trước cả lớp</b>, muốn chiếu hình cho mọi người xem. Dùng gì?', opts: [
            { t: '📽️ Bài trình chiếu (presentation)', ok: true, why: 'Chiếu từng trang có hình, chữ to cho người nghe xem.' },
            { t: '📄 Tài liệu văn bản (document)', ok: false, why: 'Văn bản để đọc, không dùng để chiếu khi nói.' },
            { t: '📱 Tin nhắn cho cả nhóm', ok: false, why: 'Tin nhắn để báo tin ngắn.' },
          ] },
          { ic: '✍️', q: 'Em phải <b>viết một bài văn</b> nộp cho cô. Dùng gì?', opts: [
            { t: '📄 Tài liệu văn bản (document)', ok: true, why: 'Viết bài dài, nhiều đoạn thì dùng văn bản.' },
            { t: '📽️ Bài trình chiếu', ok: false, why: 'Trình chiếu dùng khi phát biểu trước người nghe.' },
            { t: '📱 Tin nhắn cho cả nhóm', ok: false, why: 'Tin nhắn không dùng để nộp bài văn.' },
          ] },
          { ic: '📢', q: 'Em muốn <b>báo cho cả nhóm</b>: “Chiều nay 3 giờ họp nhóm nhé!”. Dùng gì?', opts: [
            { t: '📱 Gửi tin nhắn văn bản cho cả nhóm', ok: true, why: 'Báo tin ngắn, nhanh.' },
            { t: '📽️ Làm bài trình chiếu', ok: false, why: 'Quá cầu kỳ cho một câu báo tin.' },
            { t: '📄 Viết tài liệu văn bản', ok: false, why: 'Quá dài dòng.' },
          ] },
        ] }) },
        { id: 'soan', label: '✍️ Soạn thử văn bản', run: editor },
      ]);
    },
  });

  function editor(el) {
    el.innerHTML = `<div class="bg-explain vb-ex"><span class="big">Soạn thử nào!</span>Bôi đen một chữ rồi bấm nút trên thanh công cụ. Bấm phím trên bàn phím thật để xem phím đó làm gì.</div>
      <div class="bg-2col"><div class="vb-doc">
        <div class="vb-tool"><button data-c="bigger" title="Tăng cỡ chữ">A+</button><button data-c="smaller" title="Giảm cỡ chữ">A−</button><button data-c="bold"><b>B</b></button><button data-c="hl">🖍️ Tô sáng</button><button data-c="clear">↺ Viết lại</button></div>
        <div class="vb-page" contenteditable="true" spellcheck="false"></div></div>
        <div class="vb-keys">${Object.entries(KEYS).map(([k, [n, d]]) => `<div data-k="${k}"><b>${n}</b><small>${d}</small></div>`).join('')}</div></div>
      <div class="vb-q"></div>`;
    const page = el.querySelector('.vb-page'), say = (h, d) => { el.querySelector('.vb-ex').innerHTML = `<span class="big">${h}</span>${d}`; };
    const START = '<p>Con mèo nhà em</p><p>Nhà em có một con mèo tên là Mướp. Mướp có bộ lông màu vàng.</p>';
    page.innerHTML = START;
    document.execCommand('defaultParagraphSeparator', false, 'p');
    let size = 3;
    el.addEventListener('mousedown', ev => { if (ev.target.closest('.vb-tool button')) ev.preventDefault(); }); // giữ vùng bôi đen
    el.addEventListener('click', ev => {
      const b = ev.target.closest('.vb-tool button'); if (!b) return;
      const c = b.dataset.c, has = !getSelection().isCollapsed && page.contains(getSelection().anchorNode);
      if (c === 'clear') { page.innerHTML = START; return say('Viết lại từ đầu', 'Thử bôi đen chữ “Con mèo nhà em” rồi bấm A+.'); }
      if (!has) return say('Hãy BÔI ĐEN chữ trước đã!', 'Giữ chuột trái và kéo qua chữ muốn đổi, rồi mới bấm nút.');
      if (c === 'bigger' || c === 'smaller') { size = Math.max(1, Math.min(7, size + (c === 'bigger' ? 1 : -1))); document.execCommand('fontSize', false, size); say(c === 'bigger' ? '✔ Tăng cỡ chữ (font size)' : '✔ Giảm cỡ chữ', 'Chữ to ra / nhỏ lại — đây là <b>định dạng</b> văn bản.'); }
      if (c === 'bold') { document.execCommand('bold'); say('✔ In đậm', 'Chữ đậm hơn để nổi bật.'); }
      if (c === 'hl') { document.execCommand('hiliteColor', false, '#fff176'); say('✔ Tô sáng (highlight)', 'Chữ có nền vàng như bút dạ quang — làm nổi bật ý quan trọng.'); }
    });
    page.addEventListener('keydown', ev => {
      const k = KEYS[ev.key === 'Esc' ? 'Escape' : ev.key]; if (!k) return;
      if (ev.key === 'Tab') { ev.preventDefault(); document.execCommand('insertText', false, '    '); }
      el.querySelectorAll('.vb-keys div').forEach(d => d.classList.toggle('on', d.dataset.k === ev.key));
      say(k[0], k[1]);
    });
    BG.yesNo(el.querySelector('.vb-q'), { intro: '<span class="big">Làm thử giống đề thi</span>', rows: [
      { ic: '🔠', text: 'Với tài liệu văn bản, em có thể tăng kích thước phông chữ (font size)', yes: true },
      { ic: '🖍️', text: 'Với tài liệu văn bản, em có thể làm nổi bật (highlight) chữ', yes: true },
      { ic: '🔑', text: 'Với tài liệu văn bản, em có thể thay đổi mật khẩu email', yes: false, why: 'Đổi mật khẩu email làm trong phần cài đặt email.' },
      { ic: '↵', text: 'Nhấn phím Enter để bắt đầu một đoạn mới', yes: true },
      { ic: '↹', text: 'Nhấn phím Tab để bắt đầu một đoạn mới', yes: false, why: 'Tab chỉ lùi chữ vào.' },
      { ic: '⇪', text: 'Nhấn phím Caps Lock để bắt đầu một đoạn mới', yes: false, why: 'Caps Lock để gõ chữ hoa.' },
    ] });
  }
})();
