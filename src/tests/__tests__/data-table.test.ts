import {
	getTableHeaders,
	getTableBody,
	addColumn,
	generateColumn,
	removeColumn,
	addRow,
	removeRow,
	updateDatapoint,
	updateKey,
	updateGroup,
	generateRow
} from '../../routes/edit/data-table/data-table-tools';

test('getTableHeaders should extract no headers from an empty chartData', () => {
	expect(getTableHeaders([])).toEqual([]);
});

test('getTableBody should extract no datapoints from an empty chartData', () => {
	expect(getTableBody([], [])).toEqual([]);
});

test('addColumn should add a column to an empty chartData', () => {
	expect(addColumn(
		0,
		[],
		[{
			group: 'Dataset 0',
			key: 'Label 0',
			value: 1
		}]
	)).toEqual([
		{
			group: 'Dataset 0',
			key: 'Label 0',
			value: 1
		}
	]);
});

test('removeColumn should remove no columns in empty chartData', () => {
	expect(removeColumn(0, [])).toEqual([]);
});

test('generateColumn should generate the correct column in empty chartData', () => {
	expect(generateColumn([])).toEqual([
		{
			group: 'Dataset 0',
			key: 'Label 0',
			value: 0,
			date: new Date('2063-04-05')
		}
	]);
});

test('generateColumn should generate a column with a unique key', () => {
	expect(generateColumn([
		{
			group: 'Dataset 1',
			key: 'Label 0',
			value: 65000,
			date: new Date('2063-04-05')
		},
		{
			group: 'Dataset 2',
			key: 'Label 1',
			value: -29123,
			date: new Date('2063-04-05')
		},
		{
			group: 'Dataset 1',
			key: 'Label 0',
			value: 65000,
			date: new Date('2063-04-05')
		},
		{
			group: 'Dataset 2',
			key: 'Label 2',
			value: -29123,
			date: new Date('2063-04-05')
		}
	])).toEqual([
		{
			group: 'Dataset 1',
			key: 'Label 3',
			value: 0,
			date: new Date('2063-04-05')
		},
		{
			group: 'Dataset 2',
			key: 'Label 3',
			value: 1,
			date: new Date('2063-04-05')
		}
	]);
});

test('addRow should add a row to an empty chartData', () => {
	expect(addRow(
		0,
		[],
		[
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
			}
		]
	)).toEqual([
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
		}
	]);
});

test('removeColumn should remove no rows in empty chartData', () => {
	expect(removeColumn(1, [])).toEqual([]);
});

const oneGroup = [
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
	}
];

test('getTableHeaders should extract the correct headers from oneGroup', () => {
	expect(getTableHeaders(oneGroup)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Misc'
	]);
});

test('getTableBody should generate the correct table body from oneGroup', () => {
	expect(getTableBody(
		oneGroup,
		['Qty', 'More', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 65000,
				date: null
			},
			{
				value: -29123,
				date: null
			},
			{
				value: -35213,
				date: null
			},
			{
				value: 51213,
				date: null
			},
			{
				value: 16932,
				date: null
			}
		]
	]);
});

test('addColumn should add a column to the first index in oneGroup', () => {
	expect(
		addColumn(
			0,
			[...oneGroup],
			[{
				group: 'Dataset 1',
				key: 'Label 0',
				value: 1
			}],
			['Qty', 'More', 'Sold', 'Restocking', 'Misc']
		)
	).toEqual([
		{
			group: 'Dataset 1',
			key: 'Label 0',
			value: 1
		},
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
		}
	]);
});

test('addColumn should add a column to the second index in oneGroup', () => {
	expect(
		addColumn(
			1,
			[...oneGroup],
			[{
				group: 'Dataset 1',
				key: 'Label 0',
				value: 1
			}],
			['Qty', 'More', 'Sold', 'Restocking', 'Misc']
		)
	).toEqual([
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 65000
		},
		{
			group: 'Dataset 1',
			key: 'Label 0',
			value: 1
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
		}
	]);
});

test('removeColumn should remove the third column from oneGroup', () => {
	expect(removeColumn(
		2,
		[...oneGroup],
		['Qty', 'More', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
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
			key: 'Restocking',
			value: 51213
		},
		{
			group: 'Dataset 1',
			key: 'Misc',
			value: 16932
		}
	]);
});

// eslint-disable-next-line max-len
test('removeColumn should remove the last column from oneGroup if given index is greater than header length', () => {
	expect(removeColumn(
		5,
		[...oneGroup],
		['Qty', 'More', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
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
		}
	]);
});

test('addRow should add a row in the second index in oneGroup', () => {
	expect(addRow(
		1,
		[...oneGroup],
		[
			{
				group: 'Dataset 2',
				key: 'Qty',
				value: 65000
			},
			{
				group: 'Dataset 2',
				key: 'More',
				value: -29123
			},
			{
				group: 'Dataset 2',
				key: 'Sold',
				value: -35213
			},
			{
				group: 'Dataset 2',
				key: 'Restocking',
				value: 51213
			}
		]
	)).toEqual([
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
			value: 65000
		},
		{
			group: 'Dataset 2',
			key: 'More',
			value: -29123
		},
		{
			group: 'Dataset 2',
			key: 'Sold',
			value: -35213
		},
		{
			group: 'Dataset 2',
			key: 'Restocking',
			value: 51213
		}
	]);
});

