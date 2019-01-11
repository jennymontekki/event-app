import * as profileConstants from './profileConstants';

const initialState = {
  rooms: [],
  messages: [],
  messagesCount: 0
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileConstants.ACTION_FETCH_MESSAGES_SUCCESS:
      return { ...state, messages: action.payload.messages, messagesCount: action.payload.messagesCount };

    case profileConstants.ACTION_DELETE_MESSAGE_SUCCESS:
      return { ...state, messages: [...state.messages.filter(message => message.id !== action.payload)], messagesCount: state.messagesCount - 1 };

    case profileConstants.ACTION_NEW_MESSAGE:
      if (typeof state.rooms.find(room => room === action.payload.roomId) !== 'undefined')
        return { ...state, rooms: [...state.rooms, action.payload.roomId] };

      return state;

    default:
      return state;
  }
};

export default profileReducer;
