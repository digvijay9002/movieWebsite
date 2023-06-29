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
    if (details.episode_run_time.length == 0) {
      document.getElementById("movie-duration").style.display = "none";
    } else {
      let totalTime = details.episode_run_time[0];
      toHoursAndMinutes(totalTime);

      function toHoursAndMinutes(totalTime) {
        const hours = Math.floor(totalTime / 60);
        const minutes = totalTime % 60;

        document.getElementById("movie-duration").innerHTML = `${
          hours ? hours + "h" : ""
        } ${minutes} m`;
      }
    }

    //right side facts

    document.getElementById("original_name").innerHTML = details.original_name;
    document.getElementById("status").innerHTML = details.status;
    details.networks.length
      ? (document.getElementById(
          "network"
        ).src = `https://www.themoviedb.org/t/p/h30${details.networks[0].logo_path}`)
      : (document.getElementById("network").src = "");
    document.getElementById("type").innerHTML = details.type;
    const allLanguage = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
      },
    };
    fetch("https://api.themoviedb.org/3/configuration/languages", allLanguage)
      .then((response) => response.json())
      .then((languages) => {
        var languageCode = details.original_language; // Language code for English
        // console.log("test", details.original_language);
        // Find the language object with the matching language code
        const language = languages.find(
          (lang) => lang.iso_639_1 === languageCode
        );

        // Retrieve the full name of the language
        let languageFullName = language ? language.english_name : "Unknown";

        document.getElementById("original_language").innerHTML =
          languageFullName || "-";
      })
      .catch((err) => console.error(err));

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

  for (let index = maxDisplayedCast; index < movieCast.length; index++) {
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
            <p class="cast-character-name">${
              movieCast[index].roles[0].character
            }</p>
          </div>
        `
    );
  } // Replace the content of castScroller with the updated HTML
}

////TV series Details

const allDetails = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
  },
};

fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, allDetails)
  .then((response) => response.json())
  .then((tvDetails) => {
    console.log(tvDetails);
    var Scroller = document.getElementById("tvScroller");

    let currentSeason = tvDetails.seasons[tvDetails.seasons.length - 1].air_date
      ? tvDetails.seasons[tvDetails.seasons.length - 1]
      : tvDetails.seasons[tvDetails.seasons.length - 2];

    var seasonCard = document.getElementById("season-card");
    seasonCard.insertAdjacentHTML(
      "beforeend",
      `
          <div class="flex">
          <div class="season-poster poster-flex">
          ${
            currentSeason.poster_path
              ? `<img
              src="https://www.themoviedb.org/t/p/w130_and_h195_bestv2${currentSeason.poster_path}"
              alt="Current Season Image"
             
            />`
              : `<div class="glyphicons_v2 picture grey poster no_image_holder w130_and_h195"></div>`
          }
          </div>
          <div class="season-content">
            <h2>Season ${currentSeason.season_number}</h2>
            <h4> ${new Date(currentSeason.air_date).toLocaleDateString(
              "en-us",
              {
                year: "numeric",
              }
            )} | ${currentSeason.episode_count} Episodes</h4>
            <p></p>
          </div>
        </div>
      
      
      `
    );
    console.log("Current Season:", currentSeason);

    console.log("TV Details", tvDetails);
  })
  .catch((err) => console.error(err));

////Recommendations
const rec = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
  },
};

fetch(
  `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`,
  rec
)
  .then((response) => response.json())
  .then((recommended) => {
    var recomWrapper = document.getElementById("TVscroller");
    var recommendations = recommended.results;
    console.log("DC HII", recommended);
    for (const index in recommended.results) {
      recomWrapper.insertAdjacentHTML(
        "beforeend",
        `<a href = "tvDetails.html?id=${recommendations[index].id}"> 
          <div class="mini-card" id="mini-card">
        <div class="image-content false">
        ${
          recommendations[index].backdrop_path
            ? `<img src="https://www.themoviedb.org/t/p/w250_and_h141_face${recommendations[index].backdrop_path}" alt="movie poster"></img>`
            : `<div class="glyphicons_v2 picture grey backdrop no_image_holder w250_and_h141"></div>`
        }
          
  
        <div class="meta">
          <div class="release-date">
          <div>
            <img src="./image/rdate.svg" alt="date Icon" class="date-img">
            <span id="rMovieDate">${
              recommendations[index].first_air_date
            }</span></div>
            <div class="action-img false">
              <img src= "./image/rstar.svg" alt="fav Icon" class="black-color">
              <img src="./image/rBookmark.svg" alt="Watch List Icon" class="black-color">
              <img src="./image/rFavorite.svg" alt="star rating icon" class="black-color">
            </div>
          </div>
          <span>
  
          </span>
        </div>
      </div>
      <div class="info-div-recommand">
        
          <bdi title="${recommendations[index].original_name}">${
          recommendations[index].original_name
        }</bdi>
        <span class="vote-average">${Math.round(
          recommended.results[index].vote_average * 10
        )}%
        
        </span>
      </div>
      </div>
      </a>
      `
      );
    }

    console.log("recom", recommended);
  })
  .catch((err) => console.error(err));

///Keywords
const getKeywords = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
  },
};

fetch(`https://api.themoviedb.org/3/tv/${id}/keywords`, getKeywords)
  .then((response) => response.json())
  .then((response_keywords) => {
    console.log("keyword-response", response_keywords);

    let keywords = response_keywords.results;

    let keyword_column = document.getElementById("keyword-column");

    for (const index in keywords) {
      keyword_column.insertAdjacentHTML(
        "beforeend",

        `
       
                <li><a>${keywords[index].name}</a></li>
             
       `
      );
    }
  })
  .catch((err) => console.error(err));

////Review Section

const allReviews = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNiZjc0NzgxODVjNDk1NTZhZWVjOTliZmM0YmVkMiIsInN1YiI6IjY0ODE2ZjY2ZTI3MjYwMDEwNzIwYTVmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFzsWuDE0cTML6ULHicf1SOiGoHqCemuEAXERkhk_WE",
  },
};

