'use strict'
const audioParas = document.querySelectorAll('.audio-p');
const audioPlayers = document.querySelectorAll('.audio-play');
let currentAudio = null;

audioPlayers.forEach(audioPlayer => {
    audioPlayer.volume = 0.2;
});

audioParas.forEach((audioPara, index) => {
    audioPara.addEventListener('click', function() {
        const clickedAudio = audioPlayers[index];
        if (clickedAudio.paused) {
            if (currentAudio && currentAudio !== clickedAudio) {
                currentAudio.pause();
            }
            clickedAudio.play();
            currentAudio = clickedAudio;
            updateCurrentAudioHighlight(index);
        } else {
            clickedAudio.pause();
            currentAudio = null;
            audioPara.classList.remove('green');
        }
    });
});

const playButton = document.querySelector('.play');

playButton.addEventListener('click', function() {
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
        } else {
            currentAudio.pause();
        }
    } else {
        const randomIndex = Math.floor(Math.random() * audioPlayers.length);
        const randomAudio = audioPlayers[randomIndex];
        if (currentAudio && currentAudio !== randomAudio) {
            currentAudio.pause();
            audioParas.forEach((audioPara) => {
                audioPara.classList.remove('green');
            });
        }
        currentAudio = randomAudio;
        currentAudio.currentTime = 0;
        randomAudio.play();
        updateCurrentAudioHighlight(randomIndex);
    }
});

const volumeInput = document.querySelector('#music-volume');

volumeInput.addEventListener('input', function() {
    if (currentAudio) {
        const volume = this.value / 100;
        currentAudio.volume = volume;
    }
});

const previousSong = document.querySelector('.previous');

previousSong.addEventListener('click', function() {
    if (currentAudio) {
        let currentIndex = Array.from(audioPlayers).indexOf(currentAudio);
        let previousIndex = currentIndex - 1;

        if (previousIndex >= 0) {
            const previousAudio = audioPlayers[previousIndex];
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = previousAudio;
            currentAudio.play();
            updateCurrentAudioHighlight(previousIndex);
        }
    }
});

const nextSong = document.querySelector('.next');

nextSong.addEventListener('click', function() {
    if (currentAudio) {
        let currentIndex = Array.from(audioPlayers).indexOf(currentAudio);
        let nextIndex = currentIndex + 1;

        if (nextIndex < audioPlayers.length) {
            const nextAudio = audioPlayers[nextIndex];
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = nextAudio;
            currentAudio.play();
            updateCurrentAudioHighlight(nextIndex);
        }
    }
});

function updateCurrentAudioHighlight(index) {
    audioParas.forEach((audioPara) => {
        audioPara.classList.remove('green');
    });
    audioParas[index].classList.add('green');
}

const userName = document.getElementById('name');
const userComment = document.getElementById('comment');
const sendBtn = document.querySelector('.btn');
const commentForm = document.getElementById('comment-form');
const chatArea = document.querySelector('.chat-box');

sendBtn.addEventListener('click', function(event) {
    event.preventDefault();

    let name = userName.value.trim();
    let comment = userComment.value.trim();

    if(name !== '' && comment !== '') {
        const newComment = document.createElement('div');
        newComment.classList.add('comment-item');
        newComment.innerHTML = `${name}: ${comment}`;

        chatArea.appendChild(newComment);
        saveComment(newComment);

        chatArea.scrollTop = chatArea.scrollHeight;

        userName.value = '';
        userComment.value = '';
    }
});

function saveComment(message) {
    localStorage.setItem('chatMessage', JSON.stringify(message));
}

function loadMessage() {
    const messages = localStorage.getItem('chatMessage');
    return JSON.parse(messages);
}

document.addEventListener('DOMContentLoaded', function() {
    const existMessages = loadMessage();
    if (existMessages) {
        existMessages.forEach(function(comment) {
            displayMessage(comment);
        }); 
    }
});
