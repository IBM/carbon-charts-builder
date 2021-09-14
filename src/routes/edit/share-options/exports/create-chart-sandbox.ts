import LZString from 'lz-string';

export const createChartSandbox = (chartTemplate: any) => {
	const files: Record<string, any> = {};

	Object.keys(chartTemplate)
		.forEach((filePath: string) => files[filePath] = { content: chartTemplate[filePath] });

	return LZString.compressToBase64(JSON.stringify({ files }))
		.replace(/\+/g, `-`) // '+' -> '-'
		.replace(/\//g, `_`) // '/' -> '_'
		.replace(/=+$/, ``); // Remove ending '='
};
