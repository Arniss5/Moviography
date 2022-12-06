
import { getFilmsHtml } from "./utils.js"

let watchlist = JSON.parse(localStorage.getItem("watchlist"))

renderWatchlist()


document.addEventListener("click", e => {
    if (e.target.className.includes("watchlist-toggle")) {
        const filmToRemove = watchlist.filter(film => film.imdbID == e.target.dataset.film)[0]
        watchlist.splice(watchlist.indexOf(filmToRemove), 1)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        renderWatchlist()
    }
})


function renderWatchlist() {
    if(watchlist && watchlist.length > 0) {
        document.getElementById('watchlist-container').innerHTML = getFilmsHtml(watchlist, "hidden", "")
    } else {
        document.getElementById('watchlist-container').innerHTML =`
        <div class="cards-placeholder">
            <p class="cards-placeholder-text">
                Your watchlist is looking a little empty...
            </p>
            <a class="add-movies-link" href="./index.html">
                <i class="fa-solid fa-circle-plus"></i>
                Let's add some movies!</a
            >
        </div>`
    }
}


