import React, { useState } from 'react'
import { Button, Checkbox } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditTaskModal from './EditTaskModal';

function TodoItem({ todo, toggleComplete, handleDelete, handleEdit }) {

    const [newTitle, setNewTitle] = useState(todo.title)
    // 
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const handleEditButtonClick = (todo) => {
        setSelectedTodo(todo);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const task = todo.title === '' ? newTitle : todo.title;

  return (
    <li>

        <Checkbox
            checked={todo.completed}
            onChange={() => toggleComplete(todo)}
            color="primary"
            // inputProps={{ 'aria-label': 'controlled' }}
        />

        <p className={todo.completed ? 'completed' : null}>{task}</p>
            
        <Button
            className={todo.completed ? 'completed' : null}
            variant="outlined"
            color="primary"
            onClick={() => handleEditButtonClick(todo)}
            sx={{ borderRadius: 2, ml: 1 }}
        >
            <span className="visually-hidden">Edit {task} </span>
            <EditIcon fontSize="small" />
        </Button>
                                        
        <EditTaskModal
            todo={selectedTodo}
            isOpen={editModalOpen}
            onClose={handleCloseEditModal}
        />

        <Button variant="outlined" color="primary"
            onClick={() => handleDelete(todo.id)}
            sx={{ borderRadius: 2, ml: 1, mr: 1 }}
        >
            <span className="visually-hidden">Delete {task} </span>
            {/* <DeleteIcon fontSize="small" /> */}
            <CloseRoundedIcon fontSize="small" />
        </Button>
    </li>
  )
}

export default TodoItem