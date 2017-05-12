document.addEventListener("DOMContentLoaded", function(e){
console.log("dom is fully loaded, pokemon util running");

// const canvas = d3.select("body").append("svg").attr("width", 1000).attr("height", 1000);

let pokemon = [];
let currentTeam = [];
let opponentTeam = [];
let currentPokemonP1 = null;
let currentPokemonP2 = null;

for (let i = 0; i < 6; i++){
  let pokeball = document.createElement("img");
  pokeball.src = "http://forums.windowscentral.com/attachments/nokia-glance-backgrounds/45742d1381464991t-pokeball-glance.png";
}

const fetchAllPokemon = () => {
    return $.ajax({
      method: "GET",
      url: `http://pokeapi.co/api/v2/pokemon/?limit=150`,
      success: (result) => {
        pokemon = pokemon.concat(result.results);
      }
    });
  }

  fetchAllPokemon().then(() => {
    return $.ajax({
      method: "POST",
      url: 'api/pokemon',
      data: {pokemon: pokemon}
    }).then((allPokemon) => {
      window.pokemon = allPokemon;
    }).then(() => generatePokemonList());
  })

  const fetchPokemonTweets = (pokemon) => {
    return $.ajax({
        method: "POST",
        url: "api/twitter",
        data: {pokemon: pokemon}
      });
  }

  const generatePokemonList = () => {
    let list = $('#pokemon-list');
    let samplePokemon = [];
    for (let i = 0; i < 150; i++){
      samplePokemon.push(window.pokemon[i]);
    }

    samplePokemon.forEach((pokemon) => {

      let name = pokemon['name'];
      let pokeItem = document.createElement("div");
      let description = document.createElement("p");
      let img = document.createElement("img");

      pokeItem.setAttribute("class", "pokemon-item");

      pokeItem.addEventListener("click", (e) => addPokemonToTeam(pokemon));

      // description.innerHTML = `${name} tweets: ${pokemon.search_results.tweet_count} sample: ${pokemon.search_results.tweets[0].text}`;
      img.src = pokemon['image_url'];
      pokeItem.appendChild(img);
      // pokeItem.appendChild(description);
      list.append(pokeItem);
    });
  }

  const addPokemonToTeam = (pokemon) => {
    if (currentTeam.length < 6) {
      currentTeam.push(pokemon);
      let pokeImage = document.createElement("img");
      pokeImage.src = pokemon['image_url'];
      let $teamBox = $('.team-container')[0];
      $teamBox.appendChild(pokeImage);
      if (currentTeam.length === 6){
        toggleReadyBtn();
      }
    }
  }

  const toggleReadyBtn = () => {
    let $btn = document.getElementById('ready-btn');
    $btn.setAttribute("class", "show");
  }

  const fetchTweetTones = (pokemonTweets) => {
    return $.ajax({
      method: "POST",
      url: "api/tones",
      data: {pokemon: pokemon}
    })
  }
  //
  // const addPokemonData = () => {
  //   let circles = canvas.selectAll("circle")
  //   .data(window.pokemon)
  //   .enter()
  //   .append("circle")
  //   .attr("width", 100)
  //   .attr("height", 100)
  // }

  const stopFunction = (interval) => {
    clearInterval(interval);
  }

  const increaseWidth = () => {
    let gameScreen = document.getElementById("gamescreen-canvas");
    gameScreen.width += 1;
  }

  const expandGameScreen = () => {
    let expandWindowInterval = setInterval(increaseWidth, 10);

    setTimeout(() => stopFunction(expandWindowInterval), 500);
    setTimeout(drawPokeballs, 1000);
    setTimeout(renderPlayerSprites, 2000);
  }

  const renderGameModal = () => {
    for (let i = 0; i < 6; i++){
      let idx = Math.floor(Math.random() * pokemon.length);
      opponentTeam.push(window.pokemon[idx]);
    }

    let backgroundModal = document.createElement("div");
    backgroundModal.setAttribute("class", "background-modal");

    let height = $(document).height().toString() + "px";
    backgroundModal.style.height = height;

    let body = document.getElementsByTagName("BODY")[0];
    body.appendChild(backgroundModal);
    renderBattleScreen();
  }

  $('#ready-btn').on("click", () => renderGameModal());


  const renderBattleScreen = () => {
    let gameScreen = document.createElement("canvas");
    gameScreen.setAttribute("id", "gamescreen-canvas");
    let ctx = gameScreen.getContext("2d");
    let gameModal = $('.background-modal')[0];

    gameModal.appendChild(gameScreen);
    setTimeout(expandGameScreen, 1000);
  }

  const drawPokeballs = () => {
    let canvas = document.getElementById("gamescreen-canvas");
    let ctx = canvas.getContext("2d");
    let pokeball = document.createElement("img");
    let pokeball2 = document.createElement("img");
    pokeball.setAttribute("class", "player1-pokeballs");
    pokeball2.setAttribute("class", "player2-pokeballs");
    pokeball.src = "http://forums.windowscentral.com/attachments/nokia-glance-backgrounds/45742d1381464991t-pokeball-glance.png";
    pokeball2.src = "http://forums.windowscentral.com/attachments/nokia-glance-backgrounds/45742d1381464991t-pokeball-glance.png";
    pokeball.onload = function(){
      let x = 0;
      while (x < 6){
        ctx.drawImage(pokeball, canvas.width * .01 + (x * 15), 10, 20, 20 * pokeball.height / pokeball.width);
        ctx.drawImage(pokeball2, canvas.width * .72 + (x * 15), 10, 20, 20 * pokeball.height / pokeball.width);
        x += 1
      }
    }
  }

  const renderPlayerSprites = () => {
    let background = document.getElementsByClassName('background-modal')[0];
    let player1 = document.createElement("img");
    let player2 = document.createElement("img");
    player1.setAttribute("class", "player1-sprite");
    player2.setAttribute("class", "player2-sprite");
    player1.src = "http://fc01.deviantart.net/fs71/f/2011/003/f/e/pokemon_trainer_denny_by_tsunami_dono-d36cgr5.png";
    player2.src = "https://s-media-cache-ak0.pinimg.com/originals/d8/5a/5c/d85a5cb0fe99e3fcf312f91026637eb1.png";
    background.appendChild(player1);
    background.appendChild(player2);
    renderPlayerPokemon();

    let opponentPokemon = opponentSelectRandomPokemon();
    setTimeout(() => renderPokemonOntoField(opponentPokemon, "player2"), 5000);
  }

  const opponentSelectRandomPokemon = () => {
    let idx = Math.floor(Math.random() * opponentTeam.length);
    return opponentTeam[idx];
  }

  const renderPlayerPokemon = () => {
    let background = document.getElementsByClassName('background-modal')[0];
    let waitingArea1 = document.createElement("div");
    let waitingArea2 = document.createElement("div");
    waitingArea1.setAttribute("class", "waiting-area-container-p1");
    waitingArea2.setAttribute("class", "waiting-area-container-p2");
    background.appendChild(waitingArea1);
    background.appendChild(waitingArea2);

    currentTeam.forEach((pokemon) => {
      let pokeImage = document.createElement('img');
      pokeImage.src = pokemon['image_url'];

      pokeImage.addEventListener("click", (e) => playPokemon(pokemon));
      setTimeout(() => waitingArea1.appendChild(pokeImage), 1000);
    });

    opponentTeam.forEach((pokemon) => {
      let pokeImage2 = document.createElement('img');
      pokeImage2.src = pokemon['image_url'];
      setTimeout(() => waitingArea2.appendChild(pokeImage2), 1000);
    });

    renderSelectPokemonText();
  }

  const redrawCanvas = () => {
    let canvas = document.getElementById("gamescreen-canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPokeballs();
  }

  const renderSelectPokemonText = () => {
    let canvas = document.getElementById("gamescreen-canvas");
    let ctx = canvas.getContext("2d");

    setTimeout(() => {ctx.strokeText("C", canvas.width * .35, 10)}, 1000);
    setTimeout(() => {ctx.strokeText("H", canvas.width * .4, 10)}, 1050);
    setTimeout(() => {ctx.strokeText("O", canvas.width * .45, 10)}, 1100);
    setTimeout(() => {ctx.strokeText("O", canvas.width * .5, 10)}, 1150);
    setTimeout(() => {ctx.strokeText("S", canvas.width * .55, 10)}, 1200);
    setTimeout(() => {ctx.strokeText("E", canvas.width * .6, 10)}, 1250);

    setTimeout(redrawCanvas, 1800);

    setTimeout(() => {ctx.strokeText("Y", canvas.width * .4, 10)}, 2000);
    setTimeout(() => {ctx.strokeText("O", canvas.width * .45, 10)}, 2050);
    setTimeout(() => {ctx.strokeText("U", canvas.width * .5, 10)}, 2100);
    setTimeout(() => {ctx.strokeText("R", canvas.width * .55, 10)}, 2150);

    setTimeout(redrawCanvas, 2600);

    setTimeout(() => {ctx.strokeText("P", canvas.width * .35, 10)}, 2700);
    setTimeout(() => {ctx.strokeText("O", canvas.width * .4, 10)}, 2750);
    setTimeout(() => {ctx.strokeText("K", canvas.width * .45, 10)}, 2800);
    setTimeout(() => {ctx.strokeText("E", canvas.width * .5, 10)}, 2850);
    setTimeout(() => {ctx.strokeText("M", canvas.width * .55, 10)}, 2900);
    setTimeout(() => {ctx.strokeText("O", canvas.width * .6, 10)}, 2950);
    setTimeout(() => {ctx.strokeText("N", canvas.width * .65, 10)}, 3000);

    setTimeout(redrawCanvas, 3300);
  }

  const playPokemon = (pokemon) => {

    if (currentPokemonP1 === null){
      renderPokemonOntoField(pokemon, "player1");
    }
  }

  const renderPokemonOntoField = (pokemon, player) => {
    let pokeballGifClass;
    let smokeGifClass;
    let pokemonGifClass;

    if (player === "player1"){
      pokeballGifClass = "pokeball-gif-p1";
      smokeGifClass = "smoke-gif-p1";
      pokemonGifClass = "pokemon-gif-p1";
    } else {
      pokeballGifClass = "pokeball-gif-p2";
      smokeGifClass = "smoke-gif-p2";
      pokemonGifClass = "pokemon-gif-p2";
    }

    let canvas = document.getElementById("gamescreen-canvas");
    let canvasX = canvas.offsetLeft;

    let background = document.getElementsByClassName('background-modal')[0];
    let pokeball = document.createElement('img');
    pokeball.src = "https://media.giphy.com/media/DJM88aCmEeaNG/giphy.gif";
    pokeball.setAttribute("class", pokeballGifClass);

    if (player === "player1"){
      pokeball.style.left = (canvasX - 10).toString() + 'px';
    } else {
      canvasX = canvas.offsetRight;
      pokeball.style.right = (canvasX - 10).toString() + 'px';
    }

    let smoke = document.createElement('img');
    smoke.setAttribute("class", smokeGifClass);
    smoke.src = "https://media.giphy.com/media/drj4KPFH32Mw/giphy.gif";

    background.appendChild(pokeball);

    let pokemonGif = document.createElement("img");
    pokemonGif.setAttribute("class", pokemonGifClass);
    pokemonGif.src = pokemon['gif_url'];

    setTimeout(() => { pokeball.setAttribute("class", "hide")}, 2400);
    setTimeout(() => background.appendChild(smoke), 2500);
    setTimeout(() => { smoke.setAttribute("class", "hide")}, 3000);
    setTimeout(() => background.appendChild(pokemonGif), 3000);

  }

});
