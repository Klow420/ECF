const recherche = document.querySelector("#recherche");
const range = document.querySelector("#range");
const nbrange = document.querySelector("#nbrange");
const btn = document.querySelector("#croissant");
const cardContainer = document.querySelector(".cardContainer");
const https = document.querySelector("#scales");
const auth = document.querySelector("#horns");
let apis = [];
let sortMethod;

const fetchapi = async() => {
    const result = await fetch("https://api.publicapis.org/entries");
    const data = await result.json();
    apis = data.entries
    displayApi();
}

const displayApi = () => {
    cardContainer.innerHTML = ""
    apis
    .filter((a)=> {
        if (https.checked && auth.checked){
            return a.API.toLowerCase().includes(recherche.value.toLowerCase()) && 
            a.HTTPS === true &&
            a.Auth === "apiKey"
        } else if (https.checked) {
            return a.API.toLowerCase().includes(recherche.value.toLowerCase()) && 
            a.HTTPS === true
        } else if (auth.checked){
            return a.API.toLowerCase().includes(recherche.value.toLowerCase()) && 
            a.Auth === "apiKey"
        } else {
            return a.API.toLowerCase().includes(recherche.value.toLowerCase())
        }
    })
    .sort((a,b)=> {
        if (sortMethod === "croissant"){
            return a.API.localeCompare(b.API);
        } else if (sortMethod === "décroissant"){
            return b.API.localeCompare(a.API);
        }
    })
    .slice(0,range.value)
    .forEach((api) => {
        // const icon = api.HTTPS;
        // if (icon === true){
        //     icon.innerHtml = `<i class="fa-solid fa-check fa-sm"></i>`
        // } else {
        //     icon.innerHtml =`<i class="fa-solid fa-xmark fa-sm"></i>`
        // }
        cardContainer.innerHTML += `<div class="card">
        <h2>${api.API}</h2>
        <p>${api.Description}</p>
        <p class="Link">${api.Link}</p>
        <div class="https">
            <i class="fa-solid fa-lock fa-2xs"></i>
            <p>Https : ${api.HTTPS} </p>
        </div>
        <div class="auth">
            <i class="fa-solid fa-user-lock fa-2xs"></i>
            <p>Auth : ${api.Auth}</p>
        </div>
        </div>`
    })
}
recherche.addEventListener("input",()=>{
    displayApi()
})
btn.addEventListener("click",()=> {
    if (sortMethod === "croissant"){
        sortMethod = "décroissant"
        btn.id = "décroissant"
        btn.textContent = "Z-A"
    } else {
        sortMethod = "croissant"
        btn.id = "croissant"
        btn.textContent = "A-Z"
    }
    displayApi()
})
range.addEventListener("input",(e)=>{
    nbrange.textContent = range.value; 
    displayApi()
})
https.addEventListener("click", ()=> {
    // console.log(https);
    displayApi()
})
auth.addEventListener("click", ()=> {
    displayApi()
})
fetchapi()
// <i class="fa-solid fa-xmark fa-sm"></i> <i class="fa-solid fa-check fa-sm"></i>