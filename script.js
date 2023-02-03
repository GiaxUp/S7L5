const linkAPI = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

// Funzione per pescare quattro canzoni partendo da una chiamata verso l'API con una query diversa ogni volta
const generateSongs = async function (song) {
  try {
    let generatedSong = await fetch(song);
    if (generatedSong.ok) {
      let arraySongs = await generatedSong.json();
      let currentSongs = arraySongs.data[0];
      const {
        artist: { name },
      } = currentSongs;
      const {
        album: { cover_big },
      } = currentSongs;
      let firstRow = document.getElementById("firstRow");
      firstRow.innerHTML =
        firstRow.innerHTML +
        `
            <div class="col-12 col-md-6 col-lg-3 my-4">
            <div class="card mb-2 border border-warning rounded shadow p-4">
            <img src="${cover_big}"class="card-img-top rounded">
            <div class="card-body">
            <h5 class="card-title mt-1">${currentSongs.title}</h5>
            <p class="card-text">${name}</p>
            </div>
            </div>
            </div>
            `;
    }
  } catch (error) {
    console.log(error);
  }
};
generateSongs(linkAPI + `Second%Chances%Imagine%Dragons`);
generateSongs(linkAPI + `Brivido%Marracash`);
generateSongs(linkAPI + `Praise%Gunna`);
generateSongs(linkAPI + `Lucifero%Nitro`);

// Funzione per pescare una canzone e restituirla con una card più grande
const favSong = async function (song) {
  try {
    let generatedSong = await fetch(song);
    if (generatedSong.ok) {
      let arraySongs = await generatedSong.json();
      let currentSongs = arraySongs.data[0];
      const {
        artist: { name },
      } = currentSongs;
      const {
        album: { cover_big },
      } = currentSongs;
      let secondRow = document.getElementById("secondRow");
      secondRow.innerHTML =
        secondRow.innerHTML +
        `
        <div class="d-flex justify-content-center">
            <div class="card mb-2 border border-warning rounded shadow p-4">
            <img src="${cover_big}"class="card-img-top rounded">
            <div class="card-body">
            <h5 class="card-title mt-1">${currentSongs.title}</h5>
            <p class="card-text">${name}</p>
            <audio class="w-100" controls src="${currentSongs.preview}"></audio>
            </div>
            </div>
            </div>
            `;
    }
  } catch (error) {
    console.log(error);
  }
};

favSong(linkAPI + `Radioactive`);

// Funzione per decidere i tre album dentro al carosello
const carouselAlbums = async function (song) {
  try {
    let favAlbums = await fetch(song);
    if (favAlbums.ok) {
      let ArrayOfSongs = await favAlbums.json();
      let Currentsong = ArrayOfSongs.data[0];
      const {
        album: { cover_big },
      } = Currentsong;
      const {
        artist: { name },
      } = Currentsong;
      let carousel = document.getElementById("carousel");
      carousel.innerHTML =
        carousel.innerHTML +
        `
        <div class="carousel-item active">
              <img src="${cover_big}"class="card-img-top rounded"/>
              <div class="carousel-caption d-none d-md-block">
              <h5 class="card-title mt-1">${Currentsong.title}</h5>
              <p class="card-text">${name}</p>
            </div>`;
    }
  } catch (error) {
    console.log(error);
  }
};

carouselAlbums(linkAPI + `KSI%All%Over`);
carouselAlbums(linkAPI + `Kid%Cudi%Man%On%The%Moon`);
carouselAlbums(linkAPI + `Meteora%Linkin%Park`);

// Funzione per restituire un alert con sotto tutte le canzoni degli Imagine Dragons presenti nell'API ordinate per rank in ordine crescente
async function getSongsByRank() {
  try {
    const response = await fetch(linkAPI + `Imagine%20Dragons`);
    const data = await response.json();
    const songs = data.data;
    const sortedSongs = songs.sort((a, b) => a.rank - b.rank);
    alert(`Songs by rank: ${sortedSongs.map((song) => song.title).join(", ")}`);
  } catch (error) {
    console.error(error);
  }
}

// Funzione per restituire un alert con sotto tutte le canzoni degli Imagine Dragons presenti nell'API ordinate alfabeticamente
async function allSongs() {
  try {
    const response = await fetch(linkAPI + `Imagine%20Dragons`);
    const data = await response.json();
    const albums = data.data.reduce((acc, song) => {
      if (!acc[song.album.title]) {
        acc[song.album.title] = [];
      }
      acc[song.album.title].push(song.title);
      return acc;
    }, {});

    const sortedAlbums = Object.keys(albums).sort();
    let allSongs = "";
    for (const album of sortedAlbums) {
      allSongs += `Album: ${album}\nSongs: ${albums[album].join(", ")}\n\n`;
    }
    alert(allSongs);
  } catch (error) {
    console.error(error);
  }
}
