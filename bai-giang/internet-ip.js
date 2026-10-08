/* Bài: Internet & địa chỉ IP — hành trình vào 1 trang web (DNS = danh bạ), Internet là mạng của các mạng */
(() => {
  const e = BG.esc;
  const SITES = [
    { name: 'www.hocvui.vn', ip: '203.162.4.190', ic: '🎒', title: 'Học Vui' },
    { name: 'www.thuvien.gov.vn', ip: '113.160.12.5', ic: '📚', title: 'Thư viện' },
    { name: 'www.google.com', ip: '142.250.66.46', ic: '🔎', title: 'Google' },
  ];
  const POS = { pc: [9, 70], router: [30, 70], dns: [52, 18], net: [58, 70], server: [88, 70] };

  BG.add({
    id: 'internet-ip', icon: '📡', khoi: [5], title: 'Internet & địa chỉ IP', desc: 'Hoạt hình từng bước: gõ địa chỉ → hỏi danh bạ lấy số IP → dữ liệu chạy tới máy chủ và quay về.',
    topics: ['LV3 GM1 · CĐ 4: Địa chỉ IP', 'LV3 GM2 · CĐ 6: Internet là gì?', 'LV3 GM2 · CĐ 9: Địa chỉ IP', 'LV3 GM1 · CĐ 3: URL (liên hệ URL ↔ IP)'],
    tip: 'Ví dụ danh bạ: <b>URL = TÊN</b> (chữ, người dễ nhớ), <b>IP = SỐ ĐIỆN THOẠI</b> (số, máy tính dùng). Bấm <b>Bước tiếp ▶</b> từng bước và hỏi lớp “bước sau sẽ là gì?”. Phần <b>Mạng của các mạng</b>: cho HS bấm vào 1–2 đường dây để “cắt cáp”, rồi bấm Gửi → dữ liệu tự tìm đường khác; cắt hết đường thì mất mạng. Các số IP trong bài là số ví dụ.',
    render(root) {
      let mode = 'trip';
      const draw = () => {
        root.innerHTML = BG.modeBar([{ id: 'trip', label: '🚀 Hành trình vào trang web' }, { id: 'net', label: '🕸️ Internet = mạng của các mạng' }], mode) + '<div id="ipBody" class="bg-body"></div>';
        (mode === 'trip' ? trip : net)(root.querySelector('#ipBody'));
      };
      root.addEventListener('click', ev => { const m = ev.target.closest('[data-mode]'); if (m) { mode = m.dataset.mode; draw(); } });
      draw();
    },
  });

  function trip(el) {
    let site = SITES[0], step = 0, timers = [], auto = false;
    el.innerHTML = `<div class="bg-row">Chọn trang: ${SITES.map((s, i) => `<button class="bgchip" data-site="${i}">${s.ic} ${s.name}</button>`).join('')}</div>
      <div class="bg-explain" id="ipEx"></div>
      <div class="bg-2col">
        <div class="ip-stage" id="ipStage">
          <svg class="ip-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="9" y1="70" x2="30" y2="70"/><line x1="30" y1="70" x2="58" y2="70"/><line x1="58" y1="70" x2="88" y2="70"/><line x1="30" y1="70" x2="52" y2="18" class="dash"/></svg>
          <div class="ip-node" data-n="pc" style="left:9%;top:70%"><div class="ip-ic">💻</div><b>Máy của em</b><small>IP: 192.168.1.15</small><div class="ip-screen" id="ipScreen"></div></div>
          <div class="ip-node" data-n="router" style="left:30%;top:70%"><div class="ip-ic">📶</div><b>Bộ phát Wi-Fi</b><small>(router)</small></div>
          <div class="ip-node" data-n="dns" style="left:52%;top:18%"><div class="ip-ic">📖</div><b>Danh bạ Internet</b><small>(DNS)</small></div>
          <div class="ip-node" data-n="net" style="left:58%;top:70%"><div class="ip-ic">🌐</div><b>Internet</b></div>
          <div class="ip-node" data-n="server" style="left:88%;top:70%"><div class="ip-ic">🗄️</div><b>Máy chủ</b><small id="ipSrv"></small></div>
          <div id="ipPk"></div>
        </div>
        <div class="bg-panel ip-book"><h3>📖 Danh bạ Internet (DNS)</h3>
          <table><tr><th>TÊN (URL)</th><th>SỐ (địa chỉ IP)</th></tr>${SITES.map(s => `<tr data-row="${s.name}"><td>${s.name}</td><td>${s.ip}</td></tr>`).join('')}</table>
          <p>📱 Giống danh bạ điện thoại:<br><b>URL = TÊN</b> (chữ, người dễ nhớ)<br><b>IP = SỐ ĐIỆN THOẠI</b> (số, máy tính dùng)</p></div>
      </div>
      <div class="bg-row"><button class="bgbtn" id="ipNext">Bước tiếp ▶</button><button class="bgbtn soft" id="ipAuto">⏯ Tự chạy</button><button class="bgbtn soft" id="ipReset">↺ Làm lại</button><span id="ipStepN" class="nx-score"></span></div>`;
    const $ = s => el.querySelector(s);
    const STEPS = [
      () => `<span class="big">Bước 1: Em gõ <u>${site.name}</u> rồi bấm Enter</span>Máy tính chỉ hiểu <b>SỐ</b>, không hiểu chữ. Vậy nó làm sao tìm ra trang web?`,
      () => `<span class="big">Bước 2: Máy hỏi Danh bạ Internet (DNS)</span>“Cho tôi hỏi <b>${site.name}</b> có số mấy?” — giống em tra <b>tên</b> trong danh bạ để lấy <b>số điện thoại</b>.`,
      () => `<span class="big">Bước 3: Danh bạ trả lời: ${site.ip}</span>Dãy số này là <b>địa chỉ IP</b> của máy chủ. Mỗi thiết bị nối mạng đều có 1 địa chỉ IP riêng — máy của em cũng có (192.168.1.15).`,
      () => `<span class="big">Bước 4: Máy gửi yêu cầu tới số ${site.ip}</span>Yêu cầu đi qua <b>bộ phát Wi-Fi</b>, chạy trên <b>Internet</b> tới đúng <b>máy chủ</b> có số IP đó.`,
      () => `<span class="big">Bước 5: Máy chủ gửi trang web về</span>Trang web được chia thành <b>nhiều gói nhỏ 📦</b>, chạy về đúng địa chỉ IP của máy em.`,
      () => `<span class="big">Bước 6: Các gói ghép lại → trang web hiện ra! 🎉</span>Tất cả chỉ mất chưa tới <b>1 giây</b>. Tóm lại: <b>Tên (URL) → Danh bạ (DNS) → Số (IP) → Máy chủ → Trang web</b>.`,
    ];
    const pt = n => POS[n];
    function packet(label, path, cls = '', delay = 0, speed = 650) {
      const pk = document.createElement('div'); pk.className = 'ip-pk ' + cls; pk.innerHTML = label;
      const [x0, y0] = pt(path[0]); pk.style.left = x0 + '%'; pk.style.top = y0 + '%'; pk.style.opacity = 0;
      $('#ipPk').appendChild(pk);
      let t = delay;
      timers.push(setTimeout(() => { pk.style.opacity = 1; }, t));
      path.slice(1).forEach(n => { t += speed; timers.push(setTimeout(() => { const [x, y] = pt(n); pk.style.transition = `left ${speed}ms ease-in-out, top ${speed}ms ease-in-out`; pk.style.left = x + '%'; pk.style.top = y + '%'; }, t - speed + 30)); });
      return t;
    }
    function hl(...ns) { el.querySelectorAll('.ip-node').forEach(n => n.classList.toggle('on', ns.includes(n.dataset.n))); }
    function render() {
      timers.forEach(clearTimeout); timers = []; $('#ipPk').innerHTML = '';
      $('#ipEx').innerHTML = STEPS[step]();
      $('#ipSrv').textContent = step >= 2 ? 'IP: ' + site.ip : 'IP: ?';
      el.querySelectorAll('[data-row]').forEach(r => r.classList.toggle('on', step >= 2 && step <= 3 && r.dataset.row === site.name));
      $('#ipScreen').innerHTML = step === 5 ? `<div class="ip-page">${site.ic} ${site.title}</div>` : `<div class="ip-addr">${site.name}</div>`;
      $('#ipStepN').textContent = `Bước ${step + 1} / ${STEPS.length}`;
      $('#ipNext').disabled = step === STEPS.length - 1;
      let end = 0;
      if (step === 0) hl('pc');
      if (step === 1) { hl('pc', 'dns'); end = packet(`❓ ${site.name.replace('www.', '')} số mấy?`, ['pc', 'router', 'dns'], 'q'); }
      if (step === 2) { hl('dns', 'pc'); end = packet(`📞 ${site.ip}`, ['dns', 'router', 'pc'], 'a'); }
      if (step === 3) { hl('pc', 'server'); end = packet(`📨 gửi tới ${site.ip}`, ['pc', 'router', 'net', 'server'], 'q'); }
      if (step === 4) { hl('server', 'pc'); for (let k = 0; k < 4; k++) end = packet('📦', ['server', 'net', 'router', 'pc'], 'box', k * 260, 600); }
      if (step === 5) hl('pc');
      if (auto && step < STEPS.length - 1) timers.push(setTimeout(() => { step++; render(); }, end + 2200));
      if (auto && step === STEPS.length - 1) { auto = false; $('#ipAuto').textContent = '⏯ Tự chạy'; }
    }
    el.addEventListener('click', ev => {
      const s = ev.target.closest('[data-site]'); if (s) { site = SITES[+s.dataset.site]; step = 0; return render(); }
      if (ev.target.closest('#ipNext') && step < STEPS.length - 1) { step++; render(); }
      if (ev.target.closest('#ipReset')) { step = 0; auto = false; $('#ipAuto').textContent = '⏯ Tự chạy'; render(); }
      if (ev.target.closest('#ipAuto')) { auto = !auto; $('#ipAuto').textContent = auto ? '⏸ Dừng' : '⏯ Tự chạy'; if (auto && step === STEPS.length - 1) step = 0; render(); }
    });
    render();
  }

  function net(el) {
    const N = { A: [70, 210, '🏠', 'Nhà em'], B: [230, 100, '📶', 'Trạm 1'], C: [230, 320, '📶', 'Trạm 2'], D: [430, 60, '🏢', 'Trạm 3'], E: [430, 210, '🏢', 'Trạm 4'], F: [430, 360, '🏢', 'Trạm 5'], H: [630, 120, '🏭', 'Trạm 6'], I: [630, 300, '🏭', 'Trạm 7'], J: [830, 210, '🗄️', 'Máy chủ'] };
    const EDGES = ['AB', 'AC', 'BD', 'BE', 'CE', 'CF', 'DH', 'EH', 'EI', 'FI', 'HJ', 'IJ'];
    const cut = new Set(); let anim = null;
    el.innerHTML = `<div class="bg-explain" id="nwEx"><span class="big">Internet = rất nhiều mạng nối với nhau</span>Bấm <b>📨 Gửi dữ liệu</b> để xem dữ liệu đi từ nhà em tới máy chủ. Bấm vào một <b>đường dây</b> để “cắt cáp” ✂️.</div>
      <div class="bg-panel"><svg class="nw-svg" viewBox="0 0 900 420" id="nwSvg">
        ${EDGES.map(k => { const [a, b] = [N[k[0]], N[k[1]]]; return `<g class="nw-e" data-e="${k}"><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="vis"/><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="hit"/><text x="${(a[0] + b[0]) / 2}" y="${(a[1] + b[1]) / 2 + 6}" class="cut">✂️</text></g>`; }).join('')}
        ${Object.entries(N).map(([k, [x, y, ic, t]]) => `<g class="nw-n" data-n="${k}"><circle cx="${x}" cy="${y}" r="36"/><text x="${x}" y="${y + 12}" class="ic">${ic}</text><text x="${x}" y="${y + 56}" class="lb">${t}</text></g>`).join('')}
        <text id="nwPk" class="pk" x="-50" y="-50">✉️</text>
      </svg></div>
      <div class="bg-row"><button class="bgbtn" id="nwSend">📨 Gửi dữ liệu</button><button class="bgbtn soft" id="nwFix">🔧 Sửa hết cáp</button></div>`;
    const $ = s => el.querySelector(s);
    function path() {
      const adj = {}; Object.keys(N).forEach(k => adj[k] = []);
      EDGES.filter(k => !cut.has(k)).forEach(k => { adj[k[0]].push(k[1]); adj[k[1]].push(k[0]); });
      const prev = { A: null }, q = ['A'];
      while (q.length) { const u = q.shift(); if (u === 'J') break; BG.shuffle(adj[u]).forEach(v => { if (!(v in prev)) { prev[v] = u; q.push(v); } }); }
      if (!('J' in prev)) return null;
      const p = []; for (let v = 'J'; v; v = prev[v]) p.unshift(v); return p;
    }
    function send() {
      cancelAnimationFrame(anim); el.querySelectorAll('.nw-e').forEach(g => g.classList.remove('route'));
      const p = path(); const pk = $('#nwPk');
      if (!p) { pk.setAttribute('x', -50); $('#nwEx').innerHTML = '<span class="big bg-bad">❌ Mất kết nối!</span>Không còn đường nào tới máy chủ. Bấm <b>🔧 Sửa hết cáp</b> để nối lại.'; return; }
      p.slice(1).forEach((v, i) => { const k = EDGES.find(x => x === p[i] + v || x === v + p[i]); el.querySelector(`[data-e="${k}"]`).classList.add('route'); });
      $('#nwEx').innerHTML = `<span class="big bg-ok">✔ Dữ liệu đã tới máy chủ!</span>Đường đi: ${p.map(k => N[k][3]).join(' → ')}.${cut.size ? ' Dù có cáp bị cắt, dữ liệu vẫn <b>tự tìm đường khác</b>.' : ' Thử cắt vài đường dây rồi gửi lại xem!'}`;
      const seg = p.length - 1, dur = 700 * seg; const t0 = performance.now();
      const tick = now => {
        const f = Math.min(1, (now - t0) / dur); const s = Math.min(seg - 1, Math.floor(f * seg)); const lf = f * seg - s;
        const [a, b] = [N[p[s]], N[p[s + 1]]]; pk.setAttribute('x', a[0] + (b[0] - a[0]) * lf); pk.setAttribute('y', a[1] + (b[1] - a[1]) * lf + 10);
        if (f < 1) anim = requestAnimationFrame(tick);
      };
      anim = requestAnimationFrame(tick);
    }
    el.addEventListener('click', ev => {
      const g = ev.target.closest('.nw-e');
      if (g) { const k = g.dataset.e; cut.has(k) ? cut.delete(k) : cut.add(k); g.classList.toggle('isCut', cut.has(k)); $('#nwEx').innerHTML = cut.has(k) ? `✂️ Đã cắt đường <b>${N[k[0]][3]} – ${N[k[1]][3]}</b>. Bấm <b>📨 Gửi dữ liệu</b> để xem dữ liệu đi đường nào.` : '🔧 Đã nối lại đường dây.'; return; }
      if (ev.target.closest('#nwSend')) send();
      if (ev.target.closest('#nwFix')) { cut.clear(); el.querySelectorAll('.nw-e').forEach(x => x.classList.remove('isCut', 'route')); $('#nwEx').innerHTML = '🔧 Đã sửa hết cáp.'; }
    });
  }
})();
