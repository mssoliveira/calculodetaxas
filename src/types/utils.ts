export const getCountry = (country: string) => {
	switch (country) {
		case 'BRL':
			return 'Brasil';
		case 'USD':
			return 'Estados Unidos';
		case 'EUR':
			return 'Europa';
		default:
			return 'Brasil';
	}
};
