import React, { useState, useContext } from 'react';
import {
	Modal,
	Loading,
	TextInput,
	Checkbox,
	TooltipDefinition
} from 'carbon-components-react';
import { ModalActionType, ModalContext } from '../../context/modal-context';
import { ChartActionType, ChartsContext } from '../../context/charts-context';
import './chart-modal.scss';

export const SettingsChartModal = ({ chart }: any) => {
	const [modalState, dispatchModal] = useContext(ModalContext);
	const [{ currentlyProcessing }, dispatch] = useContext(ChartsContext);

	const props = {
		size: 'sm',
		open: modalState.ShowModal,
		onRequestClose: () => dispatchModal({ type: ModalActionType.closeModal }),
		secondaryButtonText: 'Cancel'
	};

	const [title, setTitle] = useState(chart.title);
	const [isTemplate, setIsTemplate] = useState(chart.labels && chart.labels.includes('template'));

	const updateChartSettings = () => {
		let labels = chart.labels || [];

		// Add or remove 'template' label for the chart if set template is checked
		if (isTemplate) {
			if(!labels.includes('template')) {
				labels = [...labels, 'template'];
			}
		} else {
			// if the set template is unchecked, remove the 'template' label
			labels = labels.filter((label: string) => label !== 'template');
		}

		dispatch({
			type: ChartActionType.UPDATE_ONE,
			data: {
				...chart,
				title,
				labels
			},
			loaded: true
		});

		dispatchModal({ type: ModalActionType.closeModal });
	};

	return (
		<Modal
			{...props}
			hasForm
			modalHeading='Edit chart settings'
			primaryButtonText='Save'
			primaryButtonDisabled={currentlyProcessing}
			onRequestSubmit={() => updateChartSettings()} >
			<TextInput
				id='chartName'
				labelText='Chart name'
				defaultValue={title}
				onChange={(event: any) => setTitle(event.target.value)}/>
			<Checkbox
				id='setChartAsTemplate'
				checked={isTemplate}
				labelText='Make this chart a &nbsp;'
				onChange={(event: any) => setIsTemplate(event)}/>
			<TooltipDefinition
				tooltipText='Setting a chart as a template makes it an easy starting point
				for future charts.'
				direction='bottom'>
				template
			</TooltipDefinition>
			<Loading active={currentlyProcessing} />
		</Modal>
	);
};
