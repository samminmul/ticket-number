const socketClient = io("ws://localhost:3000");
var audio = new Audio();
audio.src = "../sound/Ding1s.mp3";
// audio.volume = 0.5;
//audio.duration = 0.6;

socketClient.on("호출", (number) => {
  console.log(number);
  document.getElementById("number").innerHTML = `${number}번`;
  document.getElementById("text").innerHTML = "2층 본교무실로 오세요";
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => {
    const voices = speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = speechSynthesis.getVoices();
    }
    const lang = "ko-KR";
    const utterThis = new SpeechSynthesisUtterance(
      `${number} 번 대기자, 2층 본교무실로 오세요`
    );
    const rate = 0.8;
    utterThis.lang = lang;
    utterThis.rate = rate;
    const kor_voice = voices.find(
      (elem) => elem.lang === lang || elem.lang === lang.replace("-", "_")
    );
    if (kor_voice) {
      utterThis.voice = kor_voice;
    } else {
      console.error("No voice found for the given language.");
      return;
    }
    speechSynthesis.speak(utterThis);
  }, 1000);
});
