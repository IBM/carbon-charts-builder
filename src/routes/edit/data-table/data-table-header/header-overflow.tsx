import React from 'react';

import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import {
	addColumn,
	removeColumn,
	generateColumn
} from '../data-table-tools';
import { DataTableState } from '../data-table';

export interface HeaderOverflowProps {
	state: DataTableState,
	updateData: (chartData: any) => void,
	columnIndex: number,
	chart: any
}

export const HeaderOverflow = ({ state, updateData, columnIndex, chart }: HeaderOverflowProps) => (
	<OverflowMenu
		ariaLabel='Table options'
		iconDescription=''
		onClick={
			(event: { stopPropagation: () => void; }) => { event.stopPropagation(); }
		}>
		<OverflowMenuItem
			itemText='Add column left'
			onClick={() =>
				addColumn(columnIndex, chart.data, generateColumn(chart.data), state.headers, updateData)
			} />
		<OverflowMenuItem
			itemText='Add column right'
			onClick={() =>
				addColumn(columnIndex + 1, chart.data, generateColumn(chart.data), state.headers, updateData)
			} />
		<OverflowMenuItem
			isDelete
			itemText='Remove column'
			onClick={() => removeColumn(columnIndex, chart.data, state.headers, updateData)} />
	</OverflowMenu>
);
