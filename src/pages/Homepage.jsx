import {
	collection,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
	getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import PlaceholderList from "../components/PlaceholderList";
import AddTodo from "../components/AddTodo";
import Header from "../components/Header";
import { getAuth } from "firebase/auth";

function Homepage() {

    const [darkMode, setDarkMode] = useState(true)
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

	const auth = getAuth();

	// io parto con la mia app vuota, la riempio facendo una chiamata al database firestore
	const [todos, setTodos] = useState([]);

	const db = getFirestore();

	useEffect(() => {
		let unsubscribe; // Declare the unsubscribe function

		const fetchUserTasks = async () => {
			try {
				const currentUser = auth.currentUser;
				if (currentUser) {
					const userId = currentUser.uid;

					const userTasksCollectionRef = collection(
						db,
						"users",
						userId,
						"tasks"
					);

					// Listen for real-time changes to the user's tasks collection
					unsubscribe = onSnapshot(userTasksCollectionRef, (querySnapshot) => {
						const userTasks = [];
						querySnapshot.forEach((taskDoc) => {
							userTasks.push({ id: taskDoc.id, ...taskDoc.data() });
						});
						setTodos(userTasks);
					});
				}
			} catch (err) {
				console.error("Error fetching user tasks:", err);
			}
		};

		fetchUserTasks();

		// Return cleanup function quando il componente unmounts, così onSnapshot smette di osservare le modifiche a quella collection
        // il pattern di cleanup è:
        //  return () => {..}
		return () => {
			if (unsubscribe) {
				unsubscribe(); // Call the unsubscribe function
			}
		};
	}, []);

	const handleEdit = async (todo, title) => {
		const currentUser = auth.currentUser;
		if (currentUser) {
			const userId = currentUser.uid;
			const userTaskDocRef = doc(db, "users", userId, "tasks", todo.id);

			await updateDoc(userTaskDocRef, { title: title });
		}
	};
	const toggleComplete = async (todo) => {
		const currentUser = auth.currentUser;
		if (currentUser) {
			const userId = currentUser.uid;
			const userTaskDocRef = doc(db, "users", userId, "tasks", todo.id);

			await updateDoc(userTaskDocRef, { completed: !todo.completed });
		}
	};
	const handleDelete = async (id) => {
		const currentUser = auth.currentUser;
		if (currentUser) {
			const userId = currentUser.uid;
			const userTaskDocRef = doc(db, "users", userId, "tasks", id);

			await deleteDoc(userTaskDocRef);
		}
	};


	return (
		<div className={darkMode ? `main-container` : `main-container darkMode`}>
		{/* <div className="main-container"> */}
			<Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

			<div className="form-container">
				<AddTodo />
			</div>

			<div className="container-list">
				{todos.length > 0 ? (
					<ul>
						{todos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								toggleComplete={toggleComplete}
								handleDelete={handleDelete}
								handleEdit={handleEdit}
							/>
						))}
					</ul>
				) : (
					<PlaceholderList />
				)}
			</div>
		</div>
	);
}

export default Homepage;
