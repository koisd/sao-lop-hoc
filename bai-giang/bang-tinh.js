/* Bài: Bảng tính & biểu đồ — ô/hàng/cột, công thức SUM, chọn loại biểu đồ phù hợp */
(() => {
  const e = BG.esc;
  const SETS = [
    { id: 'sach', name: '📚 Số sách mỗi bạn đọc', tab: 'Số sách', h: ['Tên', 'Số sách'], rows: [['An', 5], ['Bình', 8], ['Chi', 3], ['Dũng', 6], ['Hà', 9]], best: 'bar',
      why: 'So sánh <b>giữa các bạn</b> (các nhóm khác nhau) → dùng <b>biểu đồ cột</b>: cột nào cao nhất là đọc nhiều nhất.' },
    { id: 'nhiet', name: '🌡️ Nhiệt độ 6 tháng', tab: 'Nhiệt độ', h: ['Tháng', 'Nhiệt độ (°C)'], rows: [['Th1', 26], ['Th2', 27], ['Th3', 29], ['Th4', 31], ['Th5', 30], ['Th6', 28]], best: 'line',
      why: 'Dữ liệu <b>thay đổi theo thời gian</b> (tháng này sang tháng khác) → dùng <b>biểu đồ đường</b>: nhìn là thấy tăng hay giảm.' },
    { id: 'mon', name: '🍜 Món ăn yêu thích của lớp', tab: 'Món ăn', h: ['Món', 'Số bạn'], rows: [['Phở', 12], ['Cơm tấm', 9], ['Bánh mì', 7], ['Bún bò', 4]], best: 'pie',
      why: 'Muốn xem <b>mỗi phần chiếm bao nhiêu trong cả lớp</b> (phần của tổng thể) → dùng <b>biểu đồ tròn</b>.' },
  ];
  const TYPES = { bar: '📊 Biểu đồ cột', line: '📈 Biểu đồ đường', pie: '🥧 Biểu đồ tròn' };
  const USE = { bar: '<b>Cột</b> dùng để <b>so sánh</b> giữa các nhóm.', line: '<b>Đường</b> dùng để xem <b>thay đổi theo thời gian</b>.', pie: '<b>Tròn</b> dùng để xem <b>phần của tổng thể</b>.' };
  const COLORS = ['#4472c4', '#ed7d31', '#a5a5a5', '#ffc000', '#5b9bd5', '#70ad47', '#264478'];
  const COLS = 'ABCDEFGHIJKLMNOP'.split('');
  const ROWS = 16;
  /* biểu tượng trên ribbon */
  const RIB = {
    bar: '<svg viewBox="0 0 32 32" width="34" height="34"><rect x="4" y="16" width="6" height="12" fill="#4472c4"/><rect x="13" y="8" width="6" height="20" fill="#4472c4"/><rect x="22" y="12" width="6" height="16" fill="#4472c4"/><path d="M2 29h28" stroke="#666" stroke-width="1.5"/></svg>',
    line: '<svg viewBox="0 0 32 32" width="34" height="34"><path d="M2 29h28M3 3v26" stroke="#666" stroke-width="1.5" fill="none"/><polyline points="5,22 12,14 18,18 27,6" fill="none" stroke="#4472c4" stroke-width="3" stroke-linejoin="round"/><circle cx="12" cy="14" r="2.2" fill="#ed7d31"/><circle cx="18" cy="18" r="2.2" fill="#ed7d31"/></svg>',
    pie: '<svg viewBox="0 0 32 32" width="34" height="34"><circle cx="16" cy="16" r="12" fill="#a5a5a5"/><path d="M16 16V4a12 12 0 0 1 11.4 15.7z" fill="#4472c4"/><path d="M16 16l11.4 3.7A12 12 0 0 1 10 26.4z" fill="#ed7d31"/></svg>',
    table: '<svg viewBox="0 0 32 32" width="34" height="34"><rect x="4" y="6" width="24" height="20" fill="#fff" stroke="#666" stroke-width="1.5"/><path d="M4 12h24M4 19h24M12 6v20" stroke="#666" stroke-width="1.5"/><rect x="4" y="6" width="24" height="6" fill="#4472c4" opacity=".35"/></svg>',
    pic: '<svg viewBox="0 0 32 32" width="34" height="34"><rect x="4" y="6" width="24" height="20" rx="2" fill="#e8f0fb" stroke="#666" stroke-width="1.5"/><path d="M6 24l7-8 5 5 3-3 5 6z" fill="#70ad47"/><circle cx="22" cy="12" r="2.5" fill="#ffc000"/></svg>',
    shape: '<svg viewBox="0 0 32 32" width="34" height="34"><circle cx="12" cy="12" r="7" fill="none" stroke="#666" stroke-width="1.5"/><rect x="14" y="14" width="13" height="13" fill="#5b9bd5" opacity=".7"/></svg>',
  };
  const ICO = (d, w = 16) => `<svg viewBox="0 0 24 24" width="${w}" height="${w}"><path d="${d}" fill="currentColor"/></svg>`;

  BG.add({
    id: 'bang-tinh', icon: '📊', khoi: [5], title: 'Bảng tính & biểu đồ', desc: 'Ô – hàng – cột, công thức Tổng. Sửa số thì biểu đồ đổi theo. Chọn loại biểu đồ phù hợp.',
    topics: ['LV3 GM1 · CĐ 15: Phần mềm bảng tính', 'LV3 GM2 · CĐ 21: Biểu đồ so sánh dữ liệu', 'LV3 GM1 · CĐ 29: Dữ liệu, thông tin, kiến thức'],
    tip: 'Bấm vào 1 ô → góc trái hiện <b>tên ô</b> (cột + hàng, vd <b>B3</b>). Sửa số trong cột B → <b>Tổng</b> và <b>biểu đồ</b> tự đổi. Đổi qua 3 bộ dữ liệu (các tab trang tính ở dưới), hỏi lớp “nên dùng biểu đồ gì?” rồi mới bấm nút biểu đồ trên thanh <b>Chèn</b>. Nếu chọn sai loại, web sẽ giải thích vì sao.',
    render(root) {
      let set = JSON.parse(JSON.stringify(SETS[0])), si = 0, type = 'bar', cell = 'B2';
      root.innerHTML = `<div class="bt-app">
          <div class="bt-title"><span class="bt-logo">${RIB.table.replace(/width="34" height="34"/, 'width="18" height="18"')}</span><span class="bt-autosave">Tự động lưu <i></i></span>
            <span class="bt-fname">Bảng tính lớp 5A <small>· Đã lưu</small></span>
            <span class="bt-search">${ICO('M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z', 15)} Tìm kiếm</span>
            <span class="bt-wc"><i class="mn"></i><i class="mx"></i><i class="cl">${ICO('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z', 15)}</i></span></div>
          <div class="bt-tabs">${['Tệp', 'Trang đầu', 'Chèn', 'Bố trí trang', 'Công thức', 'Dữ liệu', 'Xem lại', 'Xem'].map(t => `<span class="${t === 'Chèn' ? 'on' : ''} ${t === 'Tệp' ? 'file' : ''}">${t}</span>`).join('')}</div>
          <div class="bt-ribbon">
            <div class="bt-grp"><div class="bt-gb"><span class="bt-rb dim">${RIB.table}<i>Bảng</i></span></div><small>Bảng</small></div>
            <div class="bt-grp"><div class="bt-gb"><span class="bt-rb dim">${RIB.pic}<i>Ảnh</i></span><span class="bt-rb dim">${RIB.shape}<i>Hình dạng</i></span></div><small>Hình minh họa</small></div>
            <div class="bt-grp"><div class="bt-gb">${Object.keys(TYPES).map(k => `<button class="bt-rb" data-type="${k}" title="${TYPES[k].replace(/^\S+\s/, '')}">${RIB[k]}<i>${{ bar: 'Cột', line: 'Đường', pie: 'Tròn' }[k]}</i></button>`).join('')}</div><small>Biểu đồ</small></div>
          </div>
          <div class="bt-fx"><span class="bt-nb" id="btNb">B2</span><span class="bt-fxb">${ICO('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z', 14)}${ICO('M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z', 14)}<i>fx</i></span><span class="bt-fxv" id="btFx"></span></div>
          <div class="bt-sheet"><div id="btGrid"></div><div class="bt-obj" id="btChart"></div></div>
          <div class="bt-sheets"><span class="bt-nav">◀ ▶</span>${SETS.map((s, i) => `<button class="bt-st" data-set="${i}">${s.tab}</button>`).join('')}<span class="bt-plus">${ICO('M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z', 16)}</span></div>
          <div class="bt-status"><span>Sẵn sàng</span><span class="bt-stat" id="btStat"></span><span class="bt-zoom">— <i></i> + 100%</span></div>
        </div>
        <p class="hint" style="margin:0">Bấm vào ô số ở cột B để sửa. Ô = giao của <b>cột</b> (chữ A, B…) và <b>hàng</b> (số 1, 2, 3…). Các bộ dữ liệu khác nằm ở <b>tab trang tính</b> phía dưới.</p>
        <div class="bg-explain" id="btEx"></div>`;
      const $ = s => root.querySelector(s);
      const total = () => set.rows.reduce((a, r) => a + (+r[1] || 0), 0);
      function grid() {
        const n = set.rows.length;
        const val = (c, r) => {
          if (r === 1) return c === 'A' || c === 'B' ? `<td class="hd" data-cell="${c}1">${e(set.h[c === 'A' ? 0 : 1])}</td>` : `<td data-cell="${c}1"></td>`;
          const i = r - 2;
          if (i < n && c === 'A') return `<td data-cell="A${r}">${e(set.rows[i][0])}</td>`;
          if (i < n && c === 'B') return `<td class="num" data-cell="B${r}"><input type="number" value="${set.rows[i][1]}" data-i="${i}"></td>`;
          if (i === n && c === 'A') return `<td class="sumc" data-cell="A${r}">Tổng</td>`;
          if (i === n && c === 'B') return `<td class="sumc num" data-cell="B${r}" id="btSum">${total()}</td>`;
          return `<td data-cell="${c}${r}"></td>`;
        };
        let h = `<table class="bt-t"><colgroup><col class="rh"><col class="ca"><col class="cb">${COLS.slice(2).map(() => '<col>').join('')}</colgroup>
          <tr><th class="corner"></th>${COLS.map(c => `<th data-col="${c}">${c}</th>`).join('')}</tr>`;
        for (let r = 1; r <= Math.max(ROWS, n + 4); r++) h += `<tr><th data-row="${r}">${r}</th>${COLS.map(c => val(c, r)).join('')}</tr>`;
        $('#btGrid').innerHTML = h + '</table>';
        root.querySelectorAll('[data-set]').forEach((b, i) => b.classList.toggle('on', i === si));
        sel(cell);
      }
      function sel(c) {
        cell = c; const n = set.rows.length;
        root.querySelectorAll('[data-cell]').forEach(td => td.classList.toggle('on', td.dataset.cell === c));
        const col = c[0], row = c.slice(1);
        root.querySelectorAll('[data-col]').forEach(th => th.classList.toggle('hl', th.dataset.col === col));
        root.querySelectorAll('[data-row]').forEach(th => th.classList.toggle('hl', th.dataset.row === row));
        $('#btNb').textContent = c;
        const td = root.querySelector(`[data-cell="${c}"]`);
        $('#btFx').textContent = c === `B${n + 2}` ? `=SUM(B2:B${n + 1})` : (td ? (td.querySelector('input') ? td.querySelector('input').value : td.textContent) : '');
        stat();
      }
      function stat() {
        const n = set.rows.length, m = cell.match(/^B(\d+)$/), r = m ? +m[1] : 0;
        $('#btStat').innerHTML = r >= 2 && r <= n + 2 ? `Tổng (cột B): <b>${total()}</b>` : '';
      }
      function chart() {
        const W = 520, H = 300, pad = 44, vals = set.rows.map(r => Math.max(0, +r[1] || 0)), raw = Math.max(1, ...vals) / 4, mag = Math.pow(10, Math.floor(Math.log10(raw))), step = [1, 2, 2.5, 5, 10].map(k => k * mag).find(k => k >= raw), max = step * 4;
        let svg = '';
        if (type === 'pie') {
          const sum = vals.reduce((a, b) => a + b, 0) || 1; let a0 = -Math.PI / 2; const cx = 170, cy = 150, R = 120;
          vals.forEach((v, i) => {
            const a1 = a0 + v / sum * Math.PI * 2; const large = a1 - a0 > Math.PI ? 1 : 0;
            const p = (a, r = R) => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
            if (v > 0) svg += v === sum ? `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${COLORS[i]}"/>` : `<path d="M${cx},${cy} L${p(a0)} A${R},${R} 0 ${large} 1 ${p(a1)} Z" fill="${COLORS[i]}" stroke="#fff" stroke-width="2"/>`;
            const mid = (a0 + a1) / 2; if (v / sum > .06) svg += `<text x="${cx + R * .62 * Math.cos(mid)}" y="${cy + R * .62 * Math.sin(mid) + 6}" class="pl">${Math.round(v / sum * 100)}%</text>`;
            a0 = a1;
          });
          svg += set.rows.map((r, i) => `<rect x="320" y="${60 + i * 32}" width="14" height="14" fill="${COLORS[i]}"/><text x="342" y="${72 + i * 32}" class="lg">${e(r[0])} (${vals[i]})</text>`).join('');
        } else {
          const n = vals.length, bw = (W - pad * 2) / n, y = v => H - pad - (v / max) * (H - pad * 2);
          for (let k = 0; k <= 4; k++) { const v = max * k / 4, yy = y(v); svg += `<line x1="${pad}" x2="${W - 10}" y1="${yy}" y2="${yy}" class="gl"/><text x="${pad - 8}" y="${yy + 5}" class="ax" text-anchor="end">${+v.toFixed(1)}</text>`; }
          set.rows.forEach((r, i) => { svg += `<text x="${pad + bw * i + bw / 2}" y="${H - pad + 22}" class="ax" text-anchor="middle">${e(r[0])}</text>`; });
          if (type === 'bar') set.rows.forEach((r, i) => { const x = pad + bw * i + bw * .2, yy = y(vals[i]); svg += `<rect x="${x}" y="${yy}" width="${bw * .6}" height="${H - pad - yy}" fill="${COLORS[0]}"/><text x="${x + bw * .3}" y="${yy - 6}" class="vl">${vals[i]}</text>`; });
          else { const pts = vals.map((v, i) => `${pad + bw * i + bw / 2},${y(v)}`); svg += `<polyline points="${pts.join(' ')}" fill="none" stroke="${COLORS[0]}" stroke-width="3.5" stroke-linejoin="round"/>` + vals.map((v, i) => `<circle cx="${pad + bw * i + bw / 2}" cy="${y(v)}" r="5" fill="${COLORS[0]}"/><text x="${pad + bw * i + bw / 2}" y="${y(v) - 12}" class="vl">${v}</text>`).join(''); }
        }
        $('#btChart').innerHTML = `<div class="bt-ct">${e(set.name.replace(/^\S+\s/, ''))}</div><svg viewBox="0 0 ${W} ${H}">${svg}</svg>`;
        root.querySelectorAll('[data-type]').forEach(b => b.classList.toggle('on', b.dataset.type === type));
        $('#btEx').innerHTML = type === set.best ? `<span class="big bg-ok">✔ ${TYPES[type]} là lựa chọn tốt!</span>${set.why}` : `<span class="big bg-bad">🤔 ${TYPES[type]} chưa phải lựa chọn tốt nhất</span>${USE[type]} ${set.why}`;
      }
      root.addEventListener('click', ev => {
        const s = ev.target.closest('[data-set]'); if (s) { si = +s.dataset.set; set = JSON.parse(JSON.stringify(SETS[si])); cell = 'B2'; grid(); chart(); return; }
        const t = ev.target.closest('[data-type]'); if (t) { type = t.dataset.type; chart(); return; }
        const c = ev.target.closest('[data-cell]'); if (c) sel(c.dataset.cell);
      });
      root.addEventListener('focusin', ev => { const c = ev.target.closest('[data-cell]'); if (c) sel(c.dataset.cell); });
      root.addEventListener('input', ev => {
        const i = ev.target.dataset.i; if (i === undefined) return;
        set.rows[+i][1] = Math.max(0, Math.min(999, parseInt(ev.target.value) || 0));
        $('#btSum').textContent = total(); $('#btFx').textContent = ev.target.value; stat(); chart();
      });
      grid(); chart();
    },
  });
})();
