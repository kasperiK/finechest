import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

const breakpointValues = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
};

export const theme = createMuiTheme({
	palette: {
		primary: { main: '#01AE52', contrastText: '#FFFFFF' },
		secondary: { main: '#ccc322', contrastText: '#333333' },
	},
	spacing: 4,
	breakpoints: {
		values: breakpointValues
	}
});

export const addAndEditDialogStyles = makeStyles(({
	paper: {
		backgroundColor: '#424242',
		width: '100%',
		maxWidth: '768px !important',
		margin: '1.25rem !important',
		padding: '2rem',
	},
}));

export const removeDialogStyles = makeStyles(({
	paper: {
		backgroundColor: '#424242',
		margin: '1.25rem !important',
	},
}));

export const loginDialogStyles = makeStyles(({
	paper: {
		backgroundColor: '#424242',
		margin: '1.25rem !important',
		padding: '2rem',
		[theme.breakpoints.down('sm')]: {
			padding: '3rem',
			width: '100%',
			maxWidth: '768px !important',
		},
		[theme.breakpoints.up('md')]: {
			minWidth: 'calc(768px - 2.5rem) !important',
		}
	},
}));

export const cardStyles = makeStyles(({
	card: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: '20px',
		paddingTop: '1.25rem',
		paddingBottom: '1.25rem',
		paddingLeft: '1rem',
		paddingRight: '1rem',
		backgroundColor: '#424242',
	},
	content: {
		padding: '0',
		'&:last-child': {
			paddingBottom: '0',
		}
	},
	avatar: {
		backgroundColor: '#01AE52',
	}
}));
