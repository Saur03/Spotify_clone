console.log("Welcome to Spotify")

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Cheques", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", songTime: "3:03" },
    { songName: "Still Rollin", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", songTime: "2:54" },
    { songName: "Dior", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", songTime: "2:19" },
    { songName: "Obsessed", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", songTime: "3:10" },
    { songName: "Burberry", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", songTime: "3:23" },
    { songName: "Chosen", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", songTime: "4:24" },
    { songName: "Dhakka", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", songTime: "4:06" },
    { songName: "Jatt Da Muqabala", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", songTime: "3:31" },
    { songName: "Ikk Kudi", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", songTime: "4:02" },
    { songName: "Patola", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", songTime: "3:34" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("songlistplay")[0].innerHTML = `<span class="timestamp" id="timestamp${i}">${songs[i].songTime}</span> <i id="${i}" class="far songItemPlay fa-play-circle"></i>`;
})

// handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// listen to events
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
