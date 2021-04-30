import React from 'react';

import { DatasetInputCell } from './dataset-input-cell';
import { DatapointInputCell } from './datapoint-input-cell';

import { TableBody, TableRow } from 'carbon-components-react';
import { DataTableState } from '../data-table';

export interface DataTableBodyProps {
	state: DataTableState,
	updateData: (chartData: any[]) => void,
	chart: any,
	isTimeSeries: boolean
}

export const DataTableBody = ({
	state,
	updateData,
	chart,
	isTimeSeries
}: DataTableBodyProps) => (
	<TableBody aria-live='off'>
		{
			state.body.map((row: any, rowIndex: number) => {
				const [datasetName] = row;
				if (datasetName && !datasetName.toLowerCase().includes(state.filter.toLowerCase())) {
					return null;
				}
				return (
					<TableRow key={`group-${state.rowKeys[rowIndex]}`}>
						{
							row.map((datapoint: any, columnIndex: number) => {
								if (columnIndex === 0) {
									return (
										<DatasetInputCell
											key={`dataset-cell-${state.rowKeys[rowIndex]}`}
											value={datapoint}
											updateData={updateData}
											rowIndex={rowIndex}
											chart={chart}
											state={state} />
									);
								}
								return (
									<DatapointInputCell
										// eslint-disable-next-line max-len
										key={`datapoint-cell-${state.rowKeys[rowIndex]}-${state.columnKeys[columnIndex]}`}
										datapoint={datapoint}
										updateData={updateData}
										rowIndex={rowIndex}
										isTimeSeries={isTimeSeries}
										chart={chart}
										// columnIndex - 1 to account for dataset name in row
										columnIndex={columnIndex - 1}
										state={state} />
								);
							})
						}
					</TableRow>
				);
			})
		}
	</TableBody>
);
