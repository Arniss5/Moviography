const searchBar = document.getElementById('search-bar')
const searchBtn = document.getElementById('search-btn')
const cardContainer = document.getElementById('card-container')

let filmsArray = []


searchBtn.addEventListener('click', () => {
    filmsArray = []
    searchFilms()
    console.log(filmsArray)
})


function searchFilms() {
    renderFilms()
    searchBar.value = ''
}


function renderFilms() {
    fetch(`http://www.omdbapi.com/?apikey=cec89db4&s=${searchBar.value}`)
        .then(res => res.json())
        .then(data => {
            //fetch detailed info about each film
            if (data.Search) {
                data.Search.forEach(film => {
                    fetch(`http://www.omdbapi.com/?apikey=cec89db4&t=${film.Title}`)
                    .then(res => res.json())
                    .then(data => {
                        
                        //fix API bug and exclude repetition films
                        if (!filmsArray.find(film => film.Plot === data.Plot)) {
                            filmsArray.push(data)
                          }
                        
                        //sort films from highest rating
                        filmsArray.sort((a, b) => {
                            return b.imdbRating - a.imdbRating;
                        })
    
                        document.getElementById('card-container').innerHTML = getFilmsHtml()
                    })
                })
            } else {
                cardContainer.innerHTML = `
                    <p class="cards-placeholder">
                        Unable to find what you’re looking for. Please try another search.
                    </p>
                `
            }
            
    })
}
    
function getFilmsHtml() {
    let filmsHtml = ``
    filmsArray.forEach((film, index) => {
        filmsHtml += getFilmHtml(film, index)
    })
    return filmsHtml
}

function getFilmHtml(film, index) {
      
    return `
            <div class="card">
                <img
                    class="card-img"
                    src="${film.Poster}"
                    alt="${film.Title}"
                />
                <div class="card-main">
                    
                    <div class="text-top">
                        <div class="title">${film.Title}</div>
                        <div class="text-top">
                            <i class="fa-solid fa-star"></i>
                            <div class="rating" id="rating">${film.imdbRating}</div>
                        </div>
                    </div>
                    
                    <div class="card-info">
                        <div id="length">${film.Runtime}</div>
                        <div id="genre">${film.Genre}</div>
                        <button class="watchlist-toggle">
                            <i class="fa-solid fa-circle-plus"></i>
                            Watchlist
                        </button>
                    </div>
                    
                    <p class="plot" id="plot">
                    ${film.Plot}
                    </p>
                </div>
            </div>
        `
}




`
Object { Title: "Blade Runner", Year: "1982", Rated: "R", Released: "25 Jun 1982", Runtime: "117 min", Genre: "Action, Drama, Sci-Fi", Director: "Ridley Scott", Writer: "Hampton Fancher, David Webb Peoples, Philip K. Dick", Actors: "Harrison Ford, Rutger Hauer, Sean Young", Plot: "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.", … }
​
Actors: "Harrison Ford, Rutger Hauer, Sean Young"
​
Awards: "Nominated for 2 Oscars. 13 wins & 19 nominations total"
​
BoxOffice: "$32,914,489"
​
Country: "United States"
​
DVD: "30 Oct 2001"
​
Director: "Ridley Scott"
​
Genre: "Action, Drama, Sci-Fi"
​
Language: "English, German, Cantonese, Japanese, Hungarian, Arabic, Korean"
​
Metascore: "84"
​
Plot: "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator."
​
Poster: "https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00…gtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
​
Production: "N/A"
​
Rated: "R"
​
Ratings: Array(3) [ {…}, {…}, {…} ]
​
Released: "25 Jun 1982"
​
Response: "True"
​
Runtime: "117 min"
​
Title: "Blade Runner"
​
Type: "movie"
​
Website: "N/A"
​
Writer: "Hampton Fancher, David Webb Peoples, Philip K. Dick"
​
Year: "1982"
​
imdbID: "tt0083658"
​
imdbRating: "8.1"
​
imdbVotes: "768,236"`