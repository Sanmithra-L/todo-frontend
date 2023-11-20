import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import Nav from './Nav';
import './TodoList.css';
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext';
import {Navigate } from 'react-router-dom';


export default function TodoList() {
  const { isAuthenticated} = useAuth(); // Get authentication context values

  // Check if the user is authenticated and has validated OTP
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />; // Redirect to the login page if not authorized
  // }
  const { userId } = useParams();
  const [task, setTask] = useState('');
  const [user, setUser] = useState({});
  const [existingTasks, setExistingTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  useEffect(() => {
    axios.get(`/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        setExistingTasks(response.data.todoList);
        
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleAddTask = () => {
    if (task) {
      axios.post(`/users/${userId}/todos`, { tasks: task, completed: false })
        .then((response) => {
          const newTask = response.data;
          setExistingTasks((prevTasks) => [...prevTasks, newTask]); // Update state correctly
          window.location.reload();
          setTask('');
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
    }
  }

  const handleDeleteTask = (taskId) => {
    axios.delete(`/users/${userId}/todos/${taskId}`)
      .then(() => {
        setExistingTasks(existingTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  }

  const handleEditTask = (taskId, taskText) => {
    setEditedTaskText(taskText);
    setEditingTask(taskId);
  }

  const handleSaveTask = (taskId, newTask, completed) => {
    axios.put(`/users/${userId}/todos/${taskId}`, {
      tasks: newTask,
      completed,
    })
      .then((response) => {
        setEditingTask(null);
        setExistingTasks(existingTasks.map((task) =>
          task.id === taskId ? { ...task, tasks: newTask, completed } : task
        ));
      })
      .catch((error) => {
        console.error('Error editing task:', error);
      });
  }

  const handleToggleCompleted = (taskId) => {
    const taskToUpdate = existingTasks.find((task) => task.id === taskId);
    const updatedCompleted = !taskToUpdate.completed;

    axios.put(`/users/${userId}/todos/${taskId}`, {
      tasks: taskToUpdate.tasks,
      completed: updatedCompleted,
    })
      .then((response) => {
        setEditingTask(null);
        setExistingTasks(existingTasks.map((task) =>
          task.id === taskId ? { ...task, completed: updatedCompleted } : task
        ));
      })
      .catch((error) => {
        console.error('Error updating task status:', error);
      });
  }

  return (
    <div>
      {/* <Nav /> */}
      <div className='logout'><Link to="/login" className="logout-button">Logout</Link></div>
      <div className="todo-list-container">
        <h2>Tasks for User: {user.userName}</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <ul className='uls'>
          {existingTasks.map((task) => (
            <li className='lis' key={task.id}>
              {task.id === editingTask ? (
                <>
                  <input
                    className="inputs"
                    type="text"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                  />
                  <button onClick={() => handleSaveTask(task.id, editedTaskText, task.completed)}>Save</button>
                </>
              ) : (
                <div className="task-container">
                  <span className={task.completed ? 'completed' : ''}>
                    {task.tasks}
                  </span>
                  <div className="task-buttons">
                    <button onClick={() => handleEditTask(task.id, task.tasks)}className="edit-button">Edit</button>
                    <button onClick={() => handleToggleCompleted(task.id)}>
                      {task.completed ? 'Mark Uncompleted' : 'Mark Completed'}
                    </button>
                    <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

