import { Coins, Palette, Timer } from "@lucide/astro";

export const cards = [
  {
    icon: Coins,
    title: "Harga Terjangkau",
    description:
      "Kami berikan penawaran harga yang sangat terjangkau dengan kualitas layanan yang sangat baik pula.",
  },
  {
    icon: Timer,
    title: "Proses Cepat dan Mudah",
    description:
      "Layanan kami siap melakukan pengerjaan pesanamu yang akan siap dalam 1×24 jam setelah order diterima.",
  },
  {
    icon: Palette,
    title: "Banyak Pilihan Tema",
    description:
      "Tersedia beragam pilihan tema siap pakai yang kami berikan untuk memenuhi acara impian Anda.",
  },
];

export const features = [
  {
    title: "Fitur yang dirancang dengan mempertimbangkan acara Anda",
    description:
      "Dari pemesanan tempat hingga umpan balik pasca-acara, Flow memiliki semua yang Anda perlukan untuk menyederhanakan perencanaan acara Anda.",
    img: "/images/envelope.webp",
  },
  {
    title: "Pelacakan RSVP",
    description:
      "Pantau daftar tamu Anda dengan pembaruan dan pengingat waktu nyata.",
    img: "/images/rsvp.webp",
  },
  {
    title: "Perencana anggaran",
    description:
      "Kelola keuangan Anda dengan alat penganggaran kami yang mudah digunakan.",
    img: "/images/perencanaan.webp",
  },
  {
    title: "Pemilihan tempat interaktif",
    description:
      "Jelajahi dan pesan tempat-tempat terbaik langsung melalui aplikasi.",
    img: "/images/location.webp",
  },
];

export const values = [
  {
    title: "Tentukan Visi Anda",
    description:
      "Awali perjalanan Anda dengan merancang tujuan, tema yang unik, dan daftar tamu yang tepat.",
  },
  {
    title: "Atur Setiap Detail",
    description:
      "Gunakan platform kami untuk memilih lokasi, kirim undangan yang personal, dan kelola RSVP dengan lancar.",
  },
  {
    title: "Libatkan Tamu Secara Aktif",
    description:
      "Mudahkan proses check-in dan beri pengalaman interaktif dengan pembaruan real-time langsung ke tangan tamu Anda.",
  },
];

export const faqs = [
  {
    title: "Pesan Undangan Digital",
    description: [
      "Pilih template undangan yang diinginkan.",
      "Untuk melihat demo katalog silahkan klik bagian halaman katalog.",
      'Untuk melihat halaman tampilan demo, silahkan klik tombol "Live Preview", dan catat nomor demo yang diinginkan. Setelah memilih tema undangan, Anda bisa melakukan pemesanan dengan melakukan pemesanan dengan langsung melakukan klik pada tombol halaman pembelian.',
      "Isi form yang disediakan, dan lakukan pembayaran sesuai dengan pilihan metode pembayaran yang ada.",
    ],
  },
  {
    title: "Proses Pengerjaan Orderan",
    description: [
      "Silahkan lakukan pembayaran dengan jenis paket yang dipilih terlebih dahulu untuk memulai pengerjaan.",
      "Pembayaran dilakukan full payment diawal dengan cara transfer via bank ke akun bank kami yang tertera pada halaman pembayaran & konfirmasi.",
      "Pastikan anda melakukan konfirmasi pembayaran untuk mempercepat proses pengerjaan oleh tim kami.",
      "Lama proses pengerjaan maksimal adalah 2 x 24 jam setelah konfirmasi pembayaran diterima",
    ],
  },
  {
    title: "Butuh Bantuan / Konsultasi Terlebih Dahulu?",
    description: [
      "Jika mengalami kesulitan dalam pemesanan jasa undangan digital kami, silahkan kontak kami melalui chat support whatsapp di: +62 857 4010 4220",
      "Kami akan dengan senang hati siap membantu Anda.",
    ],
  },
];

export const navlist = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Tema",
    link: "/#theme",
  },
  {
    title: "Harga",
    link: "/#pricing",
  },
  {
    title: "Kontak",
    link: "/#contact",
  },
];
