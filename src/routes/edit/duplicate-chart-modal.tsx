import React, { useContext } from 'react';
import { NotificationActionType, NotificationContext } from '../../context/notification-context';
import { Modal } from 'carbon-components-react';
import { ModalActionType, ModalContext } from '../../context/modal-context';
import {
	ChartActionType,
	ChartsContext,
	useFetchOne
} from '../../context/charts-context';
import { useHistory, useLocation } from 'react-router-dom';
import { LocalChartsContext, LocalChartActionType } from '../../context/local-charts-context';

const getUniqueName = (charts: Array<any>, name: string) => {
	const nameRegEx = new RegExp(String.raw`(.*)\s+(copy)*(\s+(\d+))?$`);
	const nameMatch = name.match(nameRegEx);
	let count = 0;

	let nameBase = name;
	// If match, increment the count and update name base and new name
	if (nameMatch) {
		nameBase = name.replace(nameRegEx, '$1');
		count = Number.parseInt(name.replace(nameRegEx, '$4'), 10);
		if (!count) {
			count = 0;
		}
	}

	// Get a list containing names of all duplicates of original chart
	// e.g. [ "Chart copy", "Chart copy 1", "Chart copy 7", ...]
	const names: string[] = [];
	charts.forEach((chart) => {
		if (chart.title.includes(nameBase)) {
			names.push(chart.title);
		}
	});

	if (names.length <= 1) {
		// because the chart we're copying is already in there
		return `${nameBase} copy`;
	}

	const highestNumber = names
		.map((n) => Number.parseInt(n.replace(nameRegEx, '$4'), 10))
		.filter((n) => !isNaN(n)).sort((a, b) => b - a)
		.shift();

	return `${nameBase} copy ${highestNumber && count < highestNumber ? highestNumber + 1 : count + 1}`;
};

// In the case that chart modal is used in the dashboard the full chart containing options and data
// can't be passed in, so chart id is passed in and `useChart` is used within this component.
export const DuplicateChartModal = ({ id }: any) => {
	const [modalState, dispatchModal] = useContext(ModalContext);
	const [, dispatchNotification] = useContext(NotificationContext);
	const [, updateLocalCharts] = useContext(LocalChartsContext);
	const [chartsState, dispatch] = useContext(ChartsContext);
	useFetchOne(id, dispatch);
	const history = useHistory();
	const location = useLocation();

	const chart = chartsState.charts.find((chart: any) => chart.id === id);

	const duplicateChart = () => {
		if (chartsState.currentlyProcessing) {
			return;
		}
		// copy current chart and change chart title
		const chartCopy = JSON.parse(JSON.stringify(chart));
		chartCopy.title = getUniqueName(chartsState.charts, chartCopy.title);
		// TODO: get unique id for the chart copy
		chartCopy.id = `${Math.random().toString().slice(2)}${Math.random().toString().slice(2)}`;

		dispatch({
			type: ChartActionType.ADD_ONE,
			data: chartCopy,
			loaded: true
		});
		updateLocalCharts({
			type: LocalChartActionType.ADD,
			data: { id: chartCopy.id }
		});
		if (location.pathname !== '/') {
			history.push(`/edit/${chartCopy.id}`);
		}
		dispatchNotification({
			type: NotificationActionType.ADD_NOTIFICATION,
			data: {
				kind: 'success',
				title: 'Duplication success',
				message: `'${chartCopy.title}  has been duplicated from '${chart.title}'.`
			}
		});
		dispatchModal({ type: ModalActionType.closeModal });
	};

	return (
		<Modal
			size='sm'
			open={modalState.ShowModal}
			onRequestClose={() => dispatchModal({ type: ModalActionType.closeModal })}
			secondaryButtonText='Cancel'
			modalHeading='Duplicate chart?'
			primaryButtonText='Duplicate'
			primaryButtonDisabled={!!chartsState.currentlyProcessing}
			onRequestSubmit={() => duplicateChart()}>
			<p>
				Click <strong>Duplicate</strong> to begin to edit a copy of the current chart
				or <strong>Cancel</strong> to continue on this chart.
			</p>
		</Modal>
	);
};
