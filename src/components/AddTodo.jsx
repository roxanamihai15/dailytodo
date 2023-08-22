import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function AddTodo() {
	const auth = getAuth();
	const db = getFirestore();
	const [title, setTitle] = useState("");

	// il submit è asincrono
	// const handleSubmit = async(e) => {
	//     e.preventDefault()
	//     if (title !== '') {
	//         await addDoc(collection(db, "todos"), {
	//             title,
	//             completed: false
	//         });
	//         // ripulisco il campo input
	//         setTitle('')
	//     }
	// }

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (title !== "") {
			try {
				// Get the current user from the authentication object
				const currentUser = auth.currentUser;
				if (currentUser) {
					const userId = currentUser.uid;

					// Add the new task to the tasks collection of the user's UID
					const userTasksCollectionRef = collection(
						db,
						"users",
						userId,
						"tasks"
					);
					await addDoc(userTasksCollectionRef, {
						title,
						completed: false,
					});

					// Clear the input field
					setTitle("");
				}
			} catch (err) {
				console.error("Error adding user task:", err);
			}
		}
	};

	return (
		<>
			<h1>Your daily To do list</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Type something here"
					variant="filled"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					sx={{
						width: 300,
						color: "success.main",
						backgroundColor: "#E2E5FF",
						borderBottom: "unset",
						"&::before, &::after": {
							content: "none", // Remove the content of :before and :after
							borderBottom: "none",
						},
					}}
					className="textFieldWithoutPseudo"
				/>

				<Button variant="contained" type="submit" color="secondary">
					add
				</Button>
			</form>
		</>
	);
}

export default AddTodo;
