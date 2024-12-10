export const getDayNameAndNumber = (date) => {
	const dateString = date;
	const dateObj = new Date(dateString);
	const options = { weekday: 'short' };
	const dayName = dateObj.toLocaleDateString('ar-EG', options);
	const dayNumber = dateObj.getDate();

	return { dayName, dayNumber };
};
