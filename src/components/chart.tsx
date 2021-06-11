import React, { useEffect, useState } from 'react';
import {
	SimpleBarChart,
	GroupedBarChart,
	StackedBarChart,
	LineChart,
	ScatterChart,
	PieChart,
	DonutChart,
	AreaChart,
	StackedAreaChart
} from '@carbon/charts-react';
import { SkeletonPlaceholder } from 'carbon-components-react';
import '@carbon/charts/styles.css';
import './chart-preview.scss';
import { css } from 'emotion';

const chartWrapperStyle = css`
	width: 100%;
`;

/* eslint-disable react/prop-types */
// https://github.com/yannickcr/eslint-plugin-react/issues/2135
export const Chart = ({ chart }: any) => {
	const chartOptions = chart?.options?.rawChartOptions;
	const legend = chartOptions?.legend;
	const axes = chartOptions?.axes;
	const legendPosition = legend?.position;
	const legendClickable = legend?.clickable;
	// TODO this should only be necessary if it adds or removes an axes
	const axesScaleTypeLeft = axes?.left?.scaleType;
	const axesScaleTypeRight = axes?.right?.scaleType;
	const axesScaleTypeTop = axes?.top?.scaleType;
	const axesScaleTypeBottom = axes?.bottom?.scaleType;

	const [shouldRender, setShouldRender] = useState(true);

	useEffect(() => {
		// force re-render for things affecting layout
		setShouldRender(false);
		setTimeout(() => setShouldRender(true));
	}, [
		legendPosition,
		legendClickable,
		axesScaleTypeLeft,
		axesScaleTypeRight,
		axesScaleTypeTop,
		axesScaleTypeBottom
	]);

	if (!chart || !chart.data) { return <SkeletonPlaceholder />; }
	chartOptions.title = chart.title;
	const chartData = chart.data;
	const chartTheme = chartOptions.theme;

	const getChartType = (type: any) => {
		switch (type) {
			case 'simple-bar-chart':
				return (
					<div className={chartTheme}>
						<SimpleBarChart data={chartData} options={chartOptions} />
					</div>
				);
			case 'grouped-bar-chart':
				return (
					<div className={chartTheme}>
						<GroupedBarChart data={chartData} options={chartOptions} />
					</div>);
			case 'stacked-bar-chart':
				return (
					<div className={chartTheme}>
						<StackedBarChart data={chartData} options={chartOptions} />
					</div>);
			case 'line-chart':
				return (
					<div className={chartTheme}>
						<LineChart data={chartData} options={chartOptions} />
					</div>);
			case 'area-chart':
				return (
					<div className={chartTheme}>
						<AreaChart data={chartData} options={chartOptions} />
					</div>
				);
			case 'stacked-area-chart':
				return (
					<div className={chartTheme}>
						<StackedAreaChart data={chartData} options={chartOptions} />
					</div>
				);
			case 'scatter-chart':
				return (
					<div className={chartTheme}>
						<ScatterChart data={chartData} options={chartOptions} />
					</div>);
			case 'pie-chart':
				return (
					<div className={chartTheme}>
						<PieChart data={chartData} options={chartOptions} />
					</div>);
			case 'donut-chart':
				return (
					<div className={chartTheme}>
						<DonutChart data={chartData} options={chartOptions} />
					</div>);
			default:
				return <h3>This chart could not be properly displayed.</h3>;
		}
	};

	return (
		shouldRender
			? <div className={chartWrapperStyle}>
				{getChartType(chart.type)}
			</div>
			: <div className={chartWrapperStyle}>
				<div className={chartTheme}>
					<div className='chart-holder bx--chart-holder' style={{ height: '533px' }}>
					Blink!
					</div>
				</div>
			</div>
	);
};
