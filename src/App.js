import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import Homepage from './pages/Homepage';
import ErrorPage from './pages/ErrorPage';
import Authentication from './pages/Authentication';
import PrivateRoute from './PrivateRoute';

function App() {

  // const [todos, setTodos] = useState([])

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

  // console.log(todos);

  return (
      <>
        <BrowserRouter>
          <Routes>
            < Route path="/" element={<Authentication />} />
            < Route path="*" element={<ErrorPage />} />

            {/* private pages */}
            <Route element={<PrivateRoute />}>
              < Route path="/home" element={<Homepage />} />
            </Route>
          </Routes>
        </BrowserRouter>

        {/* 
        <div className="container-list">
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
          />
        */}
      </>
  );
}

export default App;