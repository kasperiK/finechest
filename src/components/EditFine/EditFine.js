import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

const EditFine = (props) => (
	<div>
		<CloseIcon
			className="Dialog__CloseIcon"
			onClick={(() => props.handleAddAndEditDialogClose())}
		>
		</CloseIcon>
		<h2>Muokkaa sakkoa</h2>
		<div className="AddFine__InputGroupHolder">
			<div className="AddFine__InputGroup">
				<TextField
					label="Nimi"
					type="text"
					name="playerName"
					autoFocus
					defaultValue={props.fineToEdit.name}
					onKeyUp={((e) => props.handleFineInput(e))}
				/>
			</div>
			<div className="AddFine__InputGroup">
				<TextField
					label="Sakon syy"
					type="text"
					name="fault"
					defaultValue={props.fineToEdit.fault}
					onKeyUp={((e) => props.handleFineInput(e))}
				/>
			</div>
			<div className="AddFine__InputGroup">
				<TextField
					label="Summa (€)"
					type="number"
					name="amount"
					InputProps={{ inputProps: { min: 0 } }}
					defaultValue={props.fineToEdit.amount}
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
					props.editFine(props.fineToEdit.id, { ...props.fineToEdit, ...props.fineInputs });
					props.handleAddAndEditDialogClose();
				}}
			>
				Muokkaa sakkoa
			</Button>
		</div>
	</div>
);

export default EditFine;
