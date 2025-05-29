const apiURL = "https://sheetdb.io/api/v1/rxfo08i7f6pyp"; // Ganti dengan URL API kamu
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

      // Isi kartu
      card.innerHTML = `
        <div class="info">
          <h3>${item['MERK/TYPE MOBIL']}</h3>
          <p><strong>Nopol:</strong> ${item['NOPOL']}</p>
          <p><strong>Bulan:</strong> ${item['BULAN']}</p>
          <p><strong>Harga Jual:</strong>${item['HARGA JUAL (OTR)']}</p>
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
