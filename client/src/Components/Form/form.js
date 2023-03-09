import React from 'react';


function Form({userInput, onFormChange, onFormSubmit}) {
  const handleChange = (event) => {
    onFormChange(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit()
  }

  return (
  <>
    <form onSubmit={handleSubmit}>
    <div className="row">
            <div className="col">
              <input 
                type="text" required value={userInput} onChange={handleChange}
                className="form-control form-control-lg" 
              />
            </div>
            <div className="col-auto">
              <button 
                type="submit"
                className="btn btn-lg btn-success mr-20" 
              >Add Todo</button>
            </div>
          </div>
     </form>
    
  </>
  )
}
export default Form;