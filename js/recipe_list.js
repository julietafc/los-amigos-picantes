const urlParams = new URLSearchParams(window.location.search);

const Phrases = {
  drink: "When life gives you lemons... make margaritas",
  appettizer: "Love at first bite",
  side: "Holy guacamole!",
  dessert: "Dessert makes everything better",
  salad: "Lettuce turnip the beet!",
  main: "Nothing brings people together like good food",
};

let categoryId = `&q={"category":"${urlParams.get("category")}"}`;

if (urlParams.get("category") == "all") {
  document.querySelector("#recipeOfDay h1").textContent = Phrases.drink;
  categoryId = " ";
} else {
  const Phrase = Phrases[urlParams.get("category")];
  document.querySelector("#recipeOfDay h1").textContent = Phrase;
}

document.querySelector(
  ".breadcrombs a:nth-child(2)"
).textContent = urlParams.get("category");
// const subcategoryId = urlParams.get("subcategory");
let classNameC;
let subcategoryId;
let recipeOfTheDay = false;
let recipe;

const url = `https://kea21s-4746.restdb.io/rest/recipe-list?max=20${categoryId}&${subcategoryId}`;
let recipeOfDay;

//The API-Key
const options = {
  headers: {
    "x-apikey": "602fe8db5ad3610fb5bb63fb",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((data) => handleRecipeList(data));

function handleRecipeList(data) {
  recipeOfDay = data[Math.floor(Math.random() * data.length)];
  // recipeOfDay = data[0];
  if (recipeOfTheDay == false) {
    showRecipeOfDay(recipeOfDay);
  }
  console.log(data.length);
  if (data.length > 1) {
    data.forEach(showRecipe);
  } else {
    showRecipe(data[0]);
  }
  console.log("data");
}

function showRecipe(recipe) {
  console.log("recipe");
  let noChili = Number(recipe.spicy);
  let i = 5 - noChili;
  let n = 0;
  //grab the template
  const template = document.querySelector("#recipeCardTemplate").content;
  //clone it
  const copy = template.cloneNode(true);
  //change content

  copy.querySelector("h2").textContent = recipe.name;
  copy.querySelector(".recipeCard>p").textContent = `
    ${recipe.category} ${recipe.description}`;
  copy.querySelector(
    "img"
  ).src = `https://kea21s-4746.restdb.io/media/${recipe.img}`;

  copy.querySelector(".tiempo").textContent = recipe.time;

  copy.querySelectorAll(".chili").forEach(spicyness);

  function spicyness(chile) {
    if (n < i) {
      chile.classList.add("halfOpacity");
      n = n + 1;
    }
  }

  copy.querySelector(
    ".categoryIndex"
  ).style.backgroundImage = ` url(assets/${recipe.subcategory}_rc.svg)`;

  copy.querySelector(".recipeCard a").href = `recipe.html?id=${recipe._id}`;

  //grab parent
  const parent = document.querySelector("#recipeList");
  //append
  parent.appendChild(copy);
}

// -----------recipe of the day-----------------

function showRecipeOfDay(recipeOfDay) {
  let noChili = Number(recipeOfDay.spicy);
  let i = 5 - noChili;
  let n = 0;

  document.querySelector("h2").textContent = recipeOfDay.name;
  document.querySelector(".infoMedium>p").textContent = `
    ${recipeOfDay.category} ${recipeOfDay.description}`;
  document.querySelector(
    "#recipeOfDay img"
  ).src = `https://kea21s-4746.restdb.io/media/${recipeOfDay.img}`;

  document.querySelector(".tiempo").textContent = recipeOfDay.time;

  document.querySelectorAll(".chili").forEach(spicyness);

  function spicyness(chile) {
    console.log(n);
    if (n < i) {
      chile.classList.add("halfOpacity");
      n = n + 1;
    }
  }

  document.querySelector(
    "#recipeOfDay a"
  ).href = `recipe.html?id=${recipeOfDay._id}`;

  recipeOfTheDay = true;
}
//--------subcategory-----------

document.querySelectorAll(".iconMenu div").forEach((item) => {
  item.addEventListener("click", subCategory);
});

function subCategory() {
  console.log("subCategory");
  removeRecipeCard();
  classNameC = this.classList.item(0);
  if (urlParams.get("category") == "all") {
    subcategoryId = `&q={"subcategory":"${classNameC.toLowerCase()}"}`;
  } else {
    subcategoryId = `&q={"category":"${urlParams.get(
      "category"
    )}" , "subcategory":"${classNameC.toLowerCase()}"}`;
  }

  let newurl = `https://kea21s-4746.restdb.io/rest/recipe-list?max=20${subcategoryId}`;
  fetch(newurl, options)
    .then((res) => res.json())
    .then((data) => handleRecipeList(data));
}

function removeRecipeCard() {
  document.querySelectorAll("#recipeList section").forEach((item) => {
    item.remove();
  });
}
