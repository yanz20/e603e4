import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  previewTextBold: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  unReadMsg: {
    marginRight: 10,
    backgroundColor: '#1f75fe',
    alignItems: 'center',
    height: "50%",
    borderRadius: "1em",
    color: "#FFFFFF",
  },
  msgNumber: {
    fontSize: 12,
    padding: '5px 10px'
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, messages, otherUser, isRead } = conversation;
  const unReadNum = messages.filter(msg => {return (msg.senderId === otherUser.id && !msg.read )}).length;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={!isRead ? classes.previewTextBold : classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {!isRead &&
        <Box className={classes.unReadMsg}>
          <Typography className={classes.msgNumber}>
            {unReadNum}
          </Typography>
        </Box>
      }
    </Box>
  );
};

export default ChatContent;
