import {getFilmsHtml} from './utils.js'

const searchBar = document.getElementById('search-bar')
const searchBtn = document.getElementById('search-btn')
const cardContainer = document.getElementById('card-container')


export let filmsArray = []


//check storage for watchlist
let watchlistArray
if(localStorage.getItem('watchlist') === null) {
    watchlistArray = []
} else {
    watchlistArray = JSON.parse(localStorage.getItem("watchlist"))
}





// SEARCHING FOR FILMS
searchBtn.addEventListener('click', e => {
    e.preventDefault()
    filmsArray = []
    searchFilms()
    // console.log(filmsArray)
})


function searchFilms() {
    document.getElementById('card-container').innerHTML = `<div class="loader"></div>` 
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
    
                        document.getElementById('card-container').innerHTML = getFilmsHtml(filmsArray, "", "hidden")
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
    







// ADDING TO WATCHLIST


document.addEventListener('click', event => {
    handleWatchlist(event)
})


export function handleWatchlist(e) {
    const add = document.getElementById(`add${e.target.dataset.film}`)
    const remove = document.getElementById(`remove${e.target.dataset.film}`)
    
    
    // add/remove films from watchlistArray
    if(e.target.className.includes("watchlist-toggle")) {
        

        if(e.target == add) {
            watchlistArray.push(filmsArray.filter(film => film.imdbID == e.target.dataset.film)[0])
            localStorage.setItem("watchlist", JSON.stringify(watchlistArray))
            
        } else {
            const filmToRemove = filmsArray.filter(film => film.imdbID == e.target.dataset.film)[0]
            watchlistArray.splice(watchlistArray.indexOf(filmToRemove), 1)
            localStorage.setItem("watchlist", JSON.stringify(watchlistArray))
            // console.log(watchlistArray.indexOf(filmToRemove))
            
        }
        
        add.classList.toggle('hidden')
        remove.classList.toggle('hidden')
        

        
    }
}