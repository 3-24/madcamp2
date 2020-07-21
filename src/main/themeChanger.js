// import React from 'react';
// import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
// import thunk from 'redux-thunk';
// import { Provider, connect } from 'react-redux';

// import themeReducer from '../../redux/themeReducer';
// import App from './App';
// import { switchTheme } from '../../redux/action';

// const store = createStore(
//     combineReducers({ themeReducer }),
//     applyMiddleware(thunk)
// )

// const themeChanger = () => {
//     return (
//       <Provider store={store}>
//         <App />
//       </Provider>
//     )
// }

// const mapStateToProps = state => ({
//     theme: state.themeReducer.theme
// })

// const mapDistpatchToProps = dispatch => ({
//     switchTheme: bindActionCreators(switchTheme, dispatch)
// })

// export default connect(
//     mapStateToProps,
//     mapDistpatchToProps
// )(App)

import React, { Component } from 'react';

const Context = React.createContext();

export class themeChanger extends Component {
    render() {
        return(

        )
    }
}

export const themeChanger = Context.Consumer;
export const AppContext = Context;