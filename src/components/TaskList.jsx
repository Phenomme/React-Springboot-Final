import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editedTaskName, setEditedTaskName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch tasks from the API
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/api/tasks')
            .then(response => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching tasks!');
                setLoading(false);
            });
    }, []);

    // Add a new task
    const handleAddTask = () => {
        if (newTask.trim()) {
            console.log('Adding task:', newTask); // Debug: Log the task to be added
            axios.post('http://localhost:8080/api/tasks', { name: newTask, completed: false }, { withCredentials: true })
                .then(response => {
                    console.log('Task added:', response.data); // Debug: Log the added task response
                    setTasks([...tasks, response.data]); // Add the new task to the list
                    setNewTask(''); // Clear the input field
                })
                .catch(error => {
                    console.error('Error adding task!', error); // Debug: Log any errors
                });
        }
    };
    

    // Edit a task's name
    const handleEditTask = (taskId) => {
        setEditTaskId(taskId);
        const taskToEdit = tasks.find(task => task.id === taskId);
        setEditedTaskName(taskToEdit.name);
    };

    const handleSaveEdit = () => {
        if (editedTaskName.trim()) {
            axios.put(`http://localhost:8080/api/tasks/${editTaskId}`, { name: editedTaskName })
                .then(response => {
                    setTasks(tasks.map(task => task.id === editTaskId ? response.data : task));
                    setEditTaskId(null);
                    setEditedTaskName('');
                })
                .catch(error => {
                    console.error('Error editing task!', error);
                });
        }
    };

    // Delete a task
    const handleDeleteTask = (taskId) => {
        axios.delete(`http://localhost:8080/api/tasks/${taskId}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId));
            })
            .catch(error => {
                console.error('Error deleting task!', error);
            });
    };

    return (
        <div>
            <h1>Task List</h1>

            {loading && <p>Loading tasks...</p>}
            {error && <p>{error}</p>}

            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter new task"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            
            {editTaskId && (
                <div>
                    <input
                        type="text"
                        value={editedTaskName}
                        onChange={(e) => setEditedTaskName(e.target.value)}
                        placeholder="Edit task"
                    />
                    <button onClick={handleSaveEdit}>Save Edit</button>
                </div>
            )}

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {editTaskId === task.id ? (
                            <span>{task.name}</span>
                        ) : (
                            <>
                                <span>{task.name}</span>
                                <button onClick={() => handleEditTask(task.id)}>Edit</button>
                            </>
                        )}
                        
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
