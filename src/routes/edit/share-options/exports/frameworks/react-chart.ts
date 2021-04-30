const chartTagMap: Record<string, string> = {
	'simple-bar-chart': 'SimpleBarChart',
	'grouped-bar-chart': 'GroupedBarChart',
	'stacked-bar-chart': 'StackedBarChart',
	'line-chart': 'LineChart',
	'area-chart': 'AreaChart',
	'stacked-area-chart': 'StackedAreaChart',
	'scatter-chart': 'ScatterChart',
	'pie-chart': 'PieChart',
	'donut-chart': 'DonutChart'
};

export const createReactChartApp = (chart: any) => {
	const chartData = JSON.stringify(chart.data, null, '\t');
	const chartType = `${chart.type}`;
	let chartOptions = '';
	let theme;
	if (chart && chart.options && chart.options.rawChartOptions) {
		// eslint-disable-next-line prefer-destructuring
		theme = chart.options.rawChartOptions.theme;
		chartOptions = JSON.stringify(chart.options.rawChartOptions, null, '\t');
	}

	let chartTheme = '@carbon/charts/styles.css';
	if (theme && theme !== 'default') {
		chartTheme = `@carbon/charts/styles-${theme}.css`;
	}

	const indexHtml = `<div id='root'></div>
`;
	const indexJs
= `import React from 'react';
import ReactDOM from 'react-dom';
import { ${chartTagMap[chartType]} } from '@carbon/charts-react';
import '${chartTheme}';
import { css } from 'emotion';

const app = css\`
	svg.bx--cc--chart-svg {
		height: 500px;
		min-width: 100%
	}
\`;

const options =
	${chartOptions};
class App extends React.Component {
	state = {
	data:
		${chartData}
	};
	render() {
	return (
		<div className={app}>
		<${chartTagMap[chartType]}
			data={this.state.data}
			options={options}>
		</${chartTagMap[chartType]}>
		</div>
	);
	}
}
ReactDOM.render(<App />, document.getElementById('root'));
`;

	const packageJson = {
		dependencies: {
			'@carbon/charts': '0.40.11',
			'@carbon/charts-react': '0.40.11',
			'carbon-components': '10.20.0',
			'@carbon/colors': '10.11.0',
			d3: '5.12.0',
			react: '16.12.0',
			'react-dom': '16.12.0',
			'react-scripts': '3.0.1',
			emotion: '10.0.27'
		}
	};

	return {
		'src/index.html': indexHtml,
		'src/index.js': indexJs,
		'package.json': packageJson
	};
};