test('addRow should add a row in the first index in a oneGroup', () => {
	expect(addRow(
		0,
		[...oneGroup],
		[
			{
				group: 'Dataset 2',
				key: 'Qty',
				value: 65000
			},
			{
				group: 'Dataset 2',
				key: 'More',
				value: -29123
			},
			{
				group: 'Dataset 2',
				key: 'Sold',
				value: -35213
			},
			{
				group: 'Dataset 2',
				key: 'Restocking',
				value: 51213
			}
		]
	)).toEqual([
		{
			group: 'Dataset 2',
			key: 'Qty',
			value: 65000
		},
		{
			group: 'Dataset 2',
			key: 'More',
			value: -29123
		},
		{
			group: 'Dataset 2',
			key: 'Sold',
			value: -35213
		},
		{
			group: 'Dataset 2',
			key: 'Restocking',
			value: 51213
		},
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
		}
	]);
});

test('removeRow should remove the correct row in oneGroup', () => {
	expect(removeRow(0, [...oneGroup])).toEqual([]);
});

test('generateColumn should generate the correct column in oneGroup', () => {
	expect(generateColumn(oneGroup)).toEqual([
		{
			group: 'Dataset 1',
			key: 'Label 0',
			value: 0,
			date: new Date('2063-04-05')
		}
	]);
});

const oneGroupDuplicateKeys = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 7
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 5
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 6
	}
];

test('getTableHeaders should extract the correct headers from oneGroupDuplicateKeys', () => {
	expect(getTableHeaders(oneGroupDuplicateKeys)).toEqual([
		'Qty', 'Qty', 'Qty', 'More', 'Sold', 'Restocking', 'Misc'
	]);
});

test('getTableBody should generate the correct table body from oneGroupDuplicateKeys', () => {
	expect(getTableBody(
		oneGroupDuplicateKeys,
		['Qty', 'Qty', 'Qty', 'More', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 7,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			},
			{
				value: 6,
				date: null
			}
		]
	]);
});

test('removeColumns should remove the third column from a oneGroupDuplicateKeys', () => {
	expect(removeColumn(
		2,
		[...oneGroupDuplicateKeys],
		['Qty', 'Qty', 'Qty', 'More', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 1
		},
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 2
		},
		{
			group: 'Dataset 1',
			key: 'More',
			value: 3
		},
		{
			group: 'Dataset 1',
			key: 'Sold',
			value: 4
		},
		{
			group: 'Dataset 1',
			key: 'Restocking',
			value: 5
		},
		{
			group: 'Dataset 1',
			key: 'Misc',
			value: 6
		}
	]);
});


const twoGroupsSameKeys = [
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
	}
];

test('getTableHeaders should extract the correct headers from twoGroupsSameKeys', () => {
	expect(getTableHeaders(twoGroupsSameKeys)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Misc'
	]);
});

test('getTableBody should generate the correct table body from twoGroupsSameKeys', () => {
	expect(getTableBody(
		twoGroupsSameKeys,
		['Qty', 'More', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 65000,
				date: null
			},
			{
				value: -29123,
				date: null
			},
			{
				value: -35213,
				date: null
			},
			{
				value: 51213,
				date: null
			},
			{
				value: 16932,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 32432,
				date: null
			},
			{
				value: -21312,
				date: null
			},
			{
				value: -56456,
				date: null
			},
			{
				value: -21312,
				date: null
			},
			{
				value: 34234,
				date: null
			}
		]
	]);
});

test('addColumn should add a column to the first index in twoGroupsSameKeys', () => {
	expect(
		addColumn(
			0,
			[...twoGroupsSameKeys],
			[
				{
					group: 'Dataset 1',
					key: 'Label 0',
					value: 1
				},
				{
					group: 'Dataset 2',
					key: 'Label 0',
					value: 1
				}
			],
			['Qty', 'More', 'Sold', 'Restocking', 'Misc']
		)
	).toEqual([
		{
			group: 'Dataset 1',
			key: 'Label 0',
			value: 1
		},
		{
			group: 'Dataset 2',
			key: 'Label 0',
			value: 1
		},
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
		}
	]);
});

test('removeColumn should remove the third column from twoGroupsSameKeys', () => {
	expect(removeColumn(
		2,
		[...twoGroupsSameKeys],
		['Qty', 'More', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
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
			key: 'Restocking',
			value: -21312
		},
		{
			group: 'Dataset 2',
			key: 'Misc',
			value: 34234
		}
	]);
});

test('addRow should add a row in the second index in twoGroupsSameKeys', () => {
	expect(addRow(
		1,
		[...twoGroupsSameKeys],
		[
			{
				group: 'Dataset 3',
				key: 'Qty',
				value: 65000
			},
			{
				group: 'Dataset 3',
				key: 'More',
				value: -29123
			},
			{
				group: 'Dataset 3',
				key: 'Sold',
				value: -35213
			},
			{
				group: 'Dataset 3',
				key: 'Restocking',
				value: 51213
			}
		]
	)).toEqual([
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
			group: 'Dataset 3',
			key: 'Qty',
			value: 65000
		},
		{
			group: 'Dataset 3',
			key: 'More',
			value: -29123
		},
		{
			group: 'Dataset 3',
			key: 'Sold',
			value: -35213
		},
		{
			group: 'Dataset 3',
			key: 'Restocking',
			value: 51213
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
		}
	]);
});

test('addRow should add a row in the first index in twoGroupsSameKeys', () => {
	expect(addRow(
		0,
		[...twoGroupsSameKeys],
		[
			{
				group: 'Dataset 3',
				key: 'Qty',
				value: 65000
			},
			{
				group: 'Dataset 3',
				key: 'More',
				value: -29123
			},
			{
				group: 'Dataset 3',
				key: 'Sold',
				value: -35213
			},
			{
				group: 'Dataset 3',
				key: 'Restocking',
				value: 51213
			}
		]
	)).toEqual([
		{
			group: 'Dataset 3',
			key: 'Qty',
			value: 65000
		},
		{
			group: 'Dataset 3',
			key: 'More',
			value: -29123
		},
		{
			group: 'Dataset 3',
			key: 'Sold',
			value: -35213
		},
		{
			group: 'Dataset 3',
			key: 'Restocking',
			value: 51213
		},
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
		}
	]);
});

