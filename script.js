// const imgContainer = document.getElementById("img");

// fetch(`http://www.omdbapi.com/?apikey=53c912a0&t=troy`)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     imgContainer.innerHTML = `<img src="${data.Poster}"/>`;
//   });

// const cardsContainer = document.getElementById("cardsContainer");

// fetch(`http://www.omdbapi.com/?apikey=53c912a0&t=troy`)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     cardsContainer.innerHTML += `<div class="card" >
//           <div class="card-container">
//             <div class="img-container">
//             <img src="${data.Poster}">
//             </div>
//             <div class="movie-info">
//               <p class="movie-title">Title: ${data.Title}</p>
//               <p class="movie-actors">Actors: ${data.Actors}</p>
//               <p class="movie-genre">Genre: ${data.Genre}</p>
//             </div>
//           </div>
//         </div>`;
//   });

const main = document.getElementById("main");
const home = document.getElementById("home");
const movieInfo = document.getElementById("movie-info");
const input = document.getElementById("searchInput");
const moviesCollection = document.getElementById("moviesCollection");
const gridContainer = document.querySelector(".grid-container");
const navBtns = document.querySelectorAll(".navBtn");

navBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    navBtns.forEach((link) => {
      link.classList.remove("current");
    });
    btn.classList.add("current");
  });
});

// Change navbar background on scrolling
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("main-nav");

  if (window.scrollY > 0) {
    navbar.classList.add("navbar-scroll");
  } else {
    navbar.classList.remove("navbar-scroll");
  }
});

function search() {
  if (input.value !== "") {
    fetch(`https://www.omdbapi.com/?apikey=53c912a0&t=${input.value}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        displayShowInfo(data);
      });
  } else {
    movieInfo.innerHTML = "";
  }
}

function displayShowInfo(data) {
  //  Movie details
  movieInfo.innerHTML = `<div class="flex-container">
    <img clas="movie-poster" src="${data.Poster}" />
    <div class="description">
    <div>
      <p class="movie-title">${data.Title}</p>
      <p class="movie-gist">${data.Plot}</p>
      <a href="#">
        <i class="fa-solid fa-play"></i> Watch
      </a>
      <a href="#">
        <i class="fa-solid fa-plus"></i> Add List
      </a>
    </div>
  </div>
  </div>`;
}

let moviesLoaded = false;
function displayMoviesCollection() {
  if (!moviesLoaded) {
    moviesCollection.style.display = "block";
    const apiKey = "53c912a0";
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=legend&page=1`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((page) => {
        console.log(page);
        page.Search.forEach((movie) => {
          gridContainer.innerHTML += `<div href="#" class="card">
                <img src="${movie.Poster}">
            </div>`;
        });
      });
    moviesLoaded = true;
  }
}
