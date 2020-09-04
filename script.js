//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  console.log(allEpisodes);
  makePageForEpisodes(allEpisodes);
}
// the episode 's name
// the season number the episode number the episode 's medium-sized image
// the episode 's summary text 
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
   let container = document.querySelector(".container");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach(function (episode) {
    let episodeContainer = document.createElement("div");
    let episodeNumber = episode.number;
    let episodeSeason = episode.season;
    let episodeCode = ` S0${episodeSeason}E0${episodeNumber}`;
    let headerEpisode = document.createElement("h3");
    let imageEpisode = document.createElement("img");
    let episodeSummary = document.createElement("p");
    // let searchEpisode = document.createElement("search");
    // S02E07
    headerEpisode.textContent = `${episode.name}-${episodeCode}`;

    episodeContainer.appendChild(headerEpisode);
    // searchEpisode.innerHTML = 
    imageEpisode.src = episode.image.medium;
    episodeContainer.appendChild(imageEpisode);
    episodeSummary.innerHTML = episode.summary;
    episodeContainer.appendChild(episodeSummary);
    rootElem.appendChild(episodeContainer);
    episodeContainer.style.border = "5px solid pink";
    episodeContainer.className = "epiContainer";
    rootElem.className = "rootContainer";








  })


}

window.onload = setup;