export const validateCTS = (data = []) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dataTypes = [
        'dailyconfirmed',
        'dailydeceased',
        'dailyrecovered',
        'totalconfirmed',
        'totaldeceased',
        'totalrecovered',
    ];
    return data
        .filter((d) => dataTypes.every((dt) => d[dt]) && d.date)
        .filter((d) => dataTypes.every((dt) => Number(d[dt]) >= 0))
        .filter((d) => {
            const year = today.getFullYear();
            return new Date(d.date + year) < today;
        });
};

export const formatNumber = (value) => {
    const numberFormatter = new Intl.NumberFormat('en-IN');
    return isNaN(value) ? '-' : numberFormatter.format(value);
};

export const preprocessTimeseries = (timeseries) => {
    return timeseries.map((stat) => ({
        date: new Date(stat.date + ' 2020'),
        totalconfirmed: +stat.totalconfirmed,
        totalrecovered: +stat.totalrecovered,
        totaldeceased: +stat.totaldeceased,
        dailyconfirmed: +stat.dailyconfirmed,
        dailyrecovered: +stat.dailyrecovered,
        dailydeceased: +stat.dailydeceased,
    }));
};
