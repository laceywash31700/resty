import { useState } from 'react';
import './Form.scss';

export const Form = ({handleApiCall, method}) => {
const [formData, setFormData] = useState({
  method: '',
  url: '',
  body:''
});


  const handleSubmit = e => {
    e.preventDefault();
    handleApiCall(formData);
  }

  const handleClick = e => {
    setFormData({...formData, method: e.target.id});
  }

  const handleUrlOnChange = e => {
    setFormData({...formData, url: e.target.value })
  }

  const handleBodyOnChange = e => {
    setFormData({...formData, body: e.target.value })
  }

  return (
    <> 
    <form onSubmit={handleSubmit}>
      <label >
        <span>URL: </span>
        <input name='url' type='text' value={formData.url} onChange={handleUrlOnChange}/>
        <button type="submit">GO!</button>
      </label>
      <label className="methods">
        <button id="GET" type="submit" onClick={handleClick}>GET</button>
        <button id="POST" type="submit" onClick={handleClick}>POST</button>
        <button id="PUT" type="submit" onClick={handleClick}>PUT</button>
        <button id="DELETE"type="submit" onClick={handleClick}>DELETE</button>
      </label>

      {
      method
       &&  
       <label>
      <textarea
        value={formData.body}
        onChange={handleBodyOnChange}
        name="body"
        rows={4}
        cols={40}
        />
        </label>
         }
    </form>
  </>
  )
}

export default Form;
