import React from 'react';
import { css } from 'emotion';
import { ContentSwitcher, Switch } from 'carbon-components-react';

// keep the enum order same as the switch order so context switcher
// knows to select the correct one. Shout if you have a cleaner alternative.
export enum ChartGroupDisplayed {
	AllCharts,
	Templates,
	LocalOnly
}

const dashboardHeaderWrapper = css`
	display: flex;
	margin: 2rem 0;

	// 676px is when the content switcher becomes too small to show full text, moves the
	// content switcher below the title at this point.
	@media screen and (max-width: 676px) {
		flex-wrap: wrap;
	}
`;

const chartTitle = css`
	width: 100%;
`;

const contentSwitcher = css`
	width: 450px;
`;

export const DashboardHeader = ({ onDisplayedSwitchHandler, chartGroupDisplayed }: any) => (
	<div className={dashboardHeaderWrapper}>
		<h2 className={chartTitle}>Charts</h2>
		<ContentSwitcher
			className={contentSwitcher}
			onChange={(event: any) => onDisplayedSwitchHandler(event.name)}
			selectedIndex={chartGroupDisplayed}>
			<Switch name={ChartGroupDisplayed.AllCharts} text='All charts' />
			<Switch name={ChartGroupDisplayed.Templates} text='Templates only' />
			<Switch name={ChartGroupDisplayed.LocalOnly} text='Local charts' />
		</ContentSwitcher>
	</div>
);
