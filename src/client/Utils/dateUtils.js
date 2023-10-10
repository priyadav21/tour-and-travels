import dateFormat from 'dateformat';
import moment from 'moment';

class DateUtils {
	/**
	 * Converts the given date to format provided
	 * @param date jsDate or any date string that can be parsed by Date.parse() in javascript
	 * @param formatAsString reference: https://github.com/felixge/node-dateformat
	 */
	static format(date, formatAsString, timeZone) {
		return dateFormat(date, formatAsString, timeZone);
	}

	/**
	 * Converts the given date to format provided
	 * @param timeAsString in HH:MM:SS format
	 * @param formatAsString reference: https://github.com/felixge/node-dateformat
	 */
	static formatTime(timeAsString, formatAsString = 'h:MM tt') {
		const dateAsString = DateUtils.format(new Date(), 'yyyy-mm-dd');
		const jsDate = DateUtils.localDateTimetoJSDate(
			dateAsString,
			timeAsString,
		);
		return DateUtils.format(jsDate, formatAsString);
	}

	static formatDurationToHoursMinutes(durationInMillis) {
		const duration = moment.duration(durationInMillis);
		const days = duration.days();
		let hours = duration.hours();
		const minutes = duration.minutes();
		let res = '';
		if (hours + days * 24 <= 48) {
			hours += days * 24;
		} else {
			res = `${days} days`;
		}

		if (hours > 0) {
			res = `${res} ${hours} hr${hours > 1 ? 's' : ''}`;
		}

		if (minutes > 0) {
			res = `${res} ${minutes} min${minutes > 1 ? 's' : ''}`;
		}

		return res.trim();
	}

	static formatDateToYYYYMMDD(myDate) {
		return `${myDate.getFullYear()}-${`0${myDate.getMonth() + 1}`.slice(
			-2,
		)}-${`0${myDate.getDate()}`.slice(-2)}`;
	}

	static getHHMM(time) {
		const cindex = time.indexOf(':');
		const hh = time.substring(0, cindex);
		const mm = time.substring(cindex + 1, cindex + 3);
		const diff = Number(hh) - 12;
		if (diff > 0) {
			return `${diff}.${mm} pm`;
		} else if (diff === 0) {
			return `${Number(hh)}.${mm} pm`;
		}
		return `${Number(hh)}.${mm} am`;
	}

	static getHumanReadableDate(formattedDate) {
		return moment(formattedDate, 'YYYY-MM-DD').format('Do MMM');
	}

	static getHumanReadableTime(formattedTime) {
		return moment(formattedTime, 'HH:mm:ss').format('h:mm a');
	}

	static getHumanReadableDateTime(inventory) {
		const humanReadableDate = DateUtils.getHumanReadableDate(
			inventory.get('startDate'),
		);
		const humanReadableTime = DateUtils.getHumanReadableTime(
			inventory.get('startTime'),
		);

		return `${humanReadableDate} at ${humanReadableTime}`;
	}

	static localDateToJsDate(dateString) {
		return moment(dateString, 'YYYY-MM-DD').toDate();
	}

	static localDateTimetoJSDate(dateString, timeString) {
		return moment(
			`${dateString} ${timeString}`,
			'YYYY-MM-DD HH:mm:ss',
		).toDate();
	}

	static localDateTimetoMomentDate(dateString, timeString) {
		return moment(`${dateString} ${timeString}`, 'YYYY-MM-DD HH:mm:ss');
	}

	static formatUsingMoment(date, formatString) {
		return moment(date)
			.format(formatString)
			.toString()
			.replace('.', '');
	}

	static isUpcoming(date, time) {
		const jsDate = DateUtils.localDateTimetoJSDate(date, time);
		const currentDate = new Date();
		return jsDate > currentDate;
	}

	static addDay(date, nDaysToAdd) {
		return moment(date)
			.add(nDaysToAdd, 'days')
			.toDate();
	}

	static nextDateFormatted = (dateString, format = 'YYYY-MM-DD') => {
		const dateMoment = moment(dateString, 'YYYY-MM-DD');
		const nextDayMoment = dateMoment.add(1, 'days');
		return nextDayMoment.format(format);
	};

	static timeComparator(a, b) {
		return moment(a.key, 'H:m:s').unix() - moment(b.key, 'H:m:s').unix();
	}

	static formatInMonthTitleFormat = date => moment(date).format('MMMM YYYY');

	static formatToInventoryTime = time =>
		moment(time, 'HH:mm').format('HH:mm:ss');

	static getLastAndFirstDayOfMonthAndYear = (year, month, isLastDayDate) =>
		moment(
			new Date(
				year,
				isLastDayDate ? month : month - 1,
				isLastDayDate ? 0 : 1,
			),
		).format('YYYY-MM-DD');

	static compareTime(a, b, date) {
		return Date.parse(`${date} ${a}`) > Date.parse(`${date} ${b}`);
	}

	static getDurationInHours = duration => Math.round(duration / 60);
}

export default DateUtils;
