import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	}
}));

const Header = (props) => {
	const classes = useStyles();
	return (
		<header className="Header">
			{ props.loggedIn
				&& <button
					type="button"
					className="Header__LogoutButton"
					onClick={() => {
						props.signOut(props.setDialogType);
					}}
				>
					<ExitToAppIcon className="Header__LogoutIcon"/>
				</button>
			}
			{
				!props.loggedIn
				&& <button
					type="button"
					className="Header__LogoutButton"
					onClick={() => {
						props.setLoginAlertDialog(true);
					}}
				>
					<VpnKeyIcon className="Header__LogoutIcon"/>
				</button>
			}
			<div>
				<h1>Sakkokassa</h1>
				<p>Lisää, poista tai muokkaa sakkoja</p>
			</div>
			<div className="Header__ButtonHolder">
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={() => {
						props.handleAddAndEditDialogOpen(props.loggedIn, 'addDialog');
					}}
				>
					Lisää uusi sakko
				</Button>
			</div>
		</header>
	);
};

export default Header;
