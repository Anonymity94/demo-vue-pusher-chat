/* eslint-disable no-unused-vars */
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import moment from 'moment';
import store from './store/index';

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser = null;
let activeRoom = null;

async function connectUser(userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_URL }),
    userId,
  });

  console.log('chatManager', chatManager);
  currentUser = await chatManager.connect();
  return currentUser;
}

function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state,
  }));
  console.log('members', members);
  store.commit('setUsers', members);
}

/**
 * 进入某个聊天室
 * @param {String} roomId 聊天室ID
 * @see: https://pusher.com/docs/chatkit/reference/javascript#subscriptions
 */
async function subscribeToRoom(roomId) {
  store.commit('clearChatRoom');
  activeRoom = await currentUser.subscribeToRoomMultipart({
    roomId,
    messageLimit: MESSAGE_LIMIT,
    hooks: {
      onMessage: message => {
        console.log('message', message);
        store.commit('addMessage', {
          name: message.sender.name,
          username: message.senderId,
          text: message.parts[0].payload.content,
          date: moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        });
      },
      // 房间内的成员上线或下线
      onPresenceChanged: () => {
        setMembers();
      },
      // 用户开始打字
      onUserStartedTyping: user => {
        store.commit('setUserTyping', user.id);
      },
      // 用户停止打字
      onUserStoppedTyping: () => {
        store.commit('setUserTyping', null);
      },
    },
  });

  setMembers();
  return activeRoom;
}

async function sendMessage(text) {
  const messageId = await currentUser.sendMessage({
    text,
    roomId: activeRoom.id,
  });
  return messageId;
}

export function isTyping(roomId) {
  currentUser.isTypingIn({ roomId });
}

function disconnectUser() {
  currentUser.disconnect();
}

export default {
  connectUser,
  subscribeToRoom,
  sendMessage,
  isTyping,
  disconnectUser,
};
