# 💰 BayaranKita — Aplikasi Pembayaran All-in-One

> Bayar tagihan, isi pulsa, SPP, BPJS, pajak kendaraan, streaming, dan donasi — semua dari satu aplikasi mobile-first dengan tema hijau khas Tokopedia.

---

## 📱 Tentang Aplikasi

**BayaranKita** adalah aplikasi pembayaran berbasis web yang dirancang khusus untuk tampilan *mobile* (handphone). Dengan antarmuka yang intuitif dan warna hijau khas marketplace, aplikasi ini memungkinkan pengguna menyelesaikan berbagai jenis pembayaran hanya dengan saldo yang tersedia.

Aplikasi ini **100% frontend** (HTML + CSS + JavaScript) dan menggunakan **localStorage** untuk menyimpan data transaksi serta preferensi pengguna. Data tagihan dan pelanggan disediakan sebagai **data dummy** untuk simulasi, sehingga cocok untuk demonstrasi, portofolio, atau pengembangan lebih lanjut.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| **Dashboard** | Menampilkan saldo, ringkasan transaksi, dan akses cepat ke semua layanan. |
| **Bayar Tagihan** | PLN, PDAM, Internet, dan Seminar (dengan kode referensi khusus). |
| **SPP / Biaya Kuliah** | Cek tagihan semester berdasarkan NIM, pilih cicilan yang akan dibayar. |
| **Pulsa & Paket Data** | Pilih provider (Telkomsel, XL, Indosat, Tri, Smartfren, Axis), masukkan nomor HP, pilih nominal pulsa atau paket data (bisa keduanya). |
| **BPJS Kesehatan** | Cek dan bayar tagihan BPJS dengan nomor kepesertaan. |
| **Pajak Kendaraan** | Cek dan bayar pajak kendaraan bermotor berdasarkan plat nomor. |
| **TV / Streaming** | Netflix, Disney+, Prime Video, Vidio — bayar langganan dengan ID pelanggan. |
| **Donasi & Zakat** | Donasi ke BAZNAS, Dompet Dhuafa, Rumah Zakat, atau Yatim Mandiri. |
| **Metode Pembayaran** | Virtual Account, QRIS, Teller, GoPay, OVO, DANA, LinkAja (untuk tagihan). |
| **Riwayat Transaksi** | Lihat semua transaksi, filter berdasarkan jenis, dan hapus riwayat. |
| **Mode Gelap (Dark Mode)** | Toggle theme dengan tombol bulan/matahari. |
| **Struk Digital** | Setiap pembayaran menampilkan struk dengan opsi cetak (print) dan unduh PDF. |
| **QR Code** | Untuk metode QRIS, ditampilkan QR Code dinamis dengan timer 5 menit. |
| **Penyimpanan Lokal** | Saldo dan riwayat transaksi disimpan di localStorage browser. |

---

## 🚀 Cara Menjalankan

1. **Clone atau unduh** semua file proyek ini (atau cukup satu file `index.html`).
2. Buka file `index.html` di browser favorit Anda (disarankan Chrome / Firefox / Edge versi terbaru).
3. Aplikasi akan langsung berjalan — tidak perlu server atau build process.
4. Untuk pengalaman terbaik, buka di **mode perangkat seluler** (bisa menggunakan DevTools > Toggle Device Toolbar) atau gunakan ponsel sungguhan.

---

## 📊 Data Dummy (Simulasi)

Aplikasi menggunakan data statis yang disimpan dalam objek `billData` di JavaScript. Data ini mencakup:

| Kategori | Identitas | Jumlah Data |
|----------|-----------|-------------|
| PLN | Nomor Pelanggan (12 digit) | 5 pelanggan |
| PDAM | Nomor Pelanggan (12 digit) | 3 pelanggan |
| Internet | Nomor Pelanggan (12 digit) | 3 pelanggan |
| Seminar | Kode Referensi (SEM-XXXX-XXX) | 2 event |
| SPP | NIM (12 digit) | 3 mahasiswa dengan cicilan |
| BPJS | Nomor BPJS (13 digit) | 3 peserta |
| Pajak | Plat nomor kendaraan | 3 kendaraan |
| TV/Streaming | ID Pelanggan (string) | 4 layanan |
| Donasi | Nama lembaga (key) | 4 lembaga |

> Semua data ini dapat diganti dengan data nyata dari API backend. Silakan lihat bagian **Kustomisasi** di bawah.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5** – Struktur halaman
- **Tailwind CSS** (via CDN) – Styling responsif
- **Font Awesome 6** – Ikon vektor
- **QRCode.js** – Generate QR Code untuk pembayaran QRIS
- **jsPDF** – Ekspor struk ke PDF
- **localStorage** – Penyimpanan state (saldo, riwayat, dark mode)

