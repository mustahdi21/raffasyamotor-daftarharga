const apiURL = "https://sheetdb.io/api/v1/e4j1ecw24m940"; // Ganti dengan URL API kamu

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("mobilList");
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "mobil-card";

      card.innerHTML = `
        <img src="${item['GAMBAR']}" alt="${item['MERK/TYPE MOBIL']}">
        <h3>${item['MERK/TYPE MOBIL']}</h3>
        <p>Nomor Polisi: ${item['NOPOL']}</p>
        <p>Bulan: ${item['BULAN']}</p>
        <p>Stok: ${item['STOK']}</p>
        <p>Total Unit: ${item['TOTAL UNIT']}</p>
        <p>Harga: Rp${Number(item['HARGA JUAL (OTR)']).toLocaleString('id-ID')}</p>
      `;

      list.appendChild(card);
    });
  })
  .catch(err => console.error('Fetch error:', err));
