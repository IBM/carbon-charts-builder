import React, {
	createContext,
	useReducer,
	useEffect
} from 'react';
import assign from 'lodash/assign';

const ChartsContext: React.Context<any> = createContext(null);
ChartsContext.displayName = 'ChartsContext';

export enum ChartActionType {
	ADD_ONE,
	FETCH_ONE,
	TOGGLE_VISIBILITY,
	REMOVE_CHART,
	REMOVE_CHARTS,
	UPDATE_ALL,
	UPDATE_ONE
}

export type ChartAction =
	ChartActionAddOne |
	ChartActionFetchOne |
	ChartActionRemoveChart |
	ChartActionToggleVisibility |
	ChartActionRemoveCharts |
	ChartActionUpdateAll |
	ChartActionUpdateOne;

export interface BaseChartAction {
	type: ChartActionType
	loaded: boolean;
}

export interface ChartActionAddOne extends BaseChartAction {
	type: ChartActionType.ADD_ONE;
	data: any;
}

export interface ChartActionFetchOne extends BaseChartAction {
	type: ChartActionType.FETCH_ONE;
	data: any;
}

export interface ChartActionRemoveChart extends BaseChartAction {
	type: ChartActionType.REMOVE_CHART;
	id: string;
}

export interface ChartActionToggleVisibility extends BaseChartAction {
	type: ChartActionType.TOGGLE_VISIBILITY;
	id: string;
	hidden: boolean;
}

export interface ChartActionRemoveCharts extends BaseChartAction {
	type: ChartActionType.REMOVE_CHARTS;
	ids: string[];
}

export interface ChartActionUpdateAll extends BaseChartAction {
	type: ChartActionType.UPDATE_ALL;
	data: any;
}

export interface ChartActionUpdateOne extends BaseChartAction {
	type: ChartActionType.UPDATE_ONE;
	data: any;
}

export interface ChartState {
	currentId: string | null,
	charts: any[],
	loaded: boolean
}

export const useFetchOne = (id: number, dispatch: any) => {
	useEffect(() => {
		dispatch({
			type: ChartActionType.FETCH_ONE,
			data: id
		});
	}, [dispatch, id]);
};

const updateOne = (
	state: ChartState,
	action: ChartActionUpdateOne
) => {
	if (!state.charts.length) {
		return {
			charts: [action.data],
			loaded: action.loaded,
			currentId: action.data.id
		};
	}
	const updatedChartState = state.charts.map((chart: any) => {
		if (chart.id === action.data.id) {
			// Cannot use merge because removing datasets or labels will not
			// work since it keeps the values, while assign overwrites past values.
			return assign({}, chart, action.data);
		}
		return chart;
	});

	return {
		...state,
		charts: updatedChartState,
		loaded: action.loaded,
		currentId: action.data.id
	};
};

const chartsReducer = (state: ChartState, action: ChartAction) => {
	switch (action.type) {
		case ChartActionType.FETCH_ONE:
			return {
				...state,
				currentId: action.data,
				loaded: true
			};
		case ChartActionType.UPDATE_ALL: {
			if (!state.charts || !state.charts.length) {
				return {
					...state,
					charts: action.data,
					loaded: action.loaded,
					currentId: null
				};
			}

			// Remove charts which are in the original state but not in the payload.
			const filteredCharts = state.charts
				.filter((chart: any) => action.data.some((actionChart: any) => actionChart.id === chart.id));
			// If charts already exist in the state, we need to merge any changes to the charts with
			// the current matching charts and add any new charts (if any) to the state.
			const mergedCharts = filteredCharts.map((chart: any) => {
			// Find the chart in the payload containing the same id as the current state's charts
			// to merge updated changes with.
				const updatedChart = action.data.find((actionChart: any) => chart.id === actionChart.id);
				// Can not use merge because removing datasets or labels will not
				// work since it keeps the values, while assign overwrites past values.
				return assign({}, chart, updatedChart);
			});
			// Adds any charts in the payload which do not match any id in the current state's charts.
			const updatedCharts = mergedCharts
				.concat(action.data.filter((actionChart: any) => (
					state.charts.every((chart: any) => chart.id !== actionChart.id)
				)));
			return {
				...state,
				charts: updatedCharts,
				loaded: action.loaded,
				currentId: null
			};
		}
		case ChartActionType.UPDATE_ONE:
			return updateOne(state, action);
		case ChartActionType.REMOVE_CHART: {
			return {
				...state,
				charts: state.charts.filter((chart: any) => chart.id !== action.id),
				loaded: action.loaded,
				currentId: action.id
			};
		}
		case ChartActionType.TOGGLE_VISIBILITY: {
			const chartToHide = state.charts.find((chart: any) => chart.id === action.id);
			chartToHide.hidden = action.hidden;
			return {
				...state,
				loaded: action.loaded,
				currentId: action.id
			};
		}
		case ChartActionType.REMOVE_CHARTS: {
			const remainingCharts = state.charts.filter((chart: any) => (
				!action.ids.some((actionChart: any) => actionChart.id === chart.id)
			));
			return {
				...state,
				charts: remainingCharts,
				loaded: action.loaded,
				currentId: null
			};
		}
		case ChartActionType.ADD_ONE: {
			const duplicate = assign({}, action.data);
			const expandedCharts = state.charts.concat(duplicate);
			return {
				...state,
				charts: expandedCharts,
				loaded: action.loaded,
				currentId: action.data.id
			};
		}
		default:
			return state;
	}
};

const validInitialCharts = (localCharts: any[] | undefined) => {
	if (!localCharts || !Array.isArray(localCharts)) {
		return [];
	}

	return localCharts.filter((chart: any) => !!chart.id && typeof chart.id === 'string');
};

const ChartsContextProvider = ({ children }: any) => {
	const initialState: any = {
		charts: validInitialCharts(JSON.parse(localStorage.getItem('localCharts') as string)),
		loaded: false,
		currentId: null
	};
	const store = useReducer(chartsReducer, initialState);
	const [state] = store;

	React.useEffect(() => {
		// store only ids to local storage so we don't get into temptation of using other
		// props that should really be coming from db
		localStorage.setItem('localCharts', JSON.stringify(state.charts));
	}, [state.charts]);

	return (
		<ChartsContext.Provider value={store}>
			{children}
		</ChartsContext.Provider>
	);
};

export {
	ChartsContext,
	ChartsContextProvider
};
