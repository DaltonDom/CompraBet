import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCoO7rKijBgRUpXbdr3xQJiKPFEb9_4phc",
  authDomain: "betchecker-ca000.firebaseapp.com",
  databaseURL: "https://betchecker-ca000-default-rtdb.firebaseio.com",
  projectId: "betchecker-ca000",
  storageBucket: "betchecker-ca000.appspot.com",
  messagingSenderId: "257838169280",
  appId: "1:257838169280:web:86b1a4b171c31fe4c90125",
  measurementId: "G-XM4RLL3Z18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default { db };
