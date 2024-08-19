const socketClient = io("ws://thinkode.kr:3000");
var audio = new Audio();
audio.src = "../sound/Ding1s.mp3";
// audio.volume = 0.5;
//audio.duration = 0.6;

function ReadOneNumber(number0to9, suffix){
  const read = "영일이삼사오육칠팔구";
  if (number0to9 === 0) {
    return "";
  }
  if (suffix === "") {
    return read[number0to9];
  }
  if (number0to9 === 1) {
    return suffix;
  }
  return read[number0to9] + suffix;
}

function ReadNumber(number){ //숫자가 천의 자리를 넘는다면 지구멸망함
  let thousand = parseInt(number / 1000);
  let hundred = parseInt(number / 100) % 10;
  let ten = parseInt(number / 10) % 100;
  let one = number % 10;

  let read = ReadOneNumber(thousand, "천") + 
            ReadOneNumber(hundred, "백") + 
            ReadOneNumber(ten, "십") + 
            ReadOneNumber(one, "")
  
  return read;
}

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
      `${ReadNumber(number)} 번 대기자, 2층 본교무실로 오세요`
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
