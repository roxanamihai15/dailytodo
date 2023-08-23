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
	const auth = getAuth();

	// io parto con la mia app vuota, la riempio facendo una chiamata al database firestore
	const [todos, setTodos] = useState([]);

	// useEffect(() => {
	//   // mi creo la variabile per la collection "todos", così è più facile usarla
	//   const todosCollection = query(collection(db, "todos"));
	//   const unsub = onSnapshot(todosCollection, (querySnapshot) => {
	//     // uso un array di appoggio che  riempio coi dati provenienti dal DB
	//     let todosArray = [];
	//     // per ogni documento
	//     querySnapshot.forEach((doc) => {
	//       // lo riempio con push
	//       // ogni doc è un oggetto a cui prendo i data() + il suo id
	//       todosArray.push({ ...doc.data(), id: doc.id });
	//     });
	//     // dico al mio array di useState di essere uguale all'array di appoggio
	//     setTodos(todosArray);
	//   });
	//   return () => unsub();
	// }, [])

	const db = getFirestore();

	// useEffect(() => {
	//   const fetchUserTasks = async () => {
	//     try {
	//       // Get the current user from the authentication object
	//     const currentUser = auth.currentUser;
	//     if (currentUser) {
	//       const userId = currentUser.uid;
	//       console.log(userId);

	//       const userTasksCollectionRef = collection(db, "users", userId, "tasks");
	//       const userTasksQuerySnapshot = await getDocs(userTasksCollectionRef);

	//       const userTasks = [];
	//       userTasksQuerySnapshot.forEach((taskDoc) => {
	//         userTasks.push({ id: taskDoc.id, ...taskDoc.data() });
	//       });

	//       setTodos(userTasks);
	//     }
	//     } catch (err) {
	//       console.error("Error fetching user tasks:", err);
	//     }
	//   };

	//   fetchUserTasks();
	// }, [auth, db]);

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

		// Return a cleanup function to unsubscribe when the component unmounts
		return () => {
			if (unsubscribe) {
				unsubscribe(); // Call the unsubscribe function
			}
		};
	}, []);

	// // per editare e rendere "completo" uso la funzione di rifebase updateDoc
	// const handleEdit = async (todo, title) => {
	//   await updateDoc(doc(db, "todos", todo.id), { title: title });
	// };
	// const toggleComplete = async (todo) => {
	//   await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
	// };
	//   // per eliminare uso le funzione di rifebase deleteDoc
	// const handleDelete = async (id) => {
	//   await deleteDoc(doc(db, "todos", id));
	// };

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

	console.log(todos);

	return (
		<div className="main-container">
			<Header />

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
