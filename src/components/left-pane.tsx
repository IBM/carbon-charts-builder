import React, {
	useState,
	useContext,
	useEffect
} from 'react';
import { css, cx } from 'emotion';
import {
	Button,
	Checkbox,
	ContentSwitcher,
	FormGroup,
	HeaderSideNavItems,
	NumberInput,
	Select,
	SelectItem,
	SideNav,
	SideNavItem,
	SideNavItems,
	SideNavMenu,
	Switch,
	TextInput,
	Tooltip
} from 'carbon-components-react';
import capitalize from 'lodash/capitalize';
import get from 'lodash/get';
import set from 'lodash/set';
import { ChartActionType, ChartsContext } from '../context/charts-context';
import { getGroupNames, restoreChartData } from '../utils/chart-tools';
import { useHistory } from 'react-router';
import { HeaderMenuItemLink } from './header-menu-item-link';

const inputWrap = css`
	margin-bottom: 1rem;
`;

const sideNav = css`
	border-right: 1px solid #D6D6D6;
`;

// Side nav is fixed when not in the edit screen
// it won't automatically open at 66 rem.
const fixedSideNav = css`
	@media screen and (min-width: 66rem) {
		transform: translateX(-16rem);
	}
`;

export const LeftPane = ({ isSideNavExpanded }: any) => {
	const [chartState, dispatch] = useContext(ChartsContext);
	const history = useHistory();
	const location = history.location.pathname;

	const id = `${chartState.currentId}`;
	const chart = chartState.charts.find((chart: any) => chart.id === id);

	const inEdit = !!location.match(/\/edit\//) && chart;

	const [state, setState] = useState<any>({
		XAxisContentSwitch: null,
		YAxisContentSwitch: null
	});

	const [overrideVariantsCount, doSetOverrideVariantsCount] = useState(false);

	const setOverrideVariantsCount = (override: boolean) => {
		if (!override) {
			const updatedChart = JSON.parse(JSON.stringify(chart));
			delete updatedChart.options?.rawChartOptions?.color?.pairing?.numberOfVariants;

			dispatch({
				type: ChartActionType.UPDATE_ONE,
				data: updatedChart
			});
		}

		doSetOverrideVariantsCount(override);
	};

	const getFieldValue = (id: string, defaultValue: any) => {
		const inputID = Array.isArray(id) ? id : id.split('-');
		if (id !== 'title' && id !== 'type') {
			inputID.unshift('options', 'rawChartOptions');
		}
		// Cannot use lodash get with default value because existance of null values in chart data
		const value = get(chart, inputID);
		return value !== undefined ? value : defaultValue;
	};

	const getVariantCount = () => {
		const fv = Number(getFieldValue('color-pairing-numberOfVariants', 0));

		if (!overrideVariantsCount || !fv) {
			return getGroupNames(chart.data).length;
		}

		return fv;
	};

	const getPaletteOptions = () => {
		let optionCount = 1;

		switch (getVariantCount()) {
			case 1:
				optionCount = 4;
				break;

			case 2:
				optionCount = 5;
				break;

			case 3:
				optionCount = 5;
				break;

			case 4:
				optionCount = 3;
				break;

			case 5:
				optionCount = 2;
				break;

			default:
				optionCount = 1;
		}

		return Array(optionCount).fill(0).map((_: any, index: number) => index + 1);
	};

	useEffect(() => {
		const numberOfVariants = Number(getFieldValue('color-pairing-numberOfVariants', 0));

		if (numberOfVariants && getGroupNames(chart.data).length !== numberOfVariants) {
			setOverrideVariantsCount(true);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chart]);

	const setStacked = (axes: any, stacked: boolean) => {
		if (axes?.left
			&& (axes?.left.scaleType === 'linear'
				|| axes?.left.scaleType === 'log')) {
			axes.left = {
				...axes.left,
				stacked
			};
		}
		if (axes?.right
			&& (axes?.right.scaleType === 'linear'
				|| axes?.right.scaleType === 'log')) {
			axes.right = {
				...axes.right,
				stacked
			};
		}
		if (axes?.top
			&& (axes?.top.scaleType === 'linear'
				|| axes?.top.scaleType === 'log')) {
			axes.top = {
				...axes.top,
				stacked
			};
		}
		if (axes?.bottom
			&& (axes?.bottom.scaleType === 'linear'
				|| axes?.bottom.scaleType === 'log')) {
			axes.bottom = {
				...axes.bottom,
				stacked
			};
		}
	};

	// eslint-disable-next-line complexity
	const handleChange = (inputID: string, inputValue: any) => {
		if (!chart.options || !inputID) { return; }
		const objectPath = inputID.split('-');
		if (inputID !== 'title' && inputID !== 'type') {
			objectPath.unshift('options', 'rawChartOptions');
		}

		let updatedChart = {
			...set(JSON.parse(JSON.stringify(chart)), objectPath, inputValue),
			data: restoreChartData(chart.data)
		};

		if (inputID === 'type') {
			// When switching to a grouped bar chart, the bottom axis needs
			// to have a scaleType of `labels`.
			if (inputValue === 'grouped-bar-chart') {
				updatedChart.options.rawChartOptions.axes.bottom = {
					...updatedChart.options.rawChartOptions.axes.bottom,
					scaleType: 'labels'
				};
			}
			// When switching to a stacked bar chart, the left axis needs
			// to have stacked be `true`, to prevent the bar from going beyond
			// the container.
			setStacked(updatedChart.options.rawChartOptions.axes, inputValue.includes('stacked'));
		}
		// If scale type is changed, this automatically maps data to the correct datapoint key.
		if (inputID.endsWith('-scaleType')) {
			if (inputValue === 'none') {
				// remove the axis
				if (inputID.startsWith('axes-left')) {
					delete updatedChart.options.rawChartOptions.axes.left;
				} else if (inputID.startsWith('axes-right')) {
					delete updatedChart.options.rawChartOptions.axes.right;
				} else if (inputID.startsWith('axes-top')) {
					delete updatedChart.options.rawChartOptions.axes.top;
				} else if (inputID.startsWith('axes-bottom')) {
					delete updatedChart.options.rawChartOptions.axes.bottom;
				}
			} else {
				const mapsToPath = [...objectPath];
				mapsToPath.splice(mapsToPath.length - 1, 1, 'mapsTo');

				if (chart.type.includes('stacked')) {
					const { axes } = updatedChart.options.rawChartOptions;
					if (axes?.left?.scaleType === 'linear' || axes?.left?.scaleType === 'log') {
						axes.left = {
							...axes.left,
							stacked: true
						};
					}
					if (axes?.right?.scaleType === 'linear' || axes?.right?.scaleType === 'log') {
						axes.right = {
							...axes.right,
							stacked: true
						};
					}
					if (axes?.top?.scaleType === 'linear' || axes?.top?.scaleType === 'log') {
						axes.top = {
							...axes.top,
							stacked: true
						};
					}
					if (axes?.bottom?.scaleType === 'linear' || axes?.bottom?.scaleType === 'log') {
						axes.bottom = {
							...axes.bottom,
							stacked: true
						};
					}
				}

				let mapsTo;
				switch (inputValue) {
					case 'time':
						mapsTo = 'date';
						break;
					case 'labels':
						mapsTo = 'key';
						break;
					case 'linear':
					case 'log':
					default:
						mapsTo = 'value';
				}

				updatedChart = { ...set(updatedChart, mapsToPath, mapsTo) };
			}
		}

		dispatch({
			type: ChartActionType.UPDATE_ONE,
			data: updatedChart
		});
	};

	const getNoneAxisOption = (axisType: string) => {
		const axes = chart?.options?.rawChartOptions?.axes;

		switch (axisType) {
			case 'top':
			case 'bottom':
				if (axes?.top && axes?.bottom) {
					return <SelectItem text='None' value='none' />;
				}
				break;

			case 'left':
			case 'right':
				if (axes?.left && axes?.right) {
					return <SelectItem text='None' value='none' />;
				}
				break;

			default:
				return null;
		}

		return null;
	};

	const changeOrientation = () => {
		const { axes } = chart.options.rawChartOptions;
		const updatedChart = {
			...chart,
			options: {
				...chart.options,
				rawChartOptions: {
					...chart.options.rawChartOptions,
					axes: {
						left: axes.bottom ? { ...axes.bottom } : null,
						bottom: axes.left ? { ...axes.left } : null,
						top: axes.right ? { ...axes.right } : null,
						right: axes.top ? { ...axes.top } : null
					}
				}
			}
		};

		// we don't want the empty axes in the options
		if (updatedChart.options.rawChartOptions.axes.left === null) {
			delete updatedChart.options.rawChartOptions.axes.left;
		}
		if (updatedChart.options.rawChartOptions.axes.right === null) {
			delete updatedChart.options.rawChartOptions.axes.right;
		}
		if (updatedChart.options.rawChartOptions.axes.top === null) {
			delete updatedChart.options.rawChartOptions.axes.top;
		}
		if (updatedChart.options.rawChartOptions.axes.bottom === null) {
			delete updatedChart.options.rawChartOptions.axes.bottom;
		}

		dispatch({
			type: ChartActionType.UPDATE_ONE,
			data: updatedChart
		});
	};

	const SwitchAxisType = (axisType: string) => (
		<>
			<TextInput
				className={inputWrap}
				id={`axes-${axisType}-title`}
				labelText={capitalize(`${axisType} axis title`)}
				onChange={onChange}
				placeholder={`${axisType} axis title`}
				type='text'
				defaultValue={getFieldValue(`axes-${axisType}-title`, '')} />
			<Select
				className={inputWrap}
				value={getFieldValue(`axes-${axisType}-scaleType`, 'default')}
				id={`axes-${axisType}-scaleType`}
				labelText='Scale type'
				onChange={onChange}>
				<SelectItem disabled text='Choose...' value='default' key='default' />
				{ getNoneAxisOption(axisType) }
				<SelectItem text='Linear' value='linear' />
				<SelectItem text='Time' value='time' />
				<SelectItem text='Log' value='log' />
				<SelectItem text='Labels' value='labels' />
			</Select>
			<Select
				className={inputWrap}
				value={getFieldValue(`axes-${axisType}-mapsTo`, 'default')}
				id={`axes-${axisType}-mapsTo`}
				labelText='Map data to'
				onChange={onChange}>
				<SelectItem disabled text='Choose...' value='default' key='default' />
				<SelectItem text='Key' value='key' />
				<SelectItem text='Group' value='group' />
				<SelectItem text='Value' value='value' />
				<SelectItem text='Date' value='date' />
			</Select>
		</>
	);

	const onChange = (event: any) => {
		if (event.imaginaryTarget) {
			handleChange(event.imaginaryTarget.id, event.imaginaryTarget.value);
		} else {
			handleChange(event.target.id, event.target.value);
		}
	};

	return (
		<SideNav
			aria-label={inEdit && chart && chart.title
				? `Modify options for '${chart.title}'`
				: 'Side navigation'
			}
			tabindex={0}
			isFixedNav={!inEdit}
			expanded={isSideNavExpanded}
			className={`${sideNav} ${!inEdit ? fixedSideNav : ''}`}>
			<SideNavItems>
				<HeaderSideNavItems hasDivider>
					<HeaderMenuItemLink to="#" key="#">
						Title2
					</HeaderMenuItemLink>
				</HeaderSideNavItems>
				{
					inEdit && <>
						<SideNavMenu title='General'>
							<SideNavItem>
								<FormGroup style={{
									marginLeft: '1rem',
									marginRight: '1rem',
									marginTop: '2rem'
								}}
								legendText=''>
									<TextInput
										className={inputWrap}
										id='title'
										labelText='Chart Title'
										onChange={onChange}
										placeholder='Chart Title'
										type='text'
										defaultValue={getFieldValue('title', '')} />
									<Select
										className={inputWrap}
										value={getFieldValue('theme', 'default')}
										id='theme'
										labelText='Theme'
										onChange={onChange}>
										<SelectItem text='White' value='default' key='default' />
										<SelectItem text='G100' value='g100' />
										<SelectItem text='G90' value='g90' />
										<SelectItem text='G10' value='g10' />
									</Select>
									<Select
										className={inputWrap}
										value={getFieldValue('type', 'default')}
										id='type'
										labelText='Type'
										onChange={onChange}>
										<SelectItem
											disabled
											text='Choose...'
											value='default'
											key='default' />
										<SelectItem text='Simple bar chart' value='simple-bar-chart' />
										<SelectItem text='Grouped bar chart' value='grouped-bar-chart' />
										<SelectItem text='Stacked bar chart' value='stacked-bar-chart' />
										<SelectItem text='Scatter chart' value='scatter-chart' />
										<SelectItem text='Line chart' value='line-chart' />
										<SelectItem text='Area chart' value='area-chart' />
										<SelectItem text='Stacked area chart' value='stacked-area-chart' />
										<SelectItem text='Donut chart' value='donut-chart' />
										<SelectItem text='Pie chart' value='pie-chart' />
									</Select>
									<Checkbox
										className={inputWrap}
										id='animations'
										labelText='Animations'
										checked={getFieldValue('animations', false)}
										onChange={(event: any) => handleChange('animations', event)} />
									<Checkbox
										className={inputWrap}
										id='tooltip-enabled'
										labelText='Tooltips'
										checked={getFieldValue('tooltip-enabled', true)}
										onChange={
											(event: any) => handleChange('tooltip-enabled', event)}
									/>
									{
										(chart.type === 'line-chart'
										|| chart.type === 'area-chart'
										|| chart.type === 'stacked-area-chart')
										&& <Select
											className={inputWrap}
											value={getFieldValue('curve', 'curveLinear')}
											id='curve'
											labelText='Curve'
											onChange={onChange}>
											<SelectItem text='Linear' value='curveLinear' />
											<SelectItem text='Linear closed' value='curveLinearClosed' />
											<SelectItem text='Basis' value='curveBasis' />
											<SelectItem text='Basis closed' value='curveBasisClosed' />
											<SelectItem text='Basis open' value='curveBasisOpen' />
											<SelectItem text='Bundle' value='curveBundle' />
											<SelectItem text='Cardinal' value='curveCardinal' />
											<SelectItem text='Cardinal closed' value='curveCardinalClosed' />
											<SelectItem text='Cardinal open' value='curveCardinalOpen' />
											<SelectItem text='Catmull rom' value='curveCatmullRom' />
											{/* eslint-disable-next-line max-len */}
											<SelectItem text='Catmull rom closed' value='curveCatmullRomClosed' />
											<SelectItem text='Catmull rom open' value='curveCatmullRomOpen' />
											<SelectItem text='Monotone X' value='curveMonotoneX' />
											<SelectItem text='Monotone Y' value='curveMonotoneY' />
											<SelectItem text='Natural' value='curveNatural' />
											<SelectItem text='Step' value='curveStep' />
											<SelectItem text='Step after' value='curveStepAfter' />
											<SelectItem text='Step before' value='curveStepBefore' />
										</Select>
									}
									{
										chart.type !== 'donut-chart'
										&& chart.type !== 'pie-chart'
										&& <Button onClick={changeOrientation}>Change orientation</Button>
									}
								</FormGroup>
							</SideNavItem>
						</SideNavMenu>
						<SideNavMenu title='Colors'>
							<SideNavItem>
								<FormGroup style={{
									marginLeft: '1rem',
									marginRight: '1rem',
									marginTop: '2rem'
								}}
								legendText=''>
									<Tooltip
										triggerText='Number of variants'
										direction='top'>
											Number of distinct colors in the palette.
									</Tooltip>
									<div className={css`
										display: flex;
										flex-direction: row;
										align-items: center;
										margin-top: 7px;
									`}>
										<NumberInput
											className={cx([
												inputWrap,
												css`input[type=number] { min-width: 120px }`
											])}
											id='color-pairing-numberOfVariants'
											label=''
											disabled={!overrideVariantsCount}
											min={getGroupNames(chart.data).length}
											max={14}
											value={getVariantCount()}
											onChange={onChange} />
										<Checkbox
											className={inputWrap}
											id='override-color-variants'
											labelText='Override'
											checked={overrideVariantsCount}
											onChange={
												(event: any) => setOverrideVariantsCount(event)
											} />
									</div>
									<Select
										className={inputWrap}
										value={getFieldValue('color-pairing-option', 1)}
										id='color-pairing-option'
										labelText='Palette option'
										onChange={onChange}>
										{
											getPaletteOptions().map((value) =>
												<SelectItem
													text={value.toString()}
													value={value}
													key={value} />)
										}
									</Select>
								</FormGroup>
							</SideNavItem>
						</SideNavMenu>
						<SideNavMenu title='X axis'>
							<SideNavItem>
								<FormGroup style={{
									marginLeft: '1rem',
									marginRight: '1rem',
									marginTop: '2rem'
								}}
								legendText=''>
									<ContentSwitcher
										className={inputWrap}
										onChange={
											(event: any) => setState({ XAxisContentSwitch: event.name })
										}
										selectedIndex={0}>
										<Switch name='top' text='Top' />
										<Switch name='bottom' text='Bottom' />
									</ContentSwitcher>
									{SwitchAxisType(
										state.XAxisContentSwitch ? state.XAxisContentSwitch : 'top'
									)}
								</FormGroup>
							</SideNavItem>
						</SideNavMenu>
						<SideNavMenu title='Y axis'>
							<SideNavItem>
								<FormGroup style={{
									marginLeft: '1rem',
									marginRight: '1rem',
									marginTop: '2rem'
								}}
								legendText=''>
									<ContentSwitcher
										className={inputWrap}
										onChange={
											(event: any) => setState({ YAxisContentSwitch: event.name })
										}
										selectedIndex={0}>
										<Switch
											name='left'
											text='Left'>
										</Switch>
										<Switch name='right' text='Right'>
										</Switch>
									</ContentSwitcher>
									{SwitchAxisType(state.YAxisContentSwitch
										? state.YAxisContentSwitch : 'left')}
								</FormGroup>
							</SideNavItem>
						</SideNavMenu>
						<SideNavMenu title='Legend'>
							<SideNavItem>
								<FormGroup style={{
									marginLeft: '1rem',
									marginRight: '1rem',
									marginTop: '2rem'
								}}
								legendText=''>
									<Select
										className={inputWrap}
										value={getFieldValue('legend-position', 'default')}
										id='legend-position'
										labelText='Choose legend position'
										onChange={onChange}>
										<SelectItem
											disabled
											text='Choose...'
											value='default'
											key='default' />
										<SelectItem text='Left' value='left' />
										<SelectItem text='Right' value='right' />
										<SelectItem text='Top' value='top' />
										<SelectItem text='Bottom' value='bottom' />
									</Select>
									<Checkbox
										className={inputWrap}
										id='legend-clickable'
										labelText='Clickable'
										checked={getFieldValue('legend-clickable', true)}
										onClick={
											(event: any) => {
												handleChange('legend-clickable', event.target.checked);
											}
										} />
								</FormGroup>
							</SideNavItem>
						</SideNavMenu>
					</>
				}
			</SideNavItems>
		</SideNav>
	);
};
