import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Customs reducer
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer'

// Configurar firebase
const firebaseConfig = {
  apiKey: "AIzaSyCReHyHhNcyOXDySD-k_1hnLfE3iRzjtwQ",
  authDomain: "blibliostore-62d5e.firebaseapp.com",
  databaseURL: "https://blibliostore-62d5e.firebaseio.com",
  projectId: "blibliostore-62d5e",
  storageBucket: "blibliostore-62d5e.appspot.com",
  messagingSenderId: "467565703258",
  appId: "1:467565703258:web:8489bf753e63dcf5a3e863",
  measurementId: "G-NQ3D8BZ7X1"
}

// Inicializar firebase
firebase.initializeApp(firebaseConfig)
// initialize Firestore
firebase.firestore()

// Configuramos react-redux
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
  firebaseStateName: 'firebase'
}

// crear el enhancer con compose de redux y firestore
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore)

// Reducers
const rootReducer = combineReducers({
  firebase : firebaseReducer,
  firestore : firestoreReducer,
  usuario: buscarUsuarioReducer
})

// State Inicial
const initialState = {}

// Crear el store (For production)
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase)
))

// For development
// const store = createStoreWithFirebase(rootReducer, initialState, compose(
//   reactReduxFirebase(firebase),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))

export default store