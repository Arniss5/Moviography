
let requestedFilmsArray = []

fetch('http://www.omdbapi.com/?apikey=cec89db4&s=Pulp+Fiction')
    .then(res => res.json())
    .then(data => {
    requestedFilmsArray = data.Search
    getFilmsHtml(requestedFilmsArray)
    })


    function getFilmsHtml(filmsArray) {
        filmsArray.forEach((film, index) => {
            getCardHtml(film, index)
            console.log(film)
        })
    }

    function getCardHtml(film, index) {
        console.log( `
        <div class="card">
                <img
                    class="card-img"
                    src="${film.Poster}"
                    alt="${film.Title}"
                />
                <div class="card-main">
                    <!-- main top -->
                    <div class="text-top">
                        <div class="title">${film.Title}</div>
                        <div class="text-top">
                            <i class="fa-solid fa-star"></i>
                            <div class="rating" id="rating">8.1</div>
                        </div>
                    </div>
                    <!-- main middle -->
                    <div class="card-info">
                        <div id="length">177 min</div>
                        <div id="genre">Action, Drama, Sci-fi</div>
                        <button class="watchlist-toggle">
                            <i class="fa-solid fa-circle-plus"></i>
                            Watchlist
                        </button>
                    </div>
                    <!-- main bottom -->
                    <p class="plot" id="plot">
                        A blade runner must pursue and terminate four replicants
                        who stole a ship in space, and have returned to Earth to
                        find their creator.
                    </p>
                </div>
            </div>
        
        `)
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