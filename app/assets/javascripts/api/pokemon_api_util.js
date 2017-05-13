document.addEventListener("DOMContentLoaded", function(e){
console.log("dom is fully loaded, pokemon util running");

// const canvas = d3.select("body").append("svg").attr("width", 1000).attr("height", 1000);

let pokemon = [];
let currentTeam = [];
let opponentTeam = [];
let onP1 = null;
let currentPokemonP1 = null;
let currentPokemonP2 = null;
let currentPokemonP1Tweets = null;
let currentPokemonP2Tweets = null;
let currentRandomTweets = null;
let currentTweetScores = null;
let currentPokemonInfo;
let currentGifs;

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
    }).then((info) => currentPokemonInfo = info);
  }

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
    setTimeout(() => $("html, body").animate({ scrollTop: "1000px" }), 6000);
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
    setTimeout(() => $("html, body").animate({ scrollTop: "0px" }), 2000);
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
      fetchPokemon(pokemon['id']);
      currentPokemonP1 = pokemon;
      fetchPokemonTweets(pokemon).then((tweetsP1) =>
      {
        currentPokemonP1Tweets = tweetsP1.tweets;
        renderTweetOptions(tweetsP1.tweets);
      });
      renderPokemonOntoField(pokemon, "player1");
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
    // randomTweets.forEach((tweet) => {
    //   let tweetItem = renderTweet(tweet);
    //   optionsContainer.appendChild(tweetItem);
    // });

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
    fetchTweetTones(tweet).then((scores) =>
    {
      currentTweetScores = scores
      let emotion = calcScore(scores);
      executeAttack(emotion);
     }
    );
  }

  const executeAttack = (emotion) => {
    let pokeMoves = currentPokemonInfo.moves;
    let move;

    if (emotion === "anger"){
      let idx = Math.floor(Math.random() * 30);
      move = pokeMoves[idx].move.name;
    } else if (emotion === "disgust"){
      move = "weird";
    } else if (emotion === "fear"){
      move = "scared";
    } else if (emotion === "joy"){
      let idx = Math.floor(Math.random() * 30);
      move = pokeMoves[idx].move.name;
    } else if (emotion === "sadness"){
      move = "cry";
    }
    console.log(currentPokemonInfo);

    fetchGif(currentPokemonP1['name'], move).then(() => renderAttack(move))
  }

  const selectRandomGif = (gifs) => {
    let idx = Math.floor(Math.random() * gifs.length);
    return gifs[idx];
  }


  const renderAttack = (move) => {
    let attackMessage = document.createElement("div");
    let background = document.getElementsByClassName("background-modal")[0];
    attackMessage.setAttribute("class", "attack-message");
    attackMessage.innerHTML = `${currentPokemonP1['name']} uses ${move}!`;

    $("html, body").animate({ scrollTop: "0px" });
    background.appendChild(attackMessage);
    let randomGif = selectRandomGif(currentGifs.data);
    
    let gif = document.createElement("img");
    gif.setAttribute("class", "pokemon-gif");
    let url = "https://media.giphy.com/media/" + randomGif.embed_url.slice(23) + "/giphy.gif";

    gif.src = url;
    background.appendChild(gif);
    setTimeout(() => background.removeChild(gif), 5000);
    setTimeout(() => background.removeChild(attackMessage), 5000);
  }



  const calcScore = (score) => {
    let tweetScores = score.scores;

    let highest = 0;

    let anger = tweetScores.anger.score;

    if (anger > highest) {
      highest = "anger";
    }

    let disgust = tweetScores.disgust.score;

    if (disgust > highest){
      highest = "disgust"
    }

    let fear = tweetScores.fear.score;

    if (fear > highest) {
      highest = "fear";
    }

    let joy = tweetScores.joy.score;

    if (joy > highest) {
      highest = "joy";
    }

    let sadness = tweetScores.sadness.score;

    if (sadness > highest){
      highest = "sadness";
    }
    return highest
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
