import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import FineListContext from '../../Context';
import { cardStyles } from '../../material-ui';

const FineListItem = (props) => {
	const finelist = useContext(FineListContext);
	const isDesktop = useMediaQuery('(min-width:767px)');
	const isMobile = useMediaQuery('(max-width:766px)');
	const classes = cardStyles();
	return (
		<div className={`FineListItemHolder${props.itemData.finePaid ? ' FinePaid' : ''}`}>
			{ isDesktop
		&& <div className="FineListItem">
			<div className="FineListItem__Section">
				<div>
					{props.itemData.name}
				</div>
			</div>
			<div className="FineListItem__Section">
				<div>
					{props.itemData.fault}
				</div>
			</div>
			<div className="FineListItem__Section">
				<div>
					{props.itemData.amount} €
				</div>
				<div className="FineListItem__IconHolder">
					<button
						disabled={props.itemData.finePaid}
						onClick={() => {
							finelist.handleAddAndEditDialogOpen(finelist.loggedIn, 'editDialog');
							finelist.handleFineToEdit(props.itemData);
						}}
					>
						<EditIcon
							className="FineListItem__Icon FineListItem__IconEdit"
						/>
					</button>
					<button
						disabled={props.itemData.finePaid}
						onClick={() => {
							finelist.handleRemoveDialogOpen(props.itemData, finelist.loggedIn, 'removeDialog');
						}}
					>
						<DeleteIcon
							className="FineListItem__Icon FineListItem__IconDelete"
						/>
					</button>
					{ props.itemData.finePaid
						?	<DoneIcon
							className="FineListItem__Icon FineListItem__IconPaid FineListItem__IconPaid--Green"
							onClick={() => {
								if (finelist.loggedIn) finelist.toggleFinePaidStatus(props.itemData, false);
							}}
						/>
						: <CloseIcon
							className="FineListItem__Icon FineListItem__IconPaid FineListItem__IconPaid--Red"
							onClick={() => {
								if (finelist.loggedIn) finelist.toggleFinePaidStatus(props.itemData, true);
							}}
						/>
					}
				</div>
			</div>
		</div>
			}
			{
				isMobile && <Card className={classes.card}>
					<CardContent className={`${classes.content} FineListItem`}>
						<div>
							<Avatar aria-label="pelaaja" className={classes.avatar}>
								{finelist.getAvatarLetter(props.itemData)}
							</Avatar></div>
						<div className="FineListItem__CardContent">
							<h2>Nimi: {props.itemData.name}</h2>
							<p>Sakon syy: {props.itemData.fault}</p>
							<p>Summa: {props.itemData.amount} €</p>
							<CardActions>
								<button
									disabled={props.itemData.finePaid}
									onClick={() => {
										finelist.handleAddAndEditDialogOpen(finelist.loggedIn, 'editDialog');
										finelist.handleFineToEdit(props.itemData);
									}}
								>
									<EditIcon
										className="FineListItem__Icon FineListItem__IconEdit"
									/>
								</button>
								<button
									disabled={props.itemData.finePaid}
									onClick={() => {
										finelist.handleRemoveDialogOpen(props.itemData, finelist.loggedIn, 'removeDialog');
									}}
								>
									<DeleteIcon
										className="FineListItem__Icon FineListItem__IconDelete"
									/>
								</button>
								{ props.itemData.finePaid
									?	<DoneIcon
										className="FineListItem__Icon FineListItem__IconPaid FineListItem__IconPaid--Green"
										onClick={() => {
											if (finelist.loggedIn) finelist.toggleFinePaidStatus(props.itemData, false);
										}}
									/>
									: <CloseIcon
										className="FineListItem__Icon FineListItem__IconPaid FineListItem__IconPaid--Red"
										onClick={() => {
											if (finelist.loggedIn) finelist.toggleFinePaidStatus(props.itemData, true);
										}}
									/>
								}
							</CardActions>
						</div>
					</CardContent>
				</Card>
			}
		</div>
	);
};

export default FineListItem;
