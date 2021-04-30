export const areaData = [
	{
		group: 'Dataset 1',
		date: '2019-01-01T05:00:00.000Z',
		value: 0
	},
	{
		group: 'Dataset 1',
		date: '2019-01-06T05:00:00.000Z',
		value: -37312
	},
	{
		group: 'Dataset 1',
		date: '2019-01-08T05:00:00.000Z',
		value: -22392
	},
	{
		group: 'Dataset 1',
		date: '2019-01-15T05:00:00.000Z',
		value: -52576
	},
	{
		group: 'Dataset 1',
		date: '2019-01-19T05:00:00.000Z',
		value: 20135
	},
	{
		group: 'Dataset 2',
		date: '2019-01-01T05:00:00.000Z',
		value: 47263
	},
	{
		group: 'Dataset 2',
		date: '2019-01-05T05:00:00.000Z',
		value: 14178
	},
	{
		group: 'Dataset 2',
		date: '2019-01-08T05:00:00.000Z',
		value: 23094
	},
	{
		group: 'Dataset 2',
		date: '2019-01-13T05:00:00.000Z',
		value: 45281
	},
	{
		group: 'Dataset 2',
		date: '2019-01-19T05:00:00.000Z',
		value: -63954
	}
];

export const areaOptions = {
	title: 'Area (time series - natural curve)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: 'time'
		},
		left: {
			mapsTo: 'value',
			scaleType: 'linear'
		}
	},
	curve: 'curveNatural'
};

export const stackedAreaData = [
	{
		group: 'Dataset 1',
		date: '2019-01-01T05:00:00.000Z',
		value: 10000
	},
	{
		group: 'Dataset 1',
		date: '2019-01-05T05:00:00.000Z',
		value: 65000
	},
	{
		group: 'Dataset 1',
		date: '2019-01-08T05:00:00.000Z',
		value: 10000
	},
	{
		group: 'Dataset 1',
		date: '2019-01-13T05:00:00.000Z',
		value: 49213
	},
	{
		group: 'Dataset 1',
		date: '2019-01-17T05:00:00.000Z',
		value: 51213
	},
	{
		group: 'Dataset 2',
		date: '2019-01-01T05:00:00.000Z',
		value: 20000
	},
	{
		group: 'Dataset 2',
		date: '2019-01-05T05:00:00.000Z',
		value: 25000
	},
	{
		group: 'Dataset 2',
		date: '2019-01-08T05:00:00.000Z',
		value: 60000
	},
	{
		group: 'Dataset 2',
		date: '2019-01-13T05:00:00.000Z',
		value: 30213
	},
	{
		group: 'Dataset 2',
		date: '2019-01-17T05:00:00.000Z',
		value: 55213
	},
	{
		group: 'Dataset 3',
		date: '2019-01-01T05:00:00.000Z',
		value: 30000
	},
	{
		group: 'Dataset 3',
		date: '2019-01-05T05:00:00.000Z',
		value: 20000
	},
	{
		group: 'Dataset 3',
		date: '2019-01-08T05:00:00.000Z',
		value: 40000
	},
	{
		group: 'Dataset 3',
		date: '2019-01-13T05:00:00.000Z',
		value: 60213
	},
	{
		group: 'Dataset 3',
		date: '2019-01-17T05:00:00.000Z',
		value: 25213
	}
];

export const stackedAreaOptions = {
	title: 'Stacked area (time series)',
	axes: {
		left: {
			stacked: true,
			mapsTo: 'value'
		},
		bottom: {
			scaleType: 'time',
			mapsTo: 'date'
		}
	},
	curve: 'curveMonotoneX'
};
