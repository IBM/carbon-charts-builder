import React from 'react';

import {
	FileUploaderButton,
	TableToolbar,
	TableToolbarAction,
	TableToolbarContent,
	TableToolbarSearch,
	TableToolbarMenu
} from 'carbon-components-react';
import { Download32 } from '@carbon/icons-react';
import { css } from 'emotion';
import {
	saveBlob,
	getFullFileName,
	processDataFile,
	warningNotificationProps,
	errorNotificationProps
} from '../../../utils/file-tools';
import { DataTableState } from './data-table';
const toolbarContent = css`
	background: white;
`;

export interface DataTableToolbarProps {
	state: DataTableState,
	setState: (state: DataTableState) => void,
	updateData: (chartData: any[]) => void,
	setNotificationState: (notificationState: any) => void,
	chart: any,
	isTimeSeries: boolean
}

export const DataTableToolbar = ({
	state,
	setState,
	updateData,
	setNotificationState,
	chart,
	isTimeSeries
}: DataTableToolbarProps) => {
	const generateCsvFile = () => {
		let generatedCsvString = `group,${ state.headers.join() }\n`;

		state.body.forEach((row: any) => {
			const datasetString = row.reduce((generatedString: string, datapoint: any, index: number) => {
				if (index === 0) {
					return generatedString.concat(`${datapoint},`);
				}

				if (datapoint.value !== undefined) {
					if (datapoint.date !== undefined && isTimeSeries) {
						return generatedString.concat(`${datapoint.value}|${datapoint.date},`);
					}
					return generatedString.concat(`${datapoint.value},`);
				}

				return generatedString;
			}, '').replace(/.$/, '\n');

			generatedCsvString = generatedCsvString.concat(datasetString);
		});

		// Remove whitespace from beginning and end of a string.
		generatedCsvString = generatedCsvString.replace(/^\s+|\s+$/g, '');

		return generatedCsvString;
	};

	const generateJsonFile = () => JSON.stringify(chart.data);

	const downloadFile = (fileContent: string, mimeType: string = 'text/csv') => {
		const blob = new Blob([fileContent], { type: mimeType });
		const fileName = getFullFileName('data', mimeType);
		saveBlob(blob, fileName);
	};

	const handleUpload = (file: FileList) => {
		const [fileUploaded] = Array.from(file);
		processDataFile(fileUploaded).then((result: any) => {
			if (result.wasDataModified) {
				setNotificationState({
					notificationProps: { ...warningNotificationProps },
					visible: true,
					backupData: chart.data
				});
			}

			updateData(result.data);
		}).catch((err) => {
			setNotificationState({
				notificationProps: {
					...errorNotificationProps,
					subtitle: err
				},
				visible: true
			});
		});
	};

	return (
		<TableToolbar>
			<TableToolbarContent className={toolbarContent}>
				<TableToolbarSearch
					onChange={(event: any) => {
						setState({
							...state,
							filter: event.target.value
						});
					}} />
			</TableToolbarContent>
			<TableToolbarMenu
				style={{ background: 'white' }}
				ariaLabel='Download'
				title='Download'
				renderIcon={() => <Download32 style={{ height: '100%' }} />}>
				<TableToolbarAction primaryFocus onClick={() => downloadFile(generateCsvFile(), 'text/csv')}>
					Export as .csv
				</TableToolbarAction>
				<TableToolbarAction onClick={() => downloadFile(generateJsonFile(), 'application/json')}>
					Export as .json
				</TableToolbarAction>
			</TableToolbarMenu>
			<FileUploaderButton
				size='small'
				title='Upload data'
				labelText="Upload data"
				multiple={false}
				onChange={(event: any) => { handleUpload(event.target.files); }}>
			</FileUploaderButton>
		</TableToolbar>
	);
};
