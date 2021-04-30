import { ModalType, ModalContext } from '../../context/modal-context';
import { ShareOptionsModal } from './share-options/share-options-modal';
import { DuplicateChartModal } from './duplicate-chart-modal';
import { DeleteChartModal } from './delete-chart-modal';
import { SettingsChartModal } from './settings-chart-modal';
import React, { useContext } from 'react';
import { ChartsContext, useFetchOne } from '../../context/charts-context';

// eslint-disable-next-line react/prop-types
export const ChartModal = ({ chart }: any) => {
	const [, dispatch] = useContext(ChartsContext);
	// eslint-disable-next-line react/prop-types
	useFetchOne(chart.id, dispatch);
	const [modalState] = useContext(ModalContext);

	switch (modalState.ModalType) {
		case ModalType.DUPLICATION:
			return (
			// In the case that chart modal is used in the dashboard the full chart containing options and
			// data can't be passed in, so we use chart id and fetch it
			// eslint-disable-next-line react/prop-types
				<DuplicateChartModal id={chart.id}/>
			);
		case ModalType.SHARING:
			return (
			// eslint-disable-next-line react/prop-types
				<ShareOptionsModal chart={chart} />
			);
		case ModalType.DELETION:
			return (
			// eslint-disable-next-line react/prop-types
				<DeleteChartModal id={chart.id} />
			);
		case ModalType.SETTINGS:
			return (
			// eslint-disable-next-line react/prop-types
				<SettingsChartModal chart={chart} />
			);
		default:
			return null;
	}
};