test('addRow should add a row in the third index in twoGroupsSameKeys', () => {
	expect(addRow(
		2,
		[...twoGroupsSameKeys],
		[
			{
				group: 'Dataset 3',
				key: 'Qty',
				value: 65000
			},
			{
				group: 'Dataset 3',
				key: 'More',
				value: -29123
			},
			{
				group: 'Dataset 3',
				key: 'Sold',
				value: -35213
			},
			{
				group: 'Dataset 3',
				key: 'Restocking',
				value: 51213
			}
		]
	)).toEqual([
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
			value: 65000
		},
		{
			group: 'Dataset 3',
			key: 'More',
			value: -29123
		},
		{
			group: 'Dataset 3',
			key: 'Sold',
			value: -35213
		},
		{
			group: 'Dataset 3',
			key: 'Restocking',
			value: 51213
		}
	]);
});

test('removeRow should remove the first row in twoGroupsSameKeys', () => {
	expect(removeRow(0, [...twoGroupsSameKeys])).toEqual([
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
		}
	]);
});

test('removeRow should remove the second row in twoGroupsSameKeys', () => {
	expect(removeRow(1, [...twoGroupsSameKeys])).toEqual([
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
		}
	]);
});

test('removeRow should remove the last row if an index greater than number of rows is provided', () => {
	expect(removeRow(68, [...twoGroupsSameKeys])).toEqual([
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
		}
	]);
});

test('removeRow should remove the first row if an index less than 0 is provided', () => {
	expect(removeRow(-68, [...twoGroupsSameKeys])).toEqual([
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
		}
	]);
});

const twoGroupsSecondLonger = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 5
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 2',
		key: 'Test',
		value: 'f'
	}
];

test('getTableHeaders should extract the correct headers from twoGroupsSecondLonger', () => {
	expect(getTableHeaders(twoGroupsSecondLonger)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Test'
	]);
});

test('getTableBody should generate the correct table body from twoGroupsSecondLonger', () => {
	expect(getTableBody(
		twoGroupsSecondLonger,
		['Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Test']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: 'e',
				date: null
			},
			{
				value: 'f',
				date: null
			}
		]
	]);
});

test('generateColumn should generate the correct column for twoGroupsSecondLonger', () => {
	expect(generateColumn(twoGroupsSecondLonger)).toEqual([
		{
			group: 'Dataset 1',
			key: 'Label 0',
			value: 0,
			date: new Date('2063-04-05')
		},
		{
			group: 'Dataset 2',
			key: 'Label 0',
			value: 1,
			date: new Date('2063-04-05')
		}
	]);
});

const twoGroupsFirstLonger = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Test',
		value: 5
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 6
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	}
];

test('getTableHeaders should extract the correct headers from twoGroupsFirstLonger', () => {
	expect(getTableHeaders(twoGroupsFirstLonger)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Test', 'Misc'
	]);
});

test('getTableBody should generate the correct table body from twoGroupsFirstLonger', () => {
	expect(
		getTableBody(twoGroupsFirstLonger, ['Qty', 'More', 'Sold', 'Restocking', 'Test', 'Misc'])
	).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			},
			{
				value: 6,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: 'e',
				date: null
			}
		]
	]);
});

const twoGroupsShuffledKeys = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 5
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'e'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'd'
	}
];

test('getTableHeaders should extract the correct headers from twoGroupsShuffledKeys', () => {
	expect(getTableHeaders(twoGroupsShuffledKeys)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Misc'
	]);
});

test('getTableBody should generate the correct table body from twoGroupsShuffledKeys', () => {
	expect(getTableBody(
		twoGroupsShuffledKeys,
		['Qty', 'More', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: 'e',
				date: null
			},
			{
				value: 'c',
				date: null
			}
		]
	]);
});

const twoGroupsDuplicateKeysFirstGroup = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 5
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 6
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'e'
	}
];

test('getTableHeaders should extract the correct headers from twoGroupsDuplicateKeysFirstGroup', () => {
	expect(getTableHeaders(twoGroupsDuplicateKeysFirstGroup)).toEqual([
		'Qty', 'Qty', 'More', 'Sold', 'Restocking', 'Misc'
	]);
});

test('getTableBody should generate the correct table body from twoGroupsDuplicateKeysFirstGroup', () => {
	expect(getTableBody(
		twoGroupsDuplicateKeysFirstGroup,
		['Qty', 'Qty', 'More', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			},
			{
				value: 6,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'e',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			}
		]
	]);
});

test('addColumn should add a column in the third index in twoGroupsDuplicateKeysFirstGroup', () => {
	expect(
		addColumn(
			2,
			[...twoGroupsDuplicateKeysFirstGroup],
			[
				{
					group: 'Dataset 1',
					key: 'Label 0',
					value: 1
				},
				{
					group: 'Dataset 2',
					key: 'Label 0',
					value: 1
				}
			],
			['Qty', 'Qty', 'More', 'Sold', 'Restocking', 'Misc']
		)
	).toEqual([
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 1
		},
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 2
		},
		{
			group: 'Dataset 1',
			key: 'Label 0',
			value: 1
		},
		{
			group: 'Dataset 2',
			key: 'Label 0',
			value: 1
		},
		{
			group: 'Dataset 1',
			key: 'More',
			value: 3
		},
		{
			group: 'Dataset 1',
			key: 'Sold',
			value: 4
		},
		{
			group: 'Dataset 1',
			key: 'Restocking',
			value: 5
		},
		{
			group: 'Dataset 1',
			key: 'Misc',
			value: 6
		},
		{
			group: 'Dataset 2',
			key: 'Qty',
			value: 'a'
		},
		{
			group: 'Dataset 2',
			key: 'More',
			value: 'b'
		},
		{
			group: 'Dataset 2',
			key: 'Restocking',
			value: 'c'
		},
		{
			group: 'Dataset 2',
			key: 'Misc',
			value: 'd'
		},
		{
			group: 'Dataset 2',
			key: 'Sold',
			value: 'e'
		}
	]);
});


