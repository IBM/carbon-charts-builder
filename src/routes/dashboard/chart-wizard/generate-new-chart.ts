
import * as barDemos from './placeholder-data/bar';
import * as pieDemos from './placeholder-data/pie';
import * as donutDemos from './placeholder-data/donut';
import * as lineDemos from './placeholder-data/line';
import * as areaDemos from './placeholder-data/area';
import * as scatterDemos from './placeholder-data/scatter';
import { ChartType } from '../../../interfaces';
import { chartsVersion } from '../../../charts.version';
import { restoreChartData } from '../../../utils/chart-tools';
import merge from 'lodash/merge';

const defaultOptions = {
	axes: {
		left: {
			primary: true,
			mapsTo: 'value'
		},
		bottom: {
			scaleType: 'labels',
			secondary: true,
			mapsTo: 'key'
		}
	}
};

export const generateNewChart = (
	chartType: ChartType | null,
	data: any = [],
	horizontal = false
) => {
	let chartData: any;
	let chartOptions: any;
	let type: string;
	// TODO: get unique id for the generated chart.
	const chartID = `${Math.random().toString().slice(2)}${Math.random().toString().slice(2)}`;
	const chartName = 'New chart';

	chartData = data;

	// Generate create base chart options.
	switch(chartType) {
		case ChartType.SCATTER_CHART:
			chartOptions = scatterDemos.scatterOptions;
			type = 'scatter-chart';
			// If no data is given, this sets chart data to default data.
			if (chartData.length === 0) {
				chartData = restoreChartData(scatterDemos.scatterData);
			}
			break;
		case ChartType.DONUT_CHART:
			chartOptions = donutDemos.donutOptions;
			type = 'donut-chart';
			// If no data is given, this sets chart data to default data.
			if (chartData.length === 0) {
				chartData = restoreChartData(donutDemos.donutData);
			}
			break;
		case ChartType.LINE_CHART:
			chartOptions = lineDemos.lineOptions;
			type = 'line-chart';
			// If no data is given, this sets chart data to default data.
			if (chartData.length === 0) {
				chartData = restoreChartData(lineDemos.lineData);
			}
			break;
		case ChartType.AREA_CHART:
			chartOptions = areaDemos.areaOptions;
			type = 'area-chart';
			// If no data is given, this sets chart data to default data.
			if (chartData.length === 0) {
				chartData = restoreChartData(areaDemos.areaData);
			}
			break;
		case ChartType.STACKED_AREA_CHART:
			chartOptions = areaDemos.stackedAreaOptions;
			type = 'stacked-area-chart';
			// If no data is given, this sets chart data to default data.
			if (chartData.length === 0) {
				chartData = restoreChartData(areaDemos.stackedAreaData);
			}
			break;
		case ChartType.STACKED_BAR_CHART:
			chartOptions = barDemos.stackedBarOptions;
			if (horizontal) {
				chartOptions = barDemos.stackedBarHorizontalOptions;
			}
			type = 'stacked-bar-chart';
			// If no data is given, this sets chart data to default data.
			if (chartData.length === 0) {
				chartData = restoreChartData(barDemos.stackedBarData);
			}
			break;
		case ChartType.GROUPED_BAR_CHART:
			chartOptions = barDemos.groupedBarOptions;
			if (horizontal) {
				chartOptions = barDemos.groupedBarHorizontalOptions;
			}
			type = 'grouped-bar-chart';
			// If no data is given, this sets chart data to default data.
			if (chartData.length === 0) {
				chartData = restoreChartData(barDemos.groupedBarData);
			}
			break;
		case ChartType.PIE_CHART:
			chartOptions = pieDemos.pieOptions;
			type = 'pie-chart';
			// If no data is given, this sets chart data to default data.
			if (chartData.length === 0) {
				chartData = restoreChartData(pieDemos.pieData);
			}
			break;
		case ChartType.SIMPLE_BAR_CHART:
		default:
			chartOptions = barDemos.simpleBarOptions;
			if (horizontal) {
				chartOptions = barDemos.simpleBarHorizontalOptions;
			}
			type = 'simple-bar-chart';
			// If no data is given, this sets chart data to default data.
			if (chartData.length === 0) {
				chartData = restoreChartData(barDemos.simpleBarData);
			}
			break;
	}

	chartOptions = merge({}, defaultOptions, chartOptions);

	return {
		id: chartID,
		lastModified: new Date().toISOString(),
		title: chartName,
		type,
		options: {
			chartsVersion,
			rawChartOptions: chartOptions
		},
		data: chartData,
		labels: []
	};
};
