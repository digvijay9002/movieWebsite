// using the current page's URL
const currentURL = new URL(window.location.toLocaleString()).searchParams;
const id = currentURL.get("id");
console.log(id);
// product

const getDetails = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
  },
};

fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, getDetails)
  .then((response) => response.json())
  .then((details) => {
    console.log(details);
    console.log(details.poster_path);
    let poster = document.getElementById("poster-wrapper");
    poster.innerHTML = "";

    //backdrop image
    document.getElementById(
      "background"
    ).style.backgroundImage = ` url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${details.backdrop_path}')`;

    // Genres

    let totalgenres = [];
    for (const index in details.genres) {
      totalgenres.push(details.genres[index].name);
    }
    document.getElementById("genres").innerHTML = totalgenres.join(", ");

    document.getElementById("movie-name").innerHTML = details.name;

    //release year

    document.getElementById("release-year").innerHTML =
      "(" +
      new Date(details.first_air_date).toLocaleDateString("en-us", {
        year: "numeric",
      }) +
      ")";

    //release date

    document.getElementById("release-date").innerHTML = new Date(
      details.first_air_date
    ).toLocaleDateString("en-us", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    //Movie Duration
    if (details.episode_run_time == 0) {
      document.getElementById("movie-duration").style.display = "none";
    } else {
      let totalTime = details.episode_run_time;
      toHoursAndMinutes(totalTime);

      function toHoursAndMinutes(totalTime) {
        const hours = Math.floor(totalTime / 60);
        const minutes = totalTime % 60;

        document.getElementById("movie-duration").innerHTML = `${
          hours ? hours`h` : ""
        }${minutes}m`;
      }
    }

    //arrow function

    //movie overview

    if (details.overview == "") {
      document.getElementById("overview").innerText =
        "We don't have an overview translated in English. Help us expand our database by adding one.";
    } else {
      document.getElementById("overview").innerHTML = details.overview;
    }
    //movie tagline

    document.getElementById("tagline").innerHTML = details.tagline;
    poster.insertAdjacentHTML(
      "beforeend",
      `
        <img loading="lazy" src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${details.poster_path}">
        
        `
    );

    //try circular progress

    if (details.vote_average == 0) {
      results = "NA";
      document.getElementById("value-id").innerHTML = "0 <sup>%</sup>";
    } else {
      let results = details.vote_average;

      let percentage = Math.round(results * 10);
      console.log(percentage);
      let alertColor =
        percentage > 70 ? "#21d07a" : percentage > 40 ? "yellow" : "red";

      let progressBar = document.querySelector(".circular-progress");
      let valueContainer = document.querySelector(".value-container");

      let progressValue = 0;
      let progressEndValue = percentage;

      let speed = 50;

      let progress = setInterval(() => {
        progressValue++;
        valueContainer.textContent = `${progressValue}%`;
        progressBar.style.background = `conic-gradient(
     ${alertColor} ${progressValue * 3.6}deg,
     #1D403C ${progressValue * 3.6}deg
  )`;
        if (progressValue == progressEndValue) {
          clearInterval(progress);
        }
      }, speed);
    }
  })

  .catch((err) => console.error("Movie: " + err));
//Trailers/////////////////////////////////
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
  },
};

fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
  .then((response) => response.json())
  .then((videos) => {
    console.log(videos);
    var iframe = document.getElementById("iframe");

    if (videos.results.length == 0) {
      document.getElementById("play-div").style.display = "none";
    }

    var videoURL = "";
    var flag = true;
    videos.results.forEach((obj) => {
      if (obj["official"] && obj["type"] == "Trailer" && flag) {
        videoURL = "https://www.youtube.com/embed/" + obj.key;
        flag = false;
      }

      console.log(videoURL);
    });

    // Set the src attribute of the iframe with the dynamic video URL
    iframe.src = videoURL;

    // When the user clicks on <span> (x), close the modal
    btn.onclick = function () {
      modal.style.display = "block";
      iframe.src = videoURL;
    };

    // When the user clicks on <span> (x), close the modal and stop the video
    span.onclick = function () {
      modal.style.display = "none";
      iframe.src = ""; // Reset the iframe source to stop the video
    };

    // When the user clicks anywhere outside of the modal, close it and stop the video
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        iframe.src = ""; // Reset the iframe source to stop the video
      }
    };

    // When the iframe finishes loading, remove the "loading" class
    iframe.onload = function () {
      modal.classList.remove("loading");
    };

    // When the modal is closed, unload the iframe to stop the video immediately
    modal.addEventListener("transitionend", function () {
      if (!modal.style.display) {
        iframe.src = "";
      }
    });
  })
  .catch((err) => console.error(err));

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  // document.getElementById("iframe").get(0).stopVideo();;
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    // document.getElementById("iframe").get(0).stopVideo();
    console.log(document.getElementById("iframe").getAttribute());
    // console.log(document.getElementById("iframe"));
  }
};

