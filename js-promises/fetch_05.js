fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((pokemon) => {
    console.log("Name:", pokemon.name);
    console.log("Height:", pokemon.height);
    console.log("Weight:", pokemon.weight);
    console.log(
      "Abilities:",
      pokemon.abilities.map((item) => item.ability.name),
    );
  })
  .catch((error) => {
    console.error("Failed to fetch Pokémon:", error);
  });

// Example: fetch list first, then fetch one detail URL

fetch("https://pokeapi.co/api/v2/pokemon?limit=5")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((listData) => {
    console.log(
      "Pokémon list:",
      listData.results.map((p) => p.name),
    );

    const firstPokemonUrl = listData.results[0].url;
    return fetch(firstPokemonUrl);
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((pokemonDetail) => {
    console.log("First Pokémon detail:", pokemonDetail.name);
  })
  .catch((error) => {
    console.error("Failed during chained Pokémon fetch:", error);
  });