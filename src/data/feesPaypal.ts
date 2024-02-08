export const standardFare = 4.79;
export const internationalFare = 1.61;

export const fixedFareByRegion = (region: string) => {
	switch (region) {
		case 'AUD':
			return 0.3;
		case 'BRL':
			return 0.6;
		case 'CAD':
			return 0.3;
		case 'CZK':
			return 10.0;
		case 'DKK':
			return 2.6;
		case 'EUR':
			return 0.35;
		case 'HKD':
			return 2.35;
		case 'HUF':
			return 90.0;
		case 'ILS':
			return 1.2;
		case 'JPY':
			return 40.0;
		case 'MYR':
			return 2.0;
		case 'MXN':
			return 4.0;
		case 'TWD':
			return 10.0;
		case 'NZD':
			return 0.45;
		case 'NOK':
			return 2.8;
		case 'PHP':
			return 15.0;
		case 'PLN':
			return 1.35;
		case 'RUB':
			return 10.0;
		case 'SGD':
			return 0.5;
		case 'SEK':
			return 3.25;
		case 'CHF':
			return 0.55;
		case 'THB':
			return 11.0;
		case 'GBP':
			return 0.2;
		case 'USD':
			return 0.3;
		default:
			return 0.6;
	}
};
