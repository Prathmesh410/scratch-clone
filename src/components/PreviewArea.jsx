import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CatSprite from "./CatSprite";
import DogSprite from "./DogSprite";
import { useAppContext } from "../context/context";
import {
  ROTATE_SPRITE,
  SET_ACTIVE_SPRITE,
  SET_MULTIPLE_SPRITES,
  UPDATE_MID_AREA_DATA,
  UPDATE_SPRITE_POSITION,
  SWAP_POSITIONS_OF_STRIPS,
} from "../context/constants";
import { v4 as uuidv4 } from "uuid";
import { MOVE_SPRITE } from "../helpers/sidebarReducer";
import BallSprite from "./BallSprite";

const sprites = {
  cat_sprite: <CatSprite />,
  dog_sprite: <DogSprite />,
  ball_sprite: <BallSprite />,
};

export default function PreviewArea() {
  const { state, dispatch } = useAppContext();
  const [showSprites, setShowSprites] = useState(false);

  const handleSpriteSelect = useCallback(
    (item) => () => {
      dispatch({
        type: SET_ACTIVE_SPRITE,
        payload: item,
      });
    },
    [dispatch]
  );

  const handleMultiSpriteSelect = useCallback(
    (item) => () => {
      dispatch({
        type: SET_MULTIPLE_SPRITES,
        payload: {
          id: uuidv4(),
          name: item,
          x: state.multipleSprites.length * 110,
          y: 0,
          rotate: 0,
        },
      });
      setShowSprites(false);
    },
    [dispatch, state.multipleSprites.length]
  );

  const handlePlayButton = useCallback(() => {
    const spriteInstructions = Object.groupBy(
      state.midAreaData,
      (item) => item?.spriteId
    );

    Object.keys(spriteInstructions).forEach((item) => {
      const instructions = spriteInstructions[item];
      const repeat = instructions?.[0]?.repeat || 1;
      instructions.forEach((instruction) => {
        if (instruction?.move) {
          dispatch({
            type: MOVE_SPRITE,
            payload: {
              id: instruction?.spriteId,
              x: instruction?.move * repeat,
            },
          });
        }
        if (instruction?.xc || instruction?.yc) {
          dispatch({
            type: UPDATE_SPRITE_POSITION,
            payload: {
              id: instruction?.spriteId,
              x: instruction?.xc * repeat,
              y: instruction?.yc * repeat,
            },
          });
        }
        if (instruction?.turnLeft) {
          dispatch({
            type: ROTATE_SPRITE,
            payload: {
              id: instruction?.spriteId,
              rotate: instruction?.turnLeft * repeat,
            },
          });
        }
        if (instruction?.say) {
          // Find the sprite component and update its currentAction
          const sprite = state.multipleSprites.find(s => s.id === instruction.spriteId);
          if (sprite) {
            const spriteComponent = sprites[sprite.name];
            if (spriteComponent) {
              const action = `say:${instruction.say.message}:${instruction.say.duration}`;
              // Update the sprite's currentAction through the context
              dispatch({
                type: 'SET_SPRITE_ACTION',
                payload: {
                  id: instruction.spriteId,
                  action
                }
              });
            }
          }
        }
        if (instruction?.think) {
          // Find the sprite component and update its currentAction
          const sprite = state.multipleSprites.find(s => s.id === instruction.spriteId);
          if (sprite) {
            const spriteComponent = sprites[sprite.name];
            if (spriteComponent) {
              const action = `think:${instruction.think.message}:${instruction.think.duration}`;
              // Update the sprite's currentAction through the context
              dispatch({
                type: 'SET_SPRITE_ACTION',
                payload: {
                  id: instruction.spriteId,
                  action
                }
              });
            }
          }
        }
      });
    });
  }, [dispatch, state.midAreaData, state.multipleSprites]);

  const handleDragDrop = useCallback(
    (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("sprite") ?? "";
      const [, id] = data.split(":");

      const container = e.currentTarget.getBoundingClientRect();

      const x = e.clientX - container.left;
      const y = e.clientY - container.top;
      dispatch({
        type: UPDATE_SPRITE_POSITION,
        payload: {
          id,
          x,
          y,
        },
      });
    },
    [dispatch]
  );

  const checkCollision = useCallback(() => {
    for (let sprite1 of state.multipleSprites) {
      for (let sprite2 of state.multipleSprites) {
        if (sprite1.id !== sprite2.id) {
          let distance = Math.sqrt(
            (sprite1.x - sprite2.x) ** 2 + (sprite1.y - sprite2.y) ** 2
          );
          if (distance < 50) {
            // Swap positions of the colliding sprites
            dispatch({
              type: SWAP_POSITIONS_OF_STRIPS,
              payload: {
                id1: sprite1.id,
                id2: sprite2.id,
              },
            });

            // Move sprites away from each other
            const angle = Math.atan2(
              sprite2.y - sprite1.y,
              sprite2.x - sprite1.x
            );
            const moveDistance = 40; // Distance to move sprites apart

            dispatch({
              type: UPDATE_SPRITE_POSITION,
              payload: {
                id: sprite1.id,
                x: sprite1.x - Math.cos(angle) * moveDistance,
                y: sprite1.y - Math.sin(angle) * moveDistance,
              },
            });

            dispatch({
              type: UPDATE_SPRITE_POSITION,
              payload: {
                id: sprite2.id,
                x: sprite2.x + Math.cos(angle) * moveDistance,
                y: sprite2.y + Math.sin(angle) * moveDistance,
              },
            });
          }
        }
      }
    }
  }, [state.multipleSprites, dispatch]);

  useEffect(() => {
    const interval = setInterval(checkCollision, 100); // Check for collisions every 100ms
    return () => clearInterval(interval);
  }, [checkCollision]);

  const handleShowAllSpritesDlg = () => {
    setShowSprites(true);
  };

  const handleCloseAllSpritesDlg = () => {
    setShowSprites(false);
  };

  return (
    <Stack position={"relative"} height={1} gap={2}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h5">Preview</Typography>
        <Button
          onClick={handleShowAllSpritesDlg}
          size="small"
          variant="secondary"
        >
          ✚ Add Sprite
        </Button>
      </Stack>
      <Stack direction={"row"} ml={"auto"}>
        <Button
          variant="contained"
          startIcon={"▶️"}
          size="small"
          onClick={handlePlayButton}
        >
          Play
        </Button>
      </Stack>
      <Stack
        height={1}
        position={"relative"}
        overflow={"hidden"}
        width={1}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDragDrop}
      >
        {state.multipleSprites.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                position: "absolute",
                left: `${item?.x}px`,
                top: `${item?.y}px`,
                cursor: "move",
                width: "50px",
                height: "50px",
              }}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("sprite", `id:${item?.id}`);
                const rect = e.currentTarget.getBoundingClientRect();
                e.dataTransfer.setData("offsetX", e.clientX - rect.left);
                e.dataTransfer.setData("offsetY", e.clientY - rect.top);
              }}
            >
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: `rotate(${item?.rotate}deg)`,
                transition: "transform 1s linear"
              }}>
                {React.cloneElement(sprites[item?.name], {
                  currentAction: item.currentAction,
                  style: { transform: 'none' }
                })}
              </div>
            </Box>
          );
        })}
      </Stack>
      <Stack
        position="absolute"
        display={"flex"}
        alignItems={"center"}
        bottom={0}
        direction={"row"}
        gap={1}
        borderTop={"2px solid #000000"}
        width={1}
        pt={1}
        overflow={"auto"}
      >
        {state.multipleSprites.map((item) => {
          const activeSprite = item.id === state.activeSprite;
          return (
            <Box
              sx={{
                border: activeSprite ? "2px solid #000000" : "",
                p: 2,
              }}
              onClick={handleSpriteSelect(item.id)}
            >
              {sprites[item?.name]}
            </Box>
          );
        })}
      </Stack>
      {showSprites && (
        <Dialog
          open={showSprites}
          onClose={handleCloseAllSpritesDlg}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Sprites</DialogTitle>
          <DialogContent>
            <Stack direction={"row"} justifyContent={"center"} gap={5}>
              {Object.keys(sprites).map((item) => {
                return (
                  <Box onClick={handleMultiSpriteSelect(item)}>
                    {sprites[item]}
                  </Box>
                );
              })}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAllSpritesDlg}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Stack>
  );
}
