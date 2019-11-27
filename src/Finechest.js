import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from '@material-ui/styles';
import Header from './components/Header/Header';
import FineList from './components/FineList/FineList';
import FineListContext from './Context';
import {
	listenToFines, unsubscribe, removeFineFromDB, addFineToDB, editFine, signIn, signOut, listentoAuth
} from './db';
import { theme } from './material-ui';
import { AddAndEditDialog, RemoveDialog, LoginDialog } from './components/Dialog/Dialog';
import FineCount from './components/FineCount/FineCount';

const Finechest = () => {
	const [fines, setFines] = useState();
	const [fineToRemove, setFineToRemove] = useState();
	const [fineToEdit, setFineToEdit] = useState();
	const [addAndEditAlertDialog, setAddAndEditAlertDialog] = useState(false);
	const [removeAlertDialog, setRemoveAlertDialog] = useState(false);
	const [loginAlertDialog, setLoginAlertDialog] = useState(false);
	const [paidFineCount, setPaidFineCount] = useState(0);
	const [totalFineCount, setTotalFineCount] = useState(0);
	const [allFinesPaid, setAllFinesPaid] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [dialogType, setDialogType] = useState();
	const [fineInputs, setfineInputs] = useState({
		playerName: '',
		fault: '',
		amount: null,
		inputsFilled: false,
	});
	const [loginInputs, setLoginInputs] = useState({ email: '', password: '' });
	const [formErrMsg, setFormErrMsg] = useState();

	const handleFineInput = (e) => {
		const { value } = e.target;
		const { name } = e.target;
		const inputs = {
			...fineInputs,
			[name]: value
		};
		setfineInputs({
			...fineInputs,
			[name]: value,
			inputsFilled: inputs.playerName && inputs.fault && inputs.amount && true
		});
	};
	const handleAddAndEditDialogOpen = (loggedInStatus, dialog) => {
		setDialogType(dialog);
		if (loggedInStatus) {
			setAddAndEditAlertDialog(true);
		}	else {
			setLoginAlertDialog(true);
		}
	};
	const handleAddAndEditDialogClose = () => {
		setAddAndEditAlertDialog(false);
		setfineInputs({
			playerName: '',
			fault: '',
			amount: null,
			inputsFilled: false,
		});
	};
	const handleFineToEdit = (props) => {
		setFineToEdit(props);
		setfineInputs({
			playerName: props.name,
			fault: props.fault,
			amount: props.amount,
			inputsFilled: false,
		});
	};
	const removeFineToEdit = () => {
		setFineToEdit();
	};
	const handleRemoveDialogOpen = (data, loggedInStatus, dialog) => {
		setFineToRemove(data.id);
		setDialogType(dialog);
		if (loggedInStatus === true) {
			setRemoveAlertDialog(true);
		}	else {
			setLoginAlertDialog(true);
		}
	};
	const handleRemoveDialogClose = () => {
		setRemoveAlertDialog(false);
		setFineToRemove();
	};
	const handleLoginDialogClose = () => {
		setLoginAlertDialog(false);
		setFormErrMsg();
	};
	const handleLoginInput = (e) => {
		const { value } = e.target;
		const { name } = e.target;
		setLoginInputs({
			...loginInputs,
			[name]: value
		});
	};
	const handleLoginSuccess = () => {
		document.getElementById('LoginProgress').removeAttribute('style');
		handleLoginDialogClose();
		if (dialogType === 'addDialog') {
			setFineToEdit();
			setAddAndEditAlertDialog(true);
		}	else if (dialogType === 'editDialog') {
			setAddAndEditAlertDialog(true);
		}	else if (dialogType === 'removeDialog') {
			setRemoveAlertDialog(true);
		}
		setLoginInputs({ email: '', password: '' });
		setDialogType();
	};
	const handleLoginError = (err) => {
		document.getElementById('LoginProgress').removeAttribute('style');
		const errMsg = err.code === 'auth/invalid-email' ? 'Tarkasta sähköpostiosoite' : 'Salasana väärin';
		setFormErrMsg(errMsg);
	};
	const handleLogin = (props) => {
		document.getElementById('LoginProgress').setAttribute('style', 'display:block;');
		signIn(props.email, props.password)
			.then((res) => { handleLoginSuccess(res); })
			.catch((err) => { handleLoginError(err); });
	};
	const getAvatarLetter = (props) => {
		const playerName = props.name;
		return playerName.substring(0, 1);
	};
	const calcFineCount = (props) => {
		const fineArr = props;
		let totalAmount = 0;
		let paidFinesAmount = 0;
		fineArr.forEach(fine => {
			const fineAmount = parseInt(fine.amount, 10);
			totalAmount += fineAmount;
			if (fine.finePaid) paidFinesAmount += fineAmount;
		});
		setTotalFineCount(totalAmount);
		setPaidFineCount(paidFinesAmount);
		if (paidFinesAmount === totalAmount) {
			setAllFinesPaid(true);
		}	else {
			setAllFinesPaid(false);
		}
	};
	const toggleFinePaidStatus = (props) => {
		const fineToChange = {
			id: props.id,
			amount: props.amount,
			fault: props.fault,
			playerName: props.name,
			finePaid: !props.finePaid
		};
		editFine(fineToChange.id, fineToChange);
	};
	useEffect(() => {
		listenToFines(setFines);
		listentoAuth(setLoggedIn);
		return () => {
			unsubscribe();
		};
	}, []);
	useEffect(() => {
		if (typeof fines !== 'undefined') {
			calcFineCount(fines);
		}
	}, [fines]);
	return (
		<ThemeProvider theme={theme}>
			<div className="Finechest">
				<Header
					handleAddAndEditDialogOpen={handleAddAndEditDialogOpen}
					loggedIn={loggedIn}
					signOut={signOut}
					setLoginAlertDialog={setLoginAlertDialog}
					setDialogType={setDialogType}
				/>
				{ typeof fines !== 'undefined'
					&& <FineListContext.Provider value={{
						fines, handleAddAndEditDialogOpen, handleRemoveDialogOpen, handleFineToEdit, getAvatarLetter, toggleFinePaidStatus, loggedIn
					}}>
						<FineList
						/>
					</FineListContext.Provider>
				}
				{ typeof fines !== 'undefined'
				&& <FineCount
					paidFineCount={paidFineCount}
					totalFineCount={totalFineCount}
					allFinesPaid={allFinesPaid}
				/>
				}
				<AddAndEditDialog
					addAndEditAlertDialog={addAndEditAlertDialog}
					handleAddAndEditDialogClose={handleAddAndEditDialogClose}
					fineInputs={fineInputs}
					handleFineInput={handleFineInput}
					addFineToDB={addFineToDB}
					editFine={editFine}
					fineToEdit={fineToEdit}
					removeFineToEdit={removeFineToEdit}
				/>
				<RemoveDialog
					removeAlertDialog={removeAlertDialog}
					handleRemoveDialogClose={handleRemoveDialogClose}
					removeFineFromDB={removeFineFromDB}
					fineToRemove={fineToRemove}
				/>
				<LoginDialog
					loginAlertDialog={loginAlertDialog}
					handleLoginDialogClose={handleLoginDialogClose}
					handleLogin={handleLogin}
					handleLoginInput={handleLoginInput}
					loginInputs={loginInputs}
					formErrMsg={formErrMsg}
				/>
			</div>
		</ThemeProvider>
	);
};

export default Finechest;
