const getPopular = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
  },
};

let currentPage = 1;
let isFetching = false; // Flag to prevent multiple fetch requests

const fetchMovies = () => {
  if (isFetching) return; // If already fetching, return

  isFetching = true; // Set isFetching to true to prevent multiple fetch requests

  fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${currentPage}`,
    getPopular
  )
    .then((response) => response.json())
    .then((popularMovies) => {
      console.log("Full Object", popularMovies);
      let results = popularMovies.results;

      console.log(results);
      let posters = document.getElementById("popular-movie");

      for (const index in results) {
        let percentage = Math.round(results[index].vote_average * 10);
        let alertColor =
          percentage > 70 ? "#21d07a" : percentage > 40 ? "yellow" : "red";
        posters.insertAdjacentHTML(
          "beforeend",
          `
                          <div class="single-movie add-border">
                          <a href="./tvDetails.html?id=${results[index].id}"
                            ><div class="movie-img-div">
                              <img
                                loading="lazy"
                                class="movie-img add-height"
                                src="https://www.themoviedb.org/t/p/w220_and_h330_face${
                                  results[index].poster_path
                                }"
                                alt="movie"
                                title="${results[index].original_name}"/></div>
                               
                              <div class="movie-content-div"> 
                                   
                              <div class="votes">
                              <div class="percent">
                                <svg>
                                  <circle cx="16" cy="16" r="16" style="stroke-dashoffset: 0; stroke: #1d4028;"></circle>
                                  <circle cx="16" cy="16" r="16" style="stroke-dashoffset: ${
                                    100 - percentage
                                  }; stroke: ${alertColor};"></circle>
                                </svg>
                                <div class="number">
                                  <span id="vote-span">${Math.round(
                                    results[index].vote_average * 10
                                  )}<sup>%</sup></span>
                                </div>
                              </div>
                            </div>
                        
                            <a class="hover-moviename" href="./tvDetails.html?id=${
                              results[index].id
                            }">${results[index].name}</a>
                            <p>${new Date(
                              results[index].first_air_date
                            ).toLocaleDateString("en-us", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}</p>
                            </a> 
                        </div>
                          `
        );
      }

      currentPage++; // Update the current page number
      isFetching = false; // Reset the flag to allow new fetch requests

      // Add logic to stop fetching more data when all pages are loaded
      // For example, you can check if `popularMovies.total_pages` is equal to `currentPage`
    })
    .catch((err) => {
      console.error(err);
      isFetching = false; // Reset the flag in case of an error
    });
};
const loadAllDataButton = document.getElementById("loadMorebtn");
fetchMovies();

loadAllDataButton.addEventListener("click", () => {
  //   loadAllDataButton.style.display = "none"; // Hide the button after clicking
  flag = true;
  fetchMovies();
});
let flag = false;
const handleIntersection = (entries) => {
  const entry = entries[0];

  if (entry.isIntersecting && flag) {
    fetchMovies();
  }
};

const observer = new IntersectionObserver(handleIntersection, {
  root: null, // Use the viewport as the root
  rootMargin: "100px",
  threshold: 0.2, // Trigger the callback when 20% of the target is visible
});

observer.observe(loadAllDataButton);