const twoGroupsDuplicateKeysSecondGroup = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 5
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'f'
	}
];

test('getTableHeaders should extract the correct headers from twoGroupsDuplicateKeysSecondGroup', () => {
	expect(getTableHeaders(twoGroupsDuplicateKeysSecondGroup)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Qty', 'Misc'
	]);
});

test('getTableBody should generate the correct table body from twoGroupsDuplicateKeysSecondGroup', () => {
	expect(getTableBody(
		twoGroupsDuplicateKeysSecondGroup,
		['Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Qty', 'Misc']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: 'e',
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'f',
				date: null
			}
		]
	]);
});

test('addColumn should add a column in the sixth index in twoGroupsDuplicateKeysSecondGroup', () => {
	expect(
		addColumn(
			5,
			[...twoGroupsDuplicateKeysSecondGroup],
			[
				{
					group: 'Dataset 1',
					key: 'Label 0',
					value: 1
				},
				{
					group: 'Dataset 2',
					key: 'Label 0',
					value: 1
				}
			],
			['Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Qty', 'Misc']
		)
	).toEqual([
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 1
		},
		{
			group: 'Dataset 1',
			key: 'More',
			value: 2
		},
		{
			group: 'Dataset 1',
			key: 'Sold',
			value: 3
		},
		{
			group: 'Dataset 1',
			key: 'Restocking',
			value: 4
		},
		{
			group: 'Dataset 1',
			key: 'Misc',
			value: 5
		},
		{
			group: 'Dataset 2',
			key: 'Qty',
			value: 'a'
		},
		{
			group: 'Dataset 1',
			key: 'Label 0',
			value: 1
		},
		{
			group: 'Dataset 2',
			key: 'Label 0',
			value: 1
		},
		{
			group: 'Dataset 2',
			key: 'Qty',
			value: 'b'
		},
		{
			group: 'Dataset 2',
			key: 'More',
			value: 'c'
		},
		{
			group: 'Dataset 2',
			key: 'Restocking',
			value: 'd'
		},
		{
			group: 'Dataset 2',
			key: 'Misc',
			value: 'e'
		},
		{
			group: 'Dataset 2',
			key: 'Misc',
			value: 'f'
		}
	]);
});

test('removeColumn should remove the sixth column in twoGroupsDuplicateKeysSecondGroup', () => {
	expect(removeColumn(
		5,
		[...twoGroupsDuplicateKeysSecondGroup],
		['Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Qty', 'Misc']
	)).toEqual([
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 1
		},
		{
			group: 'Dataset 1',
			key: 'More',
			value: 2
		},
		{
			group: 'Dataset 1',
			key: 'Sold',
			value: 3
		},
		{
			group: 'Dataset 1',
			key: 'Restocking',
			value: 4
		},
		{
			group: 'Dataset 1',
			key: 'Misc',
			value: 5
		},
		{
			group: 'Dataset 2',
			key: 'Qty',
			value: 'a'
		},
		{
			group: 'Dataset 2',
			key: 'More',
			value: 'c'
		},
		{
			group: 'Dataset 2',
			key: 'Restocking',
			value: 'd'
		},
		{
			group: 'Dataset 2',
			key: 'Misc',
			value: 'e'
		},
		{
			group: 'Dataset 2',
			key: 'Misc',
			value: 'f'
		}
	]);
});


const oneGroupMultipleDuplicateKeys = [
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
		group: 'Dataset 1',
		key: 'Qty',
		value: 32432
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: -21312
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: -21312
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 34234
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: -56456
	}
];

test('getTableHeaders should extract the correct headers from oneGroupMultipleDuplicateKeys', () => {
	expect(getTableHeaders(oneGroupMultipleDuplicateKeys)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Qty', 'More', 'Restocking', 'Misc', 'Sold'
	]);
});

test('getTableBody should generate the correct table body from oneGroupMultipleDuplicateKeys', () => {
	expect(getTableBody(
		oneGroupMultipleDuplicateKeys,
		['Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Qty', 'More', 'Restocking', 'Misc', 'Sold']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 65000,
				date: null
			},
			{
				value: -29123,
				date: null
			},
			{
				value: -35213,
				date: null
			},
			{
				value: 51213,
				date: null
			},
			{
				value: 16932,
				date: null
			},
			{
				value: 32432,
				date: null
			},
			{
				value: -21312,
				date: null
			},
			{
				value: -21312,
				date: null
			},
			{
				value: 34234,
				date: null
			},
			{
				value: -56456,
				date: null
			}
		]
	]);
});

const twoGroupsSecondLargerShuffled = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 4
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'c'
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 5
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 6
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'f'
	}
];

test('getTableHeaders should extract the correct headers from twoGroupsSecondLargerShuffled', () => {
	expect(getTableHeaders(twoGroupsSecondLargerShuffled)).toEqual([
		'Qty', 'Restocking', 'Misc', 'More', 'Sold', 'Qty', 'Misc'
	]);
});

