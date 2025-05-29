const apiURL = "https://sheetdb.io/api/v1/e4j1ecw24m940"; // Ganti dengan URL API kamu

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("mobilList");
    data.forEach(mobil => {
      const card = document.createElement("div");
      card.className = "mobil-card";

      card.innerHTML = `
        <img src="${mobil.Gambar}" alt="${mobil.Merek} ${mobil.Model}">
        <h3>${mobil.Merek} ${mobil.Model}</h3>
        <p>Tahun: ${mobil.Tahun}</p>
        <p>Harga: Rp${Number(mobil.Harga).toLocaleString("id-ID")}</p>
        <p>Status: <strong>${mobil.Status}</strong></p>
      `;

      list.appendChild(card);
    });
  });
