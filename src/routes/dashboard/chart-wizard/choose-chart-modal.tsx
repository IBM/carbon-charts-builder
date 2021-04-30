import React, { useState, useContext } from 'react';

import { css } from 'emotion';
import {
	Modal,
	Tag,
	InlineNotification,
	NotificationActionButton
} from 'carbon-components-react';
import { ChartWizardModals } from './chart-wizard';
import { ChartType } from '../../../interfaces';
import { generateNewChart } from './generate-new-chart';

// Chart tile icons
import stackedBarIcon from './icons/stacked-bar-icon.svg';
import donutIcon from './icons/donut-icon.svg';
import groupedBarIcon from './icons/grouped-bar-icon.svg';
import groupedBarHorizontalIcon from './icons/grouped-bar-horizontal-icon.svg';
import scatterIcon from './icons/scatter-icon.svg';
import simpleBarIcon from './icons/simple-bar-icon.svg';
import stackedBarHorizontalIcon from './icons/stacked-bar-horizontal-icon.svg';
import simpleBarHorizontalIcon from './icons/simple-bar-horizontal-icon.svg';
import pieIcon from './icons/pie-icon.svg';
import lineIcon from './icons/line-icon.svg';
import areaIcon from './icons/area-icon.svg';
import stackedAreaIcon from './icons/stacked-area-icon.svg';

import {
	ChartActionType,
	ChartAction,
	ChartState,
	ChartsContext
} from '../../../context';
import { useHistory } from 'react-router-dom';
import { SelectionTile } from '../../../components/selection-tile';
import { LocalChartsContext, LocalChartActionType } from '../../../context/local-charts-context';
import { warningNotificationProps } from '../../../utils/file-tools';

const chartOptions = css`
	margin-left: 30px;
	margin-right: 30px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;

	// This is the viewport width that causes the selection tiles to overlap.
	@media screen and (max-width: 45rem) {
		flex-direction: column;
	}
`;

const chartOptionTile = css`
	width: 48%;
	max-height: 17.3125rem;
	img, span {
		max-height: 17.3125rem;
	}
	text-align: center;
	.bx--tile {
		padding-right: 16px;
	}
	margin-top: 12px;
	margin-bottom: 12px;

	// This is the viewport width that causes the selection tiles to overlap.
	@media screen and (max-width: 45rem) {
		width: 100%;
	}
`;

export interface ChooseChartModalProps {
	shouldDisplay: boolean,
	setShouldDisplay: (shouldDisplay: boolean) => void,
	setDisplayedModal: (displayedModal: ChartWizardModals | null) => void,
	setLastVisitedModal: (lastVisitedModal: ChartWizardModals) => void,
	lastVisitedModal: ChartWizardModals,
	recommendedCharts: ChartType[],
	setRecommendedCharts: (recommendedCharts: ChartType[]) => void,
	uploadedData: any,
	setUploadedData: (uploadedData: any) => void,
	dispatch: (chartAction: ChartAction) => ChartState
}

