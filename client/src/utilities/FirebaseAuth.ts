import { initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, type User } from "firebase/auth";

const defaultConfig = {
  apiKey: "AIzaSyDnMkac4tOpjHpeVWphM1hnl4LyyldYPdo",
  authDomain: "wyrm-mail.firebaseapp.com",
  projectId: "wyrm-mail",
  storageBucket: "wyrm-mail.appspot.com",
  messagingSenderId: "365431927769",
  appId: "1:365431927769:web:817cc071983fe83ed4dfc8"
};

class FirebaseAuth {
  app: FirebaseApp;
  user: User | null;

  constructor(config: FirebaseOptions) {
    this.app = initializeApp(config);
    this.user = null;
  }

  static Default() {
    return new FirebaseAuth(defaultConfig);
  }

  // Throws firebase auth errors.
  async login(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(getAuth(this.app), email, password);
    this.user = credential.user;
  }

  async signup(email: string, password: string) {
    const credential = await createUserWithEmailAndPassword(getAuth(this.app), email, password);
    this.user = credential.user;
  }
}

export default FirebaseAuth;