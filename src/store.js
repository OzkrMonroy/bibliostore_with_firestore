import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Configurar firebase
const firebaseConfig = {
//   Firebase Config here
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
  firestore : firestoreReducer
})

// State Inicial
const initialState = {}

// Crear el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store
