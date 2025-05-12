import { Box, Stack, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useAppContext } from "../context/context";
import {
  SET_MID_AREA_DATA,
  DELETE_MID_AREA_DATA,
  SET_REPEAT_IN_MID_AREA,
  UPDATE_MID_AREA_DATA,
} from "../context/constants";
import "./styles.css";
import { SmallInputBox } from "./SmallInputBox";

import { v4 as uuid } from "uuid";

export default function MidArea() {
  const { state, dispatch } = useAppContext();

  const handleDragDrop = useCallback(
    (e) => {
      e.preventDefault();
      const list = e.dataTransfer.getData("text/plain");

      if (list?.includes("coordinates")) {
        const [, xc, yc] = list.split(":");
        dispatch({
          type: SET_MID_AREA_DATA,
          payload: {
            xc: Number(xc),
            yc: Number(yc),
            id: uuid(),
          },
        });
        return;
      }

      if (list?.includes("say:")) {
        const [, message, duration] = list.split(":");
        dispatch({
          type: SET_MID_AREA_DATA,
          payload: {
            say: {
              message,
              duration: Number(duration)
            },
            id: uuid(),
          },
        });
        return;
      }

      if (list?.includes("think:")) {
        const [, message, duration] = list.split(":");
        dispatch({
          type: SET_MID_AREA_DATA,
          payload: {
            think: {
              message,
              duration: Number(duration)
            },
            id: uuid(),
          },
        });
        return;
      }

      if (list?.includes("repeat")) {
        const [key, val] = list.split(":");
        dispatch({
          type: SET_REPEAT_IN_MID_AREA,
          payload: {
            [key]: Number(val),
            id: uuid(),
          },
        });
        return;
      }

      const [key, val] = list.split(":");
      dispatch({
        type: SET_MID_AREA_DATA,
        payload: {
          [key]: Number(val),
          id: uuid(),
        },
      });
    },
    [dispatch]
  );

  const handleDeleteData = useCallback(
    (id) => () => {
      dispatch({
        type: DELETE_MID_AREA_DATA,
        payload: { id: id },
      });
    },
    [dispatch]
  );

  const handleChangeData = useCallback(
    (id) => (e) => {
      const { name, value } = e.target;

      // Handle nested properties (say.message, say.duration, think.message, think.duration)
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        dispatch({
          type: UPDATE_MID_AREA_DATA,
          payload: {
            id,
            [parent]: {
              ...state.midAreaData.find(item => item.id === id)[parent],
              [child]: value
            }
          },
        });
      } else {
        dispatch({
          type: UPDATE_MID_AREA_DATA,
          payload: {
            id,
            [name]: value,
          },
        });
      }
    },
    [dispatch, state.midAreaData]
  );

  return (
    <Stack
      height={"100%"}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDragDrop}
    >
      <Typography variant="h5">Mid Area</Typography>
      <Stack gap={2}>
        {state.midAreaData
          .filter((item) => item?.spriteId === state.activeSprite)
          .map((item) => {
            if (Object.prototype.hasOwnProperty.call(item, "move")) {
              return (
                <Box className="sidebarEvents">
                  Move{" "}
                  <SmallInputBox
                    value={item?.move}
                    name="move"
                    onChange={handleChangeData(item?.id)}
                    type="number"
                  />{" "}
                  steps
                  <span className="deleteBTN">
                    <button onClick={handleDeleteData(item?.id)}>❌ </button>
                  </span>
                </Box>
              );
            }
            if (Object.prototype.hasOwnProperty.call(item, "turnLeft")) {
              return (
                <Box className="sidebarEvents">
                  Turn{" "}
                  <SmallInputBox
                    name="turnLeft"
                    value={item?.turnLeft ?? 0}
                    onChange={handleChangeData(item?.id)}
                  />
                  degrees
                  <span className="deleteBTN">
                    <button onClick={handleDeleteData(item?.id)}>❌ </button>
                  </span>
                </Box>
              );
            }
            if (Object.prototype.hasOwnProperty.call(item, "say")) {
              return (
                <Box className="sidebarEvents">
                  Say{" "}
                  <SmallInputBox
                    value={item.say.message}
                    name="say.message"
                    onChange={handleChangeData(item?.id)}
                    type="text"
                    placeholder="message"
                  />{" "}
                  for{" "}
                  <SmallInputBox
                    name="say.duration"
                    value={item.say.duration}
                    onChange={handleChangeData(item?.id)}
                    type="number"
                  />{" "}
                  seconds
                  <span className="deleteBTN">
                    <button onClick={handleDeleteData(item?.id)}>❌ </button>
                  </span>
                </Box>
              );
            }
            if (Object.prototype.hasOwnProperty.call(item, "think")) {
              return (
                <Box className="sidebarEvents">
                  Think{" "}
                  <SmallInputBox
                    value={item.think.message}
                    name="think.message"
                    onChange={handleChangeData(item?.id)}
                    type="text"
                    placeholder="message"
                  />{" "}
                  for{" "}
                  <SmallInputBox
                    name="think.duration"
                    value={item.think.duration}
                    onChange={handleChangeData(item?.id)}
                    type="number"
                  />{" "}
                  seconds
                  <span className="deleteBTN">
                    <button onClick={handleDeleteData(item?.id)}>❌ </button>
                  </span>
                </Box>
              );
            }
            if (
              Object.prototype.hasOwnProperty.call(item, "xc") ||
              Object.prototype.hasOwnProperty.call(item, "yc")
            ) {
              return (
                <Box className="sidebarEvents">
                  Goto x:{" "}
                  <SmallInputBox
                    value={item?.xc ?? 0}
                    name="xc"
                    type="number"
                    onChange={handleChangeData(item?.id)}
                  />{" "}
                  and y:{" "}
                  <SmallInputBox
                    value={item?.yc ?? 0}
                    name="yc"
                    type="number"
                    onChange={handleChangeData(item?.id)}
                  />
                  <span className="deleteBTN">
                    <button onClick={handleDeleteData(item?.id)}>❌ </button>
                  </span>
                </Box>
              );
            }
            if (Object.prototype.hasOwnProperty.call(item, "repeat")) {
              return (
                <Box className="sidebarEvents">
                  Repeat{" "}
                  <SmallInputBox
                    value={item?.repeat ?? 0}
                    name="repeat"
                    onChange={handleChangeData(item?.id)}
                  />
                  <span className="deleteBTN">
                    <button onClick={handleDeleteData(item?.id)}>❌ </button>
                  </span>
                </Box>
              );
            }
            return null;
          })}
      </Stack>
    </Stack>
  );
}
