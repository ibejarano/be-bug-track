import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { issuesHandler } from "../../../handlers/issues";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(4),
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 600,
  },
}));

export default function AddComment({ issueId }) {
  const classes = useStyles();
  const [text, setText] = useState("");

  const changeTextHandler = (e) => setText(e.target.value);
  const submitHandler = (e) => {
    e.preventDefault();
    issuesHandler.addComment(text, issueId);
    setText("");
  };

  return (
    <form onSubmit={submitHandler} className={classes.container}>
      <TextField
        id="outlined-textarea"
        label="Escribir comentario..."
        multiline
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={text}
        onChange={changeTextHandler}
      />{" "}
      <br />
      <Button color="primary" variant="contained" type="submit">
        Enviar comentario
      </Button>
    </form>
  );
}
