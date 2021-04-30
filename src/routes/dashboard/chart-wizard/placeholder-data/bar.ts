export const groupedBarData = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 65000
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: -29123
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: -35213
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 51213
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 16932
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 32432
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: -21312
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: -56456
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: -21312
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 34234
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: -12312
	},
	{
		group: 'Dataset 3',
		key: 'More',
		value: 23232
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: 34232
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: -12312
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: -34234
	},
	{
		group: 'Dataset 4',
		key: 'Qty',
		value: -32423
	},
	{
		group: 'Dataset 4',
		key: 'More',
		value: 21313
	},
	{
		group: 'Dataset 4',
		key: 'Sold',
		value: 64353
	},
	{
		group: 'Dataset 4',
		key: 'Restocking',
		value: 24134
	},
	{
		group: 'Dataset 4',
		key: 'Misc',
		value: 24134
	}
];

export const groupedBarOptions = {
	title: 'Grouped bar (discrete)',
	axes: {
		left: { mapsTo: 'value' },
		bottom: {
			scaleType: 'labels',
			mapsTo: 'key'
		}
	}
};


export const groupedBarHorizontalOptions = {
	title: 'Grouped horizontal bar (discrete)',
	axes: {
		left: {
			scaleType: 'labels',
			mapsTo: 'key'
		},
		bottom: {
			scaleType: 'linear',
			mapsTo: 'value'
		}
	}
};

// Simple bar
export const simpleBarData = [
	{
		group: 'Dataset 0',
		key: 'Qty',
		value: 65000
	},
	{
		group: 'Dataset 0',
		key: 'More',
		value: 29123
	},
	{
		group: 'Dataset 0',
		key: 'Sold',
		value: 35213
	},
	{
		group: 'Dataset 0',
		key: 'Restocking',
		value: 51213
	},
	{
		group: 'Dataset 0',
		key: 'Misc',
		value: 16932
	}
];


export const simpleBarOptions = {
	title: 'Simple bar (discrete)',
	axes: {
		left: {
			scaleType: 'linear',
			mapsTo: 'value'
		},
		bottom: {
			mapsTo: 'key',
			scaleType: 'labels'
		}
	}
};

export const simpleBarHorizontalOptions = {
	title: 'Simple horizontal bar (discrete)',
	axes: {
		left: {
			mapsTo: 'key',
			scaleType: 'labels'
		},
		bottom: {
			scaleType: 'linear',
			mapsTo: 'value'
		}
	}
};

// Stacked bar
export const stackedBarData = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 65000
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 29123
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 35213
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 51213
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 16932
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 32432
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 21312
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 56456
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 21312
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 34234
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 12312
	},
	{
		group: 'Dataset 3',
		key: 'More',
		value: 23232
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: 34232
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: 12312
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: 34234
	},
	{
		group: 'Dataset 4',
		key: 'Qty',
		value: 32423
	},
	{
		group: 'Dataset 4',
		key: 'More',
		value: 21313
	},
	{
		group: 'Dataset 4',
		key: 'Sold',
		value: 64353
	},
	{
		group: 'Dataset 4',
		key: 'Restocking',
		value: 24134
	},
	{
		group: 'Dataset 4',
		key: 'Misc',
		value: 32423
	}
];

export const stackedBarOptions = {
	title: 'Stacked bar (discrete)',
	axes: {
		left: {
			mapsTo: 'value',
			stacked: true
		},
		bottom: {
			mapsTo: 'key',
			scaleType: 'labels'
		}
	}
};

export const stackedBarHorizontalOptions = {
	title: 'Stacked horizontal bar (discrete)',
	axes: {
		left: {
			scaleType: 'labels',
			mapsTo: 'key'
		},
		bottom: {
			stacked: true,
			scaleType: 'linear',
			mapsTo: 'value'
		}
	}
};
