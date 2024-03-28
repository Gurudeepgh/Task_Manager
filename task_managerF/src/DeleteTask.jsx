import React from 'react';
import './Button.css'; 
const DeleteTask = ({ taskId }) => {
  const handleDelete = () => {
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Task deleted');
          // Optionally update state or notify parent component
        } else {
          console.error('Failed to delete task:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <h2 className="button-title">Delete Task</h2>
      <button className="delete-button" onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default DeleteTask;
