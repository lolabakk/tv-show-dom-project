//You can edit ALL of the code here
function setup() {
    const allEpisodes = getAllEpisodes();
    console.log(allEpisodes);
    makePageForEpisodes(allEpisodes);

}
// the episode 's name
// the season number the episode number the episode 's medium-sized image
// the episode 's summary text 
let searchBox = document.getElementById("searchBox");

function makePageForEpisodes(episodeList) {

    const rootElem = document.getElementById("root");
    let container = document.querySelector(".container");
    let episodeCount = document.createElement("span");

    episodeCount.textContent = `Got ${episodeList.length} episode(s)`;
    episodeCount.style.backgroundColor = "red";
    searchBox.appendChild(episodeCount);
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
        let select = document.getElementById("episodeSelector");
        for (let i = 0; i < allEpisodes.length; i++) {
            let option = document.createElement("option");
            let text = document.createTextNode(`${allEpisodes[i].season} ${allEpisodes[i].number} - ${allEpisodes[i].name}`);
            option.setAttribute("value", allEpisodes[i].name);
            option.appendChild(text);
            select.insertBefore(option, select.lastChild);

        }
    });


}

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
let selectMenu = document.getElementById("episodeSelector");
selectMenu.addEventListener("change", function (event) {
    if (event.target.value === "default") {
        rootElem.textContent = "";
        makePageForEpisodes(allEpisodes)
    } else {
        rootElem.textContent = "";
        let filterEpisode = allEpisodes.filter(function (item) {
            return (item.name === event.target.value);

        })
        makePageForEpisodes(filterEpisode);
    }

})
window.onload = setup;