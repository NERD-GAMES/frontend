import { createActions, createReducer } from "reduxsauce"
import { IUser } from "../../types";

const INITIAL_STATE: IUser = {}

export const { Types, Creators } = createActions({
  setLoginAction: ["user"],
  setLogoffAction: []
})

const setLogin = (state = INITIAL_STATE, action: any) => {
  return { ...action.user };
}

const setLogOff = (state = INITIAL_STATE, action: any) => {
  return INITIAL_STATE;
}

export default createReducer(INITIAL_STATE, {
  [Types.SET_LOGIN_ACTION]: setLogin,
  [Types.SET_LOGOFF_ACTION]: setLogOff,
})