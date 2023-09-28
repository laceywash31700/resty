import { useState } from 'react';
import './Form.scss';

export const Form = ({handleApiCall, method}) => {
  const showTextArea = (method === 'get' || method === 'delete') ? true : false
  
const [formData, setFormData] = useState({
  method: '',
  url: ''
});
 
const [showTextArea, setShowTextArea] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    handleApiCall(formData);
  }

  const handleClick = e => {
    setFormData({...formData, method: e.target.id})
  }

  const handleOnChange = e => {
    setFormData({...formData, url: e.target.value })
  }



  return (
    <>
    <form onSubmit={handleSubmit}>
      <label >
        <span>URL: </span>
        <input name='url' type='text' value={formData.url} onChange={handleOnChange}/>
        <button type="submit">GO!</button>
      </label>
      <label className="methods">
        <span id="get" onClick={handleClick}>GET</span>
        <span id="post" onClick={handleClick}>POST</span>
        <span id="put"onClick={handleClick}>PUT</span>
        <span id="delete"onClick={handleClick}>DELETE</span>
      </label>
    </form>



  </>
  )
}

export default Form;
