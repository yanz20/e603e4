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
  previewText: (props) => ({
    fontSize: props.unReadNum ? "regular" : 12,
    fontWeight: props.unReadNum ? "bold" : "regular",
    color: props.unReadNum ? "black" : "#9CADC8",
    letterSpacing: -0.17,
  }),
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
  const classes = useStyles(props.conversation);
  const { conversation } = props;
  const { latestMessageText, otherUser, unReadNum } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {unReadNum > 0 &&
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
