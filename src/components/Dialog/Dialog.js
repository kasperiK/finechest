import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { addAndEditDialogStyles, removeDialogStyles, loginDialogStyles } from '../../material-ui';
import AddFine from '../AddFine/AddFine';
import EditFine from '../EditFine/EditFine';
import Login from '../Login/Login';

export const RemoveDialog = (props) => {
	const classes = removeDialogStyles();
	return (
		<Dialog
			open={props.removeAlertDialog}
			onClose={props.handleRemoveDialogClose}
			classes={classes}
		>
			<div>
				<CloseIcon
					className="Dialog__CloseIcon"
					onClick={(() => props.handleRemoveDialogClose())}
				>
				</CloseIcon>
				<DialogTitle className="Dialog__Title">Haluatko varmasti poistaa tämän sakon?</DialogTitle>
				<DialogActions className="Dialog__Actions">
					<Button
						onClick={props.handleRemoveDialogClose}
						className="RemoveFineButton"
						variant="contained"
					>
						Ei
					</Button>
					<Button
						onClick={() => { props.handleRemoveDialogClose(); props.removeFineFromDB(props.fineToRemove); } }
						color="primary"
						autoFocus
						variant="contained"
					>
						Kyllä
					</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export const AddAndEditDialog = (props) => {
	const classes = addAndEditDialogStyles();
	return (
		<div>
			<Dialog
				classes={classes}
				open={props.addAndEditAlertDialog}
				onClose={props.handleAddAndEditDialogClose}
				onExited={props.removeFineToEdit}
				maxWidth={false}
			>
				<div>
					{ typeof props.fineToEdit === 'undefined'
						?	<AddFine
							fineInputs={props.fineInputs}
							setfineInputs={props.setfineInputs}
							handleFineInput={props.handleFineInput}
							addFineToDB={props.addFineToDB}
							handleAddAndEditDialogClose={props.handleAddAndEditDialogClose}
						/>
						:	<EditFine
							fineInputs={props.fineInputs}
							setfineInputs={props.setfineInputs}
							handleFineInput={props.handleFineInput}
							editFine={props.editFine}
							fineToEdit={props.fineToEdit}
							handleAddAndEditDialogClose={props.handleAddAndEditDialogClose}
						/>
					}
				</div>
			</Dialog>
		</div>
	);
};

export const LoginDialog = (props) => {
	const classes = loginDialogStyles();
	return (
		<Dialog
			classes={classes}
			open={props.loginAlertDialog}
			onClose={props.handleLoginDialogClose}
			maxWidth={false}
		>
			<Login
				handleLoginDialogClose={props.handleLoginDialogClose}
				handleLogin={props.handleLogin}
				handleLoginInput={props.handleLoginInput}
				loginInputs={props.loginInputs}
				formErrMsg={props.formErrMsg}
			/>
		</Dialog>
	);
};
