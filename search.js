// https://www.omdbapi.com/?i=tt3896198&apikey=4ffeac5&s=action


let filmsData;

async function renderFilms(filter) {
  const filmsWrapper = document.querySelector(".films");

  filmsWrapper.innerHTML = `<i class="fa-solid fa-spinner films__loading--spinner"></i>`; // Force spinner
  filmsWrapper.classList.add("films__loading");

  // Simulate delay to show the spinner (e.g., 500ms)
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!filmsData) {
    const res = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=4ffeac5&s=action");
    filmsData = await res.json();
  }

  // Remove spinner and loading state
  filmsWrapper.classList.remove("films__loading");

  if (!filmsData.Search) {
    filmsWrapper.innerHTML = "<p style='color: white;'>No results found.</p>";
    return;
  }

  // Sort logic
  if (filter === 'Newest') {
    filmsData.Search.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (filter === 'Oldest') {
    filmsData.Search.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }

  const filmsHtml = filmsData.Search.map((film) => {
    return `<div class="film">
      <figure class="film__img--wrapper">
          <img src="${film.Poster}" alt="" class="film__img">
      </figure>
      <div class="film__title">
          ${film.Title}
      </div>
      <div class="film__year">
          ${film.Year} <span class="film__type">${film.Type}</span>
      </div>
    </div>`;
  }).join("");

  filmsWrapper.innerHTML = filmsHtml;
}


async function OnSearchChange(event) {
  const filmsWrapper = document.querySelector(".films");
  const id = event.target.value;

  const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=4ffeac5&s=${id}`);
  const filmsData = await res.json();

  // Error check
  if (!filmsData.Search) {
    filmsWrapper.innerHTML = "<p style='color: white;'>No results found.</p>";
    return;
  }

  const filmsHtml = filmsData.Search.map((film) => {
    return `<div class="film">
      <figure class="film__img--wrapper">
          <img src="${film.Poster}" alt="" class="film__img">
      </figure>
      <div class="film__title">
          ${film.Title} 
      </div>
        <div class="film__year">
            ${film.Year} <span class="film__type">${film.Type}<span>
        </div>
    </div>`;
  }).join("");

  filmsWrapper.innerHTML = filmsHtml;
}

function filterFilms(event){
    renderFilms(event.target.value);
}

window.addEventListener("DOMContentLoaded", () => {
  renderFilms();
});
