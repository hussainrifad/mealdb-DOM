// Meal by name
const url = 'http://www.themealdb.com/api/json/v1/1/search.php?s=';
let allMeal = {};

// Meal by id 
const mealUrlById = 'http://www.themealdb.com/api/json/v1/1/lookup.php?i=';
let meal = {};

const createDetailComponent = (food) => {
    console.log(food);
    const parent = document.body.querySelector('#detail-container');
    if(parent.hasChildNodes()){
        parent.removeChild(parent.children[0]);
    }
    const child = document.createElement('div');
    child.innerHTML = `
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${food.strMealThumb}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${food.strMeal}</h5>
                <p class="card-text">${food.strInstructions.slice(0,300)}. . .</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            <div class="card-body">
                <a href="${food.strSource}" class="card-link">Source</a>
                <a href="${food.strYoutube}" class="card-link">Watch on Youtube</a>
            </div>
        </div>
    </div>
    `
    child.classList.add('card', 'mb-3', 'mt-5');
    child.style.maxWidth = '540px';
    parent.appendChild(child);
}

const fetchFoodById = async(id) =>{
    const response = await fetch(mealUrlById+parseInt(id),{
        mode: 'no-cors'
    });
    const data = await response.json();
    meal = data;
    createDetailComponent(meal.meals[0]);
}

const createFoodComponent = () => {
    const parent = document.body.querySelector("#food-container");
    const foods = allMeal.meals;
    console.log(foods);
    for(let food of foods){
        let child = document.createElement('div');
        child.innerHTML = `
        <a onclick={fetchFoodById(${food.idMeal})}>
            <div class="card" style="width: 18rem;">
                <img src=${food.strMealThumb} class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${food.strMeal}</h5>
                <p class="card-text">${food.strInstructions.slice(0, 100)}...</p>
                <button class="btn btn-primary">Details</button>
                </div>
            </div>
        </a>
        `
        child.classList.add('col')
        parent.appendChild(child);
    }
}


// fetch meals function 
const fetchData = async(key) => {
    console.log(url+key);
    const response = await fetch(url+key,{
        mode: 'no-cors'
    });
    const data = await response.json();
    allMeal = data;
    createFoodComponent();
}

const button = document.body.querySelector('#search-button');
button.addEventListener("click", (e) => {
    e.preventDefault();
    const val= document.body.querySelector('#search-value').value;
    document.body.querySelector('#search-value').value = '';
    fetchData(val);
})