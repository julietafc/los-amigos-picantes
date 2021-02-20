const url = "https://kea21s-4746.restdb.io/rest/recipe-list?max=3";

//The API-Key
const options = {
  headers: {
    "x-apikey": "602fe8db5ad3610fb5bb63fb",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((data) => showProduct(data));

function showProduct(recipe) {
  console.log(recipe);
}