const reviewMaxLength = 800; // Maximum number of characters to display

fetch(
  `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1`,
  allReviews
)
  .then((response) => response.json())
  .then((reviewResponse) => {
    const response = reviewResponse.results[0];
    console.log("response -", reviewResponse);

    if (reviewResponse.results.length == 0) {
      document.getElementById("reviewContent").style.display = "none";
      document.getElementById("reviewCount").innerHTML = "0";
      // document.getElementById("review").innerHTML = "Nothing found";
    } else {
      // Truncate the review content if it exceeds the maximum length
      let truncatedContent = response.content;

      if (truncatedContent.length > reviewMaxLength) {
        truncatedContent =
          truncatedContent.substring(0, reviewMaxLength) + "...";

        document.getElementById("readMoreButton").innerHTML = "Read More";
      }

      if (truncatedContent.length < reviewMaxLength) {
        truncatedContent =
          truncatedContent.substring(0, reviewMaxLength) + "...";

        document.getElementById("readMoreButton").innerHTML = "";
      }
      document.getElementById("reviewCount").innerHTML =
        reviewResponse.results.length;
      document.getElementById(
        "reviewer"
      ).innerHTML = `A review by ${response.author}`;

      document.getElementById("reviewRating").innerHTML = response
        .author_details.rating
        ? `${response.author_details.rating}.0`
        : (document.getElementById("rounded-rating").style.display = "none");

      document.getElementById("reviewerName").innerHTML = response.author;

      document.getElementById("reviewDate").innerHTML = new Date(
        response.created_at
      ).toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      // Display the truncated review
      document.getElementById("truncatedReview").innerHTML = truncatedContent;

      // Set up the "Read More" button click event
      document
        .getElementById("readMoreButton")
        .addEventListener("click", () => {
          // Display the full review
          document.getElementById("truncatedReview").innerHTML =
            response.content;

          // Hide the "Read More" button
          document.getElementById("readMoreButton").style.display = "none";
        });

      imageSRC = response.author_details.avatar_path;

      if (imageSRC != null) {
        var avatar = imageSRC.slice(1);
      }
      var avatar_div = document.getElementById("reviewerProfile");
      avatar_div.src = avatar;

      avatar_div.addEventListener("error", () => {
        // Display a custom image
        avatar_div.src = `../image/person_image.svg`;
      });
    }
  })
  .catch((err) => console.error(err));
