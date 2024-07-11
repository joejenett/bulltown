const $trackList = document.querySelector('.track-list');
let $nowPlaying = document.querySelector('.now-playing');
let $controls = document.querySelector('.controls');
let $btnPlay = document.querySelector('.lucide-play');
let $btnPause = document.querySelector('.lucide-pause');

const $volumeUnMuted = document.querySelector('.lucide-volume-1');
const $volumeMuted = document.querySelector('.lucide-volume-x');
const $volumeSlider = document.querySelector('.volume-slider');
const $timer = document.querySelector('.timer');

let $audio = document.querySelector('#audio');
let volume = .6;
$audio.volume = volume;

let tracks = trackObject.tracks;
let trackIndex = null;

window.addEventListener('load', function (e) {
  renderTracksWithIds()
});

$controls.addEventListener('click', function (event) {
  let targetclass = event.target.className;
  let checks = ['controls', 'volume-slider', 'timer']
  if (!checks.includes(targetclass)) {
    let target = event.target.closest('svg');
    let type = target.classList[1].split('-').slice(1).join('-');
    switch (type) {
      case 'play':
        play();
        break;
      case 'pause':
        pause();
        break;
      case 'volume-1': case 'volume-x':
        toggleMute();
        break;
      case 'skip-forward':
        playNextTrack();
        break;
      case 'skip-back':
        playPreviousTrack();
        break;
      case 'shuffle':
        shuffle();
        break;
    }
  }
});

$trackList.addEventListener('click', function (event) {
  // The check is in case people click and drag the list, for some reason.
  if (event.target.className !== 'track-list') {
    let selected_id = event.target.classList[1].split('-')[1];
    trackIndex = selected_id - 1;
    changeSelectedTrack(event.target);
    $audio.setAttribute('src', tracks[trackIndex].link);
    play();
  }
});

document.addEventListener("keyup", function (event) {
  event.preventDefault();
  const key = event.key;
  if (event.ctrlKey) {
    switch (key) {
      case "ArrowLeft":
        playPreviousTrack();
        break;
      case "ArrowRight":
        playNextTrack();
        break;
      case "ArrowUp":
        if (audio.volume <= .95) {
          $audio.volume += .05
          $volumeSlider.value = $audio.volume * 100;
        }
        break;
      case "ArrowDown":
        if (audio.volume >= .05) {
          $audio.volume -= .05
          $volumeSlider.value = $audio.volume * 100;
        }
        break;
    }
  } else if (trackIndex !== null) {
    switch (key) {
      case "ArrowLeft":
        $audio.currentTime -= 10;
        if ($audio.currentTime <= 0)
          playPreviousTrack();
        break;
      case "ArrowRight":
        $audio.currentTime += Math.max($audio.duration / 8, 15);
        break;
    }
  }
});

$volumeSlider.addEventListener('change', function (event) {
  volume = event.target.value / 100
  if ($volumeMuted.classList.contains('hidden'))
    $audio.volume = volume;
});

$audio.ontimeupdate = () => {
  $timer.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
};

$audio.onended = () => {
  playNextTrack();
}

function appendTrackToList(track) {
  let $div = document.createElement('div');
  $div.className = `track t-${track.id}`;
  if (track.name.includes(' - ')) {
    $div.textContent = track.name.split(' - ').slice(1).join('-')
  } else {
    $div.textContent = track.name;
  }
  $trackList.appendChild($div);
}

function renderTracksWithIds() {
  for (let i = 0; i < tracks.length; i++) {
    if (tracks[i].id)
      delete tracks[i].id;
    tracks[i].id = i + 1;
  }
  for (let track of tracks) {
    appendTrackToList(track);
  }
}

function play() {
  if (trackIndex === null) {
    trackIndex = -1;
    playNextTrack();
  }
  else {
    $audio.play();
  }
  $btnPlay.classList.add('hidden');
  $btnPause.classList.remove('hidden');
}

function pause() {
  $audio.pause();
  $btnPlay.classList.remove('hidden');
  $btnPause.classList.add('hidden');
}

function shuffle() {
  if (trackIndex === null) {
    scrambleTrackOrder();
    play();
  } else {
    let currentPlaying = tracks.splice(trackIndex, 1)
    scrambleTrackOrder();
    tracks.unshift(currentPlaying[0]);
  }

  while ($trackList.firstChild) {
    $trackList.firstChild.remove();
  }
  renderTracksWithIds()
  trackIndex = 0;
  $firsttrack = document.querySelector('.t-1');
  changeSelectedTrack($firsttrack);
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function scrambleTrackOrder() {
  let randomIndex;
  let shuffleIndex = tracks.length;
  while (shuffleIndex != 0) {
    randomIndex = Math.floor(Math.random() * shuffleIndex);
    shuffleIndex--;
    [tracks[shuffleIndex], tracks[randomIndex]] = [
      tracks[randomIndex], tracks[shuffleIndex]];
  }
}

function toggleMute() {
  if ($volumeMuted.classList.contains('hidden')) {
    $audio.volume = 0;
  } else {
    $audio.volume = volume;
  }
  $volumeMuted.classList.toggle('hidden');
  $volumeUnMuted.classList.toggle('hidden');
}

function changeSelectedTrack(target) {
  clearSelectedTrack();
  target.classList.add('selected-track');
  document.title = tracks[trackIndex].name;
  $nowPlaying.textContent = `${tracks[trackIndex].name} - by ${tracks[trackIndex].author}`;
}

function clearSelectedTrack() {
  const $existingSelected = document.querySelector('.selected-track')
  if ($existingSelected)
    $existingSelected.classList.remove('selected-track');
}

function setPlayerInactive() {
  $nowPlaying.textContent = 'currently not playing any track';
  $timer.textContent = '0:00 / 0:00';
  trackIndex = null;
  clearSelectedTrack();
  document.title = 'bulltown.2022 \| music by joe jenett';
  $audio.setAttribute('src', "");
  pause();
}

function playNextTrack() {
  if (trackIndex === null)
    trackIndex = -1;
  trackIndex++;
  let $newTrack = document.querySelector(`.t-${trackIndex + 1}`);
  if ($newTrack) {
    changeSelectedTrack($newTrack);
    $audio.setAttribute('src', tracks[trackIndex].link);
    play();
  } else {
    setPlayerInactive();
  }
}

function playPreviousTrack() {
  if (trackIndex !== null) {
    if ($audio.currentTime > 3) {
      $audio.currentTime = 0;
    } else {
      trackIndex--;
      let $newTrack = document.querySelector(`.t-${trackIndex + 1}`);
      if ($newTrack) {
        changeSelectedTrack($newTrack);
        $audio.setAttribute('src', tracks[trackIndex].link);
        play();
      } else {
        setPlayerInactive();
      }
    }
  }
}

function formatTime(seconds) {
  seconds = ~~seconds;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
    .filter(a => a)
    .join(':')
}
