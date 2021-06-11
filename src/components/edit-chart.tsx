import { css } from 'emotion';
import React from 'react';
import { Chart } from './chart';
import { ChartOptionsPane } from './chart-options-pane';

const editChartStyle = css`
    display: flex;
    background-color: white;
`;

export const EditChart = ({ chart, setChart }: any) => {
	return <div className={editChartStyle}>
        <ChartOptionsPane chart={chart} setChart={setChart} />
		<Chart chart={chart} />
	</div>;
};
