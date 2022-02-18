
export const addAllConvosToStore = (conversations) => {
  let allConversations = [...conversations];
  allConversations.map(convo => {
    const msgLength = convo.messages.length
    if (msgLength > 0) {
      convo.unReadNum = convo.messages.filter(msg => { return (msg.senderId === convo.otherUser.id && !msg.read) }).length;
      convo.otherUsrReadId = convo.messages[convo.messages.findIndex(msg => msg.senderId !== convo.otherUser.id && msg.read)]?.id;
      convo.messages.reverse();
    };
  });
  return allConversations;
};

export const addMessageToStore = (state, payload) => {
  const { message, selfUpdate, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    // only update unRead number for recipient
    if(!selfUpdate) {
      newConvo.unReadNum = 1;
    }
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      let tempConvo = {...convo}
      tempConvo.messages = [...convo.messages, message];
      tempConvo.latestMessageText = message.text;
      if (!selfUpdate) {
        tempConvo.unReadNum++;
      }
      return tempConvo;
    } else {
      return convo;
    }
  });
};

export const updateConversation = (state, payload) => {
  const { id, messages, selfUpdate } = payload;
  return state.map((convo) => {
    if (convo.id === id) {
      const convoCopy = { ...convo };
      convoCopy.messages = messages;
      if (selfUpdate) {
        convoCopy.unReadNum = 0;
      } else {
        convoCopy.otherUsrReadId = messages[messages.length - 1].id;
      }
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
