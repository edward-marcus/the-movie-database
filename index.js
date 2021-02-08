let id;
var api_key = config.api_key;
const API_URL = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-01-24&primary_release_date.lte=2021-01-31&api_key=${api_key}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const category = document.querySelectorAll('.category');
const home = document.querySelector('.home');
const creditsBtn = document.querySelector('.credits');
const modalContainer = document.querySelector('.modal-container');
const modalCredits = document.querySelector('.modal-credits');
const moveUp = document.querySelectorAll('.moveUp');
const closeBtn = document.getElementById('closeBtn');
const best_dramas = document.getElementById('best_dramas');
const best_of_2020 = document.getElementById('best_of_2020');
const best_kids_movies = document.getElementById('best_kids_movies');

// bringing the modalContainer in front and making it visible when clicking on the credits button
creditsBtn.addEventListener('click', () => {
  modalContainer.style.opacity = '1';
  modalContainer.style.zIndex = '5';
  modalCredits.style.opacity = '1';

  for (let i = 0; i < moveUp.length; i++) {
    moveUp[i].classList.add('move');
  }
});

// rendering the modalContainer invisible and behind the website when clicking on the modalContainer
window.addEventListener('click', (e) => {
  if (e.target == modalCredits) {
    modalContainer.style.opacity = '0';
    modalContainer.style.zIndex = '-2';
    modalCredits.opacity = '0';
  } else {
    return false;
  }
});

home.addEventListener('click', () => {
  getMovies(API_URL);
});

best_dramas.addEventListener('click', () => {
  const HIGHEST_R_RATED_MOVIES = `https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=${api_key}`;
  return getMovies(HIGHEST_R_RATED_MOVIES);
});

best_of_2020.addEventListener('click', () => {
  const BEST_OF_2020 = `https://api.themoviedb.org/3/discover/movie?primary_release_year=2020&sort_by=vote_average.desc&api_key=${api_key}`;
  return getMovies(BEST_OF_2020);
});

best_kids_movies.addEventListener('click', () => {
  const BEST_KIDS_MOVIES = `https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${api_key}`;
  return getMovies(BEST_KIDS_MOVIES);
});

// rendering the modalContainer invisible and behind the website when pressing the close button
closeBtn.addEventListener('click', () => {
  modalContainer.style.opacity = '0';
  modalContainer.style.zIndex = '-2';
  modalCredits.opacity = '0';
});

// defining the getMovieByGenre function which takes a dynamic link as a parameter (the variable id in the link) providing a specific movie genre fetch depending on the value of the id - provided by the API
function getMovieByGenre(id) {
  let DISCOVER_API = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=${api_key}`;

  return getMovies(DISCOVER_API);
}

//Associate the text content of each button in the sidebar(movie genre) to a certain number that will be passed as the id parameter in the getMovieByGenre function
category.forEach((genre) => {
  genre.addEventListener('click', () => {
    if (genre.textContent === 'Action') {
      getMovieByGenre(28);
    }
    if (genre.textContent === 'Adventure') {
      getMovieByGenre(28);
    }
    if (genre.textContent === 'Animation') {
      getMovieByGenre(16);
    }
    if (genre.textContent === 'Comedy') {
      getMovieByGenre(35);
    }
    if (genre.textContent === 'Crime') {
      getMovieByGenre(80);
    }
    if (genre.textContent === 'Documentary') {
      getMovieByGenre(99);
    }
    if (genre.textContent === 'Drama') {
      getMovieByGenre(18);
    }
    if (genre.textContent === 'Family') {
      getMovieByGenre(10751);
    }
    if (genre.textContent === 'Fantasy') {
      getMovieByGenre(14);
    }
    if (genre.textContent === 'History') {
      getMovieByGenre(36);
    }
    if (genre.textContent === 'Horror') {
      getMovieByGenre(27);
    }
    if (genre.textContent === 'Music') {
      getMovieByGenre(10402);
    }
    if (genre.textContent === 'Mystery') {
      getMovieByGenre(9648);
    }

    if (genre.textContent === 'Romance') {
      getMovieByGenre(10749);
    }
    if (genre.textContent === 'Science Fiction') {
      getMovieByGenre(878);
    }
    if (genre.textContent === 'TV Movie') {
      getMovieByGenre(10770);
    }
    if (genre.textContent === 'Thriller') {
      getMovieByGenre(53);
    }
    if (genre.textContent === 'War') {
      getMovieByGenre(10752);
    }
    if (genre.textContent === 'Western') {
      getMovieByGenre(37);
    }
  });
});

// Get initial movies
getMovies(API_URL);

// After defining  the getMovie function(which just fetches data from the API and parses it in JSON) we call the showMovies function
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

//Inject the movies into the DOM (main) and add the movie class to them which is defined in the css file
function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie; //pulling out the properties we need from the movie object

    //Creating the HTML structure for the movie (called movieEl) and styling it by adding the .movie class defined in the css file
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
            <img src="${
              IMG_PATH + poster_path
            }" alt="${title}" onerror="this.src='https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1040&q=80'" >
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="description">
          <h3>${title}</h3>
          ${overview}
         </div>
        `;

    main.appendChild(movieEl);
    movieEl.addEventListener('click', () => {
      //While we have scope access to the movieEL we add toggle the .expand class based on click event
      movieEl.classList.toggle('expanded');
    });
  });
}

// We return a string based on the value of the vote for the movie provided by the API - this is a custom conditional
function getClassByRate(vote) {
  if (vote >= 8) {
    return 'high-rating';
  } else if (vote >= 5) {
    return 'medium-rating';
  } else {
    return 'low-rating';
  }
}

// Adding the search query functionality and reloading the window if we try to search without typing in anything in the searchbox
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});

// ---------------------------------------------------------COLOR PICKER --------------------------------------------------------------

// Setting the color input value to the root variables(--primary-color, --secondary-color, --accent-color) - this is overwriting these values

const primaryColorPicker = document.querySelector('.primary-color-picker');
primaryColorPicker.addEventListener('input', () => {
  document.documentElement.style.setProperty(
    '--primary-color',
    primaryColorPicker.value
  );
});

const secondaryColorPicker = document.querySelector('.secondary-color-picker');
secondaryColorPicker.addEventListener('input', () => {
  document.documentElement.style.setProperty(
    '--secondary-color',
    secondaryColorPicker.value
  );
});

const accentColorPicker = document.querySelector('.accent-color-picker');
accentColorPicker.addEventListener('input', () => {
  document.documentElement.style.setProperty(
    '--accent-color',
    accentColorPicker.value
  );
});

const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', () => {
  document.documentElement.style.setProperty('--primary-color', '#3a3a3a');
  document.documentElement.style.setProperty('--secondary-color', '#2b2a2a');
  document.documentElement.style.setProperty('--accent-color', '#7378c5');
});
