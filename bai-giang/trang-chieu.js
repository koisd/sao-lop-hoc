/* Bài: Trang chiếu & văn bản — tiêu đề, định dạng, căn chỉnh, danh sách, chú thích; các phần của tài liệu */
(() => {
  const EX = {
    title: '<span class="big">🔠 Tiêu đề (Title)</span>Dòng chữ <b>to nhất ở đầu trang</b>, cho biết trang này nói về gì. Mỗi trang chiếu nên có 1 tiêu đề ngắn gọn.',
    bold: '<span class="big"><b>B</b> In đậm (Bold)</span>Chữ <b>dày và đậm hơn</b>, để làm nổi bật chữ quan trọng. Phím tắt <b>Ctrl + B</b>.',
    italic: '<span class="big"><i>I</i> In nghiêng (Italic)</span>Chữ <i>nghiêng sang phải</i>. Phím tắt <b>Ctrl + I</b>.',
    underline: '<span class="big"><u>U</u> Gạch chân (Underline)</span>Có <u>đường kẻ dưới chữ</u>. Phím tắt <b>Ctrl + U</b>.',
    justifyLeft: '<span class="big">⬅ Căn trái</span>Các dòng chữ <b>thẳng hàng bên trái</b>. Hay dùng nhất khi viết đoạn văn.',
    justifyCenter: '<span class="big">↔ Căn giữa</span>Chữ nằm <b>ở giữa</b>. Hay dùng cho <b>tiêu đề</b>.',
    justifyRight: '<span class="big">➡ Căn phải</span>Các dòng chữ <b>thẳng hàng bên phải</b>. Ví dụ: ngày tháng, chữ ký.',
    justifyFull: '<span class="big">☰ Căn đều hai bên</span>Chữ <b>thẳng hàng cả trái lẫn phải</b>, nhìn gọn như trang sách.',
    insertUnorderedList: '<span class="big">• Danh sách dấu đầu dòng (Bullet)</span>Mỗi ý bắt đầu bằng <b>dấu chấm tròn</b>. Dùng khi <b>thứ tự không quan trọng</b> — ví dụ: đồ dùng học tập.',
    insertOrderedList: '<span class="big">1. Danh sách đánh số (Numbered)</span>Mỗi ý có <b>số thứ tự 1, 2, 3</b>. Dùng khi <b>thứ tự quan trọng</b> — ví dụ: các bước làm.',
    pic: '<span class="big">🖼 Chèn hình</span>Thêm hình vào trang chiếu cho sinh động. Bấm lại để đổi hình khác.',
    caption: '<span class="big">💬 Chú thích (Caption)</span>Dòng chữ <b>nhỏ ngay dưới hình</b>, giải thích hình đó là gì. Bấm vào chú thích để sửa chữ.',
    reset: 'Đã tạo trang chiếu mới.',
  };
  const PICS = ['🐱', '🐶', '🌻', '🚀', '🦖', '🏫'];
  const PARTS = [
    ['header', 'Đầu trang (Header)', 'Dòng chữ nhỏ ở <b>trên cùng mỗi trang</b>, thường ghi tên trường, tên tài liệu.'],
    ['title', 'Tiêu đề (Title)', 'Tên của cả bài viết, <b>chữ to nhất</b>, nằm đầu tài liệu.'],
    ['heading', 'Tiêu đề phụ (Heading)', 'Tên của <b>từng phần nhỏ</b> trong bài, chữ to vừa.'],
    ['para', 'Đoạn văn (Paragraph)', 'Nhiều câu viết liền nhau về <b>một ý</b>. Hết ý thì xuống dòng sang đoạn mới.'],
    ['list', 'Danh sách (List)', 'Các ý <b>xếp thành từng dòng</b>, có dấu đầu dòng hoặc số thứ tự.'],
    ['image', 'Hình ảnh (Image)', 'Hình minh họa giúp người đọc <b>dễ hiểu hơn</b>.'],
    ['caption', 'Chú thích (Caption)', 'Dòng chữ nhỏ <b>dưới hình</b>, giải thích hình.'],
    ['footer', 'Chân trang (Footer)', 'Dòng chữ nhỏ ở <b>dưới cùng mỗi trang</b>.'],
    ['pagenum', 'Số trang (Page number)', 'Cho biết đây là <b>trang thứ mấy</b>.'],
  ];

  BG.add({
    id: 'trang-chieu', icon: '📝', khoi: [4], title: 'Trang chiếu & văn bản', desc: 'Thử tiêu đề, in đậm, căn chỉnh, danh sách, chú thích. Các phần của một tài liệu.',
    topics: ['LV2 GM1 · CĐ 15: Tiêu đề trang chiếu', 'LV2 GM1 · CĐ 16: Ứng dụng trình chiếu', 'LV2 GM1 · CĐ 17: Danh sách đánh số', 'LV2 GM1 · CĐ 31: Các phần của tài liệu', 'LV2 GM1 · CĐ 32: Định dạng văn bản', 'LV2 GM2 · CĐ 9–13: Trình chiếu, tiêu đề, căn chỉnh, chú thích, dấu đầu dòng', 'LV2 GM2 · CĐ 31: Văn bản và trang chiếu'],
    tip: 'Phần <b>Soạn trang chiếu</b>: bôi đen chữ rồi bấm nút (hoặc không bôi đen thì nút áp dụng cho cả khung đang chọn). So sánh <b>• dấu đầu dòng</b> (đồ dùng học tập — thứ tự không quan trọng) với <b>1. đánh số</b> (các bước — thứ tự quan trọng). Phần <b>Các phần của tài liệu</b>: bấm <b>🎯 Đố vui</b>, gọi HS lên bấm đúng phần được hỏi.',
    render(root) {
      let mode = 'slide';
      const draw = () => {
        root.innerHTML = BG.modeBar([{ id: 'slide', label: '🖥️ Soạn trang chiếu' }, { id: 'doc', label: '📄 Các phần của tài liệu' }], mode) + '<div id="tcBody" class="bg-body"></div>';
        (mode === 'slide' ? slide : doc)(root.querySelector('#tcBody'));
      };
      root.addEventListener('click', ev => { const m = ev.target.closest('[data-mode]'); if (m) { mode = m.dataset.mode; draw(); } });
      draw();
    },
  });

  function slide(el) {
    let last = null, pic = 0;
    el.innerHTML = `<div class="bg-explain" id="tcEx">Bấm vào khung chữ trên trang chiếu, rồi thử các nút trên thanh công cụ.</div>
      <div class="tc-tools">
        <button data-c="title">🔠 Tiêu đề</button><span class="sep"></span>
        <button data-c="bold"><b>B</b></button><button data-c="italic"><i>I</i></button><button data-c="underline"><u>U</u></button><span class="sep"></span>
        <button data-c="justifyLeft" title="Căn trái">⬅</button><button data-c="justifyCenter" title="Căn giữa">↔</button><button data-c="justifyRight" title="Căn phải">➡</button><button data-c="justifyFull" title="Căn đều">☰</button><span class="sep"></span>
        <button data-c="insertUnorderedList">• Dấu đầu dòng</button><button data-c="insertOrderedList">1. Đánh số</button><span class="sep"></span>
        <button data-c="pic">🖼 Hình</button><button data-c="caption">💬 Chú thích</button><span class="sep"></span>
        <button data-c="reset">🗒️ Trang mới</button>
      </div>
      <div class="tc-stage"><div class="tc-slide" id="tcSlide"></div></div>`;
    const $ = s => el.querySelector(s);
    function fresh() {
      $('#tcSlide').innerHTML = `<div class="tc-title" contenteditable="true" spellcheck="false" data-ph="Bấm để thêm tiêu đề"></div>
        <div class="tc-row"><div class="tc-text" contenteditable="true" spellcheck="false">Bút chì<br>Thước kẻ<br>Cục tẩy<br>Hộp màu</div>
        <figure class="tc-fig hidden"><div class="tc-pic"></div><figcaption contenteditable="true" spellcheck="false" class="hidden">Hình 1: Chú mèo con</figcaption></figure></div>`;
      last = $('.tc-text');
    }
    fresh();
    el.addEventListener('focusin', ev => { if (ev.target.isContentEditable) last = ev.target.closest('[contenteditable]'); });
    el.addEventListener('mousedown', ev => { if (ev.target.closest('.tc-tools button')) ev.preventDefault(); });
    el.addEventListener('click', ev => {
      const b = ev.target.closest('[data-c]'); if (!b) return;
      const c = b.dataset.c; $('#tcEx').innerHTML = EX[c];
      if (c === 'reset') return fresh();
      if (c === 'title') { const t = $('.tc-title'); if (!t.textContent.trim()) t.textContent = 'Đồ dùng học tập của em'; t.classList.add('flash'); setTimeout(() => t.classList.remove('flash'), 700); t.focus(); return; }
      if (c === 'pic') { const f = $('.tc-fig'); f.classList.remove('hidden'); $('.tc-pic').textContent = PICS[pic++ % PICS.length]; return; }
      if (c === 'caption') { const f = $('.tc-fig'); f.classList.remove('hidden'); if (!$('.tc-pic').textContent) $('.tc-pic').textContent = PICS[pic++ % PICS.length]; f.querySelector('figcaption').classList.remove('hidden'); f.querySelector('figcaption').focus(); return; }
      const target = last && last.isConnected ? last : $('.tc-text');
      const sel = window.getSelection();
      const inside = sel.rangeCount && target.contains(sel.anchorNode) && !sel.isCollapsed;
      target.focus();
      if (!inside && !/List$/.test(c)) { const r = document.createRange(); r.selectNodeContents(target); sel.removeAllRanges(); sel.addRange(r); }
      if (/List$/.test(c) && !inside) { const r = document.createRange(); r.selectNodeContents(target); sel.removeAllRanges(); sel.addRange(r); }
      document.execCommand(c, false, null);
      if (!inside) sel.collapseToEnd();
    });
  }

  function doc(el) {
    let quiz = null, score = 0, asked = 0;
    el.innerHTML = `<div class="bg-explain" id="tcDocEx">Bấm vào từng phần của trang tài liệu để biết tên gọi.</div>
      <div class="bg-row"><button class="bgbtn" id="tcQuiz">🎯 Đố vui: tìm đúng phần</button><span id="tcScore" class="nx-score"></span></div>
      <div class="tc-paper">
        <div class="tc-p" data-p="header">Trường Tiểu học · Tin học khối 4</div>
        <div class="tc-p tc-doc-title" data-p="title">Chuyến tham quan Thảo Cầm Viên</div>
        <div class="tc-p tc-doc-h" data-p="heading">1. Những con vật em đã thấy</div>
        <div class="tc-p" data-p="para">Sáng thứ Bảy, lớp em được đi tham quan Thảo Cầm Viên. Em rất vui vì được nhìn thấy nhiều con vật mà trước đây em chỉ thấy trên ti vi.</div>
        <div class="tc-docrow">
          <ul class="tc-p" data-p="list"><li>Hươu cao cổ</li><li>Voi châu Á</li><li>Hổ Đông Dương</li></ul>
          <figure class="tc-docfig"><div class="tc-p tc-docimg" data-p="image">🦒</div><figcaption class="tc-p" data-p="caption">Hình 1: Hươu cao cổ đang ăn lá</figcaption></figure>
        </div>
        <div class="tc-docfoot"><span class="tc-p" data-p="footer">Bài viết của Nguyễn Văn An</span><span class="tc-p" data-p="pagenum">Trang 1</span></div>
      </div>`;
    const $ = s => el.querySelector(s);
    const ask = () => { quiz = BG.shuffle(PARTS)[0]; asked++; $('#tcDocEx').innerHTML = `<span class="big">🎯 Bấm vào: ${quiz[1]}</span>`; $('#tcScore').innerHTML = `Đúng <b>${score}</b> / ${asked - 1}`; };
    el.addEventListener('click', ev => {
      if (ev.target.closest('#tcQuiz')) return ask();
      const p = ev.target.closest('[data-p]'); if (!p) return;
      const part = PARTS.find(x => x[0] === p.dataset.p);
      el.querySelectorAll('.tc-p.hl').forEach(x => x.classList.remove('hl', 'wrong')); p.classList.add('hl');
      if (quiz) {
        if (part[0] === quiz[0]) { score++; $('#tcDocEx').innerHTML = `<span class="big bg-ok">✔ Đúng! Đây là ${part[1]}</span>${part[2]} <button class="bgbtn" id="tcQuiz" style="margin-left:8px">Câu tiếp ▶</button>`; quiz = null; $('#tcScore').innerHTML = `Đúng <b>${score}</b> / ${asked}`; }
        else { p.classList.add('wrong'); $('#tcDocEx').innerHTML = `<span class="big bg-bad">✘ Đây là ${part[1]}, chưa phải ${quiz[1]}</span>Thử lại nhé!`; }
        return;
      }
      $('#tcDocEx').innerHTML = `<span class="big">${part[1]}</span>${part[2]}`;
    });
  }
})();
