import React from 'react';
import { css } from 'emotion';

import { ChartTile, SkeletonChartTile } from './chart-tile';

// import the img placeholder svg
import placeholder from './../../assets/dashboard-empty-state.svg';

// styles for placeholder
const svgStyle = css`
	width: 25vw;
	height: auto;
	max-width: 400px;
`;

const placeholderContainer = css`
	margin-top: 48px;
	display: flex;
	flex-direction: column;
	height: calc(100vh - 48px);
	padding: 24px;
	padding-top: 150px;
	align-items: center;
`;

const chartRowWrapper = css`
	margin-top: 3rem;
	background: #f4f4f4;
	min-width: 100%;
	height: 100%
`;

export const ChartTileList = ({ charts, loaded, setModalChart }: any) => {
	const getTilesOrPlaceholder = () => {
		if ((!charts || charts.length === 0) && loaded) {
			return (
				<div className={placeholderContainer}>
					<div style={{ textAlign: 'left' }}>
						<img alt="No charts exist" src={placeholder} className={svgStyle} />
						<h3>You have no charts here.</h3>
						<p style={{ marginTop: '0.5em' }}>
							To build a new chart, click <strong>New Chart</strong>.
						</p>
					</div>
				</div>
			);
		}

		if (!loaded) {
			// make a new array and fill it with 0 to 4
			const count = (new Array(5)).fill(0).map((_, i) => i);
			return count.map((i) => <SkeletonChartTile key={i}/>);
		}

		return charts.map((v: any) => (
			<ChartTile
				key={v.id}
				{...v}
				chart={v}
				to={`/edit/${v.id}`}
				{...v.lastModified}
				setModalChart={setModalChart}/>
		));
	};

	return (
		<div className={chartRowWrapper}>
			{getTilesOrPlaceholder()}
		</div>
	);
};
