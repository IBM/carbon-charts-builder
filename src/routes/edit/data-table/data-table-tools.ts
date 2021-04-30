import { getGroupNames } from '../../../utils/chart-tools';

const findNth = (array: any[], fn: (value: any) => boolean, n = 1) => {
	let i = 0;
	// To prevent `no-param-reassign` lint error.
	let counter = n;
	for (i; i < array.length; i++) {
		const item = array[i];
		if (fn(item)) {
			counter--;
		}

		if (counter === 0) {
			break;
		}
	}
	if (i >= array.length) {
		return {
			item: undefined,
			index: -1
		};
	}
	return {
		item: array[i],
		index: i
	};
};

export const getTableBody = (chartData: any, headers?: string[]) => {
	// To prevent `no-param-reassign` lint error.
	let tableHeaders = headers;

	if (!tableHeaders) {
		tableHeaders = getTableHeaders(chartData);
	}

	const groupNames = getGroupNames(chartData);
	const table: any[] = [];

	// This needs to be here to avoid Object is possibly 'undefined' compiler error.
	// The check in `getTableHeaders` isn't enough.
	if (!tableHeaders) {
		return table;
	}

	for (let i = 0; i < groupNames.length; i++) {
		const groupName = groupNames[i];
		const group = chartData.filter((datapoint: any) => datapoint.group === groupName);

		// Account for duplicate keys.
		const counters: any = {};

		const row = [groupName];

		// Based on the order of the table headers,
		// place all date/value pairs in the index of its' associated key.
		tableHeaders.forEach((header: string, headerIndex: number) => {
			const { item } = findNth(
				group,
				(datapoint: any) => datapoint.key === header, counters[header] ? counters[header] + 1 : 1
			);
			if (item) {
				if (counters[header]) {
					counters[header]++;
				} else {
					counters[header] = 1;
				}
				row[headerIndex + 1] = {
					value: item.value,
					date: item.date || null
				};
			} else {
				row[headerIndex + 1] = {
					value: null,
					date: null
				};
			}
		});
		table.push(row);
	}

	return table;
};

export const getTableHeaders = (chartData: any) => {
	if (!chartData) {
		return [];
	}
	const groupNames = getGroupNames(chartData);
	const controlGroup = chartData.filter((datapoint: any) => datapoint.group === groupNames[0]);
	const tableHeader = controlGroup.map((datapoint: any) => datapoint.key);

	for (let i = 1; i < groupNames.length; i++) {
		const groupName = groupNames[i];
		const group = chartData.filter((datapoint: any) => datapoint.group === groupName);

		// Account for duplicate keys.
		const counters: any = {};

		group.forEach(({ key }: any) => {
			const groupDuplicateKeys = group.filter((datapoint: any) => datapoint.key === key);
			const headerDuplicateKeys = tableHeader.filter((header: string) => header === key);
			// Count the occurrences.
			if (counters[key] > headerDuplicateKeys.length) {
				counters[key]++;
				tableHeader.push(key);
			} else if (!tableHeader.includes(key)) {
				tableHeader.push(key);
				counters[key] = groupDuplicateKeys.length;
			} else {
				counters[key] = groupDuplicateKeys.length;
			}
		});
	}

	return tableHeader;
};

export const addColumn = (
	index: number,
	chartData: any[],
	column: any[],
	headers?: string[],
	updateData?: (newData: any) => void
) => {
	// To prevent `no-param-reassign` lint error.
	const tableHeaders = headers || getTableHeaders(chartData);

	let newChartData = chartData;

	if (index >= tableHeaders.length || !newChartData.length) {
		newChartData = [...newChartData, ...column];
		if (updateData) {
			updateData(newChartData);
		}
		return newChartData;
	}

	const key = tableHeaders[index];
	const previousDuplicates = tableHeaders.slice(0, index + 1).filter((header: string) => header === key);

	const groupNames = getGroupNames(newChartData);

	// Find the correct index in `chartData` to insert the new column
	// so that its' key will be at the given column index in the table.
	for (let i = 0; i < groupNames.length; i++) {
		const groupName = groupNames[i];
		// Account for duplicate keys.
		let counter = previousDuplicates.length;
		for (let j = 0; j < newChartData.length; j++) {
			if (newChartData[j].group !== groupName) {
				continue;
			}
			if (tableHeaders[index] === newChartData[j].key) {
				if (counter <= 1) {
					newChartData = [...newChartData.slice(0, j), ...column, ...newChartData.slice(j)];
					if (updateData) {
						updateData(newChartData);
					}
					return newChartData;
				}
				counter--;
			}
		}
	}

	if (updateData) {
		updateData(newChartData);
	}

	return newChartData;
};

