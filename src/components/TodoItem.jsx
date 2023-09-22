import React, { useState } from 'react'
import { Button, Checkbox } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditTaskModal from './EditTaskModal';

function TodoItem({ todo, toggleComplete, handleDelete }) {

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const handleEditButtonClick = (todo) => {
        setSelectedTodo(todo);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };


  return (
    <li>

        <label htmlFor={todo.id} className="visually-hidden">Check if you have completed the task: {todo.title}</label>
        <Checkbox
            id={todo.id}
            name={todo.title}
            checked={todo.completed}
            onChange={() => toggleComplete(todo)}
            color="primary"
        />

        <p className={todo.completed ? 'completed' : null}>{todo.title}</p>
            
        <Button
            className={todo.completed ? 'completed' : null}
            variant="outlined"
            color="primary"
            onClick={() => handleEditButtonClick(todo)}
            sx={{ borderRadius: 2, ml: 1 }}
        >
            <span className="visually-hidden">Edit {todo.title} </span>
            <EditIcon fontSize="small" />
        </Button>
                                        
        <EditTaskModal
            todo={selectedTodo}
            isOpen={editModalOpen}
            onClose={handleCloseEditModal}
        />

        <Button 
            variant="outlined"
            color="primary"
            onClick={() => handleDelete(todo.id)}
            sx={{ borderRadius: 2, ml: 1, mr: 1 }}
            aria-label={"Delete" + todo.title}
        >
            <span className="visually-hidden">Delete {todo.title} </span>
            <CloseRoundedIcon fontSize="small" />
        </Button>
    </li>
  )
}

export default TodoItem