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
  //  for loop
  // episodeList.forEach(function (episode) {

  //   let OptionSelector = document.getElementById("episodeSelection")
  OptionSelector= document.createElement('option');


// create new option element

 

    // let episodeSelector = document.getElementById("episodeSelector").selectedIndex;
    // let episodeOption = document.getElementsByi("episodeOption")[episodeSelector].value);
  

  

  // S02E07
}
let searchBox = document.getElementById("searchBox");
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");
searchBox.addEventListener("keyup", function (event) {
  searchBox = event.target.value.toLowerCase();
  let newArray = allEpisodes.filter(function (item) {
    return (
      item.name.toLowerCase().includes(searchBox) ||
      item.summary.toLowerCase().includes(searchBox)
    );
  });

  rootElem.textContent = "";
  makePageForEpisodes(newArray);
});
window.onload = setup;