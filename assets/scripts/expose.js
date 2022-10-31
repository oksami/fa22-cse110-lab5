// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.getElementById("horn-select");
  const audios = document.getElementsByClassName("hidden");
  hornSelect.addEventListener('change', (event) => {
    const images = document.querySelector('img[alt="No image selected"]');
    images.src = `assets/images/${event.target.value}.svg`;
    audios.src=`assets/audio/${event.target.value}.mp3`;
  });
  const volControl = document.getElementById("volume");
  volControl.addEventListener('input', (event) => {
    const volImg = document.querySelector('img[alt="Volume level 2"]');
    volControl.value = event.target.value;
    if(volControl.value == 0){
      volImg.src="assets/icons/volume-level-0.svg";
    }
    if(volControl.value >= 1 && volControl.value < 33){
      volImg.src="assets/icons/volume-level-1.svg";
    }
    if(volControl.value >= 33 && volControl.value < 67){
      volImg.src="assets/icons/volume-level-2.svg";
    }
    if(volControl.value >= 67){
      volImg.src="assets/icons/volume-level-3.svg";
    }
  });
  const button = document.querySelector("button");
  const jsConfetti = new JSConfetti();
  button.addEventListener('click', (event) => {
    const audio = new Audio(audios.src);
    audio.volume = volControl.value/100;
    audio.play();
    if (audios.src == "assets/audio/party-horn.mp3") {
      jsConfetti.addConfetti();
    }
  });
}