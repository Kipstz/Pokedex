const pokemonList = document.getElementById("pokemon-list");
const detailsDiv = document.getElementById("details");

async function fetchAllPokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
        const data = await response.json();
        const totalCount = data.count;
        const allResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalCount}`);
        const allData = await allResponse.json();
        allData.results.forEach(pokemon => {
            const li = document.createElement("li");
            li.textContent = pokemon.name;
            li.onclick = () => fetchDetails(pokemon.url);
            pokemonList.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des Pokemon :", error);
    }
}

async function fetchDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const types = data.types.map(t => t.type.name).join(", ");
        detailsDiv.innerHTML = `
            <h2>${data.name} (#${data.id})</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Types :</strong> ${types}</p>
            <p><strong>Poids :</strong> ${data.weight / 10} kg</p>
            <p><strong>Taille :</strong> ${data.height / 10} m</p>
        `;
        detailsDiv.classList.add("visible");
    } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
    }
}

fetchAllPokemon();
