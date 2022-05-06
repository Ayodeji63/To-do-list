const sun = document.querySelector('.sun'),
    moon = document.querySelector('.moon'),
body = document.querySelector('body'),
input = document.querySelector('.form input'),
uncompletedtask = document.querySelector('.uncompleted-task'),
container = document.querySelector('.list-container'),
completeTask = document.querySelector('.completed-task'),
clear = document.querySelector('.clear'),
allItems = document.querySelector('.all'),
activeItems = document.querySelector('.active'),
completedItems = document.querySelector('.completed'),
leftTask = document.querySelector('.left');



let leftItem = 0;

/**************** EVENT LISTENERS************* */

sun.addEventListener('click', () => {
    sun.style.display = "none";
        moon.style.display = "flex";
        body.classList.add('lightMode');
});

moon.addEventListener('click', () => {
    moon.style.display = "none";
        sun.style.display = "flex";
        body.classList.remove('lightMode');
});

clear.addEventListener('click', clearItem);


window.addEventListener('keydown', displayItem);

activeItems.addEventListener('click', filterActive);
completedItems.addEventListener('click', filterCompleted);
allItems.addEventListener('click', showAll);



/************* FUNCTIONS *********** */


function displayItem(e) {
    if (e.code === 'Enter') {
        createItem();
        input.value = '';

    }

}

function addToCompleted(e) {
    // completeTask.classList.add('show-container');
    const element = e.target.parentElement.parentElement;
    const value =  element.querySelector('p').innerText;

    const div = document.createElement('div');
    div.classList.add('complete-item');
    element.classList.remove('active');
    // console.log(element);
    div.innerHTML = `<div class="radio">
    <img src="./images/icon-check.svg" alt="">
    </div>
    <p><strike>${value}</strike></p>`;

    completeTask.appendChild(div);
    completeTask.classList.add('show-container');
    uncompletedtask.removeChild(element);

    leftItem--;
    leftTask.textContent = leftItem;

}

function cancelItem(e) {
    const element = e.target.parentElement.parentElement;

    let Elarray = [];
    Elarray.push(element);

   for (const x of Elarray) {
       if (uncompletedtask.children.length == 1 && completeTask.children.length == 0) {
        container.classList.remove('show-container');
       } else {
           uncompletedtask.removeChild(x);
           
       }

   }

   leftItem--;
    leftTask.textContent = leftItem;

}

function clearItem() {
   const items = completeTask.children;
//    completeTask.remove(items);
    for (let i = 0; i < items.length;) {
        const element = items[i];
        completeTask.removeChild(element);

        if (uncompletedtask.children.length == 0) {
            container.classList.remove('show-container');
    }

}

}

function createItem () {
    const value = input.value;
    const element = document.createElement('div');
        element.classList.add('uncomplete-task');
        element.classList.add('active');
        element.innerHTML = ` <div class="task">
        <div class="radio"></div>
        <p>${value}</p>
    </div>
        <div class="cancel">
            <img src="./images/icon-cross.svg" class="cross" alt="">
        </div>`;

        const radio = element.querySelector('.radio');
        const cancel = element.querySelector('.cross');

        cancel.addEventListener('click', cancelItem);
        radio.addEventListener('click', addToCompleted);
        uncompletedtask.appendChild(element);
        container.classList.add('show-container');

        addTolocalStorage(element) 
        leftItem++;
leftTask.textContent = leftItem;

}


function filterActive() {
    completeTask.style.display = "none";
    uncompletedtask.style.display = "flex";
}

function filterCompleted() {
    completeTask.style.display = "initial";
    uncompletedtask.style.display = "none";
}

function showAll() {
    completeTask.style.display = "initial";
    uncompletedtask.style.display = "initial";
}

function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

// console.log(getLocalStorage());



/*********** LOCAL STORAGE ************ */
function addTolocalStorage(value) {
    const task = {value};

    let items = getLocalStorage();
    console.log(items);
}


