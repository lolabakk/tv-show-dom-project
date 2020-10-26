

 //You can edit ALL of the code here
let getEpisodes = "";

function fetchEpisode(showId = 82) {
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
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

// // the episode 's name
// // the season number the episode number the episode 's medium-sized image
// // the episode 's summary text 
let searchBox = document.getElementById("searchBox");
let episodeCount = document.createElement("span");

function makePageForEpisodes(episodeList) {

  const rootElem = document.getElementById("root");
  let container = document.querySelector(".container");
  let episodeSearch = document.querySelector(".episodeSearch")
  container.textContent = "";

//LIST ALL EPISODES 
  episodeCount.textContent = `Displaying ${episodeList.length}/ ${getEpisodes.length} episode(s)`;
  episodeSearch.appendChild(episodeCount);
  episodeList.forEach(function (episode) {
    let episodeContainer = document.createElement("div");
    let episodeNumber = episode.number;
    let episodeSeason = episode.season;
    let episodeCode = ` S0${episodeSeason}E0${episodeNumber}`;
    let headerEpisode = document.createElement("h3");
    let imageEpisode = document.createElement("img");
    let episodeSummary = document.createElement("p");

//   
    headerEpisode.textContent = `${episode.name}-${episodeCode}`;
    episodeContainer.appendChild(headerEpisode);
    if (episode.image != null) {
      imageEpisode.src = episode.image.medium;
    }
    episodeContainer.appendChild(imageEpisode);
    episodeSummary.innerHTML = episode.summary || "no summary provided";
    episodeContainer.appendChild(episodeSummary);
    container.appendChild(episodeContainer);
    episodeContainer.style.border = "3.5px solid #300030";
    episodeContainer.className = "epiContainer";
    rootElem.className = "rootContainer";

    
    createEpisodesList()
  });
  createShowList();
}
 let container = document.querySelector(".container");
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

  container.textContent = "";
  makePageForEpisodes(newArray);
});
//FILTER TO SELECT EPISODE 
let selectMenu = document.getElementById("episodeSelector");
selectMenu.addEventListener("change", function (event) {
  if (event.target.value === "default") {
   container.textContent = "";
    makePageForEpisodes(getEpisodes)
  } else {
    container.textContent = "";
    let filterEpisode = getEpisodes.filter(function (item) {
      return (item.name === event.target.value);

    })
    makePageForEpisodes(filterEpisode);    
  }
})

//FUNCTION TO LIST OF EPISODE
function createEpisodesList() {
     let select = document.getElementById("episodeSelector");
     select.textContent = "";
    for (let i = 0; i < getEpisodes.length; i++) {
      let option = document.createElement("option");
      let text = document.createTextNode(`${getEpisodes[i].season} ${getEpisodes[i].number} - ${getEpisodes[i].name}`);
      option.setAttribute("value", getEpisodes[i].name);
      option.appendChild(text);
      select.insertBefore(option, select.lastChild);

    }

}

// LIST ALL THE SHOWS 
function createShowList() {  
  let newShow = document.getElementById("showInterest");
  let showList = getAllShows();
  // console.log(showList);
  showList.sort((a, b)=> a.name.localeCompare(b.name)).forEach((show) => {
    let option = document.createElement('option');
    option.textContent = show.name;
    option.value = show.id;
    newShow.appendChild(option);
  })
  newShow.addEventListener("change", getShowEpisodes)
}
function getShowEpisodes(event) {
      const id = event.target.value;
      fetchEpisode(id);
}

// window.onload = setup;
fetchEpisode();