export const generateColumn = (chartData: any[]) => {
	if (!chartData.length) {
		return [{
			group: 'Dataset 0',
			key: 'Label 0',
			value: 0,
			date: new Date('2063-04-05')
		}];
	}
	let labelSuffix = 0;
	// Cannot put this in directly in while loop condition because of no-loop-func in eslint:
	// `Function declared in a loop contains unsafe references to variable(s)`.
	const findDuplicateKey = (key: string) => (key === `Label ${labelSuffix}`);
	while (chartData.some((datapoint: any) => findDuplicateKey(datapoint.key))) {
		labelSuffix++;
	}
	const key = `Label ${labelSuffix}`;

	const groupNames = getGroupNames(chartData);
	const column = groupNames.map((groupName: string, index: number) => ({
		group: groupName,
		key,
		value: index,
		// Humans make first contact with an alien race, the Vulcans, following the
		// success of Zefram Cochrane's warp drive in the Phoenix launch
		// earlier in the day (Star Trek: First Contact)
		date: new Date('2063-04-05')
	}));

	return column;
};

export const removeColumn = (
	index: number,
	chartData: any[],
	headers?: string[],
	updateData?: (newData: any) => void
) => {
	// To prevent `no-param-reassign` lint error.
	const tableHeaders = headers || getTableHeaders(chartData);
	let columnIndex = index;

	if (!chartData.length) {
		return chartData;
	}

	if (columnIndex > tableHeaders.length - 1) {
		columnIndex = tableHeaders.length - 1;
	}

	const key = tableHeaders[columnIndex];
	const previousDuplicates = tableHeaders.slice(0, columnIndex + 1)
		.filter((header: string) => header === key);

	const groupNames = getGroupNames(chartData);
	let newChartData = chartData;

	// Remove all datapoints associated with the key that is in the given column index.
	groupNames.forEach((groupName: string) => {
		// Account for duplicate headers.
		let counter = previousDuplicates.length;
		for (let i = 0; i < newChartData.length; i++) {
			if (newChartData[i].group !== groupName) {
				continue;
			}
			if (tableHeaders[columnIndex] === newChartData[i].key) {
				if (counter <= 1) {
					newChartData = [...newChartData.slice(0, i), ...newChartData.slice(i + 1)];
					break;
				}
				counter--;
			}
		}
	});

	if (updateData) {
		updateData(newChartData);
	}

	return newChartData;
};

export const addRow = (
	index: number,
	chartData: any[],
	row: any[],
	updateData?: (newData: any) => void
) => {
	let newChartData = chartData;

	if (!newChartData.length) {
		newChartData = [...row, ...newChartData];
		if (updateData) {
			updateData(newChartData);
		}
		return newChartData;
	}

	let counter = index;

	const groupNames = getGroupNames(chartData);

	// Find the correct index in `chartData` to insert the new row
	// so that its' group will be at the given row index in the table.
	for (let i = 0; i < groupNames.length; i++) {
		const groupName = groupNames[i];
		for (let j = 0; j < chartData.length; j++) {
			if (chartData[j].group !== groupName || counter !== 0) {
				continue;
			}
			newChartData = [...chartData.slice(0, j), ...row, ...chartData.slice(j)];
			if (updateData) {
				updateData(newChartData);
			}
			return newChartData;
		}
		counter--;
	}

	newChartData = [...chartData, ...row];

	if (updateData) {
		updateData(newChartData);
	}

	return newChartData;
};

export const generateRow = (chartData: any[], headers?: string[]) => {
	// To prevent `no-param-reassign` lint error.
	const tableHeaders = headers || getTableHeaders(chartData);

	if (!chartData.length || !tableHeaders) {
		return [{
			group: 'Dataset 0',
			key: 'Label 0',
			value: 0,
			date: new Date('2063-04-05')
		}];
	}
	let groupSuffix = 0;
	// Cannot put this in directly in while loop condition because of no-loop-func in eslint:
	// `Function declared in a loop contains unsafe references to variable(s)`.
	const findDuplicateGroup = (group: string) => (group === `Dataset ${groupSuffix}`);
	while (chartData.some((datapoint: any) => findDuplicateGroup(datapoint.group))) {
		groupSuffix++;
	}
	const group = `Dataset ${groupSuffix}`;

	const row = tableHeaders.map((key: string, index: number) => ({
		group,
		key,
		value: index,
		// Humans make first contact with an alien race, the Vulcans, following the
		// success of Zefram Cochrane's warp drive in the Phoenix launch
		// earlier in the day (Star Trek: First Contact)
		date: new Date('2063-04-05')
	}));

	return row;
};

