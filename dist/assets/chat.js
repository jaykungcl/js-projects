"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// adding new chat documents
//setting up a real-time listtener to get new chats
var Chatroom = /*#__PURE__*/function () {
  function Chatroom(room, username) {
    _classCallCheck(this, Chatroom);

    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }

  _createClass(Chatroom, [{
    key: "addChat",
    value: function () {
      var _addChat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {
        var now, chat, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // format a chat object
                now = new Date();
                chat = {
                  message: message,
                  username: this.username,
                  room: this.room,
                  created_at: firebase.firestore.Timestamp.fromDate(now)
                }; // save the chat document

                _context.next = 4;
                return this.chats.add(chat);

              case 4:
                response = _context.sent;
                return _context.abrupt("return", response);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addChat(_x) {
        return _addChat.apply(this, arguments);
      }

      return addChat;
    }()
  }, {
    key: "getChats",
    value: function getChats(callback) {
      this.unsub = this.chats.where('room', '==', this.room).orderBy('created_at').onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            // update UI
            callback(change.doc.data());
          }
        });
      });
    }
  }, {
    key: "updateName",
    value: function updateName(username) {
      this.username = username;
      localStorage.setItem('username', username);
    }
  }, {
    key: "updateRoom",
    value: function updateRoom(room) {
      this.room = room;
      console.log('room updated');

      if (this.unsub) {
        this.unsub();
      }
    }
  }]);

  return Chatroom;
}();
