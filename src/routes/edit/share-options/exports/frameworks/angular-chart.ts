// Used to map chart types to corresponding angular tag.
const chartTagMap: Record<string, string> = {
	'simple-bar-chart': 'ibm-simple-bar-chart',
	'grouped-bar-chart': 'ibm-grouped-bar-chart',
	'stacked-bar-chart': 'ibm-stacked-bar-Chart',
	'line-chart': 'ibm-line-chart',
	'area-chart': 'ibm-area-chart',
	'stacked-area-chart': 'ibm-stacked-area-chart',
	'scatter-chart': 'ibm-scatter-chart',
	'pie-chart': 'ibm-pie-chart',
	'donut-chart': 'ibm-donut-chart'
};

export const createAngularChartApp = (chart: any) => {
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

	const appComponentHtml
= `<${chartTagMap[chartType]} [data]='data' [options]='options'></${chartTagMap[chartType]}>
`;
	const appComponentTs
= `import { Component } from '@angular/core';
import '${chartTheme}';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	data = ${chartData};
	options = ${chartOptions};
}
`;
	const appModule
= `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from '@carbon/charts-angular';
import { AppComponent } from './app.component';
@NgModule({
	imports: [BrowserModule, ChartsModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}
`;

	const indexHtml
= `<!DOCTYPE html>
<html lang='en'>
	<head>
		<meta charset='utf-8' />
		<title>Angular</title>
	</head>
	<body>
		<app-root></app-root>
	</body>
</html>
`;

	const mainTs
= `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => console.log(err));
`;

	const angularCliJson
= `{
	"apps": [
		{
			"root": "src",
			"outDir": "dist",
			"assets": ["assets", "favicon.ico"],
			"index": "index.html",
			"main": "main.ts",
			"polyfills": "polyfills.ts",
			"prefix": "app",
			"styles": ["styles.css"],
			"scripts": [],
			"environmentSource": "environments/environment.ts",
			"environments": {
				"dev": "environments/environment.ts",
				"prod": "environments/environment.prod.ts"
			}
		}
	]
}
`;

	const packageJson = {
		dependencies: {
			'@angular/animations': '8.2.14',
			'@angular/common': '8.2.14',
			'@angular/compiler': '8.2.14',
			'@angular/core': '8.2.14',
			'@angular/forms': '8.2.14',
			'@angular/platform-browser': '8.2.14',
			'@angular/platform-browser-dynamic': '8.2.14',
			'@angular/router': '8.2.14',
			'@carbon/charts': '0.40.11',
			'@carbon/charts-angular': '0.40.11',
			'core-js': '3.6.0',
			d3: '5.15.0',
			rxjs: '6.5.3',
			'zone.js': '0.10.2'
		}
	};

	return {
		'src/index.html': indexHtml,
		'src/main.ts': mainTs,
		'src/app/app.component.html': appComponentHtml,
		'src/app/app.component.ts': appComponentTs,
		'src/app/app.module.ts': appModule,
		'.angular-cli.json': angularCliJson,
		'package.json': packageJson
	};
};
