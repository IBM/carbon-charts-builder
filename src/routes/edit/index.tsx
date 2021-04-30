import React, { useContext, useEffect } from 'react';
import { css } from 'emotion';
import { Chart } from '../../components';
import { EditHeader } from './edit-header';
import { DataTable } from './data-table/data-table';
import { ChartsContext, useFetchOne } from '../../context/charts-context';

const editPageContent = css`
	position: absolute;
	width: 100vw;
	height: 100%;
	top: 2rem;
	max-width: 100%;
	background: #f4f4f4;
	height: 100%;
	padding: 1rem 2rem;
	// This is the viewport width that causes the edit header items to overlap
	@media screen and (max-width: 33.3125rem) {
		padding-left: 36px;
	}
	// This is the viewport width causes the side nav to stay open.
	@media screen and (min-width: 66rem) {
		padding-left: calc(36px + 16rem);
	}
`;

export const Edit = ({ match }: any) => {
	const [state, dispatch] = useContext(ChartsContext);
	useFetchOne(match.params.id, dispatch);
	const chart = state.charts.find((chart: any) => chart.id === match.params.id);

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
						<Chart chart={chart} />
						{ chart.data && <DataTable chart={chart} /> }
					</>
				}
			</div>
		</div>
	);
};
