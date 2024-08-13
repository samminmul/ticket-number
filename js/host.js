const h1 = document.getElementById('text')
const socketClient = io("ws://localhost:3000");
const input = document.getElementById("input");

let number = 0;

input.addEventListener("input", function(e) {
  document.getElementById('btn1').innerHTML = `${e.target.value}번 호출하기 (현재 입력 번호)`
})

function getInputBoxNumber(){
  return Number(document.getElementById('input').value);
}

function numberSet(){
  number = getInputBoxNumber();
  onChangeNumber();
}

function numberUp(){
  number++;
  onChangeNumber();
}

function onChangeNumber(){
  h1.innerHTML = `현재 호출번호 : ${number}`
  // 소켓서버에 호출 채널로 number 보내기
  socketClient.emit('호출', number)
  // 버튼 텍스트 수정
  
  document.getElementById('btn2').innerHTML = `${number+1}번 호출하기 (다음 번호)`
}
