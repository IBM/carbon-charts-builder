import React, {
	useState,
	useRef,
	useContext
} from 'react';

import { DataTableHeader } from './data-table-header/data-table-header';
import { DataTableBody } from './data-table-body/data-table-body';

import {
	Table,
	TableContainer,
	InlineNotification,
	NotificationActionButton
} from 'carbon-components-react';
import { css } from 'emotion';
import { warningNotificationProps } from '../../../utils/file-tools';
import { ChartActionType, ChartsContext } from '../../../context/charts-context';
import { getTableHeaders, getTableBody } from './data-table-tools';
import { DataTableToolbar } from './data-table-toolbar';
import { debounce } from 'lodash';

const dataTable = css`
	td, th {
		padding: 0;
	}
	td, tr {
		background: white;
		height: auto;
	}
	tbody tr:hover td {
		background: white;
	}
	.bx--table-header-label {
		padding-bottom: 0;
	}
	.bx--label {
		display: none;
	}
	.bx--table-header-label {
		display: flex;
	}
`;

const tableWrapper = css`
	overflow-x: scroll;
	width: 100%;
`;

const tableContainer = css`
	min-width: 14rem;
	width: 100%;
	margin-top: 1rem;
	.bx--data-table-header {
		background: white;
	}
`;

// eslint-disable-next-line no-empty-function
let updateData = (newData: any) => {};
const doValueChange = debounce((newData: any) => {
	updateData(newData);
}, 60);

export interface DataTableState {
	headers: string[],
	body: any[],
	columnKeys: number[],
	rowKeys: number[],
	filter: string
}

export const DataTable = ({ chart }: any) => {
	const [,dispatch] = useContext(ChartsContext);
	/**
	 * Static counter for unique key/id generation for data table inputs.
	 */
	const inputCounter = useRef(0);

	const headers = getTableHeaders(chart.data);
	const body = getTableBody(chart.data, headers);
	const [state, setState] = useState<DataTableState>({
		headers,
		body,
		// Keys should only change if new columns or rows are added
		columnKeys: headers.map(() => inputCounter.current++),
		rowKeys: body.map(() => inputCounter.current++),
		filter: ''
	});

	const [notificationState, setNotificationState] = useState<any>({
		notificationProps: { ...warningNotificationProps },
		visible: false,
		backupData: []
	});

	updateData = (newData: any) => {
		const headers = getTableHeaders(newData);
		const body = getTableBody(newData);
		setState({
			...state,
			headers,
			body,
			columnKeys: headers.length === state.columnKeys.length
				? state.columnKeys
				: headers.map(() => inputCounter.current++),
			rowKeys: body.length === state.rowKeys.length
				? state.rowKeys
				: body.map(() => inputCounter.current++)
		});

		dispatch({
			type: ChartActionType.UPDATE_ONE,
			data: {
				id: chart.id,
				data: newData
			}
		});
	};

	const isTimeSeries = () => {
		if (!chart || !chart.options || !chart.options.rawChartOptions.axes) {
			return false;
		}
		// Chart is time series if any axes with the scaleType 'time' exist.
		return Object.keys(chart.options.rawChartOptions.axes).some((axisPosition: string) => (
			chart.options.rawChartOptions.axes[axisPosition].scaleType === 'time'
		));
	};

	return (
		<section aria-label={`Data table for '${chart.title}'`} tabIndex={0}>
			{
				notificationState.visible
					? <InlineNotification
						{ ...notificationState.notificationProps }
						onCloseButtonClick={() => setNotificationState({
							...notificationState,
							visible: false
						})}
						actions={
							notificationState.notificationProps.kind === 'warning'
								&& <NotificationActionButton
									onClick={() => {
										updateData(notificationState.backupData);
										setNotificationState({
											...notificationState,
											visible: false,
											backupData: []
										});
									}}>
									Revert change
								</NotificationActionButton>
						} />
					: null
			}
			<TableContainer
				className={tableContainer}
				title='Chart data'
				description='Upload data to populate the table or get started with default data'>
				<DataTableToolbar
					chart={chart}
					isTimeSeries={isTimeSeries()}
					updateData={doValueChange}
					setNotificationState={setNotificationState}
					state={state}
					setState={setState} />
				<div className={tableWrapper}>
					<Table className={dataTable}>
						<DataTableHeader
							state={state}
							updateData={doValueChange}
							chart={chart} />
						<DataTableBody
							state={state}
							updateData={doValueChange}
							isTimeSeries={isTimeSeries()}
							chart={chart} />
					</Table>
				</div>
			</TableContainer>
		</section>
	);
};
