import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    databaseURL: config.public.firebaseDatabaseURL,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Realtime Database
  const database = getDatabase(app);
  const auth = getAuth(app);

  // Enable persistent auth state
  await setPersistence(auth, browserLocalPersistence);
  // Provide to the app
  return {
    provide: {
      firebaseApp: app,
      firebaseDatabase: database,
      firebaseAuth: auth,
    },
  };
});
