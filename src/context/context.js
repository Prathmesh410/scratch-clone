import React, { createContext, useContext } from "react";

export const AppContext = createContext({
  state: {
    midAreaData: [],
    activeSprite: "cat_sprite",
    collision: [],
    multipleSprites: [
      {
        id: "cat_sprite",
        title: "cat_sprite",
        isActive: "blue",
        x: 0,
        y: 0,
        rotate: 0,
      },
      {
        id: "dog_sprite",
        title: "dog_sprite",
        isActive: "blue",
        x: 0,
        y: 0,
        rotate: 0,
      },
    ],
  },
  dispatch: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
