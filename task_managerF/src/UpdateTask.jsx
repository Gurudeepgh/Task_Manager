import React, { useState } from 'react';
import './Form.css';
const UpdateTask = ({taskId}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = event => {
    event.preventDefault();

    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Task updated:', data);
        // Optionally update state or notify parent component
      })
      .catch(error => console.error('Error updating task:', error));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Update Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <button className="form-button" type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
