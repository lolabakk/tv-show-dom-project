//You can edit ALL of the code here
let getEpisodes = "";

function fetchEpisode() {
  fetch(`https://api.tvmaze.com/shows/82/episodes`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getEpisodes = data;
      makePageForEpisodes(getEpisodes);
    })
    .catch(function (error) {
      console.log(error);
    })
}

// the episode 's name
// the season number the episode number the episode 's medium-sized image
// the episode 's summary text 
let searchBox = document.getElementById("searchBox");
let episodeCount = document.createElement("span");

function makePageForEpisodes(episodeList) {

  const rootElem = document.getElementById("root");
  let container = document.querySelector(".container");
  let episodeSearch = document.querySelector(".episodeSearch")


  episodeCount.textContent = `Got ${episodeList.length} episode(s)`;
  episodeCount.style.backgroundColor = "red";
  episodeSearch.appendChild(episodeCount);
  episodeList.forEach(function (episode) {
    let episodeContainer = document.createElement("div");
    let episodeNumber = episode.number;
    let episodeSeason = episode.season;
    let episodeCode = ` S0${episodeSeason}E0${episodeNumber}`;
    let headerEpisode = document.createElement("h3");
    let imageEpisode = document.createElement("img");
    let episodeSummary = document.createElement("p");

    // S02E07
    headerEpisode.textContent = `${episode.name}-${episodeCode}`;
    episodeContainer.appendChild(headerEpisode);
    if (episode.image != null) {
      imageEpisode.src = episode.image.medium;
    }
    episodeContainer.appendChild(imageEpisode);
    episodeSummary.innerHTML = episode.summary || "no summary provided";
    episodeContainer.appendChild(episodeSummary);
    rootElem.appendChild(episodeContainer);
    episodeContainer.style.border = "5px solid pink";
    episodeContainer.className = "epiContainer";
    rootElem.className = "rootContainer";
    let select = document.getElementById("episodeSelector");
    for (let i = 0; i < getEpisodes.length; i++) {
      let option = document.createElement("option");
      let text = document.createTextNode(`${getEpisodes[i].season} ${getEpisodes[i].number} - ${getEpisodes[i].name}`);
      option.setAttribute("value", getEpisodes[i].name);
      option.appendChild(text);
      select.insertBefore(option, select.lastChild);

    }
  });
  createShowList();
}

const rootElem = document.getElementById("root");
searchBox.addEventListener("keyup", function (event) {
  let searchItem = event.target.value.toLowerCase();
  let newArray = getEpisodes.filter(function (item) {
    console.log(item);
    let name = item.name.toLowerCase();

    let summary = item.summary.toLowerCase();
    return (
      name.includes(searchItem) ||
      summary.includes(searchItem)
    );
  });

  rootElem.textContent = "";
  makePageForEpisodes(newArray);
});

let selectMenu = document.getElementById("episodeSelector");
selectMenu.addEventListener("change", function (event) {
  if (event.target.value === "default") {
    rootElem.textContent = "";
    makePageForEpisodes(getEpisodes)
  } else {
    rootElem.textContent = "";
    let filterEpisode = getEpisodes.filter(function (item) {
      return (item.name === event.target.value);

    })
    makePageForEpisodes(filterEpisode);

  }


})

function createShowList() {
  let newShow = document.getElementById("showInterest");
  let showList = getAllShows();
  // console.log(showList);
  showList.forEach((show) => {
    let option = document.createElement('option');
    option.textContent = show.name;
    newShow.appendChild(option);
  })
}

// window.onload = setup;
fetchEpisode();