// const credits = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
//   },
// };

// fetch(
//   `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=en-US`,
//   credits
// )
//   .then((response) => response.json())
//   .then((movieCredits) => {
//     console.log(movieCredits);

//     let cast_scroller = document.getElementById("cast-scroller-div");

//     var movieCast = movieCredits.cast;
//     console.log("Hii", movieCast);

//     for (const index in movieCast) {
//       cast_scroller.insertAdjacentHTML(
//         "beforeend",

//         `
//       <div class="single-cast-card">
//       <div class="cast-img-div">
//       ${
//         movieCast[index].profile_path
//           ? `<img src="https://www.themoviedb.org/t/p/w138_and_h175_face${movieCast[index].profile_path}" alt="cast Image" />`
//           : `<img src="image/person_image.svg" alt="cast Image" />`
//       }
//       </div>
//       <p class="cast-original-name">${movieCast[index].name}</p>
//       <p class="cast-character-name">${movieCast[index].character}</p>
//     </div>

//       `
//       );
//     }
//   })
//   .catch((err) => console.error(err));

//////////

const maxDisplayedCast = 9; // Maximum number of cast members to display initially
let castCount = 0; // Counter variable to track the number of displayed cast members

const credits = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
  },
};

fetch(
  `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=en-US`,
  credits
)
  .then((response) => response.json())
  .then((movieCredits) => {
    console.log(movieCredits);

    let castScroller = document.getElementById("cast-scroller-div");

    var movieCast = movieCredits.cast;

    for (const index in movieCast) {
      if (castCount < maxDisplayedCast) {
        castScroller.insertAdjacentHTML(
          "beforeend",
          `
          <div class="single-cast-card">
            <div class="cast-img-div">
              ${
                movieCast[index].profile_path
                  ? `<img src="https://www.themoviedb.org/t/p/w138_and_h175_face${movieCast[index].profile_path}" alt="cast Image" />`
                  : `<img src="image/person_image.svg" alt="cast Image" />`
              }
            </div>
            <p class="cast-original-name">${movieCast[index].name}</p>
            ${`<p class="cast-character-name">${movieCast[index].roles[0].character}</p>`}
          </div>
        `
        );

        castCount++;
      } else {
        break; // Stop looping once the maximum number of cast members has been displayed
      }
    }

    if (castCount < movieCast.length) {
      castScroller.insertAdjacentHTML(
        "beforeend",
        `
        <button id="view-more-button" class="viewMore">
        View More <img src ="../image/right-icon.svg" height ="30px" width="50px"></img></button>
      `
      );

      document.getElementById("view-more-button").onclick = () => {
        showAllCast(movieCast);
      };
    }
  })
  .catch((err) => console.error(err));

function showAllCast(movieCast) {
  const viewMoreButton = document.getElementById("view-more-button");
  viewMoreButton.style.display = "none"; // Hide the "View More" button

  for (const index in movieCast) {
    let castScroller = document.getElementById("cast-scroller-div");
    castScroller.insertAdjacentHTML(
      "beforeend",
      `
          <div class="single-cast-card">
            <div class="cast-img-div">
              ${
                movieCast[index].profile_path
                  ? `<img src="https://www.themoviedb.org/t/p/w138_and_h175_face${movieCast[index].profile_path}" alt="cast Image" />`
                  : `<img src="image/person_image.svg" alt="cast Image" />`
              }
            </div>
            <p class="cast-original-name">${movieCast[index].name}</p>
            <p class="cast-character-name">${movieCast[index].character}</p>
          </div>
        `
    );
  } // Replace the content of castScroller with the updated HTML
}
