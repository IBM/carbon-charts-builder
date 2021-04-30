export const chart = {
	id: 'test',
	title: 'testerino',
	type: 'simple-bar-chart',
	data: [
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
	],
	options: {
		rawChartOptions: {
			title: 'Grouped bar (discrete)',
			axes: {
				left: {
					mapsTo: 'value',
					title: ''
				},
				bottom: {
					scaleType: 'labels',
					mapsTo: 'key'
				}
			}
		}
	},
	owners: ['testerino']
};
