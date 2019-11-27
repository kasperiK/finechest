import React, { useContext } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FineListItem from '../FineListItem/FineListItem';
import FineListContext from '../../Context';

const FineList = () => {
	const finelist = useContext(FineListContext);
	const isDesktop = useMediaQuery('(min-width:767px)');
	return (
		<div className="FineList">
			<h2>Sakkolista</h2>
			{ isDesktop
			&& <div className="FineList__ReasonHolder">
				<div className="FineList__Reason">
					Nimi:
				</div>
				<div className="FineList__Reason">
					Sakon syy:
				</div>
				<div className="FineList__Reason">
					Summa (€):
				</div>
			</div>
			}
			{
				finelist.fines.map((item, index) => (
					<FineListItem
						key={index}
						itemData={item}
					/>
				))
			}
		</div>
	);
};

export default FineList;
