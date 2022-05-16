import { createContext, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SET_AUTH, SET_REFRESH_TOKEN } from "./actions/auth";
import defaultConfigurations from "./config/auth";
import Layout from './Layout/Default/Layout';
import Contact from './pages/Contact/Contact';
import rootReducer, { rootState, initialState as rootStateTypes } from "./reducer";
export interface context { 
  state: rootStateTypes,
  dispatch: Function,
  errorHandler: Function
}

export const GlobalContext = createContext<context>({
  state: rootState,
  dispatch: () => {},
  errorHandler: () => {}
 })

function App() {
  
  const [state, dispatch] = useReducer(rootReducer, rootState);

  if(!state?.auth?.refreshToken){
    dispatch({
      type: SET_REFRESH_TOKEN,
      payload: defaultConfigurations.credentials.refreshToken
    })
  }

  const errorHandler = (error: any) => {
    if(error?.response?.data?.statusCode === 401){
      dispatch({
        type: SET_AUTH,
        payload: ""
      })
      localStorage.removeItem(defaultConfigurations.token)
    }

    console.error(error)
  }

  const contextValue: context = {
    state,
    dispatch,
    errorHandler
  }
  console.log("state --> ", state);
  
  return (
    <GlobalContext.Provider value={contextValue}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='contact' element={<Contact />} >
            </Route>
          </Route>
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
