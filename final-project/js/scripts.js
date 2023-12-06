

// left side info
// home information
// const home = document.getElementById("home");
// const homeIcon = document.querySelector("#home img");

// credits information


// themes information

// selected navigation item
const selectedOrNo = document.querySelectorAll("ul div");
for (let navDiv of selectedOrNo){
    let imgInQuestion = navDiv.querySelector("ul div img");
    let navHeader = navDiv.querySelector("ul h2").textContent;
    console.log(navHeader);
    if (navDiv.classList.contains('selected')){
        imgInQuestion.src = '../Icons/LeftBanner/' + navHeader + "-Filled.svg";
    }
    else {
        imgInQuestion.src = '../Icons/LeftBanner/' + navHeader + "-Outlined.svg";
    }
}

// icons/Left Banner/Home - Filled.svg
// const selectedImg = document.querySelector(".selected img");
// console.log(selectedImg);
// selectedImg.src = ''
// detailImage.src = '../assets/products/' + rollImage


// function clickedHome() {
//     const home = document.getElementById("home");
//     const homeIcon = document.querySelector("#home img");
//     console.log(homeIcon);
// }

// function clickedCredits() {
//     const songCreds = document.getElementById("song-credits");
//     songCreds.style.background="#FFFFFF"
// }

// function clickedThemes() {
//     const themes = document.getElementById("themes");
//     themes.style.background="#FFFFFF"
// }