export const ChooseChartModal = (props: ChooseChartModalProps) => {
	const [selectedChartType, doSetSelectedChartType] = useState<ChartType | null>(null);
	const [horizontal, setHorizontal] = useState(false);
	const [, updateLocalCharts] = useContext(LocalChartsContext);
	const [, dispatch] = useContext(ChartsContext);

	const setSelectedChartType = (chartType: ChartType, horizontal = false) => {
		doSetSelectedChartType(chartType);
		setHorizontal(horizontal);
	};
	const history = useHistory();

	const isRecommended = (chartType: ChartType) => (
		props.recommendedCharts.some((recommendation: ChartType) => recommendation === chartType)
	);

	const generateChart = () => {
		const generatedChart = generateNewChart(
			selectedChartType,
			props.uploadedData.data,
			horizontal
		);

		dispatch({
			type: ChartActionType.ADD_ONE,
			data: generatedChart
		});
		updateLocalCharts({
			type: LocalChartActionType.ADD,
			data: { id: generatedChart.id }
		});
		history.push(`/edit/${generatedChart.id}`);
	};

	return (
		<Modal
			open={props.shouldDisplay}
			shouldSubmitOnEnter={false}
			selectorPrimaryFocus='.bx--tile--selectable'
			onRequestSubmit={() => {
				generateChart();
				props.setLastVisitedModal(ChartWizardModals.CHOOSE_CHART_MODAL);
			}}
			onRequestClose={() => { props.setShouldDisplay(false); }}
			onSecondarySubmit={() => {
				props.setDisplayedModal(props.lastVisitedModal);
				props.setLastVisitedModal(ChartWizardModals.CHOOSE_CHART_MODAL);
			}}
			hasForm
			modalHeading='Create new chart'
			primaryButtonText='Done'
			secondaryButtonText='Back'
			primaryButtonDisabled={selectedChartType === null}>
			{
				props.uploadedData.wasDataModified
					? <InlineNotification
						{ ...warningNotificationProps }
						actions={
							<>
								<NotificationActionButton
									onClick={() => {
										props.setUploadedData({
											data: [],
											wasDataModified: false
										});
										props.setRecommendedCharts([]);
									}}>
									Use demo data
								</NotificationActionButton>
								{
									props.uploadedData && props.uploadedData.originalData
									&& <NotificationActionButton
										onClick={() => {
											props.setUploadedData({
												data: props.uploadedData.originalData,
												wasDataModified: false
											});
											props.setRecommendedCharts([]);
										}}>
										Use unmodified data
									</NotificationActionButton>
								}
							</>
						} />
					: null
			}
			<p>Choose a type of chart and click done to start editing your new chart</p>
			<div className={chartOptions}>
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.SIMPLE_BAR_CHART); }}
					icon={<img alt="" src={simpleBarIcon} />}
					selected={selectedChartType === ChartType.SIMPLE_BAR_CHART && !horizontal}
					label='Simple bar chart'
					tag={
						isRecommended(ChartType.SIMPLE_BAR_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.SIMPLE_BAR_CHART, true); }}
					icon={<img alt="" src={simpleBarHorizontalIcon} />}
					selected={selectedChartType === ChartType.SIMPLE_BAR_CHART && horizontal}
					label='Simple horizontal bar chart'
					tag={
						isRecommended(ChartType.SIMPLE_BAR_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.SCATTER_CHART); }}
					icon={<img alt="" src={scatterIcon} />}
					selected={selectedChartType === ChartType.SCATTER_CHART}
					label='Scatter chart'
					tag={
						isRecommended(ChartType.SCATTER_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.DONUT_CHART); }}
					icon={<img alt="" src={donutIcon} />}
					selected={selectedChartType === ChartType.DONUT_CHART}
					label='Donut chart'
					tag={
						isRecommended(ChartType.DONUT_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.STACKED_BAR_CHART); }}
					icon={<img alt="" src={stackedBarIcon} />}
					selected={selectedChartType === ChartType.STACKED_BAR_CHART && !horizontal}
					label='Stacked bar chart'
					tag={
						isRecommended(ChartType.STACKED_BAR_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.STACKED_BAR_CHART, true); }}
					icon={<img alt="" src={stackedBarHorizontalIcon} />}
					selected={selectedChartType === ChartType.STACKED_BAR_CHART && horizontal}
					label='Horizontal stacked bar chart'
					tag={
						isRecommended(ChartType.STACKED_BAR_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.LINE_CHART); }}
					icon={<img alt="" src={lineIcon} />}
					selected={selectedChartType === ChartType.LINE_CHART}
					label='Line chart'
					tag={
						isRecommended(ChartType.LINE_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.AREA_CHART); }}
					icon={<img alt="" src={areaIcon} />}
					selected={selectedChartType === ChartType.AREA_CHART}
					label='Area chart'
					tag={
						isRecommended(ChartType.AREA_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.STACKED_AREA_CHART); }}
					icon={<img alt="" src={stackedAreaIcon} />}
					selected={selectedChartType === ChartType.STACKED_AREA_CHART}
					label='Stacked area chart'
					tag={
						isRecommended(ChartType.STACKED_AREA_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.GROUPED_BAR_CHART); }}
					icon={<img alt="" src={groupedBarIcon} />}
					selected={selectedChartType === ChartType.GROUPED_BAR_CHART && !horizontal}
					label='Grouped bar chart'
					tag={
						isRecommended(ChartType.GROUPED_BAR_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.GROUPED_BAR_CHART, true); }}
					icon={<img alt="" src={groupedBarHorizontalIcon} />}
					selected={selectedChartType === ChartType.GROUPED_BAR_CHART && horizontal}
					label='Horizontal grouped bar chart'
					tag={
						isRecommended(ChartType.GROUPED_BAR_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
				<SelectionTile
					styles={chartOptionTile}
					onChange={() => { setSelectedChartType(ChartType.PIE_CHART); }}
					icon={<img alt="" src={pieIcon} />}
					selected={selectedChartType === ChartType.PIE_CHART}
					label='Pie chart'
					tag={
						isRecommended(ChartType.PIE_CHART)
							? <Tag type='blue'>Recommended</Tag>
							: null
					} />
			</div>
		</Modal>
	);
};
