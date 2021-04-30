// Used to map chart types to corresponding vanilla chart tag.
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

export const createVanillaChartApp = (chart: any) => {
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

	const indexHtml
= `<!DOCTYPE html>
<html>
	<head>
		<title>Vanilla</title>
		<meta charset='UTF-8' />
	</head>
	<body>
		<div style='height: 500px; min-width: 100%;'>
			<div id='my-chart'></div>
		</div>
		<script src='src/index.js'>
		</script>
	</body>
</html>
`;

	const indexJs
= `import '${chartTheme}';
import { ${chartTagMap[chartType]} } from '@carbon/charts';
// grab chart holder DOM element
const chartHolder = document.getElementById('my-chart');
// initialize the chart
new ${chartTagMap[chartType]}(chartHolder, {
	data: ${chartData},
	options: ${chartOptions},
});
`;

	const packageJson = {
		dependencies: {
			'@carbon/charts': '0.40.11',
			'carbon-components': '10.20.0',
			'@carbon/colors': '10.11.0',
			d3: '5.15.0'
		}
	};

	return {
		'index.html': indexHtml,
		'src/index.js': indexJs,
		'package.json': packageJson
	};
};
