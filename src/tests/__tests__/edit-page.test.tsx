/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { waitFor, getNodeText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';

import { DataTable } from '../../routes/edit/data-table/data-table';
import { LeftPane } from '../../components/left-pane';
import {
	ChartsContextProvider,
	ChartsContext,
	ChartActionType
} from '../../context/charts-context';
import { chart as testChart } from '../test-assets/test-chart';
import { Router } from 'react-router-dom';		

const TestComponent = () => {
	const [state, dispatch] = useContext(ChartsContext);
	useEffect(() => {
		dispatch({
			type: ChartActionType.UPDATE_ONE,
			data: testChart
		});
	}, []);

	const chart = state.charts.find((chart: any) => chart.id === testChart.id);

	return (
		<>
			{chart && <>
				<DataTable chart={chart} />
				<LeftPane id={chart.id} />
			</>}
		</>
	);
};

const ContextValues = () => {
	const [state, dispatch] = useContext(ChartsContext);
	useEffect(() => {
		dispatch({
			type: ChartActionType.UPDATE_ONE,
			data: testChart
		});
	}, []);

	const chart = state.charts.find((chart: any) => chart.id === testChart.id);

	return (
		<>
			<span data-testid='chart-title'>{ chart && chart.title }</span>
			<span data-testid='chart-type'>{ chart && chart.type }</span>
			<span data-testid='left-axis-title'>
				{ chart && chart.options.rawChartOptions.axes.left.title }
			</span>
			<span data-testid='left-axis-scaleType'>
				{ chart && chart.options.rawChartOptions.axes.left.scaleType }
			</span>
			<span data-testid='label-value'>
				{ chart && chart.data && chart.data[4].key }
			</span>
			<span data-testid='dataset-name-value'>
				{ chart && chart.data && chart.data[0].group }
			</span>
			<span data-testid='datapoint-value'>
				{ chart && chart.data && chart.data[3].value }
			</span>
		</>
	);
};

test('Changes to data table inputs should reflect in the charts context', async() => {
	const history = createMemoryHistory();
	history.push('/edit/');
	const { getAllByLabelText, getByTestId } = render(
		<Router history={history}>
			<ChartsContextProvider>
				<ContextValues />
				<TestComponent />
			</ChartsContextProvider>
		</Router>
	);

	const headerInputs = getAllByLabelText('Modify label');
	const datasetInputs = getAllByLabelText('Modify dataset name');
	const datapointInputs = getAllByLabelText('Modify datapoint value');

	// We need all these `waitFor`s because all the inputs have a debounce
	// and we have to give them time to update :)
	fireEvent.change(headerInputs[4], {
		target: { value: 'This is a new label 2' },
		bubbles: true
	});
	await waitFor(() => expect(getNodeText(getByTestId('label-value'))).toEqual('This is a new label 2'));

	fireEvent.change(datasetInputs[0], {
		target: { value: 'Hello there' },
		bubbles: true
	});
	await waitFor(() => expect(getNodeText(getByTestId('dataset-name-value'))).toEqual('Hello there'));

	fireEvent.change(datapointInputs[3], {
		target: { value: 123456 },
		bubbles: true
	});
	await waitFor(() => expect(getNodeText(getByTestId('datapoint-value'))).toEqual('123456'));
});

test('Changes to left pane options should relfect in charts context', async() => {
	const history = createMemoryHistory();
	history.push('/edit/');
	const { getByTestId, getByLabelText } = render(
		<Router history={history}>
			<ChartsContextProvider>
				<ContextValues />
				<TestComponent />
			</ChartsContextProvider>
		</Router>
	);

	expect(getNodeText(getByTestId('chart-title'))).toEqual(testChart.title);

	// Edit chart options does not show up in left pane until user is in `Edit Mode`.
	// This means that a user needs to be authenticated, be in the edit page, and be an owner of a chart.
	// We await for a mock user to be authenticated by waiting for the existence of a change to
	// edit chart options to be successful.
	// Edit chart options exists after this point and `waitFor`s are no longer necessary.
	await waitFor(
		() => fireEvent.change(getByLabelText('Chart Title'), { target: { value: 'New chart title!' } })
	);
	expect(getNodeText(getByTestId('chart-title'))).toEqual('New chart title!');

	expect(getNodeText(getByTestId('chart-type'))).toEqual(testChart.type);
	fireEvent.change(getByLabelText('Type'), { target: { value: 'line-chart' } });
	expect(getNodeText(getByTestId('chart-type'))).toEqual('line-chart');

	expect(getNodeText(getByTestId('left-axis-title')))
		.toEqual(testChart.options.rawChartOptions.axes.left.title);
	fireEvent.change(getByLabelText('Left axis title'), { target: { value: 'Spawn of testerino' } });
	expect(getNodeText(getByTestId('left-axis-title'))).toEqual('Spawn of testerino');
});
