let popularOnTv = document.getElementById("popularOnTv");
let inTheaters = document.getElementById("inTheaters");

popularOnTv.addEventListener("click", () => {
  popularNow(
    "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1'",
    "name",
    "first_air_date"
  );
  popularOnTv.classList.remove("false");
  popularOnTv.classList.add("active-trending");
  inTheaters.classList.remove("active-trending");
  inTheaters.classList.add("false");
  popularOnTv.children[0].classList.remove("false");
  popularOnTv.children[0].classList.add("active-link");
  inTheaters.children[0].classList.remove("active-link");
  inTheaters.children[0].classList.add("false");
});

inTheaters.addEventListener("click", () => {
  popularNow(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'",
    "title",
    "release_date"
  );
  inTheaters.classList.remove("false");
  inTheaters.classList.add("active-trending");
  popularOnTv.classList.remove("active-trending");
  popularOnTv.classList.add("false");
  inTheaters.children[0].classList.remove("false");
  inTheaters.children[0].classList.add("active-link");
  popularOnTv.children[0].classList.remove("active-link");
  popularOnTv.children[0].classList.add("false");
});

function popularNow(url, title, date) {
  const popularOnTv = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
    },
  };

  fetch(url, popularOnTv)
    .then((response) => response.json())
    .then((response) => {
      let posters = document.getElementById("popular-movie");
      console.log(response);

      let results = response.results;
      console.log(
        new Date().toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );

      posters.innerHTML = "";
      for (const index in results) {
        posters.insertAdjacentHTML(
          "beforeend",
          `
            <div class="single-movie" data-aos="fade"  data-aos-delay="500">
              <a>
                  <div class="movie-img-div">
                <img loading="lazy" class="movie-img" src='https://www.themoviedb.org/t/p/w220_and_h330_face${
                  results[index].poster_path
                }'>
                
              </a>
            </div>
           
            <div class="movie-content-div"> 
                 
                <div class="circular-div">
                    <div class="vote">
                        <span>${Math.round(
                          results[index].vote_average * 10
                        )}<sup>%</sup>
                          </span>
                      </div>
                </div> 
                 
                  <a class="hover-moviename">${results[index][title]}</a>
                  <p>${new Date(results[index][date]).toLocaleDateString(
                    "en-us",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}</p>
            </div>
            </div>
          `
        );
      }
    })
    .catch((err) => console.error(err));
}

popularNow(
  "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1'",
  "name",
  "first_air_date"
);

///Code for switching between two timelines(Today and this week)

let today = document.getElementById("today");
let thisWeek = document.getElementById("thisWeek");
console.log(today, thisWeek);
today.addEventListener("click", () => {
  trending("day");
  today.classList.remove("false");
  today.classList.add("active-trending");
  thisWeek.classList.remove("active-trending");
  thisWeek.classList.add("false");
  today.children[0].classList.remove("false");
  today.children[0].classList.add("active-link");
  thisWeek.children[0].classList.remove("active-link");
  thisWeek.children[0].classList.add("false");
});

thisWeek.addEventListener("click", () => {
  trending("week");
  thisWeek.classList.remove("false");
  thisWeek.classList.add("active-trending");
  today.classList.remove("active-trending");
  today.classList.add("false");
  thisWeek.children[0].classList.remove("false");
  thisWeek.children[0].classList.add("active-link");
  today.children[0].classList.remove("active-link");
  today.children[0].classList.add("false");
});

trending("day");

function trending(type) {
  const trendingMovies = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/trending/movie/" + type + "?language=en-US",
    trendingMovies
  )
    .then((response) => response.json())
    .then((response) => {
      let posters = document.getElementById("trending-movie");
      console.log(response);

      let results = response.results;
      console.log(
        new Date().toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );
      posters.innerHTML = "";
      for (const index in results) {
        posters.insertAdjacentHTML(
          "beforeend",
          `
          <div class="single-movie" data-aos="fade"  data-aos-delay="600" >
            <a>
                <div class="movie-img-div">
              <img loading="lazy" class="movie-img" src='https://www.themoviedb.org/t/p/w220_and_h330_face${
                results[index].poster_path
              }'>
              
            </a>
          </div>
         
          <div class="movie-content-div"> 
               
              <div class="circular-div">
                  <div class="vote">
                      <span>${Math.round(
                        results[index].vote_average * 10
                      )}<sup>%</sup>
                        </span>
                    </div>
              </div> 
               
                <a class="hover-moviename">${results[index].original_title}</a>
                <p>${new Date(results[index].release_date).toLocaleDateString(
                  "en-us",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}</p>
          </div>
          </div>
        `
        );
      }
    })
    .catch((err) => console.error(err));
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "-64px";
  } else {
    document.getElementById("navbar").style.top = "0px";
  }
}
