import React from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';
import './App.css'; // Import CSS file for styling

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">Task Manager</h1>
      <div className="task-manager">
        <div className="task-section">
          <TaskList />
          <AddTask />
        </div>
        <div className="task-section">
          <UpdateTask taskId={3} />
          <DeleteTask taskId={1} />
        </div>
      </div>
    </div>
  );
};

export default App;
