'use strict';

var messages = document.getElementById('messages');
var sendButton = document.getElementById('send-btn');

sendButton.addEventListener('click', sendUserMessage);

getMessagesFromServer();


function start(){
  setInterval(getMessagesfromServer, 500);
}
  //Шаг 1:
//Получить сообщения с сервера
async function getMessagesFromServer()
{
  var response = await fetch('https://fchatiavi.herokuapp.com/get/arick/?offset=0&limit=200');
  response = await response.json();
  var allMessagesHtml = '';

  for(var i = 0; i < response.length; i++)
  {
    var messageData = response[i];
    console.log(messageData);
    var message = '<div class="message"><div class="message-nickname">'+messageData.Name+'</div><div class="message-text">'+messageData.Message+'</div></div>';
    allMessagesHtml = allMessagesHtml + message;
  }
  messages.innerHTML = allMessagesHtml;
}
//Создать верстку меседжа
//Добавить в masseges-wrapen письма.

//Получить что написал пользователь в поле nickname
async function sendUserMessage(){

  var userNickname = document.getElementById('nickname-input').value;
  var userMessage = document.getElementById('message-input').value;

  if(userNickname.length===0){
    alert("Ты должен ввести имя!");
    return;
  }
  if(userMessage.length===0){
    alert("Ты должен ввести сообщение!");
    return
  }
  await fetch('https://fchatiavi.herokuapp.com/send/arick/',{
    method:'POST',
    body:JSON.stringify({
      Name: userNickname,
      Message: userMessage
    })
  });
  getMessagesFromServer();
}
//Получить что написал пользователь в поле massage
//По нажатию на кнопку отправить отправить на сервер nickname:massage и сделать шаг 1.
