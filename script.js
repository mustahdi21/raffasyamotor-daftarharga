const apiURL = "https://sheetdb.io/api/v1/rxfo08i7f6pyp"; // Ganti jika perlu

// Format harga ke Rupiah
function formatRupiah(hargaString) {
  if (!hargaString) return "Harga tidak tersedia";
  let angkaString = hargaString.replace(/Rp\s?|(\.)/g, "");
  let angka = parseInt(angkaString);
  if (isNaN(angka)) return "Harga tidak valid";
  return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("mobilList");

    data.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "mobil-card";

      const photos = [];
      for (let i = 1; i <= 10; i++) {
        const key = `PHOTO ${i}`;
        if (item[key]) {
          photos.push(`
            <div class="swiper-slide">
              <img src="${item[key]}" alt="Foto ${i}" />
            </div>
          `);
        }
      }

      card.innerHTML = `
        <div class="swiper swiper-${index}">
          <div class="swiper-wrapper">
            ${photos.join("")}
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="info">
          <h3>${item['MERK/TYPE MOBIL']}</h3>
          <p><strong>Nopol:</strong> ${item['NOPOL']}</p>
          <p><strong>Bulan:</strong> ${item['BULAN']}</p>
          <p><strong>Harga Jual:</strong> ${formatRupiah(item['HARGA JUAL (OTR)'])}</p>
        </div>
      `;

      list.appendChild(card);

      new Swiper(`.swiper-${index}`, {
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: `.swiper-${index} .swiper-pagination`,
          clickable: true,
        },
      });
    });
  })
  .catch(error => {
    console.error("Gagal mengambil data:", error);
  });
