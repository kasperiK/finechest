import firebase from './Firebase';
import { convertCntToEur, convertEurToCnt } from './helpers';

export const finesDB = firebase.firestore().collection('fines');
const auth = firebase.auth();

export const listentoAuth = (setLoggedIn) => {
	auth.onAuthStateChanged((user) => {
		if (user) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	});
};

export const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password);

export const signOut = (setDialogType) => {
	auth.signOut();
	setDialogType();
};

export const listenToFines = (setFines) => {
	finesDB.onSnapshot((querySnapshot) => {
		const data = [];
		querySnapshot.forEach((doc) => {
			data.push({
				id: doc.id,
				...doc.data(),
				amount: convertCntToEur(doc.data().amount)
			});
		});
		setFines(data);
	});
};

export const unsubscribe = () => {
	finesDB.onSnapshot(() => {
		// do something with the data.
	});
};

export const addFineToDB = (props) => {
	finesDB.doc().set({
		amount: convertEurToCnt(props.amount),
		fault: props.fault,
		name: props.playerName,
		finePaid: false
	})
		.catch((err) => {
			throw new Error(err);
		});
};

export const editFine = (id, data) => {
	finesDB.doc(`${id}`).update({
		amount: convertEurToCnt(data.amount),
		fault: data.fault,
		name: data.playerName,
		finePaid: data.finePaid
	});
};

export const removeFineFromDB = (fine) => {
	finesDB.get()
		.then(querySnapshot => {
			querySnapshot.forEach(() => {
				finesDB.doc(`${fine}`).delete();
			});
		})
		.catch((err) => {
			throw new Error(err);
		});
};