test('getTableBody should generate the correct table body from twoGroupsSecondLargerShuffled', () => {
	expect(getTableBody(
		twoGroupsSecondLargerShuffled,
		['Qty', 'Restocking', 'Misc', 'More', 'Sold', 'Qty', 'Misc']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			},
			{
				value: 6,
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: 'f',
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'e',
				date: null
			}
		]
	]);
});

const twoGroupsFirstLargerShuffled = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 5
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 6
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'c'
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 7
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	}
];

test('getTableHeaders should extract the correct headers from twoGroupsFirstLargerShuffled', () => {
	expect(getTableHeaders(twoGroupsFirstLargerShuffled)).toEqual([
		'Qty', 'Misc', 'Restocking', 'Misc', 'Qty', 'More', 'Sold'
	]);
});

test('getTableBody should generate the correct table body from twoGroupsFirstLargerShuffled', () => {
	expect(getTableBody(
		twoGroupsFirstLargerShuffled,
		['Qty', 'Misc', 'Restocking', 'Misc', 'Qty', 'More', 'Sold']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			},
			{
				value: 6,
				date: null
			},
			{
				value: 7,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: null,
				date: null
			}
		]
	]);
});

test('addRow should add a row in the second index in twoGroupsFirstLargerShuffled', () => {
	expect(addRow(
		1,
		[...twoGroupsFirstLargerShuffled],
		[
			{
				group: 'Dataset 3',
				key: 'Qty',
				value: 65000
			},
			{
				group: 'Dataset 3',
				key: 'More',
				value: -29123
			},
			{
				group: 'Dataset 3',
				key: 'Sold',
				value: -35213
			},
			{
				group: 'Dataset 3',
				key: 'Restocking',
				value: 51213
			}
		]
	)).toEqual([
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 1
		},
		{
			group: 'Dataset 1',
			key: 'Misc',
			value: 2
		},
		{
			group: 'Dataset 1',
			key: 'Restocking',
			value: 3
		},
		{
			group: 'Dataset 1',
			key: 'Misc',
			value: 4
		},
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 5
		},
		{
			group: 'Dataset 3',
			key: 'Qty',
			value: 65000
		},
		{
			group: 'Dataset 3',
			key: 'More',
			value: -29123
		},
		{
			group: 'Dataset 3',
			key: 'Sold',
			value: -35213
		},
		{
			group: 'Dataset 3',
			key: 'Restocking',
			value: 51213
		},
		{
			group: 'Dataset 2',
			key: 'Qty',
			value: 'a'
		},
		{
			group: 'Dataset 2',
			key: 'More',
			value: 'b'
		},
		{
			group: 'Dataset 1',
			key: 'More',
			value: 6
		},
		{
			group: 'Dataset 2',
			key: 'Misc',
			value: 'c'
		},
		{
			group: 'Dataset 1',
			key: 'Sold',
			value: 7
		},
		{
			group: 'Dataset 2',
			key: 'Restocking',
			value: 'd'
		}
	]);
});

const threeGroupsSameKeys = [
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
		value: 32432
	},
	{
		group: 'Dataset 3',
		key: 'More',
		value: -21312
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: -56456
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: -21312
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: 34234
	}
];

test('getTableHeaders should extract the correct headers from threeGroupsSameKeys', () => {
	expect(getTableHeaders(threeGroupsSameKeys)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Misc'
	]);
});

test('getTableBody should generate the correct table body from threeGroupsSameKeys', () => {
	expect(getTableBody(
		threeGroupsSameKeys,
		['Qty', 'More', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 65000,
				date: null
			},
			{
				value: -29123,
				date: null
			},
			{
				value: -35213,
				date: null
			},
			{
				value: 51213,
				date: null
			},
			{
				value: 16932,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 32432,
				date: null
			},
			{
				value: -21312,
				date: null
			},
			{
				value: -56456,
				date: null
			},
			{
				value: -21312,
				date: null
			},
			{
				value: 34234,
				date: null
			}
		],
		[
			'Dataset 3',
			{
				value: 32432,
				date: null
			},
			{
				value: -21312,
				date: null
			},
			{
				value: -56456,
				date: null
			},
			{
				value: -21312,
				date: null
			},
			{
				value: 34234,
				date: null
			}
		]
	]);
});

const threeGroupsFirstLonger = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 5
	},
	{
		group: 'Dataset 1',
		key: 'Test',
		value: 6
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 'one'
	},
	{
		group: 'Dataset 3',
		key: 'More',
		value: 'two'
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: 'three'
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: 'four'
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: 'five'
	}
];

test('getTableHeaders should extract the correct headers from threeGroupsFirstLonger', () => {
	expect(getTableHeaders(threeGroupsFirstLonger)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Test'
	]);
});

test('getTableBody should generate the correct table body from threeGroupsFirstLonger', () => {
	expect(getTableBody(
		threeGroupsFirstLonger,
		['Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Test']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			},
			{
				value: 6,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: 'e',
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 3',
			{
				value: 'one',
				date: null
			},
			{
				value: 'two',
				date: null
			},
			{
				value: 'three',
				date: null
			},
			{
				value: 'four',
				date: null
			},
			{
				value: 'five',
				date: null
			},
			{
				value: null,
				date: null
			}
		]
	]);
});

const threeGroupsThirdLonger = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 5
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 'one'
	},
	{
		group: 'Dataset 3',
		key: 'More',
		value: 'two'
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: 'three'
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: 'four'
	},
	{
		group: 'Dataset 3',
		key: 'Test',
		value: 'six'
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: 'five'
	}
];

test('getTableHeaders should extract the correct headers from threeGroupsThirdLonger', () => {
	expect(getTableHeaders(threeGroupsThirdLonger)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Test'
	]);
});

