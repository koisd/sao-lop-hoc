/* Khung chung cho các bài giảng tương tác. Mỗi bài là 1 file, tự đăng ký bằng BG.add({...}).
   Thuộc tính một bài: id, icon, title, desc, khoi: [4,5], topics: ['LV2 GM1 · CĐ 8: ...'], tip (HTML, gợi ý cho GV), render(root) */
window.BG = {
  list: [],
  add(lesson) { this.list.push(lesson); },
  esc: s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),
  shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
  norm: s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim(),
  /* thanh chuyển chế độ trong 1 bài: modes = [{id,label}] */
  modeBar(modes, cur) { return `<div class="bg-modes">${modes.map(m => `<button data-mode="${m.id}" class="${m.id === cur ? 'on' : ''}">${m.label}</button>`).join('')}</div>`; },
};
