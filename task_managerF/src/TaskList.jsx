import React, { useState, useEffect } from 'react';
import './TaskList.css'; 
const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div className="task-list-container">
    <h2 className="task-list-title">Tasks</h2>
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className="task-item">
          {task.title} - {task.description}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default TaskList;