test('getTableBody should generate the correct table body from threeGroupsThirdLonger', () => {
	expect(getTableBody(
		threeGroupsThirdLonger,
		['Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Test']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: 'e',
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 3',
			{
				value: 'one',
				date: null
			},
			{
				value: 'two',
				date: null
			},
			{
				value: 'three',
				date: null
			},
			{
				value: 'four',
				date: null
			},
			{
				value: 'five',
				date: null
			},
			{
				value: 'six',
				date: null
			}
		]
	]);
});

const threeGroupsShuffled = [
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 5
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 'one'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: 'three'
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: 'four'
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: 'five'
	},
	{
		group: 'Dataset 3',
		key: 'More',
		value: 'two'
	}
];

test('getTableHeaders should extract the correct headers from threeGroupsShuffled', () => {
	expect(getTableHeaders(threeGroupsShuffled)).toEqual([
		'More', 'Qty', 'Sold', 'Restocking', 'Misc'
	]);
});

test('getTableBody should generate the correct table body from threeGroupsShuffled', () => {
	expect(getTableBody(
		threeGroupsShuffled,
		['More', 'Qty', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 2,
				date: null
			},
			{
				value: 1,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'b',
				date: null
			},
			{
				value: 'a',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: 'e',
				date: null
			}
		],
		[
			'Dataset 3',
			{
				value: 'two',
				date: null
			},
			{
				value: 'one',
				date: null
			},
			{
				value: 'three',
				date: null
			},
			{
				value: 'four',
				date: null
			},
			{
				value: 'five',
				date: null
			}
		]
	]);
});

const threeGroupsDuplicateKeysFirstGroup = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 6
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 5
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 'one'
	},
	{
		group: 'Dataset 3',
		key: 'More',
		value: 'two'
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: 'three'
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: 'four'
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: 'five'
	}
];

test('getTableHeaders should extract the correct headers from threeGroupsDuplicateKeysFirstGroup', () => {
	expect(getTableHeaders(threeGroupsDuplicateKeysFirstGroup)).toEqual([
		'Qty', 'Qty', 'More', 'Sold', 'Restocking', 'Misc'
	]);
});

test('getTableBody should generate the correct table body from threeGroupsDuplicateKeysFirstGroup', () => {
	expect(getTableBody(
		threeGroupsDuplicateKeysFirstGroup,
		['Qty', 'Qty', 'More', 'Sold', 'Restocking', 'Misc']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 6,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: 'e',
				date: null
			}
		],
		[
			'Dataset 3',
			{
				value: 'one',
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: 'two',
				date: null
			},
			{
				value: 'three',
				date: null
			},
			{
				value: 'four',
				date: null
			},
			{
				value: 'five',
				date: null
			}
		]
	]);
});

const threeGroupsDuplicateKeysThirdGroup = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 5
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 'one'
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 'six'
	},
	{
		group: 'Dataset 3',
		key: 'More',
		value: 'two'
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: 'three'
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: 'four'
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: 'five'
	}
];

test('getTableHeaders should extract the correct headers from threeGroupsDuplicateKeysThirdGroup', () => {
	expect(getTableHeaders(threeGroupsDuplicateKeysThirdGroup)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Qty'
	]);
});

test('getTableBody should generate the correct table body from threeGroupsDuplicateKeysThirdGroup', () => {
	expect(getTableBody(
		threeGroupsDuplicateKeysThirdGroup,
		['Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Qty']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: 'e',
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 3',
			{
				value: 'one',
				date: null
			},
			{
				value: 'two',
				date: null
			},
			{
				value: 'three',
				date: null
			},
			{
				value: 'four',
				date: null
			},
			{
				value: 'five',
				date: null
			},
			{
				value: 'six',
				date: null
			}
		]
	]);
});

const threeGroupsDuplicateKeysSecondGroup = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 5
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'f'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 'one'
	},
	{
		group: 'Dataset 3',
		key: 'More',
		value: 'two'
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: 'three'
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: 'four'
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: 'five'
	}
];

test('getTableHeaders should extract the correct headers from threeGroupsDuplicateKeysSecondGroup', () => {
	expect(getTableHeaders(threeGroupsDuplicateKeysSecondGroup)).toEqual([
		'Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Qty'
	]);
});

test('getTableBody should generate the correct table body from threeGroupsDuplicateKeysSecondGroup', () => {
	expect(getTableBody(
		threeGroupsDuplicateKeysSecondGroup,
		['Qty', 'More', 'Sold', 'Restocking', 'Misc', 'Qty']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: 'e',
				date: null
			},
			{
				value: 'f',
				date: null
			}
		],
		[
			'Dataset 3',
			{
				value: 'one',
				date: null
			},
			{
				value: 'two',
				date: null
			},
			{
				value: 'three',
				date: null
			},
			{
				value: 'four',
				date: null
			},
			{
				value: 'five',
				date: null
			},
			{
				value: null,
				date: null
			}
		]
	]);
});

const threeGroupsThirdLargerShuffled = [
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 5
	},
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'f'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 'one'
	},
	{
		group: 'Dataset 3',
		key: 'More',
		value: 'two'
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: 'three'
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: 'four'
	},
	{
		group: 'Dataset 3',
		key: 'Test',
		value: 'six'
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: 'five'
	}
];

test('getTableHeaders should extract the correct headers threeGroupsThirdLargerShuffled', () => {
	expect(getTableHeaders(threeGroupsThirdLargerShuffled)).toEqual([
		'Misc', 'Qty', 'More', 'Sold', 'Restocking', 'Qty', 'Test'
	]);
});

