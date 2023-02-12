const resultsNav = document.getElementById("resultsNav");
const favoriteNav = document.getElementById("favoriteNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = "USdHebFvTK0knBcfeDnwYI0UyLLR4HV8de7JTBeB";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favoriteList = {};

function createDOMNodes(page) {
  let data = [];
  if (page === "result") {
    data = resultsArray;
  } else if (page === "favorites") {
    data = Object.values(favoriteList);
  }
  data.forEach((result) => {
    const { copyright, date, explanation, hdurl, title } = result;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <a href="" title="View Full Image" target="_blank">
    <img
      src=${hdurl}
      alt="NASA Picture of the Day"
      class="card-img-top"
      loading="lazy"
    />
  </a>
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <span class="clickable favorite"  > ${
      page === "result" ? "Add to Favorites" : "Remove from Favorite"
    }</span>
    <p class="card-text">
      ${explanation}
    </p>
    <small class="text-muted">
      <strong>${date}</strong>
      <span>&nbsp;${copyright || ""}</span>
    </small>
    `;

    imagesContainer.appendChild(card);
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("card")) return;
      if (e.target.classList.contains("favorite")) {
        toggleFavorite(hdurl, page);
      }
    });
  });
}
function updateDOM(page) {
  // Get Favorites from localStorage
  if (localStorage.getItem("nasaFavorites")) {
    favoriteList = JSON.parse(localStorage.getItem("nasaFavorites"));
  }
  imagesContainer.textContent = "";
  createDOMNodes(page);
}

const getNasaPictures = async function () {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    resultsArray = data;
    updateDOM("favorites");
  } catch (error) {
    console.error(error);
  }
};

function toggleFavorite(itemURL, page) {
  const result = resultsArray.find((item) => item.hdurl === itemURL);
  if (page === "result") {
    if (!favoriteList[itemURL]) {
      favoriteList[itemURL] = result;
      console.log(favoriteList);
      // Show Save Confirmation for 2 Seconds
      saveConfirmed.classList.remove("hidden");
      setTimeout(() => {
        saveConfirmed.classList.add("hidden");
      }, 2000);
      // Set Favorites in localStorage
      localStorage.setItem("nasaFavorites", JSON.stringify(favoriteList));
    }
  } else {
    delete favoriteList[itemURL];
    console.log(favoriteList);
    localStorage.setItem("nasaFavorites", JSON.stringify(favoriteList));
    updateDOM("favorites");
  }
}

getNasaPictures();
