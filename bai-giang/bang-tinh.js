/* Bài: Bảng tính & biểu đồ — ô/hàng/cột, công thức SUM, chọn loại biểu đồ phù hợp */
(() => {
  const e = BG.esc;
  const SETS = [
    { id: 'sach', name: '📚 Số sách mỗi bạn đọc', h: ['Tên', 'Số sách'], rows: [['An', 5], ['Bình', 8], ['Chi', 3], ['Dũng', 6], ['Hà', 9]], best: 'bar',
      why: 'So sánh <b>giữa các bạn</b> (các nhóm khác nhau) → dùng <b>biểu đồ cột</b>: cột nào cao nhất là đọc nhiều nhất.' },
    { id: 'nhiet', name: '🌡️ Nhiệt độ 6 tháng', h: ['Tháng', 'Nhiệt độ (°C)'], rows: [['Th1', 26], ['Th2', 27], ['Th3', 29], ['Th4', 31], ['Th5', 30], ['Th6', 28]], best: 'line',
      why: 'Dữ liệu <b>thay đổi theo thời gian</b> (tháng này sang tháng khác) → dùng <b>biểu đồ đường</b>: nhìn là thấy tăng hay giảm.' },
    { id: 'mon', name: '🍜 Món ăn yêu thích của lớp', h: ['Món', 'Số bạn'], rows: [['Phở', 12], ['Cơm tấm', 9], ['Bánh mì', 7], ['Bún bò', 4]], best: 'pie',
      why: 'Muốn xem <b>mỗi phần chiếm bao nhiêu trong cả lớp</b> (phần của tổng thể) → dùng <b>biểu đồ tròn</b>.' },
  ];
  const TYPES = { bar: '📊 Biểu đồ cột', line: '📈 Biểu đồ đường', pie: '🥧 Biểu đồ tròn' };
  const USE = { bar: '<b>Cột</b> dùng để <b>so sánh</b> giữa các nhóm.', line: '<b>Đường</b> dùng để xem <b>thay đổi theo thời gian</b>.', pie: '<b>Tròn</b> dùng để xem <b>phần của tổng thể</b>.' };
  const COLORS = ['#6c4cf1', '#1fa95b', '#f5a700', '#e5484d', '#2f80ed', '#ff7a1c', '#0aa6a6'];

  BG.add({
    id: 'bang-tinh', icon: '📊', khoi: [5], title: 'Bảng tính & biểu đồ', desc: 'Ô – hàng – cột, công thức Tổng. Sửa số thì biểu đồ đổi theo. Chọn loại biểu đồ phù hợp.',
    topics: ['LV3 GM1 · CĐ 15: Phần mềm bảng tính', 'LV3 GM2 · CĐ 21: Biểu đồ so sánh dữ liệu', 'LV3 GM1 · CĐ 29: Dữ liệu, thông tin, kiến thức'],
    tip: 'Bấm vào 1 ô → góc trái hiện <b>tên ô</b> (cột + hàng, vd <b>B3</b>). Sửa số trong cột B → <b>Tổng</b> và <b>biểu đồ</b> tự đổi. Đổi qua 3 bộ dữ liệu, hỏi lớp “nên dùng biểu đồ gì?” rồi mới bấm. Nếu chọn sai loại, web sẽ giải thích vì sao.',
    render(root) {
      let set = JSON.parse(JSON.stringify(SETS[0])), type = 'bar', cell = 'B2';
      root.innerHTML = `<div class="bg-row">${SETS.map((s, i) => `<button class="bgchip" data-set="${i}">${s.name}</button>`).join('')}</div>
        <div class="bg-2col">
          <div class="bg-panel bt-wrap">
            <div class="bt-fx"><span class="bt-nb" id="btNb">B2</span><span class="bt-fxi">fx</span><span id="btFx"></span></div>
            <div id="btGrid"></div>
            <p class="hint">Bấm vào ô số để sửa. Ô = giao của <b>cột</b> (chữ A, B…) và <b>hàng</b> (số 1, 2, 3…).</p>
          </div>
          <div class="bg-panel"><div class="bg-row">${Object.entries(TYPES).map(([k, t]) => `<button class="bgchip" data-type="${k}">${t}</button>`).join('')}</div>
            <div id="btChart" class="bt-chart"></div></div>
        </div>
        <div class="bg-explain" id="btEx"></div>`;
      const $ = s => root.querySelector(s);
      const total = () => set.rows.reduce((a, r) => a + (+r[1] || 0), 0);
      function grid() {
        const n = set.rows.length;
        $('#btGrid').innerHTML = `<table class="bt-t"><tr><th></th><th>A</th><th>B</th></tr>
          <tr><th>1</th><td class="hd" data-cell="A1">${e(set.h[0])}</td><td class="hd" data-cell="B1">${e(set.h[1])}</td></tr>
          ${set.rows.map((r, i) => `<tr><th>${i + 2}</th><td data-cell="A${i + 2}">${e(r[0])}</td><td data-cell="B${i + 2}"><input type="number" value="${r[1]}" data-i="${i}"></td></tr>`).join('')}
          <tr class="sum"><th>${n + 2}</th><td data-cell="A${n + 2}">Tổng</td><td data-cell="B${n + 2}" id="btSum">${total()}</td></tr></table>`;
        sel(cell);
      }
      function sel(c) {
        cell = c; const n = set.rows.length;
        root.querySelectorAll('[data-cell]').forEach(td => td.classList.toggle('on', td.dataset.cell === c));
        $('#btNb').textContent = c;
        const td = root.querySelector(`[data-cell="${c}"]`);
        $('#btFx').textContent = c === `B${n + 2}` ? `=SUM(B2:B${n + 1})` : (td ? (td.querySelector('input') ? td.querySelector('input').value : td.textContent) : '');
      }
      function chart() {
        const W = 520, H = 300, pad = 44, vals = set.rows.map(r => Math.max(0, +r[1] || 0)), max = Math.max(1, ...vals);
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
          svg += set.rows.map((r, i) => `<rect x="320" y="${50 + i * 34}" width="20" height="20" rx="4" fill="${COLORS[i]}"/><text x="348" y="${66 + i * 34}" class="lg">${e(r[0])} (${vals[i]})</text>`).join('');
        } else {
          const n = vals.length, bw = (W - pad * 2) / n, y = v => H - pad - (v / max) * (H - pad * 2);
          for (let k = 0; k <= 4; k++) { const v = max * k / 4, yy = y(v); svg += `<line x1="${pad}" x2="${W - 10}" y1="${yy}" y2="${yy}" class="gl"/><text x="${pad - 8}" y="${yy + 5}" class="ax" text-anchor="end">${Math.round(v)}</text>`; }
          set.rows.forEach((r, i) => { svg += `<text x="${pad + bw * i + bw / 2}" y="${H - pad + 22}" class="ax" text-anchor="middle">${e(r[0])}</text>`; });
          if (type === 'bar') set.rows.forEach((r, i) => { const x = pad + bw * i + bw * .18, yy = y(vals[i]); svg += `<rect x="${x}" y="${yy}" width="${bw * .64}" height="${H - pad - yy}" rx="6" fill="${COLORS[0]}"/><text x="${x + bw * .32}" y="${yy - 6}" class="vl">${vals[i]}</text>`; });
          else { const pts = vals.map((v, i) => `${pad + bw * i + bw / 2},${y(v)}`); svg += `<polyline points="${pts.join(' ')}" fill="none" stroke="${COLORS[1]}" stroke-width="5" stroke-linejoin="round"/>` + vals.map((v, i) => `<circle cx="${pad + bw * i + bw / 2}" cy="${y(v)}" r="7" fill="#fff" stroke="${COLORS[1]}" stroke-width="4"/><text x="${pad + bw * i + bw / 2}" y="${y(v) - 14}" class="vl">${v}</text>`).join(''); }
        }
        $('#btChart').innerHTML = `<div class="bt-ct">${e(set.name.replace(/^\S+\s/, ''))}</div><svg viewBox="0 0 ${W} ${H}">${svg}</svg>`;
        root.querySelectorAll('[data-type]').forEach(b => b.classList.toggle('on', b.dataset.type === type));
        $('#btEx').innerHTML = type === set.best ? `<span class="big bg-ok">✔ ${TYPES[type]} là lựa chọn tốt!</span>${set.why}` : `<span class="big bg-bad">🤔 ${TYPES[type]} chưa phải lựa chọn tốt nhất</span>${USE[type]} ${set.why}`;
      }
      root.addEventListener('click', ev => {
        const s = ev.target.closest('[data-set]'); if (s) { set = JSON.parse(JSON.stringify(SETS[+s.dataset.set])); cell = 'B2'; grid(); chart(); return; }
        const t = ev.target.closest('[data-type]'); if (t) { type = t.dataset.type; chart(); return; }
        const c = ev.target.closest('[data-cell]'); if (c) sel(c.dataset.cell);
      });
      root.addEventListener('focusin', ev => { const c = ev.target.closest('[data-cell]'); if (c) sel(c.dataset.cell); });
      root.addEventListener('input', ev => {
        const i = ev.target.dataset.i; if (i === undefined) return;
        set.rows[+i][1] = Math.max(0, Math.min(999, parseInt(ev.target.value) || 0));
        $('#btSum').textContent = total(); $('#btFx').textContent = ev.target.value; chart();
      });
      grid(); chart();
    },
  });
})();
