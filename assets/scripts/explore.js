// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const voiceSelect = document.getElementById("voice-select");
  let voices = [];
  function populateVoiceList() {
    voices = synth.getVoices();
    for (let i = 0; i < voices.length ; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  const inputTxt = document.getElementById("text-to-speak");
  const smile = document.querySelector('img[alt="Smiling face"]');
  function speak(inputTxt) {  
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    utterThis.text = inputTxt;
    for (let i = 0; i < voices.length ; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
    utterThis.addEventListener('end', (event) =>
    {
      smile.src = 'assets/images/smiling.png';
    });
  }
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  const button = document.querySelector("button");
  button.addEventListener('click', (event) => {
      smile.src = 'assets/images/smiling-open.png';
      speak(inputTxt.value);
  });
}