import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCm8GLSyiGSs28_kM1PzMO0aWMGKlfsSXA",

  authDomain: "klik-personnalisation.firebaseapp.com",

  projectId: "klik-personnalisation",

  storageBucket: "klik-personnalisation.appspot.com",

  messagingSenderId: "676290548786",

  appId: "1:676290548786:web:56f39dff0c73320998582b",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
