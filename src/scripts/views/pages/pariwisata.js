import TravelinSource from "../../data/travelin-source";
import { createTourItemTemplate, createTourSkeletonTemplate } from "../templates/template-creator";

const Pariwisata = {
  async render() {
    return `
      <div class="container mt-5">
        <div class="section-title">
          <center><h2>TOURISM'S</h2></center>
        </div>
        <!-- Search feature -->
        <div class="search-container mt-4 d-flex justify-content-center">
          <input type="text" id="search-input" placeholder="Search Tourism Name or Province" class="form-control">
        </div>
        <div class="row mt-4" id="tourism-cards">
          <!-- Skeleton loader akan tampil disini -->
          ${createTourSkeletonTemplate(8)}
        </div>
      </div>
    `;
  },

  async afterRender() {
    try {
      const tours = await TravelinSource.Tours();
      const tourismCardsContainer = document.getElementById("tourism-cards");
      const searchInput = document.getElementById("search-input");

      function displayTourismCards(items) {
        tourismCardsContainer.innerHTML = "";
        if (items.length === 0) {
          tourismCardsContainer.innerHTML = '<p class="text-danger">Tidak ada data yang ditemukan.</p>';
          return;
        }
        items.forEach((tour) => {
          const card = document.createElement("div");
          card.className = "col-lg-3 col-md-6 mb-4";
          card.innerHTML = createTourItemTemplate(tour);
          tourismCardsContainer.appendChild(card);
        });
      }

      displayTourismCards(tours);

      searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();

        const filteredItems = tours.filter((tour) =>
          tour.province.toLowerCase().includes(searchTerm) ||
          tour.name.toLowerCase().includes(searchTerm)
        );

        displayTourismCards(filteredItems);
      });
    } catch (error) {
      console.error("Error fetching the tours data:", error);
      document.getElementById("tourism-cards").innerHTML = '<p class="text-danger">Failed to load tours data. Please try again later.</p>';
    }
  },
};

export default Pariwisata;
