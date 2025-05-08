const pokemonList = document.getElementById("pokemon-list");
const detailsDiv = document.getElementById("details");

fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemon => {
            const li = document.createElement("li");
            li.textContent = pokemon.name;
            li.onclick = () => fetchDetails(pokemon.url);
            pokemonList.appendChild(li);
        });
    });

function fetchDetails(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const types = data.types.map(t => t.type.name).join(", ");
            detailsDiv.innerHTML = `
                <h2>${data.name} (#${data.id})</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p><strong>Types :</strong> ${types}</p>
                <p><strong>Poids :</strong> ${data.weight / 10} kg</p>
                <p><strong>Taille :</strong> ${data.height / 10} m</p>
            `;
            detailsDiv.classList.add("visible");
        });
}
