import React, {
	useState,
	useContext,
	useEffect
} from 'react';
import { css } from 'emotion';
import { DashboardSearch, SortDirection } from './dashboard-search';
import { ChartGroupDisplayed, DashboardHeader } from './dashboard-header';

import {
	Col,
	Main,
	Row
} from './../../components';
import { ChartTileList } from './chart-tile-list';
import { ChartWizard } from './chart-wizard/chart-wizard';
import { ChartModal } from '../edit/chart-modal';
import { ChartsContext, ChartActionType } from '../../context';

const chartSort = (sortDirection: SortDirection) => function(a: any, b: any) {
	if (sortDirection === SortDirection.Descending) {
		return Date.parse(a.lastModified) - Date.parse(b.lastModified);
	}
	return Date.parse(b.lastModified) - Date.parse(a.lastModified);
};

// styles for the header (title and content switcher)
// to override carbon styling for <main>
const headerRowSyles = css`
	background: white;
	padding: 0 2rem;
	margin: 0 -2rem;
	padding-top: 2rem;
	margin-top: -2rem;
	.bx--col {
		padding: 0;
	}
`;

// additional styles for the search row
const searchRowStyles = css`
	padding-right: 0;
	padding-left: 1rem;
	margin: 0 -2rem;
	border-bottom: 1px solid #d6d6d6;
	.bx--col {
		padding-right: 0;
	}
`;

export const Dashboard = () => {
	const [{ charts, loaded }, dispatch] = useContext(ChartsContext);
	const [chartGroupDisplayed, setChartGroupDisplayed] = useState(ChartGroupDisplayed.AllCharts);
	const [chartTitleFilter, setChartTitleFilter] = useState('');
	const [sortDirection, setSortDirection] = useState(SortDirection.Ascending);
	const [displayWizard, setDisplayWizard] = useState(false);

	useEffect(() => {
		dispatch({
			type: ChartActionType.UPDATE_ALL,
			data: charts,
			loaded: true
		});
	// we don't want to run this effect when charts change because it creates a loop
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	useEffect(() => {
		document.title = 'Xenon • Charts as a Service';
	}, []);

	const filterCharts = (charts: any) => charts.filter((chart: any) => chart.title.toLowerCase()
		.includes(chartTitleFilter.toLowerCase()) && !chart.hidden)
		.sort(chartSort(sortDirection));

	let displayedCharts;

	switch (chartGroupDisplayed) {
		case ChartGroupDisplayed.Templates: {
			displayedCharts = filterCharts(
				charts.filter((chart: any) => chart.labels && chart.labels.includes('template'))
			);
			break;
		}
		case ChartGroupDisplayed.AllCharts:
		default:
			displayedCharts = filterCharts(charts);
			break;
	}
	const [modalChart, setModalChart] = useState<any>(null);

	return (
		<>
			<Main style={{ marginLeft: '0px' }}>
				<Row styles={headerRowSyles}>
					<Col cols={{
						sm: 12,
						md: 12,
						lg: 12
					}}>
						<DashboardHeader
							onDisplayedSwitchHandler={setChartGroupDisplayed}
							chartGroupDisplayed={chartGroupDisplayed} />
					</Col>
				</Row>
				<Row styles={searchRowStyles}>
					<Col cols={{
						sm: 12,
						md: 12,
						lg: 12
					}}>
						<DashboardSearch
							onSearchHandler={setChartTitleFilter}
							onSortHandler={setSortDirection}
							sortDirection={sortDirection}
							displayWizard={displayWizard}
							setDisplayWizard={setDisplayWizard} />
					</Col>
				</Row>
				<Row>
					<Col cols={{
						sm: 12,
						md: 12,
						lg: 12
					}}>
						{
							!loaded
								? 'Loading...'
								: <ChartTileList
									charts={displayedCharts}
									loaded={loaded}
									setModalChart={setModalChart} />
						}
					</Col>
				</Row>
			</Main>
			<ChartWizard
				shouldDisplay={displayWizard}
				setShouldDisplay={setDisplayWizard} />
			{modalChart && <ChartModal chart={modalChart} />}
		</>
	);
};
