import React, { useEffect } from 'react';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import axios from 'axios';
import { useState } from 'react';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?

const App = () => {

  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  
  
  const apiMethods = {
    'GET': axios.get,
    'POST': axios.post,
    'PUT': axios.put,
    'DELETE': axios.delete
  };


  useEffect(() => {
 async function fetchData(){   
  let { method, url, body } = requestParams;
  if (!method || !url) {
      console.error('Invalid request parameters');
      return;
    }
    if (data && Object.keys(data).length) return;
    
    let apiFunction = apiMethods[method]; 
    
    try {
      const response = await apiFunction(url, body);
      setData(response.data);
    } catch (error) {
      console.error('API Error:', error);
    };
  }
  fetchData();
  }, [requestParams.method, requestParams.url, requestParams.body, data] )

  const callApi = (requestParams) => {
    setRequestParams(requestParams)
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      {requestParams.body && (<div>Body: {requestParams.body}</div>)}
      <Form
        handleApiCall={callApi}
      />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );

}
export default App
