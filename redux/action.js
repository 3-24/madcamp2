export const SWITCH_THEME = 'SWITCH_THEME'

export const switchTheme = BaseTheme => {
    return dispatch => {
        dispatch({
            type: SWITCH_THEME,
            baseTheme: BaseTheme
        })
    }
}