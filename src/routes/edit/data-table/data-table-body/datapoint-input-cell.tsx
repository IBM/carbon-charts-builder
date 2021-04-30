import React from 'react';

import {
	DatePicker,
	DatePickerInput,
	TableCell,
	TextInput
} from 'carbon-components-react';
import { css } from 'emotion';
import { updateDatapoint } from '../data-table-tools';
import { DataTableState } from '../data-table';

const datapointInput = css`
	width: 100%;
	border-bottom: 0px;
	background: white;
`;

const tableDatePicker = css`
	input {
		background: white;
		border-top: 1px solid #e0e0e0;
		border-bottom: none;
	}
`;

export interface DatapointInputCellProps {
	state: DataTableState,
	datapoint: any,
	updateData: (chartData: any[]) => void,
	chart: any,
	rowIndex: number,
	columnIndex: number,
	isTimeSeries: boolean
}

export const DatapointInputCell = ({
	datapoint,
	updateData,
	chart,
	rowIndex,
	columnIndex,
	isTimeSeries,
	state
}: DatapointInputCellProps) => (
	<TableCell key={`datapoint-${state.rowKeys[rowIndex]}-${state.columnKeys[columnIndex]}`}>
		<TextInput
			className={datapointInput}
			aria-label='Modify datapoint value'
			placeholder='null'
			id={`datapoint-${state.rowKeys[rowIndex]}-${state.columnKeys[columnIndex]}`}
			labelText=''
			defaultValue={
				datapoint.value === null || datapoint.value === undefined ? '' : datapoint.value
			}
			onChange={(event: any) => {
				updateDatapoint(
					rowIndex,
					columnIndex,
					chart.data,
					{
						value: Number(event.target.value),
						date: datapoint.date
					},
					state.headers,
					updateData
				);
			}} />
		{
			isTimeSeries
			&& <DatePicker
				className={tableDatePicker}
				id={`datepicker-${state.rowKeys[rowIndex]}-${state.columnKeys[columnIndex]}`}
				datePickerType='single'
				value={datapoint.date}
				onChange={(event: any) => {
					updateDatapoint(
						rowIndex,
						columnIndex,
						chart.data,
						{
							value: Number(datapoint.value),
							date: event
						},
						state.headers,
						updateData
					);
				}}>
				<DatePickerInput
					labelText=''
					aria-label='Modify datapoint date'
					iconDescription='Open calendar'
					id={`datepicker-input-${state.rowKeys[rowIndex]}-${state.columnKeys[columnIndex]}`}/>
			</DatePicker>
		}
	</TableCell>
);