export const removeRow = (
	index: number,
	chartData: any[],
	updateData?: (newData: any) => void
) => {
	// To prevent `no-param-reassign` lint error.
	let rowIndex = index;

	if (!chartData.length) {
		return chartData;
	}

	if (rowIndex < 0) {
		rowIndex = 0;
	}

	const groupNames = getGroupNames(chartData);
	if (rowIndex > groupNames.length - 1) {
		rowIndex = groupNames.length - 1;
	}
	const groupNameToRemove = groupNames[rowIndex];
	const newData = chartData.filter((datapoint: any) => datapoint.group !== groupNameToRemove);

	if (updateData) {
		updateData(newData);
	}

	return newData;
};

export const updateGroup = (
	index: number,
	chartData: any[],
	newGroup: string,
	updateData?: (newData: any) => void
) => {
	// To prevent `no-param-reassign` lint error.
	let rowIndex = index;

	if (!chartData.length) {
		return chartData;
	}

	if (rowIndex < 0) {
		rowIndex = 0;
	}

	const groupNames = getGroupNames(chartData);
	if (rowIndex > groupNames.length - 1) {
		rowIndex = groupNames.length - 1;
	}
	const groupToUpdate = groupNames[rowIndex];

	const newData = chartData.map((datapoint: any) => ({
		...datapoint,
		group: datapoint.group === groupToUpdate ? newGroup : datapoint.group
	}));

	if (updateData) {
		updateData(newData);
	}

	return newData;
};

export const updateKey = (
	index: number,
	chartData: any[],
	newKey: string,
	headers?: string[],
	updateData?: (newData: any) => void
) => {
	// To prevent `no-param-reassign` lint error.
	const tableHeaders = headers || getTableHeaders(chartData);
	let columnIndex = index;

	if (!chartData.length || !tableHeaders) {
		return chartData;
	}

	if (columnIndex > tableHeaders.length - 1) {
		columnIndex = tableHeaders.length - 1;
	}

	const key = tableHeaders[columnIndex];
	const previousDuplicates = tableHeaders.slice(0, columnIndex + 1)
		.filter((header: string) => header === key);

	const groupNames = getGroupNames(chartData);
	const newChartData = [...chartData];

	// Change the keys of all the datapoints associated with the key
	// in the given index.
	groupNames.forEach((groupName: string) => {
		// Account for duplicate keys.
		let counter = previousDuplicates.length;
		for (let i = 0; i < newChartData.length; i++) {
			if (newChartData[i].group !== groupName) {
				continue;
			}
			if (tableHeaders[columnIndex] === newChartData[i].key) {
				if (counter <= 1) {
					newChartData[i].key = newKey;
					break;
				}
				counter--;
			}
		}
	});

	if (updateData) {
		updateData(newChartData);
	}

	return newChartData;
};

export const updateDatapoint = (
	rowIndex: number,
	columnIndex: number,
	chartData: any[],
	newDatapoint: any,
	headers?: string[],
	updateData?: (newData: any) => void
) => {
	// To prevent `no-param-reassign` lint error.
	const tableHeaders = headers || getTableHeaders(chartData);
	let groupIndex = rowIndex;
	let keyIndex = columnIndex;

	if (!chartData.length || !tableHeaders) {
		return chartData;
	}

	if (keyIndex > tableHeaders.length - 1) {
		keyIndex = tableHeaders.length - 1;
	}

	const key = tableHeaders[keyIndex];
	const previousDuplicates = tableHeaders.slice(0, keyIndex + 1).filter((header: string) => header === key);

	const groupNames = getGroupNames(chartData);
	if (groupIndex > groupNames.length - 1) {
		groupIndex = groupNames.length - 1;
	}
	const groupToUpdate = groupNames[groupIndex];
	const newChartData = [...chartData];

	// Account for duplicate keys.
	let counter = previousDuplicates.length;
	// Find the correct datapoint associated with the given
	// `rowIndex` and `columnIndex` of the table and modify.
	for (let i = 0; i < newChartData.length; i++) {
		if (newChartData[i].group !== groupToUpdate) {
			continue;
		}
		if (newChartData[i].key === key) {
			if (counter <= 1) {
				newChartData[i].value = newDatapoint.value;
				newChartData[i].date = newDatapoint.date;
				if (updateData) {
					updateData(newChartData);
				}
				return newChartData;
			}
			counter--;
		}
	}

	if (updateData) {
		updateData(newChartData);
	}

	return newChartData;
};
