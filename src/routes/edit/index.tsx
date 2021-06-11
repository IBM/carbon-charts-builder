import React, { useContext, useEffect } from 'react';
import { css } from 'emotion';
import { EditHeader } from './edit-header';
import { DataTable } from './data-table/data-table';
import { ChartActionType, ChartsContext, useFetchOne } from '../../context/charts-context';
import { EditChart } from '../../components/edit-chart';

const editPageContent = css`
	position: absolute;
	width: 100vw;
	height: 100%;
	top: 2rem;
	max-width: 100%;
	background: #f4f4f4;
	height: 100%;
	padding: 1rem 2rem;
`;

export const Edit = ({ match }: any) => {
	const [state, dispatch] = useContext(ChartsContext);
	useFetchOne(match.params.id, dispatch);
	const chart = state.charts.find((chart: any) => chart.id === match.params.id);

	const setChart = (updatedChart: any) => {
		dispatch({
			type: ChartActionType.UPDATE_ONE,
			data: updatedChart
		});
	};

	useEffect(() => {
		if (chart && chart.title) {
			document.title = `Edit "${chart.title}"`;
		} else {
			document.title = 'Edit chart';
		}
	}, [chart]);

	return (
		<div
			id='edit-content'
			className={editPageContent}>
			{ chart && <EditHeader chart={chart}/> }
			<div>
				{
					chart
					&& <>
						<EditChart chart={chart} setChart={setChart} />
						{ chart.data && <DataTable chart={chart} /> }
					</>
				}
			</div>
		</div>
	);
};
