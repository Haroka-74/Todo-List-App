import { db , auth } from './Config';
import { onAuthStateChanged , signInWithEmailAndPassword , createUserWithEmailAndPassword , sendPasswordResetEmail , confirmPasswordReset , signInWithCredential , FacebookAuthProvider } from 'firebase/auth';
import { doc , setDoc , updateDoc } from 'firebase/firestore';

// Listening for the authentication state to change:
onAuthStateChanged(auth , async (user) => {
	// if 'user = null' then the user 'sign out'.
	// if 'user ≠ null' then the user 'sign in'.
	if (user) {
		// User is signed in.
		console.log("User is signed in:", user.uid);
	} else {
		// User is signed out.
		console.log("User is signed out");
	}
});

async function register (email , password) {
	const credentials = await createUserWithEmailAndPassword(auth , email , password);
	await setDoc(doc(db , 'users' , auth.currentUser.uid) , {
		email: email,
		Todos: []
	});
	return credentials; // return some 'credentials' of the created user.
};

async function login (email , password) { await signInWithEmailAndPassword(auth , email , password); };

async function reset (email) { await sendPasswordResetEmail(auth , email); };

async function updateTodos (todos) {
	const washingtonRef = doc(db , 'users' , auth.currentUser.uid);
	await updateDoc(washingtonRef , { Todos: todos });
};

export { register , login , reset , updateTodos };