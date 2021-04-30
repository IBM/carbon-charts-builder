import { extension } from 'mime-types';
import Papa from 'papaparse';
import { getGroupNames } from './chart-tools';

const restoreUploadedJsonData = (chartData: any) => {
	let restoredUploadedData = chartData;

	let isDataInvalid = false;

	const groupNames = getGroupNames(chartData);
	const controlGroup = chartData.filter((datapoint: any) => datapoint.group === groupNames[0]);
	const uniqueKeys = controlGroup.map((datapoint: any) => datapoint.key);

	for (let i = 1; i < groupNames.length; i++) {
		const groupName = groupNames[i];
		const group = chartData.filter((datapoint: any) => datapoint.group === groupName);

		const counters: any = {};

		for (let j = 0; j < group.length; j++) {
			const { key } = group[j];
			const groupDuplicateKeys = group.filter((datapoint: any) => datapoint.key === key);
			const headerDuplicateKeys = uniqueKeys.filter((header: string) => header === key);
			// Count the occurrences.
			if (counters[key] > headerDuplicateKeys.length) {
				counters[key]++;
				uniqueKeys.push(key);

				// If we ever get here it means a group has a key that the control group does not.
				// We add `empty` data to the control group with the missing key to prevent a visual
				// bug with the table (Adding columns to the left or right).
				isDataInvalid = true;
				restoredUploadedData = [
					{
						group: groupNames[0],
						key: group[j].key,
						value: null,
						date: null
					},
					...restoredUploadedData
				];
			} else if (!uniqueKeys.includes(key)) {
				uniqueKeys.push(key);
				counters[key] = groupDuplicateKeys.length;

				// If we ever get here it means a group has a key that the control group does not.
				// We add `empty` data to the control group with the missing key to prevent a visual
				// bug with the table (Adding columns to the left or right).
				isDataInvalid = true;
				restoredUploadedData = [
					{
						group: groupNames[0],
						key: group[j].key,
						value: null,
						date: null
					},
					...restoredUploadedData
				];
			}
			else {
				counters[key] = groupDuplicateKeys.length;
			}
		}
	}

	return {
		wasDataModified: isDataInvalid,
		data: restoredUploadedData
	};
};


export const getFullFileName = (name: string, mimeType: string) => (
	`${name}.${extension(mimeType)}`
);

export const saveFile = (url: string, fileName: string) => {
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = fileName;
	anchor.click();
};

export const saveBlob = (blob: any, fileName: string) => {
	const url = URL.createObjectURL(blob);
	saveFile(url, fileName);

	// Give it a second to download :)
	setTimeout(() => {
		URL.revokeObjectURL(url);
	}, 1000);
};

export const processDataFile = (file: any) => new Promise<any>((resolve, reject) => {
	// Handles upload of one file at the moment.
	const reader = new FileReader();
	reader.onloadend = (event: any) => {
		if (!file) {
			reject('No file was provided');
			return;
		}

		if (file.type === 'application/json') {
			const uploadedData = JSON.parse(event.target.result);
			const restoredUploadedData = restoreUploadedJsonData(uploadedData);
			resolve({
				...restoredUploadedData,
				originalData: uploadedData
			});
		}

		/**
		 * This takes in csvs in the following format:
		 *
		 * group,		label 1,		label 2,		label 3,
		 * Dataset 1,	1,				2,				3,
		 * Dataset 2,	4,				5,				6,
		 * Dataset 3,	7,				8,				9
		 *
		 * `group` column can be put in any column and they represent the dataset names for each row.
		 * `group` column is not mandatory.
		 *
		 * If you want to add in a date to a datapoint, you can do so by adding a `|` after a value, ie.
		 * 12|["2069-08-20T10:26:46.864Z"].
		 *
		 */
		if (file.type === 'text/csv') {
			const result = Papa.parse(event.target.result) as { data: any[] };
			if (!result.data.length) {
				reject('File does not contain data');
				return;
			}

			let isDataInvalid = false;
			const header = result.data[0] as any;

			// This makes sure all rows are equal in length.
			const maxRowLength: any = (result.data as any).reduce((maxLength: number, row: any) => {
				isDataInvalid = maxLength !== row.length || isDataInvalid;
				return Math.max(maxLength, row.length);
			}, header.length);

			// Fill in missing data if needed.
			if (isDataInvalid) {
				result.data = result.data.map((row: any, rowIndex: number) => {
					// Fill header with default labels to max row length.
					if (rowIndex === 0) {
						return row.concat(
							(new Array(maxRowLength - row.length)).fill(0)
								.map((_, columnIndex: number) => `label ${row.length + columnIndex}`)
						);
					}
					// Fill dataset rows with null values to max row length.
					return row.concat((new Array(maxRowLength - row.length)).fill('null'));
				});
			}

			// Check if the csv contains the group header indicating that dataset names are provided.
			const isGrouped = header.some((header: string) => header.toLowerCase() === 'group');
			// If dataset names are provided, this finds the column index of the dataset names.
			// If there are no dataset names provided, this is set to -1 because it is used to slice
			// the row array when creating the dataset data and indexing starts at 1 to remove elements
			// so setting it to -1 and adding one to it prevents the removal of an array element.
			const groupIndex = isGrouped
				? header.findIndex((header: string) => header.toLowerCase() === 'group')
				: -1;

			// // Create a chart data object from the results.
			// const keys = header.filter((header: string) => header.toLowerCase() !== 'group');
			const data: any = [];
			result.data.slice(1).forEach((row: any, rowIndex: number) => {
				row.forEach((rowItem: any, columnIndex: number) => {
					if (columnIndex === groupIndex) {
						return;
					}

					// If the array generated from splitting the string with a | delimeter is 2, there
					// is a date provided in the second index of the array. The date always needs to come
					// second.
					const datapoint = rowItem.split('|');
					// Humans make first contact with an alien race, the Vulcans, following the
					// success of Zefram Cochrane's warp drive in the Phoenix launch
					// earlier in the day (Star Trek: First Contact)
					let date = new Date('2063-04-05');
					let value: number | null = Number.parseFloat(datapoint[0]);
					if (datapoint.length === 2) {
						date = new Date(datapoint[1]);
					}
					// If result of given value is not a number, set the value to null.
					if (Number.isNaN(value)) {
						value = null;
					}

					const key = result.data[0][columnIndex];
					// `rowIndex + 1` because we skipped the first row of keys.
					const group = result.data[rowIndex + 1][groupIndex];

					data.push({
						value,
						date,
						key,
						group
					});
				});
			});

			resolve({
				data,
				wasDataModified: isDataInvalid
			});
		}
	};
	reader.onerror = (err) => {
		console.log(err);
		reject(err);
	};
	if (file) {
		reader.readAsText(file);
	}
});

export const warningNotificationProps = {
	lowContrast: true,
	role: 'alert',
	notificationType: 'inline',
	kind: 'warning',
	title: 'Uploaded data has been modified',
	subtitle: 'data did not match expected format so we modified it so you can still use it'
};

export const errorNotificationProps = {
	lowContrast: true,
	role: 'alert',
	notificationType: 'inline',
	kind: 'error',
	title: 'Error',
	subtitle: ''
};
