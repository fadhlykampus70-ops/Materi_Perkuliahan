/* ============================================================
   MATERI.JS — fungsi pendukung halaman materi
   (Bukan bagian dari "plugin Bootstrap" yang diajarkan,
   ini cuma logic untuk web materi ini sendiri)
   ============================================================ */

// 1. Toggle sidebar di mobile
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarEl = document.getElementById('sidebar');
if (sidebarToggle) {
  sidebarToggle.addEventListener('click', function () {
    sidebarEl.classList.toggle('open');
  });
}

// 2. Highlight link sidebar sesuai section yang sedang dibaca (mirip konsep Scrollspy)
const sections = document.querySelectorAll('.topic-section');
const navLinks = document.querySelectorAll('.sidebar-link');

function highlightActiveLink() {
  let currentId = '';
  sections.forEach(function (sec) {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120) currentId = sec.id;
  });
  navLinks.forEach(function (link) {
    link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
  });
}
window.addEventListener('scroll', highlightActiveLink);
highlightActiveLink();

// 3. Tab switcher untuk code block (HTML / CSS / JS)
function initCodeTabs(root) {
  const tabs = root.querySelectorAll('.code-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = tab.getAttribute('data-target');
      root.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
      root.querySelectorAll('.code-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      root.querySelector('[data-pane="' + target + '"]').classList.add('active');
    });
  });
}
document.querySelectorAll('.code-card').forEach(initCodeTabs);

// Tutup sidebar mobile saat link diklik
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    sidebarEl.classList.remove('open');
  });
});

// 4. Inisialisasi plugin Bootstrap yang WAJIB diaktifkan manual via JS
//    (ini juga contoh nyata dari yang dijelaskan di section Tooltip & Popover)
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
});

// 5. Demo "Loading State" pada section Button
const btnLoadingDemo = document.getElementById('btnLoadingDemo');
if (btnLoadingDemo) {
  btnLoadingDemo.addEventListener('click', function () {
    $(this).button('loading');
    setTimeout(() => { $(this).button('reset'); }, 1500);
  });
}
