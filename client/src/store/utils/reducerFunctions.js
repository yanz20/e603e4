export const addAllConvosToStore = (conversations) => {
  let allConversations = [...conversations];
  allConversations.map(convo => {
    const msgLength = convo.messages.length
    if (msgLength > 0) {
      convo.messages.reverse();
      convo.isRead = convo.messages[msgLength - 1].senderId !== convo.otherUser.id || convo.messages[msgLength - 1].read;
    };
  });
  return allConversations;
};

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      let tempConvo = {...convo}
      tempConvo.messages = [...convo.messages, message];
      tempConvo.latestMessageText = message.text;
      return tempConvo;
    } else {
      return convo;
    }
  });
};

export const updateConversation = (state, newConvo) => {
  return state.map((convo) => {
    if (convo.id === newConvo.id) {
      const convoCopy = { ...convo };
      convoCopy.messages = newConvo.messages;
      convoCopy.isRead = true;
      return convoCopy;
    } else {
      return convo;
    }
  })
}

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      let tempConvo = {...convo}
      tempConvo.id = message.conversationId;
      tempConvo.messages = [...tempConvo.messages, message];
      tempConvo.latestMessageText = message.text;
      return tempConvo;
    } else {
      return convo;
    }
  });
};
