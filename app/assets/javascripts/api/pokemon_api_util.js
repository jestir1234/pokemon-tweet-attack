document.addEventListener("DOMContentLoaded", function(e){
console.log("dom is fully loaded, pokemon util running");

let pokemon = [];
let currentTeam = [];
let opponentTeam = [];
let onP1 = null;
let currentPokemonP1 = null;
let currentPokemonP2 = null;

let currentRandomTweets = null;
let currentTweetScores = null;
let currentPokemonInfoP1;
let currentPokemonInfoP2;
let currentGifs;
let player1PokemonStats = {};
let player2PokemonStats = {};
let currentMove;
let currentAttackingPokemon;
let currentTurnPlayer = "player1";

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

  const fetchPokemon = (id) => {
    return $.ajax({
      method: "GET",
      url: `http://pokeapi.co/api/v2/pokemon/${id}/`,
    }).then((info) => currentPokemonInfoP1 = info);
  }

  const fetchPokemonOpponent = (id) => {
    return $.ajax({
      method: "GET",
      url: `http://pokeapi.co/api/v2/pokemon/${id}/`,
    }).then((info) => currentPokemonInfoP2 = info);
  }

  const fetchPokemonTweets = (pokemon) => {
    return $.ajax({
        method: "POST",
        url: "api/twitter",
        data: {pokemon: pokemon}
      });
  }

  const fetchPokemonMove = (url) => {
    return $.ajax({
      method: "GET",
      url: `${url}`,
    }).then((info) =>  {
      currentMove = info
    }
    )
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

      img.src = pokemon['image_url'];
      pokeItem.appendChild(img);
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

  const fetchTweetTones = (tweet) => {
    return $.ajax({
      method: "POST",
      url: "api/tones",
      data: {tweet: tweet}
    })
  }

  const fetchGif = (pokemon, attack) => {
    return $.ajax({
      method: "GET",
      url: `http://api.giphy.com/v1/gifs/search?q=${pokemon}+${attack}&api_key=dc6zaTOxFJmzC`,
      success: (gifs) => {
        currentGifs = gifs;
      }
    })
  }

  const stopFunction = (interval) => {
    clearInterval(interval);
  }

  const increaseWidth = () => {
    let gameScreen = document.getElementById("gamescreen-canvas");
    gameScreen.width += 1;
  }

  const expandGameScreen = () => {
    renderSelectPokemonText();
    let expandWindowInterval = setInterval(increaseWidth, 10);

    setTimeout(() => stopFunction(expandWindowInterval), 500);
    setTimeout(drawPokeballs, 1000);
    setTimeout(renderPlayerSprites, 2000);
    setTimeout(() => $("html, body").animate({ scrollTop: "1000px" }), 4000);
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
    setTimeout(() => $("html, body").animate({ scrollTop: "0px" }), 500);
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

    opponentSelectRandomPokemon();

  }

  const opponentSelectRandomPokemon = () => {
    let idx = Math.floor(Math.random() * opponentTeam.length);
    fetchPokemonOpponent(opponentTeam[idx].id).then(() => {
      let health = currentPokemonInfoP2.stats[5].base_stat + currentPokemonInfoP2.base_experience;
      let attack = currentPokemonInfoP2.stats[4].base_stat
      let defense = currentPokemonInfoP2.stats[3].base_stat
      let speed = currentPokemonInfoP2.stats[0].base_stat
      player2PokemonStats[currentPokemonInfoP2.name] = {totalHP: health, currentHP: health, attack: attack, defense: defense, speed: speed, name: currentPokemonInfoP2.name, id: currentPokemonInfoP2.id};
      currentPokemonP2 = player2PokemonStats[currentPokemonInfoP2.name];

      fetchPokemonTweets(opponentTeam[idx]).then((tweets) => {
        player2PokemonStats[currentPokemonInfoP2.name]['tweets'] = tweets.tweets;
        setTimeout(() => renderPokemonOntoField(opponentTeam[idx], "player2"), 3000);
      });
    })
  }

  const opponentPlayTurn = () => {

    if (currentPokemonP2){
      currentAttackingPokemon = {'name': currentPokemonInfoP2.name, 'player': "player2", "pokemon": player2PokemonStats[currentPokemonInfoP2.name]};
      renderTweetOptions(player2PokemonStats[currentPokemonP2.name]['tweets'])
      setTimeout(() => {
        let nextChance = (Math.random() * 100);
        if (nextChance > 50){
          $('.next-btn').trigger("click")
        }
        $('.tweet-container').trigger('click');
      }, 4000)
    } else {
      opponentSelectRandomPokemon();
      setTimeout(() => opponentPlayTurn(), 6000);
    }
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

  }


  const redrawCanvas = () => {
    let canvas = document.getElementById("gamescreen-canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPokeballs();
    drawHealthBars(ctx);
  }

  const drawHealthBars = (ctx) => {

    ctx.beginPath();
    if (p1HealthBarAttr){
      if (p1HealthBarAttr.width < 50 && p1HealthBarAttr.width > 25){
        ctx.strokeStyle = 'orange';
      } else if (p1HealthBarAttr.width < 25){
        ctx.strokeStyle = 'red';
      } else {
        ctx.strokeStyle = 'green';
      }
      if (p1HealthBarAttr.width <= 1){
        p1HealthBarAttr = {x: p1HealthBarAttr.x, y: p1HealthBarAttr.y, width: p1HealthBarAttr.width, height: 0};
      }
      ctx.strokeRect(p1HealthBarAttr.x, p1HealthBarAttr.y, p1HealthBarAttr.width, p1HealthBarAttr.height);
    }


    ctx.beginPath();

    if (p2HealthBarAttr){
      if (p2HealthBarAttr.width < 50 && p2HealthBarAttr.width > 25){
        ctx.strokeStyle = 'orange';
      } else if (p2HealthBarAttr.width < 25){
        ctx.strokeStyle = 'red';
      } else {
        ctx.strokeStyle = 'green';
      }
      if (p2HealthBarAttr.width <= 1){
        p2HealthBarAttr = {x: p2HealthBarAttr.x, y: p2HealthBarAttr.y, width: p2HealthBarAttr.width, height: 0};
      }
      ctx.strokeRect(p2HealthBarAttr.x, p2HealthBarAttr.y, p2HealthBarAttr.width, p2HealthBarAttr.height);
    }

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

  let p1HealthBar = 1;
  let p1HealthBarAttr;
  let p2HealthBar = 1;
  let p2HealthBarAttr;

  const animateHealthBar = (player) => {

    if (player === "player1"){
      let hpPercentage = currentPokemonP1.currentHP / currentPokemonP1.totalHP;
      let currentHPBarWidth = 80 * hpPercentage;
      p1HealthBar += 1;
      let canvas = document.getElementById("gamescreen-canvas");
      let ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth="4";
      ctx.strokeStyle="green";
      if (p1HealthBar < currentHPBarWidth){
        ctx.rect(10,30,0 + p1HealthBar,1);
        p1HealthBarAttr = {x: 10, y: 30, width: p1HealthBar, height: 1}
        ctx.stroke();
      }
    } else if (player === "player2"){
      let hpPercentage = currentPokemonP2.currentHP / currentPokemonP2.totalHP;
      let currentHPBarWidth = 80 * hpPercentage;
      p2HealthBar += 1;
      let canvas = document.getElementById("gamescreen-canvas");
      let ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth="4";
      ctx.strokeStyle="green";
      if (p2HealthBar < currentHPBarWidth) {
        ctx.rect(338 - p2HealthBar,30, 0 + p2HealthBar,1);
        p2HealthBarAttr = {x: 360 - p2HealthBar, y: 30, width: p2HealthBar, height: 1}
        ctx.stroke();
      }
    }

  }

  const animateHealthBarDamage = (player, prevHP, defender) => {
    let canvas = document.getElementById("gamescreen-canvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth="4";
    ctx.strokeStyle="green";

    if (player === "player1"){
      let newHpPercentage = defender.currentHP / defender.totalHP;
      let prevHpPercentage = prevHP / defender.totalHP;
      let currentHPBarWidth = Math.floor(80 * newHpPercentage);
      if (prevHpPercentage >= 1){
        p2HealthBarAttr = {x: 255, y: p2HealthBarAttr.y, width: p2HealthBarAttr.width, height: p2HealthBarAttr.height};
      }
      let animationInterval = setInterval(() => {
        if (p2HealthBarAttr.width >= currentHPBarWidth && p2HealthBarAttr.width >= 1){
          p2HealthBarAttr = {x: p2HealthBarAttr.x + 1, y: p2HealthBarAttr.y, width: p2HealthBarAttr.width - 1, height: p2HealthBarAttr.height};
          redrawCanvas();
        }
      }, 50);
      setTimeout(() => clearInterval(animationInterval), 4000);
    } else {
      let newHpPercentage = defender.currentHP / defender.totalHP;
      let prevHpPercentage = prevHP / defender.totalHP;
      let currentHPBarWidth = Math.floor(80 * newHpPercentage);

      if (prevHpPercentage >= 1){
        p1HealthBarAttr = {x: 10, y: p1HealthBarAttr.y, width: p1HealthBarAttr.width, height: p1HealthBarAttr.height};
      }

      let animationInterval = setInterval(() => {
        if (p1HealthBarAttr.width >= currentHPBarWidth && p1HealthBarAttr.width >= 1){

          p1HealthBarAttr = {x: p1HealthBarAttr.x, y: p1HealthBarAttr.y, width: p1HealthBarAttr.width - 1, height: p1HealthBarAttr.height};
          redrawCanvas();
        }
      }, 50);
      setTimeout(() => clearInterval(animationInterval), 4000);
    }
  }

  const generateHealthBar = (player) => {
    let interval = setInterval(() => animateHealthBar(player), 50);
    setTimeout(() => clearInterval(interval), 4000);
  }

  const playPokemon = (pokemon) => {

    if (currentPokemonP1 === null && currentTurnPlayer === "player1"){
      currentPokemonP1 = "fetching..."
      fetchPokemon(pokemon['id']).then(() => {
      let health = currentPokemonInfoP1.stats[5].base_stat + currentPokemonInfoP1.base_experience;
      let attack = currentPokemonInfoP1.stats[4].base_stat
      let defense = currentPokemonInfoP1.stats[3].base_stat
      let speed = currentPokemonInfoP1.stats[0].base_stat
      player1PokemonStats[currentPokemonInfoP1.name] = {totalHP: health, currentHP: health, attack: attack, defense: defense, speed: speed, name: currentPokemonInfoP1.name, id: currentPokemonInfoP1.id};
      currentPokemonP1 = player1PokemonStats[currentPokemonInfoP1.name];
      currentAttackingPokemon = {'name': currentPokemonInfoP1.name, 'player': "player1", "pokemon": player1PokemonStats[currentPokemonInfoP1.name]};
      renderPokemonOntoField(pokemon, "player1");

      fetchPokemonTweets(pokemon).then((tweets) =>
      {
        player1PokemonStats[currentPokemonInfoP1.name]['tweets'] = tweets.tweets;
        renderTweetOptions(tweets.tweets);
      });
      }
    );
    }
  }

  const selectRandomTweets = (tweets) => {
    let collection = [];
    while (collection.length < 4){
      let idx = Math.floor(Math.random() * tweets.tweets.length);
      let randomTweet = tweets.tweets[idx];
      if (randomTweet.lang == "en") {
        collection.push(randomTweet);
      }
    }
    return collection;
  }

  const renderTweetOptions = (tweets) => {
    let randomTweets = selectRandomTweets(tweets);
    let background = document.getElementsByClassName('background-modal')[0];
    let optionsContainer = document.createElement("div");
    optionsContainer.setAttribute("class", "options-container");
    let header = document.createElement("h3");
    header.innerHTML = "SELECT A TWEET ATTACK!";

    optionsContainer.appendChild(header);

    let nextBtn = document.createElement("img");
    nextBtn.setAttribute("class", "next-btn");
    nextBtn.src = "https://vignette1.wikia.nocookie.net/pokemongo/images/1/1b/Button_Next.png/revision/latest?cb=20160908143000";
    nextBtn.addEventListener("click", switchOutTweet);
    optionsContainer.appendChild(nextBtn);

    currentRandomTweets = randomTweets;
    let tweetItem = renderTweet(currentRandomTweets[0]);
    optionsContainer.appendChild(tweetItem);
    background.appendChild(optionsContainer);
  }

  const switchOutTweet = () => {
    let tweetContainer = document.getElementsByClassName("tweet-container")[0];
    tweetContainer.setAttribute("class", "hide");
    let optionsContainer = document.getElementsByClassName("options-container")[0];
    let currentTweet = currentRandomTweets[0];
    currentRandomTweets.shift();
    currentRandomTweets.push(currentTweet);
    let tweet = renderTweet(currentRandomTweets[0]);
    setTimeout(() => optionsContainer.appendChild(tweet), 1000)
    optionsContainer.appendChild(tweet);
  }

  const getTweetScore = (tweet) => {
    $("html, body").animate({ scrollTop: "0px" });
    renderSpeechBubble(tweet.text, currentTurnPlayer)
    fetchTweetTones(tweet).then((scores) =>
    {
      currentTweetScores = scores
      let emotion = calcScore(scores);
      setTimeout(() => executeAttack(emotion), 3000);
     }
    );
  }

  const executeAttack = (emotion) => {

    let pokeMoves;
    let pokemonToFetch;
    if (currentTurnPlayer === "player1"){
      pokeMoves = currentPokemonInfoP1.moves;
    } else {
      pokeMoves = currentPokemonInfoP2.moves;
    }
    let move;

    if (emotion === "anger"){
      pokemonToFetch = currentAttackingPokemon['name'];
      let idx = Math.floor(Math.random() * 30);
      move = pokeMoves[idx].move.name;
      fetchPokemonMove(pokeMoves[idx].move.url)
      .then(() => {
        calcAttack();
      }
    );
    } else if (emotion === "disgust"){
      pokemonToFetch = "nicolas+cage"
      move = "nicolas+cage";
    } else if (emotion === "fear"){
      pokemonToFetch = "scared";
      move = "scared";
    } else if (emotion === "joy"){
      pokemonToFetch = currentAttackingPokemon['name'];
      let idx = Math.floor(Math.random() * 30);
      move = pokeMoves[idx].move.name;
      fetchPokemonMove(pokeMoves[idx].move.url)
      .then(() => {
        calcAttack();
      }
    );
    } else if (emotion === "sadness"){
      pokemonToFetch = "crying";
      move = "crying";
    } else if (emotion === "none"){
      pokemonToFetch = "confused";
      move = "confused"
    }

    fetchGif(pokemonToFetch, move).then(() => renderAttack(move, emotion))
  }

  const selectRandomGif = (gifs) => {
    let idx = Math.floor(Math.random() * gifs.length);
    return gifs[idx];
  }

  const calcAttack = () => {
    let attack = currentAttackingPokemon.pokemon.attack;
    let chance = Math.floor(Math.random() * 100);

    let power = currentMove.power;
    let hit = currentMove.accuracy >= chance ? true : false;
    let totalDmg = attack + power;

    if (currentAttackingPokemon.player === "player1"){
      let prevHP = player2PokemonStats[currentPokemonInfoP2.name].currentHP;
      player2PokemonStats[currentPokemonInfoP2.name].currentHP -= (totalDmg - player2PokemonStats[currentPokemonInfoP2.name].defense)
      if (player2PokemonStats[currentPokemonInfoP2.name].currentHP <= 0){
        currentPokemonP2 = null;
        p2HealthBar = 1;
      }
      setTimeout(() => renderDamage(currentAttackingPokemon.player, prevHP, player2PokemonStats[currentPokemonInfoP2.name]), 3000);
    } else {
      let prevHP = player1PokemonStats[currentPokemonInfoP1.name].currentHP;
      player1PokemonStats[currentPokemonInfoP1.name].currentHP -= (totalDmg - player1PokemonStats[currentPokemonInfoP1.name].defense)
      if (player1PokemonStats[currentPokemonInfoP1.name].currentHP <= 0){
        currentPokemonP1 = null;
        p1HealthBar = 1;
      }
      setTimeout(() => renderDamage(currentAttackingPokemon.player, prevHP, player1PokemonStats[currentPokemonInfoP1.name]), 3000);
    }
  }

  const renderDamage = (player, prevHP, defender) => {
    if (currentAttackingPokemon.player === "player1"){
      let gif = document.getElementsByClassName("pokemon-gif-p2")[0];
      let invertInterval = setInterval(() => gif.setAttribute("id", "invert-img"), 200);
      let normInterval = setInterval(() => gif.setAttribute("id", "invert-img-none"), 400);
      animateHealthBarDamage(player, prevHP, defender);
      setTimeout(() => clearInterval(invertInterval), 2000);
      setTimeout(() => clearInterval(normInterval), 2400);
      if (defender.currentHP <= 0){
        setTimeout(() => renderDeathAnimation(defender, player), 3500);
      }
    } else {
      let gif = document.getElementsByClassName("pokemon-gif-p1")[0];
      let invertInterval = setInterval(() => gif.setAttribute("id", "invert-img"), 200);
      let normInterval = setInterval(() => gif.setAttribute("id", "invert-img-none"), 400);
      animateHealthBarDamage(player, prevHP, defender);
      setTimeout(() => clearInterval(invertInterval), 2000);
      setTimeout(() => clearInterval(normInterval), 2400);
      if (defender.currentHP <= 0){
        setTimeout(() => renderDeathAnimation(defender, player), 3500);
      }
    }
  }

  const renderDeathAnimation = (defender, player) => {
    if (player === "player1"){
      updatedOpponentTeam = [];
      opponentTeam.forEach((pokemon) => {
        if (pokemon.id !== defender.id){
          updatedOpponentTeam.push(pokemon);
        }
      });

      opponentTeam = updatedOpponentTeam;
      removeWaitingAreaPokemon(defender, player);
      let gif = document.getElementsByClassName("pokemon-gif-p2")[0];
      gif.setAttribute("id", "invert-img-half");
      let deathInterval1 = setInterval(() => {
        gif.setAttribute("id", "invert-img-quarter");
      }, 100);

      let deathInterval2 = setInterval(() => {
        gif.setAttribute("id", "invert-img-half");
      }, 300);
      setTimeout(() => clearInterval(deathInterval1), 2000);
      setTimeout(() => clearInterval(deathInterval2), 2000);
      setTimeout(() => $(".pokemon-gif-p2").remove(), 2000);
    } else {
      currentPokemonP1 = null;
      removeWaitingAreaPokemon(defender, player);
      let gif = document.getElementsByClassName("pokemon-gif-p1")[0];
      gif.setAttribute("id", "invert-img-half");
      let deathInterval1 = setInterval(() => {
        gif.setAttribute("id", "invert-img-quarter");
      }, 100);

      let deathInterval2 = setInterval(() => {
        gif.setAttribute("id", "invert-img-half");
      }, 300);
      setTimeout(() => clearInterval(deathInterval1), 2000);
      setTimeout(() => clearInterval(deathInterval2), 2000);
      setTimeout(() => $(".pokemon-gif-p1").remove(), 2000);
    }
  }

  const removeWaitingAreaPokemon = (defender, player) => {
    if (player === "player1"){
      let waitingArea = document.getElementsByClassName("waiting-area-container-p2")[0];
      let images = waitingArea.children;

      for (let i = 0; i < images.length; i++){
        let img = images[i];
        let url = img.src.slice(0, img.src.length - 4);
        let id = parseInt(url.slice(37));
        if (id === defender.id){
          waitingArea.removeChild(img);
        }
      }
    } else {
      let waitingArea = document.getElementsByClassName("waiting-area-container-p1")[0];
      let images = waitingArea.children;

      for (let i = 0; i < images.length; i++){
        let img = images[i];
        let url = img.src.slice(0, img.src.length - 4);
        let id = parseInt(url.slice(37));
        if (id === defender.id){
          waitingArea.removeChild(img);
        }
      }
    }
  }


  const renderAttack = (move, emotion) => {
    let attackMessage = document.createElement("div");
    let background = document.getElementsByClassName("background-modal")[0];
    attackMessage.setAttribute("class", "attack-message");
    if (emotion === "anger" || emotion === "joy"){
      attackMessage.innerHTML = `${currentAttackingPokemon.name} uses ${move}!`;
    } else if (emotion === "sadness"){
      attackMessage.innerHTML = `${currentAttackingPokemon.name} begins to cry!`;
    } else if (emotion === "disgust"){
      attackMessage.innerHTML = `${currentAttackingPokemon.name} is disgusted!`;
    } else if (emotion === "none"){
      attackMessage.innerHTML = `${currentAttackingPokemon.name} is confused...`;
    } else if (emotion === "fear"){
      attackMessage.innerHTML = `${currentAttackingPokemon.name} is afraid...`;
    }

    setTimeout(() => $('.options-container').remove(), 1000);

    background.appendChild(attackMessage);
    let randomGif = selectRandomGif(currentGifs.data);

    let gif = document.createElement("img");
    gif.setAttribute("class", "pokemon-gif");
    let url = "https://media.giphy.com/media/" + randomGif.embed_url.slice(23) + "/giphy.gif";

    gif.src = url;
    background.appendChild(gif);
    setTimeout(() => background.removeChild(gif), 5000);
    setTimeout(() => fade(attackMessage), 2000);
    setTimeout(() => background.removeChild(attackMessage), 5000);
    setTimeout(() => switchPlayerTurn(), 8000);
  }

  const switchPlayerTurn = () => {

    currentTurnPlayer = currentTurnPlayer === "player1" ? "player2" : "player1";
    if (currentTurnPlayer === "player2"){
      opponentPlayTurn();
    } else {
      playerPlayTurn();
    }
  }

  const playerPlayTurn = () => {
    if (currentPokemonP1){
      currentAttackingPokemon = {'name': currentPokemonInfoP1.name, 'player': "player1", "pokemon": player1PokemonStats[currentPokemonInfoP1.name]};
      renderTweetOptions(player1PokemonStats[currentPokemonInfoP1.name]['tweets'])
    }
  }


  function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 100);
}



  const calcScore = (score) => {

    let tweetScores = score.scores !== "Unavailable" ? score.scores : {anger: {score: 0}, disgust: {score: 0}, fear: {score: 0}, joy: {score: 0}, sadness: {score: 0} };

    let highest = 0;
    let emotion = 'none';

    let anger = tweetScores.anger ? tweetScores.anger.score : 0;

    if (anger > highest) {
      emotion = "anger";
      highest = anger;
    }

    let disgust = tweetScores.disgust.score;

    if (disgust > highest){
      emotion = "disgust";
      highest = disgust;
    }

    let fear = tweetScores.fear.score;

    if (fear > highest) {
      emotion = "fear";
      highest = fear;
    }

    let joy = tweetScores.joy.score;

    if (joy > highest) {
      emotion = "joy"
      highest = joy;
    }

    let sadness = tweetScores.sadness.score;

    if (sadness > highest){
      emotion = "sadness";
      highest = sadness;
    }
    return emotion;
  }

  const renderTweet = (tweet) => {
    let tweetContainer = document.createElement("div");
    tweetContainer.setAttribute("class", "tweet-container");
    tweetContainer.addEventListener("click", () => getTweetScore(tweet));
    let tweetHeader = document.createElement("div");
    tweetHeader.setAttribute("class", "tweet-header");

    let tweetNameContainer = document.createElement("div");
    tweetNameContainer.setAttribute("class", "tweet-name-container");
    let tweetImageContainer = document.createElement("div");
    tweetImageContainer.setAttribute("class", "tweet-image-container");

    //TWEET NAME CONTAINER
      //tweet profile pic container
    let tweetPic = document.createElement("img");
    tweetPic.src = tweet.user.profile_image_url_https;
    tweetImageContainer.appendChild(tweetPic);
      //tweet name container
    let tweetName = document.createElement("h2");
    tweetName.innerHTML = tweet.user.name;
    let tweetUsername = document.createElement("p");
    tweetUsername.innerHTML = "@" + tweet.user.screen_name;
    tweetNameContainer.appendChild(tweetName);
    tweetNameContainer.appendChild(tweetUsername);

      //append tweet pic container and name container to tweet header
    tweetHeader.appendChild(tweetImageContainer);
    tweetHeader.appendChild(tweetNameContainer);

    // APPEND tweet header to tweetContainer
    tweetContainer.appendChild(tweetHeader);

    //TWEET TEXT CONTAINER
    let tweetText = document.createElement("p");
    tweetText.setAttribute("class", "tweet-text");
    tweetText.innerHTML = tweet.text;

    // APPEND TWEET TEXT TO TWEET CONTAINER
    tweetContainer.appendChild(tweetText);


    //TWEET DATE CONTAINER
    let tweetDate = document.createElement("p");
    tweetDate.setAttribute("class", "tweet-date");
    tweetDate.innerHTML = tweet.created_at;

    // APPEND TWEET DATE TO TWEET CONTAINER
    tweetContainer.appendChild(tweetDate);

    //TWEET STATS CONTAINER (RETWEETS, FAVORITES, LOCATION)
    let tweetStats = document.createElement("div");
    tweetStats.setAttribute("class", "tweet-stats");
      //retweet
    let retweetContainer = document.createElement("div");
    retweetContainer.setAttribute("class", "retweet-container");
    let retweetIcon = document.createElement("img");
    retweetIcon.src = "http://simpleicon.com/wp-content/uploads/retweet.png";
    let retweet = document.createElement("p");
    retweet.innerHTML = tweet.retweet_count;
    retweetContainer.appendChild(retweetIcon);
    retweetContainer.appendChild(retweet);
      //favorites
    let favoritesContainer = document.createElement("div");
    favoritesContainer.setAttribute("class", "favorites-container");
    let favIcon = document.createElement("img");
    favIcon.src = "http://www.clker.com/cliparts/H/Z/c/f/2/H/solid-dark-grey-heart-md.png";
    let favorites = document.createElement("p");
    favorites.innerHTML = tweet.favorite_count;
    favoritesContainer.appendChild(favIcon);
    favoritesContainer.appendChild(favorites);
      //location
    let location = document.createElement("p");
    location.innerHTML = tweet.user.location;

    tweetStats.appendChild(retweetContainer);
    tweetStats.appendChild(favoritesContainer);
    tweetStats.appendChild(location);

    // APPEND TWEET STATS TO TWEET CONTAINER
    tweetContainer.appendChild(tweetStats);
    return tweetContainer;
  }

  const renderPokemonOntoField = (pokemon, player) => {
    setTimeout(() => $("html, body").animate({ scrollTop: "0" }), 10);
    renderSpeechBubble(`${capitalize(pokemon.name)}, I choose you!`, player);
    generateHealthBar(player);

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

  const renderSpeechBubble = (text, player) => {

    let bubble = document.createElement("div");
    let background = document.getElementsByClassName('background-modal')[0];
    if (player === "player1"){
      $(".speech-bubble-p1").remove();
      bubble.setAttribute("class", "speech-bubble-p1");
    } else {
      $(".speech-bubble-p2").remove();
      bubble.setAttribute("class", "speech-bubble-p2");
    }
    setTimeout(() => background.removeChild(bubble), 3500);
    bubble.innerHTML = trimText(text);
    background.appendChild(bubble);
  }


  function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const trimText = (text) => {
    if (text.length > 60){
      text = text.slice(0, 50);
    }
    return text;
  }

});
