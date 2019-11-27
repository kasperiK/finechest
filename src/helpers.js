export const convertCntToEur = (amount) => {
	let convertedAmount = parseInt(amount, 10) / 100;
	convertedAmount = convertedAmount.toString().replace('.', ',');
	return convertedAmount;
};
export const convertEurToCnt = (amount) => {
	let convertedAmount = parseInt(amount, 10) * 100;
	convertedAmount = convertedAmount.toString().replace('.', ',');
	return convertedAmount;
};