> Tidak ada dependensi backend — semua berjalan di sisi klien.

---

## 🧩 Struktur Kode

Proyek ini terdiri dari **satu file HTML** (`index.html`) yang mencakup:

- **CSS** – Gaya kustom (termasuk dark mode dan mockup handphone)
- **HTML** – Semua halaman (dashboard, tagihan, SPP, pulsa, BPJS, pajak, TV, donasi, riwayat)
- **JavaScript** – Logika aplikasi (state management, fungsi pembayaran, render, dll.)

Tidak ada pemisahan file untuk memudahkan distribusi dan pengembangan cepat.

---

## 🎨 Kustomisasi & Pengembangan

### Mengganti Data Dummy
Cari objek `billData` di dalam tag `<script>` pada file HTML. Anda dapat menambah, menghapus, atau mengedit entri sesuai dengan struktur yang ada.

### Menghubungkan ke API Backend
Untuk mengganti data statis dengan API nyata, modifikasi fungsi-fungsi `cekTagihan()`, `cekTagihanSpp()`, `cekBpjs()`, `cekPajak()`, `cekTv()` agar melakukan request `fetch` ke endpoint masing-masing, lalu proses responsnya.

### Menambah Layanan Baru
- Tambahkan tombol layanan di grid dashboard (`.service-grid`).
- Buat halaman baru (`<div class="page" id="page-xxx">`) dengan formulir dan hasil.
- Tambahkan navigasi di bottom nav.
- Implementasikan fungsi cek dan bayar yang sesuai.

### Mengubah Tema (Dark / Light)
Warna utama (hijau Tokopedia) didefinisikan dalam variabel CSS `--primary` dan `--primary-light`. Ganti nilai tersebut untuk menyesuaikan brand.

---

## 📝 Catatan Penting

- Aplikasi ini **tidak** benar-benar memproses pembayaran — hanya simulasi pemotongan saldo.
- Saldo awal ditetapkan Rp1.250.000, dapat diubah di state `saldo`.
- Semua transaksi disimpan di localStorage; menghapus cache browser akan menghapus data.
- Untuk demo offline, semua library diambil dari CDN (memerlukan koneksi internet saat pertama kali dimuat).

---

## 🧪 Uji Coba

Untuk menguji fitur, Anda dapat menggunakan data dummy berikut:

| Layanan | ID / Nomor | Contoh |
|---------|-----------|--------|
| PLN | 123456789012 | Nama: Ahmad Fauzi |
| PDAM | 678901234567 | Nama: Toko Jaya Abadi |
| Internet | 901234567890 | Nama: PT. Teknologi Nusantara |
| Seminar | SEM-2026-001 | Workshop AI & ML |
| SPP | 221011450228 | Muhammad Ricky Ardian |
| BPJS | 1234567890123 | Rina Sari |
| Pajak | B1234XYZ | Toyota Avanza 2018 |
| TV/Stream | netflix_user1 | Netflix - Andi |
| Donasi | (pilih lembaga) | BAZNAS, Dompet Dhuafa, dll. |

---

## 📄 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran dan demonstrasi. Anda bebas menggunakan, memodifikasi, dan mendistribusikan dengan menyebutkan sumber asli.

---

## 🤝 Kontribusi

Saran dan pull request sangat diterima! Jika Anda menemukan bug atau memiliki ide fitur, silakan buka issue di repositori.

---

**Selamat menggunakan BayaranKita!**  
_Dibuat dengan ❤️ untuk memudahkan pembayaran sehari-hari._
===================================================================================================================
TESTING DATA ALL:


### 1. Tagihan Listrik (PLN)
| ID Pelanggan | Nama | Periode | Jatuh Tempo | Pokok | Denda |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `123456789012` | Ahmad Fauzi | Feb 2026 | 10 Mar 2026 | Rp245.000 | 0 |
| `234567890123` | Siti Rahayu | Feb 2026 | 15 Mar 2026 | Rp532.000 | Rp15.000 |
| `345678901234` | Budi Santoso | Feb 2026 | 20 Mar 2026 | Rp187.000 | 0 |
| `456789012345` | Dewi Lestari | Feb 2026 | 5 Mar 2026 | Rp410.000 | Rp25.000 |
| `567890123456` | Rudi Hartono | Feb 2026 | 25 Mar 2026 | Rp298.000 | 0 |

---

### 2. Tagihan PDAM
| ID Pelanggan | Nama | Periode | Jatuh Tempo | Pokok | Denda |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `678901234567` | Toko Jaya Abadi | Feb 2026 | 12 Mar 2026 | Rp185.000 | 0 |
| `789012345678` | RS Harapan | Feb 2026 | 18 Mar 2026 | Rp420.000 | Rp12.000 |
| `890123456789` | Hotel Permata | Feb 2026 | 22 Mar 2026 | Rp750.000 | Rp45.000 |

