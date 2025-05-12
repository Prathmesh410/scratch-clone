import React, { useReducer } from "react";
import Icon from "./Icon";
import { Stack, Typography, Box } from "@mui/material";
import { SmallInputBox } from "./SmallInputBox";
import "./styles.css";
import {
  sidebarReducer,
  initialState,
  SET_TURN,
  SET_X_COORDINATE,
  SET_Y_COORDINATE,
  MOVE_SPRITE,
  REPEAT_ANIMATION,
  SET_SAY_MESSAGE,
  SET_SAY_DURATION,
  SET_THINK_MESSAGE,
  SET_THINK_DURATION,
} from "../helpers/sidebarReducer";

export default function Sidebar() {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  const handleLeftTurnChange = (e) => {
    dispatch({ type: SET_TURN, payload: Number(e.target.value) });
  };

  const handleXCoordinateChange = (e) => {
    dispatch({ type: SET_X_COORDINATE, payload: Number(e.target.value) });
  };

  const handleYCoordinateChange = (e) => {
    dispatch({ type: SET_Y_COORDINATE, payload: Number(e.target.value) });
  };
  const handleRepeat = (e) => {
    dispatch({ type: REPEAT_ANIMATION, payload: Number(e.target.value) });
  };

  const handleMove = (e) => {
    dispatch({ type: MOVE_SPRITE, payload: Number(e.target.value) });
  };

  const handleSayMessageChange = (e) => {
    dispatch({ type: SET_SAY_MESSAGE, payload: e.target.value });
  };

  const handleSayDurationChange = (e) => {
    dispatch({ type: SET_SAY_DURATION, payload: Number(e.target.value) });
  };

  const handleThinkMessageChange = (e) => {
    dispatch({ type: SET_THINK_MESSAGE, payload: e.target.value });
  };

  const handleThinkDurationChange = (e) => {
    dispatch({ type: SET_THINK_DURATION, payload: Number(e.target.value) });
  };

  return (
    <Stack gap={2}>
      <Typography variant="h5"> {"Events"} </Typography>
      <Typography fontWeight="bold"> {"Motion"} </Typography>
      <Box
        className="sidebarEvents"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `move:${state?.moveSprite}`);
        }}
      >
        Move{" "}
        <SmallInputBox
          value={state.moveSprite ?? 0}
          onChange={handleMove}
          type="number"
        />{" "}
        steps
      </Box>
      <Box
        className="sidebarEvents"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `turnLeft:${state?.leftTurn}`);
        }}
      >
        Turn{" "}
        <SmallInputBox
          value={state.leftTurn ?? 0}
          onChange={handleLeftTurnChange}
          type="number"
        />{" "}
        degrees
      </Box>
      <Box
        className="sidebarEvents"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData(
            "text/plain",
            `coordinates:${state?.xCoordinate}:${state?.yCoordinate}`
          );
        }}
      >
        Goto x:{" "}
        <SmallInputBox
          value={state.xCoordinate ?? 0}
          onChange={handleXCoordinateChange}
          type="number"
        />{" "}
        and y:{" "}
        <SmallInputBox
          value={state.yCoordinate ?? 0}
          onChange={handleYCoordinateChange}
          type="number"
        />
      </Box>
      <Typography fontWeight="bold"> {"Looks"} </Typography>
      <Box
        className="sidebarEvents"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData(
            "text/plain",
            `say:${state?.sayMessage}:${state?.sayDuration}`
          );
        }}
      >
        Say{" "}
        <SmallInputBox
          value={state.sayMessage ?? ""}
          onChange={handleSayMessageChange}
          type="text"
          placeholder="message"
        />{" "}
        for{" "}
        <SmallInputBox
          value={state.sayDuration ?? 2}
          onChange={handleSayDurationChange}
          type="number"
        />{" "}
        seconds
      </Box>
      <Box
        className="sidebarEvents"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData(
            "text/plain",
            `think:${state?.thinkMessage}:${state?.thinkDuration}`
          );
        }}
      >
        Think{" "}
        <SmallInputBox
          value={state.thinkMessage ?? ""}
          onChange={handleThinkMessageChange}
          type="text"
          placeholder="message"
        />{" "}
        for{" "}
        <SmallInputBox
          value={state.thinkDuration ?? 2}
          onChange={handleThinkDurationChange}
          type="number"
        />{" "}
        seconds
      </Box>
      <Typography fontWeight="bold"> {"Controls"} </Typography>
      <Box
        className="sidebarEvents"
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", `repeat:${state?.repeat}`);
        }}
      >
        Repeat{" "}
        <SmallInputBox
          value={state.repeat ?? 0}
          onChange={handleRepeat}
          type="number"
        />{" "}
        times{" "}
      </Box>
    </Stack>
  );
}
