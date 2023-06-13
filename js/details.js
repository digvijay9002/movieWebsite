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

fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, getDetails)
  .then((response) => response.json())
  .then((details) => {
  console.log(details.overview);
  })
  .catch((err) => console.error(err));
