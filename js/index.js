const socketClient = io("ws://localhost:3000");
var audio = new Audio();
audio.src = '../sound/Ding1s.mp3'
// audio.volume = 0.5;
//audio.duration = 0.6;

socketClient.on('호출', (number) => {
  console.log(number);
  document.getElementById('number').innerHTML = `${number}번`;
  document.getElementById('text').innerHTML = '2층 본교무실로 오세요';
  audio.currentTime = 0;
  audio.play();
})

