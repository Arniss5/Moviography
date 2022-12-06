

export function getFilmHtml(film, add, remove) {
      
    return `
            <div class="card">
                <img
                    class="card-img"
                    src="${film.Poster === 'N/A' ? `./styles/images/Icon.jpg` : film.Poster }"
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
                        <button class="watchlist-toggle ${add}" id="add${film.imdbID}" data-film="${film.imdbID}">
                            <i class="fa-solid fa-circle-plus"></i>
                            <p class="watchlist-text"> Watchlist </p>
                        </button>
                        <button class="watchlist-toggle ${remove}" id="remove${film.imdbID}" data-film="${film.imdbID}">
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

export function getFilmsHtml(filmsList, add, remove) {
    let filmsHtml = ``
    filmsList.forEach(film => {
        filmsHtml += getFilmHtml(film, add, remove)
    })
    return filmsHtml
}



