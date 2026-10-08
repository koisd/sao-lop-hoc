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
  const PICS = [['cat', 'Hình 1: Chú mèo'], ['panda', 'Hình 1: Gấu trúc ăn tre'], ['giraffe', 'Hình 1: Hươu cao cổ'], ['tiger', 'Hình 1: Con hổ'], ['laptop', 'Hình 1: Máy tính xách tay'], ['parrot', 'Hình 1: Chim vẹt']];
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

  /* biểu tượng ribbon */
  const I = d => `<svg viewBox="0 0 24 24" width="20" height="20"><path d="${d}" fill="currentColor"/></svg>`;
  const IC = {
    left: I('M3 4h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3z'), center: I('M3 4h18v2H3zm3 4h12v2H6zm-3 4h18v2H3zm3 4h12v2H6z'),
    right: I('M3 4h18v2H3zm6 4h12v2H9zm-6 4h18v2H3zm6 4h12v2H9z'), full: I('M3 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z'),
    ul: I('M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z'),
    ol: I('M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z'),
    close: I('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'),
    search: I('M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'),
    newSlide: '<svg viewBox="0 0 32 32" width="34" height="34"><rect x="3" y="7" width="22" height="16" rx="1" fill="#fff" stroke="#666" stroke-width="1.5"/><rect x="6" y="10" width="12" height="3" fill="#c43e1c"/><rect x="6" y="15" width="16" height="1.6" fill="#999"/><rect x="6" y="18" width="12" height="1.6" fill="#999"/><circle cx="25" cy="23" r="6" fill="#c43e1c"/><path d="M25 20v6M22 23h6" stroke="#fff" stroke-width="2"/></svg>',
    pic: '<svg viewBox="0 0 32 32" width="34" height="34"><rect x="4" y="6" width="24" height="20" rx="2" fill="#e8f0fb" stroke="#666" stroke-width="1.5"/><path d="M6 24l7-8 5 5 3-3 5 6z" fill="#70ad47"/><circle cx="22" cy="12" r="2.5" fill="#ffc000"/></svg>',
    cap: '<svg viewBox="0 0 32 32" width="34" height="34"><rect x="7" y="4" width="18" height="13" rx="1" fill="#e8f0fb" stroke="#666" stroke-width="1.5"/><path d="M9 15l4-5 3 3 2-2 5 4z" fill="#70ad47"/><rect x="5" y="20" width="22" height="7" fill="#fff" stroke="#c43e1c" stroke-width="1.5" stroke-dasharray="2 1.5"/><path d="M8 23.5h16" stroke="#555" stroke-width="1.5"/></svg>',
  };
  /* khung cửa sổ phần mềm (thanh tiêu đề, tab, ribbon, thân, thanh trạng thái) */
  const appWin = o => `<div class="tc-app ${o.cls}">
      <div class="tc-tb"><span class="tc-logo">${o.logo}</span><span class="tc-auto">Tự động lưu <i></i></span><span class="tc-fn">${o.fname} <small>· Đã lưu</small></span>
        <span class="tc-srch">${IC.search} Tìm kiếm</span><span class="tc-wc"><i class="mn"></i><i class="mx"></i><i class="cl">${IC.close}</i></span></div>
      <div class="tc-tabs">${o.tabs.map((t, i) => `<span class="${i === 0 ? 'file' : ''} ${i === 1 ? 'on' : ''}">${t}</span>`).join('')}</div>
      <div class="tc-ribbon ${o.ribCls || ''}">${o.ribbon}</div>
      ${o.body}
      <div class="tc-sb">${o.status}</div></div>`;
  const grp = (label, inner) => `<div class="tc-grp"><div class="tc-gb">${inner}</div><small>${label}</small></div>`;
  const zoom = '— <i class="tc-zm"></i> + &nbsp;100%';

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
      ${appWin({
        cls: 'tc-ppt', fname: 'Bài trình chiếu 1', tabs: ['Tệp', 'Trang đầu', 'Chèn', 'Thiết kế', 'Chuyển tiếp', 'Hoạt hình', 'Trình chiếu', 'Xem'], ribCls: 'tc-tools',
        logo: '<svg viewBox="0 0 24 24" width="18" height="18"><rect x="2" y="3" width="20" height="18" rx="2" fill="#fff"/><rect x="5" y="7" width="9" height="2.5" fill="#c43e1c"/><circle cx="16.5" cy="14" r="3.5" fill="#c43e1c"/><rect x="5" y="12" width="6" height="1.5" fill="#999"/><rect x="5" y="15" width="6" height="1.5" fill="#999"/></svg>',
        ribbon: grp('Trang chiếu', `<button class="tc-big" data-c="reset">${IC.newSlide}<i>Trang chiếu<br>mới</i></button><div class="tc-col"><button class="tc-sm" data-c="title"><b class="tc-T">T</b> Tiêu đề</button></div>`)
          + grp('Phông chữ', `<div class="tc-col"><div class="tc-row2"><span class="tc-dd" style="width:130px">Segoe UI</span><span class="tc-dd" style="width:52px">28</span></div>
              <div class="tc-row2"><button class="tc-ic" data-c="bold" title="In đậm (Ctrl+B)"><b>B</b></button><button class="tc-ic" data-c="italic" title="In nghiêng (Ctrl+I)"><i style="font-family:Georgia,serif">I</i></button><button class="tc-ic" data-c="underline" title="Gạch chân (Ctrl+U)"><u>U</u></button></div></div>`)
          + grp('Đoạn văn', `<div class="tc-col"><div class="tc-row2"><button class="tc-ic" data-c="insertUnorderedList" title="Dấu đầu dòng">${IC.ul}</button><button class="tc-ic" data-c="insertOrderedList" title="Đánh số">${IC.ol}</button></div>
              <div class="tc-row2"><button class="tc-ic" data-c="justifyLeft" title="Căn trái">${IC.left}</button><button class="tc-ic" data-c="justifyCenter" title="Căn giữa">${IC.center}</button><button class="tc-ic" data-c="justifyRight" title="Căn phải">${IC.right}</button><button class="tc-ic" data-c="justifyFull" title="Căn đều">${IC.full}</button></div></div>`)
          + grp('Chèn', `<button class="tc-big" data-c="pic">${IC.pic}<i>Hình<br>ảnh</i></button><button class="tc-big" data-c="caption">${IC.cap}<i>Chú<br>thích</i></button>`),
        body: `<div class="tc-main"><div class="tc-thumbs"><div class="tc-th"><span>1</span><div class="tc-mini"><div class="tc-mini-in" id="tcMini"></div></div></div></div>
          <div class="tc-stage"><div class="tc-slide" id="tcSlide"></div></div></div>`,
        status: `<span>Trang chiếu 1/1</span><span>Tiếng Việt</span><span class="tc-sbr">Ghi chú &nbsp;&nbsp; ${zoom}</span>`,
      })}`;
    const $ = s => el.querySelector(s), S = s => el.querySelector('#tcSlide ' + s);
    /* hình thu nhỏ bên trái: chép nội dung trang chiếu rồi thu nhỏ */
    function mini() {
      const sl = $('#tcSlide'), m = $('#tcMini'); if (!sl || !m) return;
      m.innerHTML = sl.innerHTML.replace(/contenteditable="true"/g, '');
      m.style.width = sl.offsetWidth + 'px'; m.style.height = sl.offsetHeight + 'px';
      m.style.transform = `scale(${m.parentElement.offsetWidth / Math.max(1, sl.offsetWidth)})`;
    }
    function fresh() {
      $('#tcSlide').innerHTML = `<div class="tc-title" contenteditable="true" spellcheck="false" data-ph="Bấm để thêm tiêu đề"></div>
        <div class="tc-row"><div class="tc-text" contenteditable="true" spellcheck="false">Bút chì<br>Thước kẻ<br>Cục tẩy<br>Hộp màu</div>
        <figure class="tc-fig hidden"><img class="tc-pic" alt=""><figcaption contenteditable="true" spellcheck="false" class="hidden">Hình 1: Chú mèo</figcaption></figure></div>`;
      last = S('.tc-text'); mini();
    }
    function setPic() {
      const [f, cap] = PICS[pic++ % PICS.length], img = S('.tc-pic');
      img.onload = mini; img.src = `img/web/${f}.jpg`; img.dataset.f = f; S('.tc-fig figcaption').textContent = cap;
    }
    fresh();
    el.addEventListener('input', mini);
    el.addEventListener('focusin', ev => { if (ev.target.isContentEditable) last = ev.target.closest('[contenteditable]'); });
    el.addEventListener('mousedown', ev => { if (ev.target.closest('.tc-tools button')) ev.preventDefault(); });
    el.addEventListener('click', ev => {
      const b = ev.target.closest('[data-c]'); if (!b) return;
      const c = b.dataset.c; $('#tcEx').innerHTML = EX[c];
      if (c === 'reset') return fresh();
      setTimeout(mini, 30);
      if (c === 'title') { const t = S('.tc-title'); if (!t.textContent.trim()) t.textContent = 'Đồ dùng học tập của em'; t.classList.add('flash'); setTimeout(() => t.classList.remove('flash'), 700); t.focus(); return; }
      if (c === 'pic') { S('.tc-fig').classList.remove('hidden'); setPic(); return; }
      if (c === 'caption') { const f = S('.tc-fig'); f.classList.remove('hidden'); if (!S('.tc-pic').dataset.f) setPic(); f.querySelector('figcaption').classList.remove('hidden'); f.querySelector('figcaption').focus(); return; }
      const target = last && last.isConnected ? last : S('.tc-text');
      const sel = window.getSelection();
      const inside = sel.rangeCount && target.contains(sel.anchorNode) && !sel.isCollapsed;
      target.focus();
      if (!inside) { const r = document.createRange(); r.selectNodeContents(target); sel.removeAllRanges(); sel.addRange(r); }
      document.execCommand(c, false, null);
      if (!inside) sel.collapseToEnd();
      mini();
    });
  }

  function doc(el) {
    let quiz = null, score = 0, asked = 0;
    const ruler = Array.from({ length: 16 }, (_, i) => `<span>${i + 1}</span>`).join('');
    el.innerHTML = `<div class="bg-explain" id="tcDocEx">Bấm vào từng phần của trang tài liệu để biết tên gọi.</div>
      <div class="bg-row"><button class="bgbtn" id="tcQuiz">🎯 Đố vui: tìm đúng phần</button><span id="tcScore" class="nx-score"></span></div>
      ${appWin({
        cls: 'tc-word', fname: 'Chuyen-tham-quan', tabs: ['Tệp', 'Trang đầu', 'Chèn', 'Vẽ', 'Thiết kế', 'Bố trí', 'Tham chiếu', 'Xem lại', 'Xem'],
        logo: '<svg viewBox="0 0 24 24" width="18" height="18"><rect x="2" y="3" width="20" height="18" rx="2" fill="#fff"/><path d="M5 7h14M5 10.5h14M5 14h14M5 17.5h9" stroke="#185abd" stroke-width="1.8"/></svg>',
        ribbon: grp('Phông chữ', `<div class="tc-col"><div class="tc-row2"><span class="tc-dd" style="width:140px">Times New Roman</span><span class="tc-dd" style="width:48px">14</span></div><div class="tc-row2"><span class="tc-ic"><b>B</b></span><span class="tc-ic"><i style="font-family:Georgia,serif">I</i></span><span class="tc-ic"><u>U</u></span></div></div>`)
          + grp('Đoạn văn', `<div class="tc-col"><div class="tc-row2"><span class="tc-ic">${IC.ul}</span><span class="tc-ic">${IC.ol}</span></div><div class="tc-row2"><span class="tc-ic on">${IC.left}</span><span class="tc-ic">${IC.center}</span><span class="tc-ic">${IC.right}</span><span class="tc-ic">${IC.full}</span></div></div>`)
          + grp('Kiểu', `<div class="tc-styles"><span class="on">AaBbCc<small>Bình thường</small></span><span class="h1">AaBbCc<small>Tiêu đề 1</small></span><span class="h0">AaB<small>Tựa đề</small></span></div>`),
        body: `<div class="tc-ruler"><div>${ruler}</div></div><div class="tc-desk">
      <div class="tc-paper">
        <div class="tc-p" data-p="header">Trường Tiểu học · Tin học khối 4</div>
        <div class="tc-p tc-doc-title" data-p="title">Chuyến tham quan Thảo Cầm Viên</div>
        <div class="tc-p tc-doc-h" data-p="heading">1. Những con vật em đã thấy</div>
        <div class="tc-p" data-p="para">Sáng thứ Bảy, lớp em được đi tham quan Thảo Cầm Viên. Em rất vui vì được nhìn thấy nhiều con vật mà trước đây em chỉ thấy trên ti vi.</div>
        <div class="tc-docrow">
          <ul class="tc-p" data-p="list"><li>Hươu cao cổ</li><li>Voi châu Á</li><li>Hổ Đông Dương</li></ul>
          <figure class="tc-docfig"><img class="tc-p tc-docimg" data-p="image" src="img/web/giraffe.jpg" alt="Hươu cao cổ"><figcaption class="tc-p" data-p="caption">Hình 1: Hươu cao cổ đang ăn lá</figcaption></figure>
        </div>
        <div class="tc-docfoot"><span class="tc-p" data-p="footer">Bài viết của Nguyễn Văn An</span><span class="tc-p" data-p="pagenum">Trang 1</span></div>
      </div></div>`,
        status: `<span>Trang 1/1</span><span>62 từ</span><span>Tiếng Việt</span><span class="tc-sbr">Tiêu điểm &nbsp;&nbsp; ${zoom}</span>`,
      })}`;
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
