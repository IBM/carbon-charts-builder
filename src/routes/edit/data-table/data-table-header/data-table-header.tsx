import React from 'react';

import { HeaderOverflow } from './header-overflow';

import {
	TableHead,
	TableHeader,
	TableRow,
	TextInput
} from 'carbon-components-react';
import { css } from 'emotion';
import { updateKey } from '../data-table-tools';
import { DataTableState } from '../data-table';

const labelInput = css`
	background: #e0e0e0;
	min-width: 200px;
	border: 0px;
`;

export interface DataTableHeaderProps {
	state: DataTableState,
	updateData: (chartData: any[]) => void,
	chart: any
}

export const DataTableHeader = ({ state, updateData, chart }: DataTableHeaderProps) => (
	<TableHead>
		<TableRow>
			<TableHeader />
			{
				state.headers.map((header: string, columnIndex: number) => (
					<TableHeader key={`header-${state.columnKeys[columnIndex]}`}>
						<TextInput
							className={labelInput}
							labelText=''
							id={`header-input-${state.columnKeys[columnIndex]}`}
							aria-label='Modify label'
							defaultValue={header}
							onChange={(event: any) => updateKey(
								columnIndex,
								chart.data,
								event.target.value,
								state.headers,
								updateData
							)}
						/>
						<HeaderOverflow
							columnIndex={columnIndex}
							chart={chart}
							state={state}
							updateData={updateData} />
					</TableHeader>
				))
			}
		</TableRow>
	</TableHead>
);
