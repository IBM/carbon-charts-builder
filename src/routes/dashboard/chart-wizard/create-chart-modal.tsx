import React, { useState } from 'react';

import { ChartWizardModals } from './chart-wizard';

import { Modal } from 'carbon-components-react';
import { ChartLineData32, DocumentAdd32 } from '@carbon/icons-react';
import { css } from 'emotion';
import { SelectionTile } from '../../../components/selection-tile';

const createChartTiles = css`
	display: flex;
	margin-top: 30px;
	margin-left: 15px;
	margin-right: 15px;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const createChartTile = css`
	width: 48%;
	height: 200px;
	.bx--tile {
		height: 100%;
	}
`;

export enum CreateOptions {
	UPLOAD_DATA,
	CHOOSE_TYPE
}

export interface CreateChartModalProps {
	shouldDisplay: boolean,
	setShouldDisplay: (shouldDisplay: boolean) => void,
	setDisplayedModal: (displayedModal: ChartWizardModals | null) => void,
	setLastVisitedModal: (lastVisitedModal: ChartWizardModals) => void
}

export const CreateChartModal = (props: CreateChartModalProps) => {
	const [selectedCreateOption, setSelectedCreateOption] = useState<CreateOptions | null>(null);

	return (
		<Modal
			open={props.shouldDisplay}
			hasForm
			shouldSubmitOnEnter={false}
			selectorPrimaryFocus='.bx--tile--selectable'
			onSecondarySubmit={() => {
				props.setShouldDisplay(false);
				props.setLastVisitedModal(ChartWizardModals.CREATE_CHART_MODAL);
			}}
			onRequestSubmit={
				() => {
					props.setDisplayedModal(
						selectedCreateOption === CreateOptions.UPLOAD_DATA
							? ChartWizardModals.UPLOAD_DATA_MODAL
							: ChartWizardModals.CHOOSE_CHART_MODAL
					);
					props.setLastVisitedModal(ChartWizardModals.CREATE_CHART_MODAL);
				}
			}
			onRequestClose={() => {
				props.setShouldDisplay(false);
				props.setLastVisitedModal(ChartWizardModals.CREATE_CHART_MODAL);
			}}
			modalHeading='Create new chart'
			primaryButtonText='Next'
			primaryButtonDisabled={selectedCreateOption === null}
			secondaryButtonText='Cancel'>
			<p>Start with uploading the chart data or create a new chart from scratch.</p>
			<div className={createChartTiles}>
				<SelectionTile
					styles={createChartTile}
					onChange={() => { setSelectedCreateOption(CreateOptions.UPLOAD_DATA); }}
					icon={<DocumentAdd32 />}
					selected={selectedCreateOption === CreateOptions.UPLOAD_DATA}
					label='Upload data'/>
				<SelectionTile
					styles={createChartTile}
					onChange={() => { setSelectedCreateOption(CreateOptions.CHOOSE_TYPE); }}
					icon={<ChartLineData32 />}
					selected={selectedCreateOption === CreateOptions.CHOOSE_TYPE}
					label='Pick a chart type'/>
			</div>
		</Modal>
	);
};
