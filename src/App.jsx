import React, { useEffect, useReducer} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import History from './Components/History';
import Results from './Components/Results';
import axios from 'axios';


const starterState = {
  history: [],
  response: null,
  requestParams: {},
  active: {}
};
// Stater state values to be used with useReduce(this is basically like a state constructor in a class)

const apiMethods = {
  'GET': axios.get,
  'POST': axios.post,
  'PUT': axios.put,
  'DELETE': axios.delete
};
// For dynamically making request based on CRUD method selected in form.

function reducer(state, action) {
  switch (action.type) {

    case 'CALL API':
      return {
        ...state,
        requestParams: action.payload,
      }

    case 'CLEAR DATA':
      return{
        ...state,
        response: null
      }

    case 'ADD TO HISTORY':
      return {
        ...state,
        active: {},
        history: [...state.history, action.payload],
        response: action.payload.data
      };

    case 'VIEW HISTORY':
      return {
        ...state,
        active: state.history
      };

    case 'RESET RESPONSE':
      return {
        ...state,
        response: {}
      };
  }
}
// Reducer function for dynamically effecting state for useReducer hook.

const App = () => {
  const [state, dispatch] = useReducer(reducer, starterState);

  useEffect(() => {
    async function fetchData() {
      let { method, url, body } = state.requestParams;
      dispatch({ type: 'CLEAR DATA'});
      if (!url) return;
      if (state.response && Object.keys(state.response).length) return;
      try {
        let apiFunction = apiMethods[method];
        console.log('hey i made it')
        const request = await apiFunction(url, body);
        const action = {
          type: 'ADD TO HISTORY',
          payload: {
            ...state.requestParams,
            data: request.data,
          }
        }
        dispatch(action)
        console.log('hey this is the history', state.history)
      } catch (error) {
        console.error('API Error:', error);
      };
    }
    fetchData();
  }, [state.requestParams.method, state.requestParams.url, state.requestParams.body])
  // Should set the response prop in state and add the requestParams and response.data in a object for the history array

  const callApi = (requestParams) => {
    const action = {
      type: 'CALL API',
      payload: { ...requestParams }
    }
    dispatch(action);
  }
  // Should set the requestParams state and in turn triggering useEffect hook.

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      {state.requestParams.body && (<div>Body: {state.requestParams.body}</div>)}
      <Form
        handleApiCall={callApi}
      />
      <Results data={state.response} />
      <History history={state.history}/>
      <Footer />
    </React.Fragment>
  );

}
export default App
