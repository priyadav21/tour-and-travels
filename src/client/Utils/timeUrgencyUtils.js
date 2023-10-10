import moment from 'moment';

const WILDCARDS = {
	DAILY: 'DAILY',
	WEEKLY: 'WEEKLY',
	FORTNIGHTLY: 'FORTNIGHTLY',
	MONTHLY: 'MONTHLY',
};

export const computeTimestampFromWildcard = wildCard => {
	switch (wildCard) {
		case WILDCARDS.DAILY: // Ends today mightnight
			return (
				moment()
					.utc()
					.endOf('day')
					.unix() * 1000
			);
		case WILDCARDS.WEEKLY:
			return (
				moment()
					.utc()
					.endOf('week')
					.unix() * 1000
			);
		case WILDCARDS.MONTHLY:
			return (
				moment()
					.utc()
					.endOf('month')
					.unix() * 1000
			);
		default:
			return null;
	}
};

export default { computeTimestampFromWildcard };
