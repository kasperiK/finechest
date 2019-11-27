import React from 'react';

const FineCount = (props) => (
	<div className="FineCount">
		<div>
			<h3 className="FineCount__Heading">Sakkokasan saldo - (Maksetut/Yhteensä)</h3>
		</div>
		<div className="FineCount__AmountHolder">
			( <span className={`FineCount__PaidAmount${props.allFinesPaid ? ' fines-paid' : ''}`}>{props.paidFineCount}€</span> / <span className="FineCount__TotalAmount">{props.totalFineCount}€</span> )
		</div>
	</div>
);

export default FineCount;