test('It should generate the correct table body threeGroupsThirdLargerShuffled', () => {
	expect(getTableBody(
		threeGroupsThirdLargerShuffled,
		['Misc', 'Qty', 'More', 'Sold', 'Restocking', 'Qty', 'Test']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 5,
				date: null
			},
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'e',
				date: null
			},
			{
				value: 'a',
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: 'f',
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 3',
			{
				value: 'five',
				date: null
			},
			{
				value: 'one',
				date: null
			},
			{
				value: 'two',
				date: null
			},
			{
				value: 'three',
				date: null
			},
			{
				value: 'four',
				date: null
			},
			{
				value: null,
				date: null
			},
			{
				value: 'six',
				date: null
			}
		]
	]);
});

const threeGroupsFirstLargerShuffled = [
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 5
	},
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'More',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Test',
		value: 6
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'More',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 'one'
	},
	{
		group: 'Dataset 3',
		key: 'More',
		value: 'two'
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: 'three'
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: 'four'
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: 'five'
	}
];

test('getTableHeaders should extract the correct headers from threeGroupsFirstLargerShuffled', () => {
	expect(getTableHeaders(threeGroupsFirstLargerShuffled)).toEqual([
		'Misc', 'Qty', 'More', 'Sold', 'Restocking', 'Test'
	]);
});

test('getTableBody should generate the correct table body from threeGroupsFirstLargerShuffled', () => {
	expect(getTableBody(
		threeGroupsFirstLargerShuffled,
		['Misc', 'Qty', 'More', 'Sold', 'Restocking', 'Test']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 5,
				date: null
			},
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 6,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'e',
				date: null
			},
			{
				value: 'a',
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'd',
				date: null
			},
			{
				value: null,
				date: null
			}
		],
		[
			'Dataset 3',
			{
				value: 'five',
				date: null
			},
			{
				value: 'one',
				date: null
			},
			{
				value: 'two',
				date: null
			},
			{
				value: 'three',
				date: null
			},
			{
				value: 'four',
				date: null
			},
			{
				value: null,
				date: null
			}
		]
	]);
});

test('updateDatapoint should update the right data point in threeGroupsFirstLargerShuffled', () => {
	expect(updateDatapoint(
		1,
		3,
		JSON.parse(JSON.stringify(threeGroupsFirstLargerShuffled)),
		{ value: 'hello!' },
		['Misc', 'Qty', 'More', 'Sold', 'Restocking', 'Test']
	)).toEqual([
		{
			group: 'Dataset 1',
			key: 'Misc',
			value: 5
		},
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 1
		},
		{
			group: 'Dataset 1',
			key: 'More',
			value: 2
		},
		{
			group: 'Dataset 1',
			key: 'Sold',
			value: 3
		},
		{
			group: 'Dataset 1',
			key: 'Restocking',
			value: 4
		},
		{
			group: 'Dataset 1',
			key: 'Test',
			value: 6
		},
		{
			group: 'Dataset 2',
			key: 'Qty',
			value: 'a'
		},
		{
			group: 'Dataset 2',
			key: 'More',
			value: 'b'
		},
		{
			group: 'Dataset 2',
			key: 'Sold',
			value: 'hello!'
		},
		{
			group: 'Dataset 2',
			key: 'Restocking',
			value: 'd'
		},
		{
			group: 'Dataset 2',
			key: 'Misc',
			value: 'e'
		},
		{
			group: 'Dataset 3',
			key: 'Qty',
			value: 'one'
		},
		{
			group: 'Dataset 3',
			key: 'More',
			value: 'two'
		},
		{
			group: 'Dataset 3',
			key: 'Sold',
			value: 'three'
		},
		{
			group: 'Dataset 3',
			key: 'Restocking',
			value: 'four'
		},
		{
			group: 'Dataset 3',
			key: 'Misc',
			value: 'five'
		}
	]);
});

test('updateGroup should update the right group in threeGroupsFirstLargerShuffled', () => {
	expect(
		updateGroup(2, JSON.parse(JSON.stringify(threeGroupsFirstLargerShuffled)), 'New group name!')
	).toEqual([
		{
			group: 'Dataset 1',
			key: 'Misc',
			value: 5
		},
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 1
		},
		{
			group: 'Dataset 1',
			key: 'More',
			value: 2
		},
		{
			group: 'Dataset 1',
			key: 'Sold',
			value: 3
		},
		{
			group: 'Dataset 1',
			key: 'Restocking',
			value: 4
		},
		{
			group: 'Dataset 1',
			key: 'Test',
			value: 6
		},
		{
			group: 'Dataset 2',
			key: 'Qty',
			value: 'a'
		},
		{
			group: 'Dataset 2',
			key: 'More',
			value: 'b'
		},
		{
			group: 'Dataset 2',
			key: 'Sold',
			value: 'c'
		},
		{
			group: 'Dataset 2',
			key: 'Restocking',
			value: 'd'
		},
		{
			group: 'Dataset 2',
			key: 'Misc',
			value: 'e'
		},
		{
			group: 'New group name!',
			key: 'Qty',
			value: 'one'
		},
		{
			group: 'New group name!',
			key: 'More',
			value: 'two'
		},
		{
			group: 'New group name!',
			key: 'Sold',
			value: 'three'
		},
		{
			group: 'New group name!',
			key: 'Restocking',
			value: 'four'
		},
		{
			group: 'New group name!',
			key: 'Misc',
			value: 'five'
		}
	]);
});

