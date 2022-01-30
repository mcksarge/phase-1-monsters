let page = 1



//This runs the functions once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

    fetchMonsters();
    addMonster();


    const forward = document.querySelector('#forward').addEventListener("click", forwardPage);
    const back = document.getElementById('back').addEventListener("click", backPage);

});

//******Fetch Monsters******* */

function fetchMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(monsters => {
        console.log(monsters)
        renderMonster(monsters)
    });
};


//**************Renders Monsters************ */


function renderMonster (object) {
    const monsterCont = document.getElementById("monster-container")
    

    for (let i = 0; i < object.length; i++){
        const monsterDiv = document.createElement('div')
        monsterDiv.innerHTML = `
            <h2> ${object[i].name}</h2>
            <h4>Age: ${Math.floor(object[i].age)} </h4>
            <p><strong>Bio:</strong> ${object[i].description}</p>
        
    `
    monsterCont.appendChild(monsterDiv)
    }
};


//*********Changes Page************ */



function forwardPage() {
    const monsterCont = document.getElementById("monster-container")

    monsterCont.innerHTML = ``
    page++
    fetchMonsters();
    console.log(page)

}

function backPage() {
    const monsterCont = document.getElementById("monster-container")

    
    monsterCont.innerHTML = ``
    page--
    fetchMonsters();
    console.log(page)

}

//********Create Monster********** */
function addMonster() {
    const createMonster = document.getElementById("create-monster");
    const monsterForm = document.createElement('form');
    const inputName = document.createElement('input');
    const inputAge = document.createElement('input');
    const inputDescription = document.createElement('input');
    const inputButton = document.createElement('button');

    (monsterForm.id = "monster-form"),
        (inputName.id = "name"),
        (inputName.placeholder = "name..."),
        (inputAge.id = "age"),
        (inputAge.placeholder = "age..."),
        (inputDescription.id = "description"),
        (inputDescription.placeholder = "description..."),
        (inputButton.innerHTML = "Create"),
        (inputButton.id = "newButton"),

    monsterForm.appendChild(inputName),
    monsterForm.appendChild(inputAge),
    monsterForm.appendChild(inputDescription),
    monsterForm.appendChild(inputButton),
    createMonster.appendChild(monsterForm)

    submitListener()



}

submitListener = () => {
    document.querySelector("#monster-form").addEventListener("submit", (a) => {
        a.preventDefault(), console.log("submitted", getFormData()), postNewMonster(getFormData()), clearForm();
    });
},
getFormData = () => {
    let a = document.querySelector("#name"),
        b = document.querySelector("#age"),
        c = document.querySelector("#description");
    return { name: a.value, age: parseFloat(b.value), description: c.value };
},
postNewMonster = (a) => {
    let b =  'http://localhost:3000/monsters',
        c = { method: "POST", headers: { "Content-type": "application/json", Accept: "application/json" }, body: JSON.stringify(a) };
    fetch(b, c)
        .then((d) => d.json())
        .then((d) => console.log("new monster", d));
},
clearForm = () => {
    document.querySelector("#monster-form").reset();
}