---

### 3. Tagihan Internet
| ID Pelanggan | Nama | Periode | Jatuh Tempo | Pokok | Denda |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `901234567890` | PT Teknologi Nusantara | Feb 2026 | 8 Mar 2026 | Rp550.000 | 0 |
| `012345678901` | Kantor Desa Maju | Feb 2026 | 14 Mar 2026 | Rp320.000 | Rp8.000 |
| `123456789013` | Sekolah Digital | Feb 2026 | 28 Mar 2026 | Rp450.000 | 0 |

---

### 4. Seminar
| ID Referensi | Nama Event | Periode | Jatuh Tempo | Pokok | Denda |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `SEM-2026-001` | Workshop AI & ML | Mar 2026 | 20 Mar 2026 | Rp2.500.000 | 0 |
| `SEM-2026-002` | Seminar Digital Marketing | Apr 2026 | 5 Apr 2026 | Rp1.750.000 | Rp200.000 |

---

### 5. SPP / Biaya Kuliah
| NIM (12 digit) | Nama | Semester | Detail Cicilan |
| :--- | :--- | :--- | :--- |
| `221011450228` | Muhammad Ricky Ardian | Ganjil 2025/2026 | 8 cicilan @ Rp2.500.000 (Cicilan 1-2 Lunas, 3-8 Belum) |
| `202310002` | Bella Putri | Genap 2025/2026 | 6 cicilan @ Rp3.500.000 (Cicilan 1 Lunas, 2-6 Belum) |
| `202310003` | Cahya Nugraha | Ganjil 2025/2026 | 8 cicilan @ Rp2.000.000 (Cicilan 1-3 Lunas, 4-8 Belum) |

---

### 6. BPJS Kesehatan
| Nomor BPJS (13 digit) | Nama | Periode | Jatuh Tempo | Tagihan | Denda |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `1234567890123` | Rina Sari | Feb 2026 | 10 Mar 2026 | Rp42.500 | 0 |
| `2345678901234` | Andi Wijaya | Feb 2026 | 15 Mar 2026 | Rp42.500 | Rp5.000 |
| `3456789012345` | Toko Sembako Jaya | Feb 2026 | 20 Mar 2026 | Rp85.000 | 0 |

---

### 7. Pajak Kendaraan
| Plat Nomor | Nama Kendaraan | Tahun | Jatuh Tempo | Pokok | Denda |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `B1234XYZ` | Toyota Avanza 2018 | 2025 | 30 Jun 2026 | Rp1.200.000 | 0 |
| `D5678ABC` | Honda Civic 2020 | 2025 | 15 Jul 2026 | Rp2.350.000 | Rp150.000 |
| `F9012DEF` | Suzuki Ertiga 2019 | 2025 | 1 Agu 2026 | Rp850.000 | 0 |

---

### 8. TV / Streaming
| Key (dicocokkan dengan input) | Nama Pelanggan | Paket | Periode | Tagihan | Denda |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `netflix_user1` | Netflix - Andi | Premium | Mar 2026 | Rp149.000 | 0 |
| `disney_user2` | Disney+ - Siti | Bulanan | Mar 2026 | Rp119.000 | Rp5.000 |
| `prime_user3` | Prime Video - Budi | Tahunan | Mar 2026 | Rp359.000 | 0 |
| `vidio_user4` | Vidio - Dewi | Diamond | Mar 2026 | Rp89.000 | 0 |

---

### 9. Donasi (Lembaga)
| Key | Nama Lembaga | Keterangan |
| :--- | :--- | :--- |
| `baznas` | BAZNAS | Zakat Fitrah |
| `dompet` | Dompet Dhuafa | Program Kemanusiaan |
| `rumah` | Rumah Zakat | Pendidikan & Kesehatan |
| `yatim` | Yatim Mandiri | Pemberdayaan Anak Yatim |

---

### 10. Mapping Provider Pulsa (Prefix HP)
Aplikasi secara otomatis mendeteksi provider berdasarkan 4 digit awal nomor HP:
- **Telkomsel**: 0811, 0812, 0813, 0821, 0822, 0823
- **Indosat**: 0814, 0815, 0816, 0855, 0856, 0857, 0858
- **XL**: 0817, 0818, 0819, 0877, 0878, 0879
- **Axis**: 0851, 0852, 0853, 0859
- **Smartfren**: 0881–0889
- **Tri (3)**: 0895, 0896, 0897, 0898, 0899

---

**Catatan:** Semua data ini bersifat statis (simulasi) dan tersimpan di dalam kode JavaScript. Anda bisa mengganti atau menambahkan data baru sesuai kebutuhan.