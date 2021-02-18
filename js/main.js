document.querySelectorAll(".artRecipeSmall").forEach(addEvent);
function addEvent(recipeSmall) {
  recipeSmall.addEventListener("click", showRecipe);
}

function showRecipe() {
  document.querySelector(".recipieList").classList.add("halfOpacity");
  //Step 1: Chose the <template>'s content
  const template = document.querySelector("#recipeBig").content;

  //Step 2: Make a "clone"
  const copy = template.cloneNode(true);

  //Step 3: Change the content of the clone
  //use the data from the object above (you can do this when the rest is working)

  //Step 4: Chose the new "parent" element
  //Append it to main
  const parent = document.querySelector(".recipieContainer");
  //Step 5: Add (Append) the clone to the DOM
  parent.appendChild(copy);
  document.querySelector("button").addEventListener("click", removeRecipe);
}

function removeRecipe() {
  document.querySelector(".recipieList").classList.remove("halfOpacity");
  document.querySelector(".recipeBigWraper").remove();
}
