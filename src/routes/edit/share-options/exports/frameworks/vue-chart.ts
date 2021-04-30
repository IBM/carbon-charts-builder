// Used to map chart types to corresponding vue chart tag.
const chartTagMap: Record<string, string> = {
	'simple-bar-chart': 'ccv-simple-bar-chart',
	'grouped-bar-chart': 'ccv-grouped-bar-chart',
	'stacked-bar-chart': 'ccv-stacked-bar-Chart',
	'line-chart': 'ccv-line-chart',
	'scatter-chart': 'ccv-scatter-chart',
	'pie-chart': 'ccv-pie-chart',
	'donut-chart': 'ccv-donut-chart',
	'area-chart': 'ccv-area-chart',
	'stacked-area-chart': 'ccv-stacked-area-chart',
	dataAndOptions: ':data=\'data\' :options=\'options\''
};

export const createVueChartApp = (chart: any) => {
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

	const chartVue
= `<script>
	import Vue from 'vue';
	import '${chartTheme}';
	import chartsVue from '@carbon/charts-vue';
	Vue.use(chartsVue);
	export default {
		name: 'Chart',
		components: {},
		data() {
			return {
			data:
			${chartData},
			options:
			${chartOptions}
		};
	},
	template:
		"<${chartTagMap[chartType]} :data='data' :options='options'></${chartTagMap[chartType]}>"
	};
</script>
`;

	const appVue
= `<template>
<div id='app' style='height: 500px; min-width: 100%;'>
<Chart/>
</div>
</template>
<script>
	import Chart from './components/chart';
	export default {
		name: 'App',
		components: {
			Chart
		}
	};
</script>
`;
	const mainJs
= `import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false;
new Vue({
	render: h => h(App)
}).$mount('#app');
`;

	const packageJson = {
		dependencies: {
			'@carbon/charts': '0.40.11',
			'@carbon/charts-vue': '0.40.11',
			'@vue/cli-plugin-babel': '4.1.1',
			d3: '5.15.0',
			vue: '2.6.11'
		}
	};

	return {
		'src/components/chart.vue': chartVue,
		'src/App.vue': appVue,
		'src/main.js': mainJs,
		'package.json': packageJson
	};
};
