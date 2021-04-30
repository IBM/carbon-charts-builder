export const restoreChartData = (chartData: any) => (
	chartData.map((datapoint: any) => ({
		...datapoint,
		date: new Date(datapoint.date)
	}))
);

export const getGroupNames = (chartData: any[]) => {
	if (!chartData) {
		return [];
	}

	return chartData
		.map((datapoint: any) => datapoint.group)
		.filter((groupName: string, index: number, self: any) => self.indexOf(groupName) === index);
};
