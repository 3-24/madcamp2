import { NightTheme } from '../styles/themeOptions'
import { SWITCH_THEME } from './action'

const initialState = {
  theme: { ...NightTheme }
}

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      let newState = {
        ...state,
        theme: { ...state.theme, ...action.baseTheme }
      }
      return newState
    default:
      return state
  }
}

export default themeReducer