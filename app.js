const searchBar = document.getElementById('search-bar')
const searchBtn = document.getElementById('search-btn')
const cardContainer = document.getElementById('card-container')
const watchlistLink = document.getElementById('my-watchlist')

let filmsArray = []
let watchlistArray = []



// SEARCHING FOR FILMS
searchBtn.addEventListener('click', () => {
    filmsArray = []
    searchFilms()
    // console.log(filmsArray)
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
    
                        document.getElementById('card-container').innerHTML = getFilmsHtml(filmsArray)
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
    
function getFilmsHtml(filmsList) {
    let filmsHtml = ``
    filmsList.forEach(film => {
        filmsHtml += getFilmHtml(film)
    })
    return filmsHtml
}

function getFilmHtml(film) {
      
    return `
            <div class="card">
                <img
                    class="card-img"
                    src="${film.Poster === 'N/A' ? `./styles/icon.jpg` : film.Poster }"
                    alt="${film.Title}"
                />
                <div class="card-main">
                    
                    <div class="text-top">
                        <div class="title">${film.Title}</div>
                        <div class="text-top">
                            <i class="fa-solid fa-star"></i>
                            <div class="rating">${film.imdbRating}</div>
                        </div>
                    </div>
                    
                    <div class="card-info">
                        <div id="length">${film.Runtime}</div>
                        <div id="genre">${film.Genre}</div>
                        <button class="watchlist-toggle" id="add${film.imdbID}" data-film="${film.imdbID}">
                            <i class="fa-solid fa-circle-plus"></i>
                            <p class="watchlist-text"> Watchlist </p>
                        </button>
                        <button class="watchlist-toggle hidden" id="remove${film.imdbID}" data-film="${film.imdbID}">
                            <i class="fa-solid fa-circle-minus"></i>
                            <p class="watchlist-text"> Remove </p>
                        </button>
                    </div>
                    
                    <p class="plot" id="plot">
                    ${film.Plot}
                    ${film.Plot.length > 230 ? `<a href='https://www.imdb.com/title/${film.imdbID}' class='read-more' target="_blank">Read more</a>` : ""}
                    </p>
                </div>
            </div>
        `
}




// ADDING TO WATCHLIST


document.addEventListener('click', event => {
    handleWatchlist(event)
})


function handleWatchlist(e) {
    const add = document.getElementById(`add${e.target.dataset.film}`)
    const remove = document.getElementById(`remove${e.target.dataset.film}`)

    // add/remove films from watchlistArray
    if(e.target.className == "watchlist-toggle") {
        if(e.target == add) {
            watchlistArray.push(filmsArray.filter(film => film.imdbID == e.target.dataset.film)[0])
            console.log(watchlistArray)
        } else {
            const filmToRemove = filmsArray.filter(film => film.imdbID == e.target.dataset.film)[0]
            watchlistArray.splice(watchlistArray.indexOf(filmToRemove), 1)
            // console.log(watchlistArray.indexOf(filmToRemove))
            // console.log(watchlistArray)
        }
        
        add.classList.toggle('hidden')
        remove.classList.toggle('hidden')
    }
}

watchlistLink.addEventListener('click', () => {
    document.getElementById('watchlist-container').innerHTML = getFilmsHtml(watchlistArray)
})
    




// export {watchlistArray}