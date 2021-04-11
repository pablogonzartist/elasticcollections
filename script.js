// console.log("Is our script file working?");

// load the airtable library, call it "Airtable";
var Airtable = require("airtable");
// console.log(Airtable);

// use airtable library, connect to our base using API key
var base = new Airtable({ apiKey: "key1xdXqIxLKWtZEo" }).base("appZLkJVTmANCUSOY");

// get our collection base, select all the records
// specify functions that will receive the data
base("playlist").select({ maxRecords:100 }).eachPage(gotPageOfSongs, gotAllSongs);

// an empty array to hold our data
var songs = [];

//colors
const shuffle = document.querySelector('.shuffle')
const body = document.querySelector('html')
const colors = ['#FAE751', '#D84C46', '#87D9DF', '#D570BF', '#77C1A8', '#F6CA5A', '#AE36E7', '#f8961E']


//
// callback function that receives our data
function gotPageOfSongs(records, fetchNextPage) {
  console.log("gotPageOfSongs()");
  // add the records from this page to our array
  songs.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllSongs(err) {
    console.log("gotAllSongs()");

  // call functions to log and show the books
  try {
      showSongs();
  } catch (error) {
      console.error(error);}
} 


// look through our airtable data, create elements
function showSongs() {
  console.log("showSongs()");
  songs.forEach(song => {
    // create container for each song
    var songContainer = document.createElement("li");
    songContainer.classList.add("song-container");
    songContainer.classList.add("glide__slide");
    document.querySelector(".glide__slides").append(songContainer);

    // *add song titles*
   // var songTitle = document.createElement("h1");
   // songTitle.classList.add("song-title");
   // songTitle.innerText = song.fields.title;
   // songContainer.append(songTitle);

   // var nameOfArtist = document.createElement("h1");
   // nameOfArtist.classList.add("song-artist");
   // nameOfArtist.innerText = song.fields.artist;
   // songContainer.append(nameOfArtist);

   // var songDescription = document.createElement("p");
  //  songDescription.classList.add("song-description");
  //  songDescription.innerText = song.fields.description;
  //  songContainer.append(songDescription); 

    var songImage = document.createElement("img");
    songImage.classList.add("song-image");
    songImage.src = song.fields.image[0].url;
    songContainer.append(songImage);
    
    // add event listener to add active class to song container
    //songContainer.addEventListener("click", function(event) {
    //  songDescription.classList.toggle("active");
    //  songImage.classList.toggle("active");
   // });
  
    // get genre field from airtable
    // loop through the array and add each genre as
    // a class to the song container
  
   var songGenre = song.fields.genre;
    songGenre.forEach(function(genre) {
      songContainer.classList.add(genre.replace(' ', '-').toLowerCase());
     });
  
    // clicking on filter by pop
    // change background of pop genres to red
    // else change to white
    // var filterPop = document.querySelector(".pop");
    // filterPop.addEventListener("click", function() {
    //   if (songContainer.classList.contains("pop")) {
    //     songContainer.style.background = "red";
    //   } else {
    //     songContainer.style.background = "white";
    //   }
    // });
  
    // filter by indie music
    // var filterIndie = document.querySelector(".indie");
    // filterIndie.addEventListener("click", function() {
    //   if (songContainer.classList.contains("indie")) {
    //     songContainer.style.background = "red";
    //   } else {
    //     songContainer.style.background = "white";
    //   }
    // });
    
    // filter by shoegaze music
    // var filterShoegaze = document.querySelector(".shoegaze");
    // filterShoegaze.addEventListener("click", function() {
    //   if (songContainer.classList.contains("shoegaze")) {
    //     songContainer.style.background = "red";
    //   } else {
    //     songContainer.style.background = "white";
    //   }
    // });
  
    // filter reset
    // var filterReset = document.querySelector(".js-reset");
    // filterReset.addEventListener("click", function() {
    //   songContainer.style.background = "white";
    // });
  });


  const config = {
		type: 'carousel',
		perView: 5,
	}
  var carousel =  new Glide('.glide', config).mount();
  
  //carousel.go(Math.floor(Math.random()*100))

  document.querySelector('.shuffle').addEventListener('click', function () {
  var shuffle = (Math.floor(Math.random()*100));
   carousel.go(`=${shuffle}`)
  })

// COLOR inspired by https://github.com/JS-Beginners/project_change_color_background/blob/master/js/script.js
body.style.backgroundColor = 'violet'
shuffle.addEventListener('click', changeBackground)
function changeBackground(){
  const colorIndex= parseInt(Math.random()*colors.length)
  body.style.backgroundColor = colors[colorIndex]
  }
}



// GLIDE HERE 


//MUSIC HERE



//This will play a random sound
//function playRandomSound(){

  //An array to house all of the URLs of your sounds
 // var sounds = [ "https://drive.google.com/file/d/1l7InzlsQyiTm4mH2nbe2OffMJ4Qc8-lp"];
  
  //This line will select a random sound to play out of your provided URLS
 // var soundFile = sounds[Math.floor(Math.random()*sounds.length)];
  
  //Find the player element that you created and generate an embed file to play the sound within it
  //document.getElementById("shuffle").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
//}

//code found here: https://www.codegrepper.com/code-examples/javascript/javascript+play+sound+onclick

//var audiotrack = ["../songlist/flashing.mp3"];

//shuffle.onclick = function() {
//const audiorandom= parseInt(Math.random()*audiotrack.length)
//new Audio(audiorandom).play();
//}



//var playlist = ["../songlist/flashing.mp3"];
//var audioTrack = new Audio(playlist);

//shuffle.onclick = function() {
// const audiorandom= parseInt(Math.random()*audioTrack.length)
//  audioTrack.play();
//}

var lastSong = null;
    var selection = null;
    var playlist = ["songlist/flashing.mp3", "songlist/godschariots.mp3", "songlist/sonnets.mp3", "songlist/vastness.mp3", "songlist/prayer.mp3", "songlist/waterfrontfrank.mp3", "songlist/landslide.mp3", "songlist/nomeconoces.mp3", "songlist/guy.mp3", "songlist/tohaveandnottohold.mp3"]; // List of songs
    var player = document.getElementById("audioplayer"); // Get audio element
    player.autoplay=true;
    player.addEventListener("ended", selectRandom); // Run function when the song ends

    function selectRandom(){
        while(selection == lastSong){ // Repeat until a different song is selected
            selection = Math.floor(Math.random() * playlist.length);
        }
        lastSong = selection; // Remember the last song
        player.src = playlist[selection]; // Tell HTML the location of the new song
    }

  
    shuffle.onclick = function() {
      selectRandom(); // Select initial song
    player.play(); } // Start song 