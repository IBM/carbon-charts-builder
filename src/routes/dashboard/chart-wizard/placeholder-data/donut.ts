import { pieData } from './pie';

export const donutData = pieData;

export const donutOptions = {
	title: 'Donut',
	resizable: true,
	data: { groupMapsTo: 'key' },
	donut: { center: { label: 'Browsers' } },
	legend: { position: 'left' }
};
