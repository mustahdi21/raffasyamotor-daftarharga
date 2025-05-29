const apiURL = "https://sheetdb.io/api/v1/rxfo08i7f6pyp"; // Ganti dengan URL API kamu

// Fungsi untuk bersihkan dan format harga
function formatRupiah(hargaString) {
  if (!hargaString) return "Harga tidak tersedia";

  // Hilangkan "Rp" dan titik
  let angkaString = hargaString.replace(/Rp\s?|(\.)/g, "");

  // Konversi ke number
  let angka = parseInt(angkaString);
  if (isNaN(angka)) return "Harga tidak valid";

  // Format ulang ke Rupiah dengan titik ribuan
  return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("mobilList");
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "mobil-card";

      // Galeri foto
      const photos = [];
      for (let i = 1; i <= 10; i++) {
        const key = `PHOTO ${i}`;
        if (item[key]) {
          photos.push(`<img src="${item[key]}" alt="Foto ${i}">`);
        }
      }

      // Isi kartu dengan harga sudah diformat
      card.innerHTML = `
        <div class="info">
          <h3>${item['MERK/TYPE MOBIL']}</h3>
          <p><strong>Nopol:</strong> ${item['NOPOL']}</p>
          <p><strong>Bulan:</strong> ${item['BULAN']}</p>
          <p><strong>Harga Jual:</strong> ${formatRupiah(item['HARGA JUAL (OTR)'])}</p>
        </div>
        <div class="gallery">
          ${photos.join("")}
        </div>
      `;

      list.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Gagal mengambil data:", error);
  });
