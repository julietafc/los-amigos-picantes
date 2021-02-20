const url = "https://kea21s-4746.restdb.io/rest/recipe-list?max=13";
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
  recipeOfDay = data[Math.floor(Math.random() * data.length + 1)];
  showRecipeOfDay(recipeOfDay);
  data.forEach(showRecipe);
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
    console.log(n);
    if (n < i) {
      chile.classList.add("halfOpacity");
      n = n + 1;
    }
  }

  //grab parent
  const parent = document.querySelector("#recipeList");
  //append
  parent.appendChild(copy);
}

// -----------recipe of the day-----------------

function showRecipeOfDay(recipeOfDay) {
  console.log("recipeOfDay");
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
}
