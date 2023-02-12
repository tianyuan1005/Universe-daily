const resultsNav = document.getElementById("resultsNav");
const favoriteNav = document.getElementById("favoriteNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 30;
const apiKey = "USdHebFvTK0knBcfeDnwYI0UyLLR4HV8de7JTBeB";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
function updateDOM() {
  resultsArray.forEach((result) => {
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
    <p class="clickable">Add to Favorites</p>
    <p class="card-text">
      ${explanation}
    </p>
    <small class="text-muted">
      <strong>${date}</strong>
      <span>&nbsp;${copyright || ""}</span>
    </small>
    `;
    imagesContainer.appendChild(card);
  });
}
const getNasaPictures = async function () {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    resultsArray = data;
    updateDOM();
  } catch (error) {
    console.error(error);
  }
};

getNasaPictures();
