import { getParameters } from 'codesandbox/lib/api/define';

export const createChartSandbox = (chartTemplate: any) => {
	const files: Record<string, any> = {};

	Object.keys(chartTemplate)
		.forEach((filePath: string) => files[filePath] = { content: chartTemplate[filePath] });

	return getParameters({ files });
};
