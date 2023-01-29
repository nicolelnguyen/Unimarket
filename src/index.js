<<<<<<< HEAD
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc,
    query
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCr10TXAJS1Cd92EUiojxPlHNsoIvSnTiw",
    authDomain: "unimarket-a7ff4.firebaseapp.com",
    projectId: "unimarket-a7ff4",
    storageBucket: "unimarket-a7ff4.appspot.com",
    messagingSenderId: "180731477688",
    appId: "1:180731477688:web:d056ea4ce59ca6342fbe4d",
    measurementId: "G-2F1BJQXR7T"
  }

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, 'users')

getDocs(colRef)
    .then((snapshot) => {
        let users = []
        snapshot.docs.forEach((doc) => {
            users.push( { ...doc.data(), id: doc.id } )
        })
    console.log(users)
    })
    .catch(err => {
        console.log(err.message)
})

const addUserForm = document.querySelector('.add')
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    addDoc(colRef, {
        username: addUserForm.username.value,
        email: addUserForm.email.value,
        password: addUserForm.password.value
    })
    .then(() => {
        addUserForm.reset()
    })
})



// READING DATA FROM THE DATABASE AND DISPLAYING IT
const q = query(colRef);
const querySnapshot = await getDocs(q);
console.log(querySnapshot)

// The "find all users" button, has an id of findusers
const findBtn = document.getElementById('findusers')

// The list, which contains all users, displayed to the interface
const usersList = document.getElementById('userlist')

function displayUsers() {
    // Clear the list, incase the button is pressed again, so the data is not duplicated
    usersList.innerHTML = ""

    // For every user in the database, create a new list element (li), add text for each user, then appent it to the list (using the const we declared earlier)
    querySnapshot.forEach((doc) => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(`Username: ${doc.data().username},    Email: ${doc.data().email},    Password: ${doc.data().password}`));
        usersList.appendChild(li);
    })
}

findBtn.addEventListener('click', displayUsers)



// querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import '@fortawesome/fontawesome-free/css/all.min.css'; 
// import 'bootstrap-css-only/css/bootstrap.min.css'; 
// import 'mdbreact/dist/css/mdb.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> main
