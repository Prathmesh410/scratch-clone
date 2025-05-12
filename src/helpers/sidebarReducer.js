// Action Types
export const SET_TURN = "SET_LEFT_TURN";
export const SET_RIGHT_TURN = "SET_RIGHT_TURN";
export const SET_X_COORDINATE = "SET_X_COORDINATE";
export const SET_Y_COORDINATE = "SET_Y_COORDINATE";
export const MOVE_SPRITE = "MOVE_SPRITE";
export const REPEAT_ANIMATION = "REPEAT_ANIMATION";
export const SET_SAY_MESSAGE = "SET_SAY_MESSAGE";
export const SET_SAY_DURATION = "SET_SAY_DURATION";
export const SET_THINK_MESSAGE = "SET_THINK_MESSAGE";
export const SET_THINK_DURATION = "SET_THINK_DURATION";

// Initial State
export const initialState = {
  leftTurn: 15,
  rightTurn: 15,
  xCoordinate: 0,
  yCoordinate: 0,
  moveSprite: 0,
  repeat: 0,
  sayMessage: "",
  sayDuration: 2,
  thinkMessage: "",
  thinkDuration: 2,
};

// Reducer
export const sidebarReducer = (state, action) => {
  switch (action.type) {
    case SET_TURN:
      return { ...state, leftTurn: action.payload };
    case SET_X_COORDINATE:
      return { ...state, xCoordinate: action.payload };
    case SET_Y_COORDINATE:
      return { ...state, yCoordinate: action.payload };
    case MOVE_SPRITE:
      return { ...state, moveSprite: action.payload };
    case REPEAT_ANIMATION:
      return { ...state, repeat: action.payload };
    case SET_SAY_MESSAGE:
      return { ...state, sayMessage: action.payload };
    case SET_SAY_DURATION:
      return { ...state, sayDuration: action.payload };
    case SET_THINK_MESSAGE:
      return { ...state, thinkMessage: action.payload };
    case SET_THINK_DURATION:
      return { ...state, thinkDuration: action.payload };
    default:
      return state;
  }
};
