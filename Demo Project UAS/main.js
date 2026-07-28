/* ============================================================
   main.js — Loyal Kopi
   Dikelompokkan per pertemuan agar mudah dipelajari di kelas.
   Prasyarat: jQuery 3.5 + Popper.js + bootstrap.min.js sudah
   dimuat sebelum file ini di index.html.

   PANDUAN PERTEMUAN:
   ▶ STRUKTUR DASAR  — Sistem navigasi halaman (SPA sederhana)
   ▶ PERTEMUAN 12    — Carousel, Modal, Dropdown, (Scrollspy)
   ▶ PERTEMUAN 13    — Tab, Tooltip, Popover, Alert, Button
   ▶ PERTEMUAN 14    — Navbar Collapse, Card Grid, Carousel interval
   ============================================================ */


/* ============================================================
   ▶ STRUKTUR DASAR — Sistem Navigasi Halaman (SPA sederhana)
   Mengontrol show/hide antar 4 halaman tanpa reload.
   Ini bukan plugin Bootstrap — murni JavaScript biasa.
   ============================================================ */

function pindahHalaman(namaHalaman) {
  // Sembunyikan semua halaman
  document.querySelectorAll('.page-view').forEach(function (el) {
    el.classList.remove('active');
  });

  // Tampilkan halaman yang dipilih
  var target = document.getElementById('page-' + namaHalaman);
  if (target) target.classList.add('active');

  // Update class active di navbar link
  document.querySelectorAll('.nav-link-page').forEach(function (link) {
    var isActive = link.getAttribute('data-page') === namaHalaman;
    link.classList.toggle('active', isActive);
    link.classList.toggle('text-white', isActive);
    link.classList.toggle('text-white-50', !isActive);
  });

  // Scroll ke atas setiap pindah halaman
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Tutup navbar collapse di mobile
  // (Plugin Collapse dipelajari di Pertemuan 12, tapi dipakai
  //  di sini sejak awal agar navigasi mobile langsung berfungsi)
  $('#navbarLinks').collapse('hide');
}

// Pasang event listener ke semua elemen yang punya data-page
document.querySelectorAll('[data-page]').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    pindahHalaman(this.getAttribute('data-page'));
  });
});


/* ============================================================
   ▶ PERTEMUAN 12 — Plugin JavaScript Bootstrap (Bagian 1)
   Komponen: Transitions, Carousel, Modal, Dropdown
   ============================================================ */

/*
 * TRANSITIONS
 * -----------
 * Bootstrap mengelola transisi CSS secara otomatis (fade, slide)
 * pada hampir semua plugin (Modal, Alert, Carousel, Tab, dll).
 * Kita tidak perlu menulis kode khusus — cukup pastikan class
 * "fade" dan "show" ada pada elemen yang ingin punya transisi.
 *
 * Contoh nyata di web ini:
 *   - Modal muncul dengan efek fade      → class="modal fade"
 *   - Alert sukses hilang dengan fade    → class="alert fade show"
 *   - Carousel slide berganti halus      → otomatis
 *   - Tab berpindah dengan fade          → class="tab-pane fade"
 */


/*
 * CAROUSEL
 * --------
 * data-ride="carousel" di HTML sudah cukup untuk autoplay.
 * Di bawah ini contoh cara menangkap event slide via jQuery.
 * Interval 5000ms dikonfigurasi di bagian Pertemuan 14.
 */
$('#carouselHome').on('slide.bs.carousel', function (e) {
  // e.from = index slide sebelumnya, e.to = index slide berikutnya
  // console.log('Pindah dari slide', e.from, 'ke slide', e.to);
});


/*
 * MODAL
 * -----
 * Tombol "Lihat Detail" di kartu menu menggunakan:
 *   data-toggle="modal" data-target="#modalMenu1"
 * Tidak perlu JS tambahan untuk membuka modal.
 *
 * Contoh membuka modal via JavaScript (tanpa klik tombol):
 *   $('#modalMenu1').modal('show');
 */
$('.modal').on('shown.bs.modal', function () {
  // Terpicu setelah animasi modal selesai tampil
  // console.log('Modal terbuka:', this.id);
});
$('.modal').on('hidden.bs.modal', function () {
  // Terpicu setelah modal selesai ditutup
  // console.log('Modal tertutup:', this.id);
});


/*
 * DROPDOWN
 * --------
 * Dipakai di halaman Kontak untuk memilih kategori pertanyaan.
 * Saat item diklik, teks tombol berubah sesuai pilihan yang dipilih.
 */
$('#dropdownKategori + .dropdown-menu .dropdown-item').on('click', function (e) {
  e.preventDefault();
  $('#labelKategori').text($(this).text());
});

$('#dropdownKategori').on('shown.bs.dropdown', function () {
  // console.log('Dropdown kategori dibuka');
});


