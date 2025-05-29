const apiURL = "https://sheetdb.io/api/v1/4uz2ba45ildtm"; // Ganti dengan URL API kamu

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("mobilList");
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "mobil-card";

      // Ambil semua kolom PHOTO yang terisi
      const photos = [];
      for (let i = 1; i <= 10; i++) {
        const photoKey = `PHOTO ${i}`;
        if (item[photoKey]) {
          photos.push(`<img src="${item[photoKey]}" alt="Foto ${i}">`);
        }
      }

      card.innerHTML = `
        <div class="info">
          <h3>${item['MERK/TYPE MOBIL']}</h3>
          <p><strong>Nopol:</strong> ${item['NOPOL']}</p>
          <p><strong>Bulan:</strong> ${item['BULAN']}</p>
          <p><strong>Stok:</strong> ${item['STOK']} unit</p>
          <p><strong>Harga:</strong> Rp${Number(item['HARGA JUAL (OTR)']).toLocaleString('id-ID')}</p>
          <p><strong>Tenor:</strong> ${item['TENOR']}</p>
          <p><strong>BY:</strong> ${item['BY']}</p>
        </div>
        <div class="gallery">
          ${photos.join('')}
        </div>
      `;

      list.appendChild(card);
    });
  })
  .catch(err => console.error("Fetch error:", err));
