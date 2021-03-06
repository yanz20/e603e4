import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { postMessageRead } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user, postMessageRead } = props;
  const conversation = props.conversation || {};

  useEffect(() => {
    if (conversation.messages?.length > 0) {
      const lastMessage = conversation.messages[conversation.messages.length - 1];
      if (!lastMessage.read && lastMessage.senderId !== user.id) {
        const readMessages = async () => {
          await postMessageRead({id: conversation.id, unReadNum: conversation.unReadNum}, conversation.otherUser.id);
        }
        readMessages()
      }
    }
  }, [conversation.messages, conversation.id, conversation.unReadNum, conversation.otherUser, user.id, postMessageRead])

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              lastReadId={conversation.lastReadId}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessageRead: (conversation, senderId) => {
      dispatch(postMessageRead({conversation, senderId}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
