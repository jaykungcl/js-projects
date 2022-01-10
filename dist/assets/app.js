"use strict";

// dom queries
var chatList = document.querySelector('.chat-list');
var newChatForm = document.querySelector('.new-chat');
var newNameForm = document.querySelector('.new-name');
var updateMssg = document.querySelector('.update-mssg');
var chatRooms = document.querySelector('.chat-rooms'); // add new chat

newChatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var message = newChatForm.message.value.trim();
  chatroom.addChat(message).then(function () {
    return newChatForm.reset();
  })["catch"](function (err) {
    return console.log(err);
  });
}); // update username

newNameForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var newName = newNameForm.name.value.trim();
  chatroom.updateName(newName); // reset form

  newNameForm.reset(); // show then hide update message

  updateMssg.innerText = "Your name was updated to ".concat(newName);
  setTimeout(function () {
    return updateMssg.innerText = '';
  }, 3000);
}); // update chat room

chatRooms.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(function (chat) {
      return chatUI.render(chat);
    });
  }
}); // check local storage for a name

var username = localStorage.username ? localStorage.username : 'anonymous'; // class instances

var chatUI = new ChatUI(chatList);
var chatroom = new Chatroom('general', 'anonymous'); // get chats and render

chatroom.getChats(function (data) {
  return chatUI.render(data);
});
