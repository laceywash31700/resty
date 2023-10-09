import { useState } from 'react';
import './Form.scss';

export const Form = ({ handleApiCall}) => {
  const [formData, setFormData] = useState({
    method: '',
    url: '',
    body: ''
  });


  const handleSubmit = e => {
    e.preventDefault();
    handleApiCall(formData);
  }
  const handleOnChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleClick = e => {
    const { id } = e.target;
    setFormData(prevState => ({
      ...prevState,
      method: id
    }));
  }
 
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name='url' type='text' value={formData.url} onChange={handleOnChange} />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <button className={formData.method === 'GET'? 'selected': null} id="GET" type='button' onClick={handleClick}>GET</button>
          <button className={formData.method === 'POST'? 'selected': null}id="POST" type='button' onClick={handleClick}>POST</button>
          <button className={formData.method === 'PUT'? 'selected': null} id="PUT" type='button' onClick={handleClick}>PUT</button>
          <button className={formData.method === 'DELETE'? 'selected': null}id="DELETE" type='button' onClick={handleClick}>DELETE</button>
        </label>

        {
          (formData.method === 'POST' || formData.method === 'PUT')
          &&
          (<label>
            <textarea
              value={formData.body}
              onChange={handleOnChange}
              name="body"
              rows={4}
              cols={40}
            />
          </label>)
        }
      </form>
    </>
  )
}

export default Form;
