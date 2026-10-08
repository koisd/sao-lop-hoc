/* Bài: Thiết bị nhập – xuất (trò chơi phân loại) + thiết bị có camera */
(() => {
  const DEV = [
    ['⌨️', 'Bàn phím', 'in', 'Em gõ chữ → chữ đi VÀO máy tính.'],
    ['🖱️', 'Chuột', 'in', 'Em di chuyển, bấm chuột → ra lệnh VÀO máy tính.'],
    ['🎤', 'Micro', 'in', 'Thu giọng nói của em đưa VÀO máy.'],
    ['📷', 'Webcam', 'in', 'Thu hình ảnh của em đưa VÀO máy.'],
    ['📠', 'Máy quét (scanner)', 'in', 'Quét tờ giấy thành hình đưa VÀO máy.'],
    ['🎮', 'Tay cầm chơi game', 'in', 'Bấm nút để điều khiển → lệnh đi VÀO máy.'],
    ['🖥️', 'Màn hình', 'out', 'Máy tính hiện hình ảnh RA cho em xem.'],
    ['🔊', 'Loa', 'out', 'Máy tính phát âm thanh RA cho em nghe.'],
    ['🖨️', 'Máy in', 'out', 'Máy tính in chữ, hình RA giấy.'],
    ['🎧', 'Tai nghe', 'out', 'Máy tính phát âm thanh RA tai em.'],
    ['📽️', 'Máy chiếu', 'out', 'Máy tính chiếu hình RA tường / bảng.'],
    ['📱', 'Màn hình cảm ứng', 'both', 'Vừa hiện hình RA (xuất), vừa nhận ngón tay chạm VÀO (nhập).'],
    ['🎧🎤', 'Tai nghe có micro', 'both', 'Loa tai nghe phát tiếng RA (xuất), micro thu giọng VÀO (nhập).'],
  ];
  const BIN = { in: '⬅️ Thiết bị NHẬP', out: '➡️ Thiết bị XUẤT', both: '🔄 Cả NHẬP và XUẤT' };
  const CAM = [['📱', 'Điện thoại', true], ['💻', 'Laptop', true], ['📟', 'Máy tính bảng', true], ['📷', 'Webcam', true], ['📹', 'Camera an ninh', true], ['⌚', 'Đồng hồ thông minh có camera', true],
    ['🖨️', 'Máy in', false], ['🔊', 'Loa', false], ['🖱️', 'Chuột', false], ['⌨️', 'Bàn phím', false]];

  BG.add({
    id: 'nhap-xuat', icon: '🖱️', khoi: [4], title: 'Thiết bị nhập – xuất', desc: 'Trò chơi xếp thiết bị vào đúng nhóm Nhập / Xuất / Cả hai. Thiết bị nào có camera?',
    topics: ['LV2 GM1 · CĐ 2: Thiết bị nhập', 'LV2 GM1 · CĐ 27: Thiết bị nhập và xuất', 'LV2 GM1 · CĐ 28: Thiết bị có camera', 'LV2 GM2 · CĐ 22: Thiết bị có camera', 'LV2 GM2 · CĐ 28: Thiết bị đầu vào'],
    tip: 'Mẹo nhớ: <b>NHẬP = người → máy</b> (đưa thông tin VÀO), <b>XUẤT = máy → người</b> (máy đưa thông tin RA). Gọi từng HS lên: bấm 1 thiết bị rồi bấm vào ô đúng (hoặc kéo thả). Sai thì ô rung và hiện giải thích. Màn hình cảm ứng và tai nghe có micro là “bẫy” hay gặp.',
    render(root) {
      let mode = 'sort';
      const draw = () => {
        root.innerHTML = BG.modeBar([{ id: 'sort', label: '🧩 Xếp thiết bị' }, { id: 'cam', label: '📷 Thiết bị nào có camera?' }], mode) + '<div id="nxBody" class="bg-body"></div>';
        (mode === 'sort' ? sortGame : camGame)(root.querySelector('#nxBody'));
      };
      root.addEventListener('click', ev => { const m = ev.target.closest('[data-mode]'); if (m) { mode = m.dataset.mode; draw(); } });
      draw();
    },
  });

  function sortGame(el) {
    let pool = BG.shuffle(DEV.map((d, i) => i)), placed = {}, sel = null, wrong = 0;
    el.innerHTML = `<div class="bg-explain" id="nxEx"><span class="big">NHẬP = người ➜ máy &nbsp;·&nbsp; XUẤT = máy ➜ người</span>Bấm một thiết bị, rồi bấm vào ô đúng (hoặc kéo thả).</div>
      <div class="nx-pool" id="nxPool"></div>
      <div class="nx-bins">${Object.entries(BIN).map(([k, t]) => `<div class="nx-bin" data-bin="${k}"><h3>${t}</h3><div class="nx-in"></div></div>`).join('')}</div>
      <div class="bg-row"><span id="nxScore" class="nx-score"></span><span style="flex:1"></span><button class="bgbtn soft" id="nxReset">↺ Chơi lại</button></div>`;
    const $ = s => el.querySelector(s);
    const card = (i, cls = '') => { const [ic, n] = DEV[i]; return `<div class="nx-card ${cls}" draggable="true" data-i="${i}"><span>${ic}</span>${n}</div>`; };
    function paint() {
      $('#nxPool').innerHTML = pool.length ? pool.map(i => card(i, sel === i ? 'sel' : '')).join('') : '<div class="nx-done">🎉 Xếp xong hết rồi!</div>';
      el.querySelectorAll('.nx-bin').forEach(b => { b.querySelector('.nx-in').innerHTML = Object.keys(placed).filter(i => placed[i] === b.dataset.bin).map(i => card(+i, 'ok')).join(''); b.classList.toggle('ready', sel !== null); });
      const n = Object.keys(placed).length;
      $('#nxScore').innerHTML = `Đã xếp đúng <b>${n}/${DEV.length}</b> · Sai <b>${wrong}</b> lần`;
    }
    function drop(i, bin) {
      const d = DEV[i]; const binEl = el.querySelector(`[data-bin="${bin}"]`);
      if (d[2] === bin) {
        placed[i] = bin; pool = pool.filter(x => x !== i); sel = null;
        $('#nxEx').innerHTML = `<span class="big bg-ok">✔ Đúng! ${d[0]} ${d[1]} → ${BIN[bin]}</span>${d[3]}`;
      } else {
        wrong++; binEl.classList.remove('bg-shake'); void binEl.offsetWidth; binEl.classList.add('bg-shake');
        $('#nxEx').innerHTML = `<span class="big bg-bad">✘ Chưa đúng. ${d[0]} ${d[1]} không phải “${BIN[bin].replace(/^\S+\s/, '')}”</span>Gợi ý: ${d[3].replace(/VÀO|RA/g, '___')}`;
      }
      paint();
    }
    el.addEventListener('click', ev => {
      const c = ev.target.closest('#nxPool .nx-card'); const b = ev.target.closest('.nx-bin');
      if (c) { sel = sel === +c.dataset.i ? null : +c.dataset.i; return paint(); }
      if (b && sel !== null) return drop(sel, b.dataset.bin);
      if (ev.target.closest('#nxReset')) { pool = BG.shuffle(DEV.map((d, i) => i)); placed = {}; sel = null; wrong = 0; $('#nxEx').innerHTML = '<span class="big">NHẬP = người ➜ máy &nbsp;·&nbsp; XUẤT = máy ➜ người</span>Bấm một thiết bị, rồi bấm vào ô đúng.'; paint(); }
    });
    el.addEventListener('dragstart', ev => { const c = ev.target.closest('#nxPool .nx-card'); if (c) ev.dataTransfer.setData('text', c.dataset.i); });
    el.addEventListener('dragover', ev => { if (ev.target.closest('.nx-bin')) ev.preventDefault(); });
    el.addEventListener('drop', ev => { const b = ev.target.closest('.nx-bin'); const i = ev.dataTransfer.getData('text'); if (b && i !== '') { ev.preventDefault(); drop(+i, b.dataset.bin); } });
    paint();
  }

  function camGame(el) {
    el.innerHTML = `<div class="bg-explain" id="nxCamEx"><span class="big">📷 Thiết bị nào có camera?</span>Đoán trước, rồi bấm vào từng thiết bị để xem đáp án.</div>
      <div class="nx-cam">${BG.shuffle(CAM).map(([ic, n, y]) => `<button class="nx-cc" data-y="${y ? 1 : 0}"><span>${ic}</span>${n}<i></i></button>`).join('')}</div>
      <div class="bg-panel" style="font-size:18px">⚠️ Thiết bị có camera thì <b>có thể chụp ảnh, quay phim</b>. Muốn chụp hay quay người khác phải <b>xin phép</b>. Không dùng camera thì nên <b>che lại hoặc tắt</b>.</div>`;
    el.addEventListener('click', ev => {
      const b = ev.target.closest('.nx-cc'); if (!b) return;
      b.classList.add(b.dataset.y === '1' ? 'yes' : 'no');
      b.querySelector('i').textContent = b.dataset.y === '1' ? '✔ Có camera' : '✘ Không có';
    });
  }
})();
