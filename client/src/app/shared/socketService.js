import io from 'socket.io-client';
import { serverUrl } from './config';
import WebStorageService from './webStorageService';
import * as profileActions from './../containers/profile/profileActions';
import * as eventDetailsActions from './../containers/event-details/eventDetailsActions';

let socket;

const connectHandler = () => socket.emit('authenticate', { socketId: socket.id, token: WebStorageService.getJwt() });

export const socketDisconnect = () => socket.emit('socketDisconnect');

export const messageToServer = ({ roomId, message }) => { if (socket) socket.emit('messageToServer', { roomId, message }); };

export const enterLeaveRoom = data => { if (socket) socket.emit('enterLeaveRoom', data); };

const messageToClientHandler = data => {
  window.store.dispatch(profileActions.newMessage(data));
  window.store.dispatch(eventDetailsActions.eventNewMessage(data));
};

export const initSocketService = () => {
  socket = io(serverUrl);

  socket.on('connect', connectHandler);

  socket.on('messageToClient', messageToClientHandler);
};
