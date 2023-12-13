
// selected navigation item
const selectedOrNo = document.querySelectorAll("ul div");
for (let navDiv of selectedOrNo){
    let imgInQuestion = navDiv.querySelector("ul div img");
    let navHeader = navDiv.querySelector("ul h2").textContent;
    if (navDiv.classList.contains('selected')){
        imgInQuestion.src = './Icons/LeftBanner/' + navHeader + "-Filled.svg";
    }
    else {
        imgInQuestion.src = './Icons/LeftBanner/' + navHeader + "-Outlined.svg";
    }
}