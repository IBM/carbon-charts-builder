import React from 'react';

import {
	TableCell,
	TextInput,
	OverflowMenu,
	OverflowMenuItem
} from 'carbon-components-react';
import { css } from 'emotion';
import {
	updateGroup,
	generateRow,
	removeRow,
	addRow
} from '../data-table-tools';
import { DataTableState } from '../data-table';

const datasetInputCell = css`
	display: flex;
	min-width: 200px;
`;

const datasetInput = css`
	border: 0px;
	background: white;
`;

export interface DatasetInputCellProps {
	state: DataTableState,
	value: string,
	updateData: (chartData: any[]) => void,
	rowIndex: number,
	chart: any
}

export const DatasetInputCell = ({
	value,
	updateData,
	chart,
	rowIndex,
	state
}: DatasetInputCellProps) => (
	<TableCell className={datasetInputCell} key={`dataset-${state.rowKeys[rowIndex]}`}>
		<TextInput
			className={datasetInput}
			id={`dataset-${state.rowKeys[rowIndex]}`}
			aria-label='Modify dataset name'
			labelText=''
			defaultValue={value}
			onChange={(event: any) => updateGroup(rowIndex, chart.data, event.target.value, updateData)} />
		<OverflowMenu
			ariaLabel='Table options'
			iconDescription=''
			style={{ margin: '0px' }}
			onClick={(event: any) => { event.stopPropagation(); }}>
			<OverflowMenuItem
				itemText='Add dataset below'
				onClick={() => addRow(rowIndex + 1, chart.data, generateRow(chart.data), updateData)} />
			<OverflowMenuItem
				itemText='Add dataset above'
				onClick={() => addRow(rowIndex, chart.data, generateRow(chart.data), updateData)} />
			<OverflowMenuItem
				isDelete
				itemText='Remove row'
				onClick={() => removeRow(rowIndex, chart.data, updateData)} />
		</OverflowMenu>
	</TableCell>
);
