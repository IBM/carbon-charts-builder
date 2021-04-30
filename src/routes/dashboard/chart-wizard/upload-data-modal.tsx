import React, { useState } from 'react';

import { css } from 'emotion';
import {
	Modal,
	FileUploaderButton,
	FileUploaderItem
} from 'carbon-components-react';
import { ChartWizardModals } from './chart-wizard';
import { ChartType } from '../../../interfaces';
import { processDataFile } from '../../../utils/file-tools';
import { getGroupNames } from '../../../utils/chart-tools';

const fileUploaderModal = css`
	span.bx--file__selected-file {
		background: white;
		margin-top: 10px;
	}
`;

const fileUploaderHeading = css`
	margin-top: 2rem;
`;

export interface UploadDataModalProps {
	shouldDisplay: boolean,
	setShouldDisplay: (shouldDisplay: boolean) => void,
	setUploadedData: (uploadedData: any) => void,
	setDisplayedModal: (displayedModal: ChartWizardModals | null) => void,
	setLastVisitedModal: (lastVisitedModal: ChartWizardModals) => void,
	setRecommendedCharts: (recommendedCharts: ChartType[]) => void
}

export const UploadDataModal = (props: UploadDataModalProps) => {
	const [uploadedFile, setUploadedFile] = useState<any>(null);
	const [fileErrorState, setFileErrorState] = useState({
		isFileInvalid: false,
		errorMessage: ''
	});

	const generateChartRecommendations = (chartData: any) => {
		const chartRecommendations: ChartType[] = [];

		const groupNames = getGroupNames(chartData);

		// Very basic recommendation right now... work in progress :)
		if (groupNames.length === 1) {
			chartRecommendations.push.apply(chartRecommendations, [
				ChartType.DONUT_CHART,
				ChartType.PIE_CHART
			]);
		} else if (groupNames.length > 1) {
			chartRecommendations.push.apply(chartRecommendations, [
				ChartType.SCATTER_CHART,
				ChartType.SIMPLE_BAR_CHART,
				ChartType.STACKED_BAR_CHART,
				ChartType.HORIZONTAL_BAR_CHART,
				ChartType.GROUPED_BAR_CHART,
				ChartType.LINE_CHART,
				ChartType.AREA_CHART,
				ChartType.STACKED_AREA_CHART
			]);
		}

		props.setRecommendedCharts(chartRecommendations);
	};

	const onFileAdded = (event: FileList) => {
		// Clears error state which may have lingered from previous file
		setFileErrorState({
			isFileInvalid: false,
			errorMessage: ''
		});
		// This takes the first file from the fileList, in case multiple files are uploaded.
		const [fileUploaded] = Array.from(event);
		setUploadedFile(fileUploaded);
	};

	const onFileDelete = () => {
		setFileErrorState({
			isFileInvalid: false,
			errorMessage: ''
		});
		setUploadedFile(null);
	};

	const handleFileUpload = async() => {
		processDataFile(uploadedFile).then((uploadedData: any) => {
			props.setUploadedData(uploadedData);
			generateChartRecommendations(uploadedData.data);
		}).then(() => {
			props.setDisplayedModal(ChartWizardModals.CHOOSE_CHART_MODAL);
			props.setLastVisitedModal(ChartWizardModals.UPLOAD_DATA_MODAL);
		}).catch((err) => {
			setFileErrorState({
				isFileInvalid: true,
				errorMessage: err
			});
		});
	};

	return (
		<Modal
			className={fileUploaderModal}
			open={props.shouldDisplay}
			shouldSubmitOnEnter={false}
			selectorPrimaryFocus='.bx--btn--primary'
			onRequestSubmit={() => handleFileUpload()}
			primaryButtonDisabled={!uploadedFile}
			onRequestClose={() => { props.setShouldDisplay(false); }}
			onSecondarySubmit={() => {
				props.setDisplayedModal(ChartWizardModals.CREATE_CHART_MODAL);
				props.setLastVisitedModal(ChartWizardModals.UPLOAD_DATA_MODAL);
			}}
			modalHeading='Upload chart data'
			primaryButtonText='Done'
			secondaryButtonText='Back'>
			<p>
				Start with uploading the chart data or create a new chart from scratch.
			</p>
			<div className={fileUploaderHeading}>
				<strong className={'bx--file--label'}>Upload data file</strong>
				<p className={'bx--label-description'}>Only .json and .csv files</p>
			</div>
			<FileUploaderButton
				multiple={false}
				accept={['.json', '.csv']}
				onChange={(event: any) => { onFileAdded(event.target.files); }}/>
			{
				uploadedFile
					? <FileUploaderItem
						status='edit'
						name={uploadedFile.name}
						invalid={fileErrorState.isFileInvalid}
						errorSubject={fileErrorState.errorMessage}
						onDelete={() => {
							onFileDelete();
							props.setUploadedData({
								data: [],
								wasDataModified: false
							});
						}}/>
					: null
			}
		</Modal>
	);
};
