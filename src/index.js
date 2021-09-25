let switchIndicator = 0; //OFF

console.log(switchIndicator)
document.addEventListener("DOMContentLoaded", () => {
    const filerButton = document.querySelector("#good-dog-filter")
    filerButton.addEventListener("click", handleFilterButton);
    fetchDogs()
})
function handleFilterButton(event) { //from dog bar need to delet a dog changed to a bad dog
    const dogBar = document.getElementById("dog-bar");
    dogBar.innerHTML = " ";
    const dogInfoContainer = document.querySelector("#dog-info");
    dogInfoContainer.innerHTML = " ";
    event.preventDefault();
    if(switchIndicator === 0){
        switchIndicator = 1;
        event.target.innerText = "Filter good dogs: ON"
        fetchGoodDogs();
    }else{
        switchIndicator = 0;
        event.target.innerText = "Filter good dogs: OFF"
        fetchDogs();
    }
}
function fetchGoodDogs() {
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogArray => dogArray.forEach(dogObj => {
        if(dogObj.isGoodDog === true){
            renderDog(dogObj)}}
        ))
}
function fetchDogs() {
    return fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogArray => dogArray.forEach(dogObj => renderDog(dogObj)))
}
function renderDog(dogObj) {
    console.log(dogObj)
    debugger
    const dogBar = document.getElementById("dog-bar")
    let dogBarElement = document.createElement("span")
    dogBarElement.textContent = dogObj.name;
    console.log(dogBarElement)
    debugger
    dogBar.appendChild(dogBarElement)
  
    dogBarElement.addEventListener("click", (event) => {
        event.preventDefault()
        handleDogClick(dogObj)   
   }) 
}
function handleDogClick(dogObj) {
    const dogInfoContainer = document.querySelector("#dog-info");
    dogInfoContainer.innerHTML = " ";                               
    let dogElement = document.createElement("div");
    console.log(dogObj.isGoodDog);
    debugger
    let buttonLabel = Lable(dogObj);
    debugger
    dogElement.innerHTML = `    
        <img src=${dogObj.image}> 
        <h2>${dogObj.name}
        <button>${buttonLabel}</button>
    `
    dogInfoContainer.appendChild(dogElement);
    debugger
    toggleStatus(dogObj);
}
function Lable(dogObj) {
    debugger
    if(dogObj.isGoodDog === false) {
        return "Bad Dog!"
    }else{
        return "Good Dog!"
    }
}
function toggleStatus(dogObj) {//here  call for fetch again? because data refreshed(good dog is now bad )
    const buttonStatus = document.querySelector("#dog-info button")
    console.log(buttonStatus);
    buttonStatus.addEventListener("click", (event) => {
        event.preventDefault();
        debugger
        if(dogObj.isGoodDog === false) {
            debugger
            dogObj.isGoodDog = true
            buttonStatus.innerText = Lable(dogObj)
        }else{
            debugger
            dogObj.isGoodDog = false
            buttonStatus.innerText = Lable(dogObj)
        }
        debugger
        saveInAPI(dogObj);
        
        if(switchIndicator === 1) {
            debugger
            const dogBar = document.getElementById("dog-bar");
            dogBar.innerHTML = " ";
            debugger
            fetch("http://localhost:3000/pups")
            .then(res => res.json())
            .then(dogArray => dogArray.forEach(dogObj => {
                debugger
                if(dogObj.isGoodDog === true){
                    console.log(dogObj.isGoodDog)
                    renderDog(dogObj)}}
            ))} 
    }); 
}
function saveInAPI(dogObj) {
    fetch(`http://localhost:3000/pups/${dogObj.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json",
                    Accept: "application/json"},
        body: JSON.stringify(dogObj)
    })
    .then(res => res.json())
    //.then(data => console.log(data))
}

