/* ============================================================
   kampus.js — Politeknik Cakra Nusantara
   Dikelompokkan per pertemuan agar mudah diperagakan di kelas.
   Prasyarat: jQuery 3.5 + Popper.js + bootstrap.min.js sudah
   dimuat sebelum file ini di kampus.html.

   PANDUAN PERTEMUAN:
   ▶ STRUKTUR DASAR  — Sistem navigasi halaman (SPA sederhana)
   ▶ PERTEMUAN 12    — Carousel, Modal, Dropdown, Scrollspy
   ▶ PERTEMUAN 13    — Tab, Tooltip, Popover, Alert, Button
   ▶ PERTEMUAN 14    — Navbar Collapse, Sidebar, Carousel interval,
                        Card Grid (sebagian besar di HTML, JS hanya
                        bantu navigasi dan konfigurasi)
   ============================================================ */


/* ============================================================
   ▶ STRUKTUR DASAR — Sistem Navigasi Halaman (SPA sederhana)
   Mengontrol show/hide antar 4 halaman tanpa reload.
   Ini bukan plugin Bootstrap — murni JavaScript biasa.
   Dibuat sejak awal sebagai fondasi sebelum plugin ditambahkan.
   ============================================================ */

function pindahHalaman(namaHalaman) {
  // Sembunyikan semua halaman
  document.querySelectorAll('.page-view').forEach(function (el) {
    el.classList.remove('active');
  });

  // Tampilkan halaman yang dipilih
  const target = document.getElementById('page-' + namaHalaman);
  if (target) target.classList.add('active');

  // Update class active di navbar link
  document.querySelectorAll('.nav-link-page').forEach(function (link) {
    const isActive = link.getAttribute('data-page') === namaHalaman;
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

  // ▶ PERTEMUAN 14 — Refresh Scrollspy saat pindah ke halaman Akademik
  // Scrollspy tidak bisa menghitung posisi elemen yang tersembunyi
  // (display:none). Setelah halaman tampil, perlu di-refresh.
  if (namaHalaman === 'akademik') {
    setTimeout(function () {
      $('[data-spy="scroll"]').each(function () {
        $(this).scrollspy('refresh');
      });
    }, 50);
  }
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
   Komponen: Transitions, Carousel, Modal, Dropdown, Scrollspy
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
 *   - Modal MK muncul dengan efek fade   → class="modal fade"
 *   - Alert sukses hilang dengan fade     → class="alert fade show"
 *   - Carousel slide berganti halus       → otomatis
 *   - Tab berpindah dengan fade           → class="tab-pane fade"
 */


/*
 * CAROUSEL
 * --------
 * data-ride="carousel" di HTML sudah cukup untuk autoplay.
 * Di bawah ini contoh cara mengontrolnya via JavaScript/jQuery.
 * Interval 5000ms dikonfigurasi di bagian Pertemuan 14.
 */
$('#carouselBerita').on('slide.bs.carousel', function (e) {
  // e.from = index slide sebelumnya, e.to = index slide berikutnya
  // console.log('Pindah dari slide', e.from, 'ke slide', e.to);
});


/*
 * MODAL
 * -----
 * Tombol "Lihat Detail" di halaman Akademik menggunakan:
 *   data-toggle="modal" data-target="#modalMK1"
 * Tidak perlu JS tambahan untuk membuka modal.
 *
 * Contoh membuka modal via JavaScript (tanpa klik tombol):
 *   $('#modalMK1').modal('show');
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
 * Saat item diklik, teks tombol berubah sesuai pilihan.
 */
$('#dropdownKategori + .dropdown-menu .dropdown-item').on('click', function (e) {
  e.preventDefault();
  $('#labelKategori').text($(this).text());
});

$('#dropdownKategori').on('shown.bs.dropdown', function () {
  // console.log('Dropdown terbuka');
});


/*
 * SCROLLSPY
 * ---------
 * Dipakai di halaman Akademik: sidebar kiri secara otomatis
 * menyorot link yang sesuai saat konten di-scroll.
 *
 * Konfigurasi cukup lewat HTML:
 *   data-spy="scroll" data-target="#sidebarAkademik" data-offset="80"
 *
 * Method refresh dipanggil di fungsi pindahHalaman() di atas.
 */
$(document).on('activate.bs.scrollspy', function (e) {
  // Terpicu setiap kali link aktif berpindah ke section berikutnya
  // console.log('Section aktif berubah');
});


/* ============================================================
   ▶ PERTEMUAN 13 — Plugin JavaScript Bootstrap (Bagian 2)
   Komponen: Tab, Tooltip, Popover, Alert, Button
   ============================================================ */

/*
 * TAB
 * ---
 * Dipakai di halaman Akademik: 3 tab (Profil, Kurikulum, Karier).
 * Cukup data-toggle="tab" di HTML, tidak perlu JS tambahan.
 *
 * Contoh membuka tab via JavaScript:
 *   $('#tab-kurikulum').tab('show');
 */
$('#tabProdi a').on('shown.bs.tab', function (e) {
  // console.log('Tab aktif:', $(e.target).text());
});


/*
 * TOOLTIP
 * -------
 * WAJIB diinisialisasi via JS — tidak otomatis aktif dari HTML saja!
 * Dipakai di ikon centang pada kartu dosen (halaman Dosen).
 *
 * Satu baris ini mengaktifkan SEMUA elemen yang punya
 * data-toggle="tooltip" di seluruh halaman sekaligus.
 */
$('[data-toggle="tooltip"]').tooltip();


/*
 * POPOVER
 * -------
 * WAJIB diinisialisasi via JS — sama seperti Tooltip.
 * Dipakai di tombol "Kontak" pada kartu dosen (halaman Dosen).
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
  // console.log('Popover tampil:', $(this).text().trim());
});


/*
 * ALERT
 * -----
 * Alert dismissible (bisa ditutup) bekerja otomatis via
 *   data-dismiss="alert" di tombol silang.
 *
 * Alert sukses di halaman Kontak dimunculkan secara manual
 * via JavaScript setelah form disubmit (lihat bagian Button).
 */
$(document).on('closed.bs.alert', function (e) {
  // console.log('Alert ditutup:', e.target.id);
});


/*
 * BUTTON — Loading State & Single Toggle
 * ----------------------------------------
 * 1. LOADING STATE — tombol "Kirim Pesan" di halaman Kontak
 *    Saat diklik: teks berubah jadi "Mengirim..." (dari data-loading-text)
 *    Setelah 1.5 detik: teks kembali, alert sukses muncul
 *
 * 2. SINGLE TOGGLE — tombol bintang di kartu dosen (halaman Dosen)
 *    data-toggle="button" di HTML cukup untuk toggle aktif/nonaktif
 *    CSS class .btn-fav.active diatur di kampus.css
 */
$('#formKontak').on('submit', function (e) {
  e.preventDefault();

  const $btn = $('#btnKirim');
  $btn.button('loading');

  setTimeout(function () {
    $btn.button('reset');

    // Tampilkan alert sukses dengan efek fade Bootstrap
    const $alert = $('#alertSukses');
    $alert.css('display', 'block');
    setTimeout(function () {
      $alert.addClass('show');
    }, 10);

    // Reset form
    document.getElementById('formKontak').reset();
    $('#labelKategori').text('Pilih kategori...');
  }, 1500);
});


/* ============================================================
   ▶ PERTEMUAN 14 — Responsive Web Design (Studi Kasus)
   Komponen: Navbar Collapse, Sidebar Layout, Carousel interval,
             Card Grid — sebagian besar dikerjakan di HTML dengan
             class Bootstrap, JS hanya konfigurasi tambahan.
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
 * SIDEBAR LAYOUT (Halaman Akademik)
 * ----------------------------------
 * Sidebar dibangun murni dari grid Bootstrap:
 *   col-md-3  → sidebar kiri
 *   col-md-9  → konten kanan
 * Di layar kecil (< md), keduanya otomatis full-width dan
 * tersusun vertikal — inilah mobile-first Bootstrap bekerja.
 *
 * Scrollspy mengisi "jiwa" sidebar ini (link aktif ikut scroll).
 * Refresh Scrollspy sudah dihandle di fungsi pindahHalaman().
 */


/*
 * CAROUSEL — Interval (Halaman Home)
 * ------------------------------------
 * Mengatur interval autoplay menjadi 5 detik via JS.
 * data-ride="carousel" di HTML sudah cukup untuk autoplay,
 * tapi interval defaultnya 2 detik — dikustomisasi di sini.
 */
$('#carouselBerita').carousel({ interval: 5000 });


/*
 * THUMBNAIL / CARD GRID (Halaman Akademik & Home)
 * ------------------------------------------------
 * Dibangun dari:
 *   .row → .col-md-4 → .card  (grid 3 kolom di desktop)
 * Di layar HP otomatis 1 kolom full-width.
 * Tidak ada JS yang diperlukan — murni HTML + Bootstrap grid.
 *
 * Tombol "Lihat Detail" di setiap card membuka Modal (PERTEMUAN 12).
 */
