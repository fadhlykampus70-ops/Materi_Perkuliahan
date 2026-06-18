/* ================================================
   Web Desain II — Demo Project
   File: js/main.js
   Keterangan: JavaScript sederhana untuk interaksi form
   ================================================ */


/* ------------------------------------------------
   PERTEMUAN 1: Dasar JavaScript
   console.log untuk memastikan JS terhubung
   (Buka DevTools > Console untuk melihat)
   ------------------------------------------------ */
console.log("JS berhasil terhubung! Web Desain II - Demo Project");


/* ------------------------------------------------
   PERTEMUAN 7: Validasi Form
   Fungsi ini dipanggil saat tombol "Kirim" diklik
   ------------------------------------------------ */
function kirimForm() {

  // Ambil nilai dari setiap input form
  var nama    = document.getElementById('inputNama').value.trim();
  var email   = document.getElementById('inputEmail').value.trim();
  var hp      = document.getElementById('inputHP').value.trim();
  var jalur   = document.getElementById('selectJalur').value;
  var setuju  = document.getElementById('checkSetuju').checked;

  // Area notifikasi
  var notifikasi = document.getElementById('notifikasi');

  // ---- Validasi: cek apakah ada field yang kosong ----
  if (nama === '' || email === '' || hp === '' || jalur === '') {
    // Tampilkan pesan error (Bootstrap alert-danger)
    notifikasi.innerHTML =
      '<div class="alert alert-danger mt-3">' +
      '<strong>Gagal!</strong> Harap isi semua field yang wajib diisi.' +
      '</div>';
    return; // hentikan fungsi, jangan lanjut
  }

  // ---- Validasi: cek checkbox persetujuan ----
  if (!setuju) {
    notifikasi.innerHTML =
      '<div class="alert alert-warning mt-3">' +
      '<strong>Perhatian!</strong> Anda harus menyetujui syarat dan ketentuan.' +
      '</div>';
    return;
  }

  // ---- Jika semua valid: tampilkan pesan sukses ----
  notifikasi.innerHTML =
    '<div class="alert alert-success mt-3">' +
    '<strong>Berhasil!</strong> Pendaftaran atas nama <strong>' + nama + '</strong> ' +
    'telah dikirim. Kami akan menghubungi Anda melalui email: ' + email +
    '</div>';

  // Reset form setelah berhasil dikirim (opsional)
  document.getElementById('formPendaftaran').reset();
}


/* ------------------------------------------------
   BONUS: Efek smooth highlight pada navbar
   Saat scroll, navbar-link yang aktif diberi warna
   (JavaScript DOM sederhana)
   ------------------------------------------------ */
window.addEventListener('scroll', function () {

  var navbar = document.querySelector('.navbar');

  // Jika scroll lebih dari 50px, tambah class shadow
  if (window.scrollY > 50) {
    navbar.classList.add('shadow');
  } else {
    navbar.classList.remove('shadow');
  }

});
