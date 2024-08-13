const path = require('path');
const express = require('express')
const app = express();
const http = require('http').createServer(app);

app.use(express.static(path.join(__dirname, '/')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.get('/host', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'host.html'));
});

const io = require('socket.io')(http);

io.on('connection', (socket) => {

  socket.on('호출', (number) => {
    //console.log(number)
    io.emit('호출', number)
  });
  
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

/*
호스트에서 번호 불러
-> 클라이언트쪽 모니터에서 번호를 띄워


현재 번호: n
부를 번호 입력: [ aaa]
[버튼1: aaa 호출] <- n을 aaa로 바꿀거?ㅇㅇ
[버튼2: n+1 호출]
[버튼3: n 호출]
 */

// 서버 실행 : npm start