import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';

const Login = (props) => (
	<div>
		<CloseIcon
			className="Dialog__CloseIcon"
			onClick={(() => props.handleLoginDialogClose())}
		/>
		<h2>Kirjaudu sisään</h2>
		{props.formErrMsg
			&& <p className="Login__Error">{props.formErrMsg}</p>
		}
		<div className="Login">
			<TextField
				label="Sähköposti"
				type="email"
				name="email"
				className="Login__InputHolder"
				onKeyUp={((e) => props.handleLoginInput(e))}
			/>
			<TextField
				label="Salasana"
				type="password"
				name="password"
				className="Login__InputHolder"
				onKeyUp={((e) => props.handleLoginInput(e))}
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					props.handleLogin(props.loginInputs);
				}}
			>
				Kirjaudu sisään
			</Button>
		</div>
		<LinearProgress
			className="Login__Progress"
			id="LoginProgress"
		/>
	</div>
);

export default Login;
