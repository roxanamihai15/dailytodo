import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { getAuth } from "firebase/auth";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";


const EditTaskModal = ({ todo, isOpen, onClose }) => {

    const handleTitleChange = (event) => {
      setEditedTitle(event.target.value);
    };
  
    // const handleUpdate = () => {
    //   onUpdate(todo, editedTitle);
    //   onClose();
    // };

    const [editedTitle, setEditedTitle] = useState("");

    // const handleUpdateTask = async () => {
    //     try {
    //       // Call your update function here
    //       await updateTaskTitle(todo.id, editedTitle);
    
    //       // Close the modal after updating
    //       onClose();
    //     } catch (error) {
    //       console.error("Error updating task:", error);
    //       // Handle error if necessary
    //     }
    //   };

    useEffect(() => {
        if (isOpen && todo) {
            setEditedTitle(todo.title);
        }
    }, [isOpen, todo]);


    const auth = getAuth();
    const db = getFirestore();


    const handleUpdateTask = async () => {
        try {
          const currentUser = auth.currentUser;
          if (currentUser) {
            const userId = currentUser.uid;
            const userTaskDocRef = doc(db, "users", userId, "tasks", todo.id);
      
            await updateDoc(userTaskDocRef, { title: editedTitle });
      
            onClose(); // Close the modal after updating
          }
        } catch (error) {
          console.error("Error updating task:", error);
          // Handle error if necessary
        }
      };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth={true}
      maxWidth = {'sm'}
      aria-labelledby="edit-task"
    //   aria-describedby="alert-dialog-description"
    //   sx={{ p: 7, minHeight: 217 }}
    >
      <DialogTitle id="edit-task" sx={{ pt: 3 }}>Edit Task</DialogTitle>
      <DialogContent sx={{ pt: 4 }}>
          <TextField
            // variant="filled"
            variant="outlined"
            label="Task Title"
            value={editedTitle}
            onChange={handleTitleChange}
            fullWidth
            margin="dense" 
          />
      </DialogContent>
      <DialogActions sx={{ pb: 3}}>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleUpdateTask} variant="contained" color="secondary">
          Update Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;