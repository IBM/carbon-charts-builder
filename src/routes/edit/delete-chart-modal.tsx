import React, { useContext } from 'react';

import { Modal } from 'carbon-components-react';
import { ModalActionType, ModalContext } from '../../context/modal-context';
import {
	ChartActionType,
	ChartsContext,
	useFetchOne
} from '../../context/charts-context';
import { useHistory } from 'react-router-dom';
import { NotificationActionType, NotificationContext } from '../../context/notification-context';

export const DeleteChartModal = ({ id }: any) => {
	const [chartsState, dispatch] = useContext(ChartsContext);
	const [modalState, dispatchModal] = useContext(ModalContext);
	const history = useHistory();
	const [, dispatchNotification] = useContext(NotificationContext);
	const chart = chartsState.charts.find((chart: any) => chart.id === id);
	useFetchOne(id, dispatch);


	const deleteChart = () => {
		dispatch({
			type: ChartActionType.TOGGLE_VISIBILITY,
			id,
			hidden: true,
			loaded: true
		});
		history.push('/');
		dispatchNotification({
			type: NotificationActionType.ADD_NOTIFICATION,
			data: {
				kind: 'error',
				title: 'Chart deleted!',
				message: `Chart '${chart.title}' has been permanently deleted.`,
				action: {
					actionText: 'Undo',
					actionFunction: undoHideChart,
					onNotificationClose: doDeleteChart
				}
			}
		});
		dispatchModal({ type: ModalActionType.closeModal });
	};

	const undoHideChart = () => {
		dispatch({
			type: ChartActionType.TOGGLE_VISIBILITY,
			id,
			hidden: false,
			loaded: true
		});
	};

	const doDeleteChart = () => {
		dispatch({
			type: ChartActionType.REMOVE_CHART,
			id
		});
	};


	return (
		<Modal
			size='sm'
			open={modalState.ShowModal}
			onRequestClose={() => { dispatchModal({ type: ModalActionType.closeModal }); }}
			secondaryButtonText='Cancel'
			modalHeading='Delete this chart?'
			danger
			primaryButtonText='Delete'
			onRequestSubmit={() => deleteChart()}>
			<p>
				Click <strong>Cancel</strong> to go back to editing your chart
				or <strong>Delete</strong> to remove it permanently.
			</p>
		</Modal>
	);
};