/* ============================================================
   ▶ PERTEMUAN 13 — Plugin JavaScript Bootstrap (Bagian 2)
   Komponen: Tab, Tooltip, Popover, Alert, Button
   ============================================================ */

/*
 * TAB
 * ---
 * Dipakai di halaman Menu: 3 tab (Kopi & Minuman, Makanan, Jajanan Pasar).
 * Cukup data-toggle="tab" di HTML, tidak perlu JS tambahan.
 *
 * Contoh membuka tab via JavaScript:
 *   $('#tab-makanan-link').tab('show');
 */
$('#tabMenu a').on('shown.bs.tab', function (e) {
  // console.log('Tab aktif:', $(e.target).text().trim());
});


/*
 * TOOLTIP
 * -------
 * WAJIB diinisialisasi via JS — tidak otomatis aktif dari HTML saja!
 * Dipakai di badge "Favorit" & "Khas" pada kartu menu (halaman Menu).
 *
 * Satu baris ini mengaktifkan SEMUA elemen yang punya
 * data-toggle="tooltip" di seluruh halaman sekaligus.
 */
$('[data-toggle="tooltip"]').tooltip();


/*
 * POPOVER
 * -------
 * WAJIB diinisialisasi via JS — sama seperti Tooltip.
 * Dipakai di ikon fasilitas (halaman Tentang): hover → muncul info.
 *
 * container:'body' agar popover tidak terpotong oleh overflow
 * hidden dari elemen parent-nya.
 */
$('[data-toggle="popover"]').popover({
  container: 'body'
});

// Tutup popover saat klik di luar area popover
$(document).on('click', function (e) {
  if (!$(e.target).closest('[data-toggle="popover"]').length) {
    $('[data-toggle="popover"]').popover('hide');
  }
});

$('[data-toggle="popover"]').on('shown.bs.popover', function () {
  // console.log('Popover tampil:', $(this).attr('title'));
});


/*
 * ALERT
 * -----
 * Alert dismissible (bisa ditutup) bekerja otomatis via
 *   data-dismiss="alert" di tombol silang.
 *
 * Alert sukses di halaman Kontak dimunculkan secara manual
 * via JavaScript setelah form disubmit (lihat bagian Button).
 *
 * Alert info jam buka di halaman Tentang juga bisa ditutup.
 */
$(document).on('closed.bs.alert', function (e) {
  // console.log('Alert ditutup:', e.target.id);
});


/*
 * BUTTON — Loading State
 * -----------------------
 * Tombol "Kirim Pesan" di halaman Kontak:
 * Saat diklik: teks berubah jadi "Mengirim..." (dari data-loading-text)
 * Setelah 1.5 detik: teks kembali normal, alert sukses muncul.
 */
$('#formKontak').on('submit', function (e) {
  e.preventDefault();

  var $btn = $('#btnKirim');
  $btn.button('loading');

  setTimeout(function () {
    $btn.button('reset');

    // Tampilkan alert sukses dengan efek fade Bootstrap
    var $alert = $('#alertSukses');
    $alert.css('display', 'block');
    setTimeout(function () {
      $alert.addClass('show');
    }, 10);

    // Reset form dan label dropdown
    document.getElementById('formKontak').reset();
    $('#labelKategori').text('Pilih kategori...');
  }, 1500);
});


/* ============================================================
   ▶ PERTEMUAN 14 — Responsive Web Design (Studi Kasus)
   Komponen: Navbar Collapse, Card Grid, Carousel interval
   ============================================================ */

/*
 * NAVBAR — COLLAPSE (Responsive)
 * --------------------------------
 * Di layar kecil (< lg), navbar otomatis collapse menjadi
 * tombol hamburger berkat:
 *   navbar-expand-lg + data-toggle="collapse" di HTML
 *
 * Penutupan otomatis setelah pindah halaman sudah dihandle
 * di fungsi pindahHalaman() → $('#navbarLinks').collapse('hide')
 */


/*
 * CARD GRID (Halaman Home & Menu)
 * --------------------------------
 * Dibangun dari:
 *   .row → .col-md-4 → .card  (grid 3 kolom di desktop)
 *   .row → .col-md-6.col-lg-3 → .card  (4 kolom di desktop, 2 di tablet)
 * Di layar HP otomatis 1 kolom full-width.
 * Tidak ada JS yang diperlukan — murni HTML + Bootstrap grid.
 *
 * Tombol "Lihat Detail" di kartu Home membuka Modal (PERTEMUAN 12).
 */


/*
 * CAROUSEL — Interval (Halaman Home)
 * ------------------------------------
 * Mengatur interval autoplay menjadi 5 detik via JS.
 * data-ride="carousel" di HTML sudah cukup untuk autoplay,
 * tapi interval defaultnya 2 detik — dikustomisasi di sini.
 */
$('#carouselHome').carousel({ interval: 5000 });
