const socketClient = io("ws://thinkode.kr:3000");
var audio = new Audio();
audio.src = '../sound/Ding1s.mp3'
// audio.volume = 0.5;
//audio.duration = 0.6;

socketClient.on('호출', (number) => {
  console.log(number);
  document.getElementById('number').innerHTML = `${number}번님이 호출되었습니다.`;
  audio.currentTime = 0;
  audio.play();
})

