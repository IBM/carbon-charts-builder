import React from 'react';
import domtoimage from 'dom-to-image';
import ReactDOM from 'react-dom';
import { Chart } from '../components';

export const restoreChartData = (chartData: any) => (
	chartData.map((datapoint: any) => ({
		...datapoint,
		date: new Date(datapoint.date)
	}))
);

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface RenderProps {
	id: string,
	name: string,
	width?: number,
	height?: number,
	format?: string,
	preview?: { // only sent for preview
		format?: string, // optional
		width: number,
		height: number
	}
}

export const getChartPreview = async(chart: any, props: RenderProps) => {
	const element = document.createElement('div');
	element.className = 'render-preview';
	chart.options.rawChartOptions.height = `${props.height || 400}px`;
	chart.options.rawChartOptions.animations = false;

	(element as HTMLElement).style.position = 'absolute';
	(element as HTMLElement).style.top = '0';
	(element as HTMLElement).style.left = '0';
	(element as HTMLElement).style.zIndex = '-1';
	(element as HTMLElement).style.width = `${props.width || 800}px`;
	(element as HTMLElement).style.height = `${props.height || 400}px`;
	(element as HTMLElement).style.minHeight = `${props.height || 400}px`;
	ReactDOM.render(React.createElement(Chart, {chart}), element);
	document.body.appendChild(element);

	await sleep(100); // wait for render to finish
	
	const imageBlob = await domtoimage.toBlob(element as Node);
	(element as HTMLElement).remove();
	return imageBlob;
};
export const getGroupNames = (chartData: any[]) => {
	if (!chartData) {
		return [];
	}

	return chartData
		.map((datapoint: any) => datapoint.group)
		.filter((groupName: string, index: number, self: any) => self.indexOf(groupName) === index);
};
