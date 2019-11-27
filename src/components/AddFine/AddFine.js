import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

const AddFine = (props) => (
	<div>
		<CloseIcon
			className="Dialog__CloseIcon"
			onClick={(() => props.handleAddAndEditDialogClose())}
		/>
		<h2>Lisää uusi sakko</h2>
		<div className="AddFine__InputGroupHolder">
			<div className="AddFine__InputGroup">
				<TextField
					label="Nimi"
					type="text"
					name="playerName"
					autoFocus
					onKeyUp={((e) => props.handleFineInput(e))}
				/>
			</div>
			<div className="AddFine__InputGroup">
				<TextField
					label="Sakon syy"
					type="text"
					name="fault"
					onKeyUp={((e) => props.handleFineInput(e))}
				/>
			</div>
			<div className="AddFine__InputGroup">
				<TextField
					label="Summa (€)"
					type="number"
					name="amount"
					onKeyUp={((e) => props.handleFineInput(e))}
				/>
			</div>
		</div>
		<div className="AddFine__ButtonHolder">
			<Button
				variant="contained"
				color="primary"
				className="AddFine__Button"
				disabled={!props.fineInputs.inputsFilled}
				onClick={() => {
					props.addFineToDB(props.fineInputs);
					props.handleAddAndEditDialogClose();
				}}
			>
				Lisää uusi sakko
			</Button>
		</div>
	</div>
);

export default AddFine;
