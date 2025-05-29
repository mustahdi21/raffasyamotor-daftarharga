const apiURL = "https://sheetdb.io/api/v1/rxfo08i7f6pyp";
const itemsPerPage = 6;

let allData = [];
let currentPage = 1;

const listContainer = document.getElementById("mobilList");
const paginationContainer = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");

function formatRupiah(str) {
  if (!str) return "Rp -";
  let cleaned = str.replace(/Rp\s?|\./g, "");
  let number = parseInt(cleaned);
  if (isNaN(number)) return "Rp -";
  return "Rp " + number.toLocaleString("id-ID");
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `px-3 py-1 rounded border ${i === currentPage ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-100"}`;
    btn.onclick = () => {
      currentPage = i;
      renderList();
    };
    paginationContainer.appendChild(btn);
  }
}

function renderList() {
  const searchText = searchInput.value.toLowerCase();
  const filteredData = allData.filter(item => {
    const merk = item["MERK/TYPE MOBIL"]?.toLowerCase() || "";
    const nopol = item["NOPOL"]?.toLowerCase() || "";
    return merk.includes(searchText) || nopol.includes(searchText);
  });

  const start = (currentPage - 1) * itemsPerPage;
  const pagedData = filteredData.slice(start, start + itemsPerPage);

  listContainer.innerHTML = "";

  pagedData.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "bg-white shadow rounded overflow-hidden";

    const uniqueId = `swiper-${currentPage}-${i}`;

    const photos = [];
    for (let j = 1; j <= 10; j++) {
      const key = `PHOTO ${j}`;
      if (item[key]) {
        photos.push(`
          <div class="swiper-slide flex justify-center items-center bg-gray-50">
            <img src="${item[key]}" alt="Foto ${j}" class="object-cover max-h-48 w-auto mx-auto" />
          </div>
        `);
      }
    }

    card.innerHTML = `
      <div class="swiper ${uniqueId}">
        <div class="swiper-wrapper">
          ${photos.join("")}
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="p-4">
        <h2 class="text-lg font-semibold text-gray-800">${item['MERK/TYPE MOBIL']}</h2>
        <p class="text-sm text-gray-600">Nopol: ${item['NOPOL']}</p>
        <p class="text-sm text-gray-600">Bulan: ${item['BULAN']}</p>
        <p class="text-blue-700 font-bold mt-2">${formatRupiah(item['HARGA JUAL (OTR)'])} (OTR)</p>
      </div>
    `;

    listContainer.appendChild(card);

    new Swiper(`.${uniqueId}`, {
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: `.${uniqueId} .swiper-pagination`,
        clickable: true,
      },
    });
  });

  renderPagination(filteredData);
}


searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderList();
});

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    allData = data;
    renderList();
  })
  .catch(err => {
    console.error("Gagal mengambil data:", err);
  });