test('updateKey should update the right key in threeGroupsFirstLargerShuffled', () => {
	expect(updateKey(
		5,
		JSON.parse(JSON.stringify(threeGroupsFirstLargerShuffled)),
		'Yo!',
		['Misc', 'Qty', 'More', 'Sold', 'Restocking', 'Test']
	)).toEqual([
		{
			group: 'Dataset 1',
			key: 'Misc',
			value: 5
		},
		{
			group: 'Dataset 1',
			key: 'Qty',
			value: 1
		},
		{
			group: 'Dataset 1',
			key: 'More',
			value: 2
		},
		{
			group: 'Dataset 1',
			key: 'Sold',
			value: 3
		},
		{
			group: 'Dataset 1',
			key: 'Restocking',
			value: 4
		},
		{
			group: 'Dataset 1',
			key: 'Yo!',
			value: 6
		},
		{
			group: 'Dataset 2',
			key: 'Qty',
			value: 'a'
		},
		{
			group: 'Dataset 2',
			key: 'More',
			value: 'b'
		},
		{
			group: 'Dataset 2',
			key: 'Sold',
			value: 'c'
		},
		{
			group: 'Dataset 2',
			key: 'Restocking',
			value: 'd'
		},
		{
			group: 'Dataset 2',
			key: 'Misc',
			value: 'e'
		},
		{
			group: 'Dataset 3',
			key: 'Qty',
			value: 'one'
		},
		{
			group: 'Dataset 3',
			key: 'More',
			value: 'two'
		},
		{
			group: 'Dataset 3',
			key: 'Sold',
			value: 'three'
		},
		{
			group: 'Dataset 3',
			key: 'Restocking',
			value: 'four'
		},
		{
			group: 'Dataset 3',
			key: 'Misc',
			value: 'five'
		}
	]);
});

test('generateRow should generate a row for threeGroupsFirstLargerShuffled', () => {
	expect(generateRow(
		threeGroupsFirstLargerShuffled,
		['Misc', 'Qty', 'More', 'Sold', 'Restocking', 'Test']
	)).toEqual([
		{
			group: 'Dataset 0',
			key: 'Misc',
			value: 0,
			date: new Date('2063-04-05')
		},
		{
			group: 'Dataset 0',
			key: 'Qty',
			value: 1,
			date: new Date('2063-04-05')
		},
		{
			group: 'Dataset 0',
			key: 'More',
			value: 2,
			date: new Date('2063-04-05')
		},
		{
			group: 'Dataset 0',
			key: 'Sold',
			value: 3,
			date: new Date('2063-04-05')
		},
		{
			group: 'Dataset 0',
			key: 'Restocking',
			value: 4,
			date: new Date('2063-04-05')
		},
		{
			group: 'Dataset 0',
			key: 'Test',
			value: 5,
			date: new Date('2063-04-05')
		}
	]);
});

const fourGroupsDuplicateKeys = [
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 1
	},
	{
		group: 'Dataset 1',
		key: 'Qty',
		value: 2
	},
	{
		group: 'Dataset 1',
		key: 'Sold',
		value: 3
	},
	{
		group: 'Dataset 1',
		key: 'Misc',
		value: 4
	},
	{
		group: 'Dataset 1',
		key: 'Restocking',
		value: 5
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'a'
	},
	{
		group: 'Dataset 2',
		key: 'Qty',
		value: 'b'
	},
	{
		group: 'Dataset 2',
		key: 'Sold',
		value: 'c'
	},
	{
		group: 'Dataset 2',
		key: 'Restocking',
		value: 'd'
	},
	{
		group: 'Dataset 2',
		key: 'Misc',
		value: 'e'
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 'one'
	},
	{
		group: 'Dataset 3',
		key: 'Qty',
		value: 'two'
	},
	{
		group: 'Dataset 3',
		key: 'Sold',
		value: 'three'
	},
	{
		group: 'Dataset 3',
		key: 'Restocking',
		value: 'four'
	},
	{
		group: 'Dataset 3',
		key: 'Misc',
		value: 'five'
	},
	{
		group: 'Dataset 4',
		key: 'Qty',
		value: '1'
	},
	{
		group: 'Dataset 4',
		key: 'Qty',
		value: '2'
	},
	{
		group: 'Dataset 4',
		key: 'Sold',
		value: '3'
	},
	{
		group: 'Dataset 4',
		key: 'Restocking',
		value: '4'
	},
	{
		group: 'Dataset 4',
		key: 'Misc',
		value: '5'
	}
];

test('getTableHeaders should extract the correct headers from fourGroupsDuplicateKeys', () => {
	expect(getTableHeaders(fourGroupsDuplicateKeys)).toEqual([
		'Qty', 'Qty', 'Sold', 'Misc', 'Restocking'
	]);
});

test('getTableBody should generate the correct table body from threeGroupsFirstLargerShuffled', () => {
	expect(getTableBody(
		fourGroupsDuplicateKeys,
		['Qty', 'Qty', 'Sold', 'Misc', 'Restocking']
	)).toEqual([
		[
			'Dataset 1',
			{
				value: 1,
				date: null
			},
			{
				value: 2,
				date: null
			},
			{
				value: 3,
				date: null
			},
			{
				value: 4,
				date: null
			},
			{
				value: 5,
				date: null
			}
		],
		[
			'Dataset 2',
			{
				value: 'a',
				date: null
			},
			{
				value: 'b',
				date: null
			},
			{
				value: 'c',
				date: null
			},
			{
				value: 'e',
				date: null
			},
			{
				value: 'd',
				date: null
			}
		],
		[
			'Dataset 3',
			{
				value: 'one',
				date: null
			},
			{
				value: 'two',
				date: null
			},
			{
				value: 'three',
				date: null
			},
			{
				value: 'five',
				date: null
			},
			{
				value: 'four',
				date: null
			}
		],
		[
			'Dataset 4',
			{
				value: '1',
				date: null
			},
			{
				value: '2',
				date: null
			},
			{
				value: '3',
				date: null
			},
			{
				value: '5',
				date: null
			},
			{
				value: '4',
				date: null
			}
		]
	]);
});
