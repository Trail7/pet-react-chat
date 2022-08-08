import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {CREDS} from "./utils/creds";



const app = initializeApp(CREDS);

export const Context = createContext(null)

const auth = getAuth(app)
const firestore = getFirestore(app)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Context.Provider value={{app, auth, firestore}}>
          <App />
      </Context.Provider>
  </React.StrictMode>
);