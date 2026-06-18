/* ============================================
   UNIVERSITAS NUSANTARA - Custom JavaScript
   Bootstrap 4 Praktek P9, P10, P11
   ============================================ */

// =============================================
// DATA DOSEN (untuk List Group & Media Object)
// =============================================
const dataDosen = [
    {
      nama: "Dr. Budi Santoso, M.T.",
      prodi: "Teknik Informatika",
      keahlian: "Machine Learning & Artificial Intelligence",
      publikasi: "25 Jurnal Terindeks Scopus",
      riset: "3 Hibah Nasional"
    },
    {
      nama: "Prof. Dr. Siti Rahayu, M.Kom.",
      prodi: "Sistem Informasi",
      keahlian: "Sistem Basis Data & Cloud Computing",
      publikasi: "42 Jurnal Internasional",
      riset: "5 Hibah Nasional & 2 Internasional"
    },
    {
      nama: "Dr. Ahmad Fauzi, M.M.",
      prodi: "Manajemen Bisnis",
      keahlian: "Kewirausahaan & Manajemen Strategis",
      publikasi: "18 Jurnal Manajemen Internasional",
      riset: "2 Hibah Penelitian Bisnis"
    },
    {
      nama: "Dr. Ir. Dewi Lestari, M.T.",
      prodi: "Teknik Sipil",
      keahlian: "Struktur Bangunan & Konstruksi Hijau",
      publikasi: "20 Jurnal Teknik Internasional",
      riset: "4 Proyek Infrastruktur Nasional"
    }
  ];
  
  // =============================================
  // FUNGSI: Tampilkan Profil Dosen (P11 - List Group & Media Object)
  // =============================================
  function tampilDosen(elAktif, index) {
    event.preventDefault();
  
    // Hapus active dari semua item list group
    document.querySelectorAll('#listDosen .list-group-item').forEach(item => {
      item.classList.remove('active');
    });
  
    // Set active ke item yang diklik
    elAktif.classList.add('active');
  
    const dosen = dataDosen[index];
  
    // Update tampilan media object dosen
    document.getElementById('namaDosen').textContent = dosen.nama;
    document.getElementById('prodiDosen').textContent = dosen.prodi;
    document.getElementById('infoDosen').innerHTML = `
      <p><i class="fas fa-book text-primary mr-2"></i> <strong>Bidang Keahlian:</strong> ${dosen.keahlian}</p>
      <p><i class="fas fa-award text-warning mr-2"></i> <strong>Publikasi Internasional:</strong> ${dosen.publikasi}</p>
      <p><i class="fas fa-project-diagram text-success mr-2"></i> <strong>Proyek Riset Aktif:</strong> ${dosen.riset}</p>
    `;
  }
  
  // =============================================
  // FUNGSI: Filter Galeri (P9 - Button, P10 - Show/Hide)
  // =============================================
  function filterGaleri(elAktif, kategori) {
    // Update active button
    document.querySelectorAll('#filterGaleri .btn').forEach(btn => {
      btn.classList.remove('active', 'btn-primary');
      btn.classList.add('btn-outline-primary');
    });
    elAktif.classList.add('active', 'btn-primary');
    elAktif.classList.remove('btn-outline-primary');
  
    // Filter item galeri (P10 - Menampilkan dan Menyembunyikan Konten)
    const items = document.querySelectorAll('.galeri-item');
    items.forEach(item => {
      if (kategori === 'semua' || item.classList.contains(kategori)) {
        item.style.display = 'block';
        // Animasi fade in
        item.style.opacity = '0';
        setTimeout(() => { item.style.opacity = '1'; item.style.transition = 'opacity 0.4s'; }, 10);
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  // =============================================
  // FUNGSI: Cari Program Studi (P11 - Input Group)
  // =============================================
  function cariProdi() {
    const keyword = document.getElementById('searchProdi').value.trim().toLowerCase();
    const daftarProdi = [
      "teknik informatika", "sistem informasi", "ilmu komputer",
      "manajemen", "akuntansi", "ekonomi pembangunan",
      "teknik sipil", "teknik elektro", "teknik mesin", "kedokteran"
    ];
  
    if (!keyword) {
      tampilToast('warning', 'Masukkan nama program studi terlebih dahulu!');
      return;
    }
  
    const hasil = daftarProdi.filter(p => p.includes(keyword));
  
    if (hasil.length > 0) {
      tampilToast('success', `Ditemukan: ${hasil.map(h => h.charAt(0).toUpperCase() + h.slice(1)).join(', ')}`);
    } else {
      tampilToast('danger', `Program studi "${keyword}" tidak ditemukan.`);
    }
  }
  
  // =============================================
  // FUNGSI: Submit Pendaftaran (P9 - Button)
  // =============================================
  function submitPendaftaran() {
    tampilToast('success', 'Pendaftaran berhasil dikirim! Tim kami akan menghubungi Anda segera.');
  }
  
  // =============================================
  // FUNGSI: Kirim Pesan Kontak
  // =============================================
  function kirimPesan() {
    const nama = document.getElementById('kontakNama').value.trim();
    const email = document.getElementById('kontakEmail').value.trim();
    const pesan = document.getElementById('kontakPesan').value.trim();
  
    if (!nama || !email || !pesan) {
      tampilToast('warning', 'Harap lengkapi semua kolom sebelum mengirim pesan!');
      return;
    }
  
    // Reset form
    document.getElementById('kontakNama').value = '';
    document.getElementById('kontakEmail').value = '';
    document.getElementById('kontakPesan').value = '';
  
    tampilToast('success', `Terima kasih ${nama}! Pesan Anda telah terkirim. Kami akan membalas ke ${email}.`);
  }
  
  // =============================================
  // FUNGSI: Modal Fakultas (P9 - Button, P11 - Komponen)
  // =============================================
  document.addEventListener('DOMContentLoaded', function () {
    const modalFakultas = document.getElementById('modalFakultas');
    if (modalFakultas) {
      modalFakultas.addEventListener('show.bs.modal', function (event) {
        const tombol = event.relatedTarget;
        const namaFakultas = tombol.getAttribute('data-fakultas');
        const deskripsi = tombol.getAttribute('data-deskripsi');
  
        document.getElementById('modalFakultasTitle').textContent = namaFakultas;
        document.getElementById('modalFakultasBody').innerHTML = `
          <p>${deskripsi}</p>
          <hr>
          <p class="text-muted small">
            <i class="fas fa-info-circle text-primary"></i>
            Untuk informasi lebih lanjut hubungi bagian admisi kami.
          </p>
        `;
      });
    }
  });
  
  // =============================================
  // FUNGSI: Toast Notifikasi (P11 - Alert dinamis)
  // =============================================
  function tampilToast(tipe, pesan) {
    // Hapus toast lama jika ada
    const toastLama = document.getElementById('toastNotif');
    if (toastLama) toastLama.remove();
  
    const ikonMap = {
      success: 'fa-check-circle',
      danger: 'fa-times-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };
  
    const toast = document.createElement('div');
    toast.id = 'toastNotif';
    toast.className = `alert alert-${tipe} alert-dismissible fade show`;
    toast.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      max-width: 420px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
      animation: slideIn 0.3s ease;
    `;
    toast.innerHTML = `
      <i class="fas ${ikonMap[tipe] || 'fa-info-circle'} mr-2"></i> ${pesan}
      <button type="button" class="close" data-dismiss="alert">
        <span>&times;</span>
      </button>
    `;
  
    document.body.appendChild(toast);
  
    // Auto hilang setelah 4 detik
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  }
  
  // =============================================
  // TOMBOL BACK TO TOP
  // =============================================
  window.addEventListener('scroll', function () {
    const btnTop = document.getElementById('btnTop');
    if (btnTop) {
      btnTop.style.display = window.scrollY > 400 ? 'block' : 'none';
    }
  });
  
  // Tambah tombol back to top ke DOM
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.createElement('button');
    btn.id = 'btnTop';
    btn.className = 'btn btn-primary';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.title = 'Kembali ke atas';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);
  });
  
  // =============================================
  // ANIMASI PROGRESS BAR saat scroll (P11)
  // =============================================
  document.addEventListener('DOMContentLoaded', function () {
    const progressBars = document.querySelectorAll('.progress-bar');
  
    // Simpan nilai asli
    progressBars.forEach(bar => {
      bar.setAttribute('data-width', bar.style.width);
      bar.style.width = '0%';
    });
  
    // Animasikan saat terlihat
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width');
          bar.style.transition = 'width 1.2s ease';
          bar.style.width = targetWidth;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
  
    progressBars.forEach(bar => observer.observe(bar));
  });