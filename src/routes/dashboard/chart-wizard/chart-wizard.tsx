import React, { useState } from 'react';

import { CreateChartModal } from './create-chart-modal';
import { UploadDataModal } from './upload-data-modal';
import { ChooseChartModal } from './choose-chart-modal';
import { ChartType } from '../../../interfaces';

export enum ChartWizardModals {
	CREATE_CHART_MODAL,
	UPLOAD_DATA_MODAL,
	CHOOSE_CHART_MODAL
}

export const ChartWizard = ({ shouldDisplay, setShouldDisplay, dispatch }: any) => {
	// These are states which are shared amongst the three modals.
	const [displayedModal, setDisplayedModal]
		= useState<ChartWizardModals | null>(ChartWizardModals.CREATE_CHART_MODAL);
	// This is used to indicate which modal was last visited and is used to go go back to the
	// correct previous modal.
	const [lastVisitedModal, setLastVisitedModal]
		= useState<ChartWizardModals>(ChartWizardModals.CREATE_CHART_MODAL);
	const [recommendedCharts, setRecommendedCharts] = useState<ChartType[]>([]);
	const [uploadedData, setUploadedData] = useState<any>({});

	const modalSwitcher = () => {
		if (!shouldDisplay) {
			return null;
		}
		switch(displayedModal) {
			case ChartWizardModals.CREATE_CHART_MODAL:
				return (
					<CreateChartModal
						shouldDisplay={shouldDisplay}
						setShouldDisplay={setShouldDisplay}
						setDisplayedModal={setDisplayedModal}
						setLastVisitedModal={setLastVisitedModal} />
				);
			case ChartWizardModals.UPLOAD_DATA_MODAL:
				return (
					<UploadDataModal
						shouldDisplay={shouldDisplay}
						setShouldDisplay={setShouldDisplay}
						setUploadedData={setUploadedData}
						setDisplayedModal={setDisplayedModal}
						setLastVisitedModal={setLastVisitedModal}
						setRecommendedCharts={setRecommendedCharts} />
				);
			case ChartWizardModals.CHOOSE_CHART_MODAL:
				return (
					<ChooseChartModal
						shouldDisplay={shouldDisplay}
						setShouldDisplay={setShouldDisplay}
						setDisplayedModal={setDisplayedModal}
						lastVisitedModal={lastVisitedModal}
						setLastVisitedModal={setLastVisitedModal}
						recommendedCharts={recommendedCharts}
						setRecommendedCharts={setRecommendedCharts}
						uploadedData={uploadedData}
						setUploadedData={setUploadedData}
						dispatch={dispatch} />
				);
			default:
				return null;
		}
	};

	return modalSwitcher();
};
