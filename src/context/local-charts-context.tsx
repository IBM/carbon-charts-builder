import React, { createContext, useReducer } from 'react';

const LocalChartsContext: React.Context<any> = createContext(null);

LocalChartsContext.displayName = 'LocalChartsContext';

export enum LocalChartActionType {
	ADD,
	REMOVE
}

export interface LocalChartAction {
	type: LocalChartActionType,
	data: any
}

const chartsReducer = (state: any[], action: any) => {
	switch (action.type) {
		case LocalChartActionType.REMOVE: {
			const ci = state.findIndex((c: any) => c.id === action.data.id);
			return [
				...state.slice(0, ci),
				...state.slice(ci + 1)
			];
		}
		default:
		case LocalChartActionType.ADD:
			return [...state, action.data];
	}
};

const validInitialState = (localCharts: any[] | undefined) => {
	if (!localCharts || !Array.isArray(localCharts)) {
		return [];
	}

	// sanitize localCharts in case they've been modified by third party
	return localCharts
		.filter((chart: any) => !!chart.id && typeof chart.id === 'string')
		.map((chart: any) => ({ id: chart.id }));
};

const LocalChartsContextProvider = ({ children }: any) => {
	const initialState: any[] = validInitialState(JSON.parse(localStorage.getItem('localCharts') as string));
	const store = useReducer(chartsReducer, initialState);
	const [charts] = store;

	React.useEffect(() => {
		// store only ids to local storage so we don't get into temptation of using other
		// props that should really be coming from db
		localStorage.setItem('localCharts', JSON.stringify(charts.map((lc: any) => ({ id: lc.id }))));
	}, [charts]);

	return (
		<LocalChartsContext.Provider value={store}>
			{children}
		</LocalChartsContext.Provider>
	);
};

export {
	LocalChartsContext,
	LocalChartsContextProvider
};
