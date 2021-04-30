import React, { useContext } from 'react';
import { css } from 'emotion';
import {
	Button,
	Checkbox,
	InlineLoading
} from 'carbon-components-react';
import {
	Copy16,
	Delete16,
	// 🏗️🏗️🏗️ Under construction, add in later 🏗️🏗️🏗️
	// Edit16,
	Settings16,
	Share16
} from '@carbon/icons-react';
import { ModalContext, ModalActionType } from '../../context/modal-context';
import { ChartModal } from './chart-modal';
import { LocalChartsContext, LocalChartActionType } from '../../context/local-charts-context';
import { ChartsContext } from '../../context';

const editHeader = css`
	left: 16rem;
	margin-bottom: 16px;
	background: #fff;
	.edit-content {
		position: relative;
		display: flex;
		justify-content: space-between;
		.title-wrap {
			height: 3rem;
			display: flex;
			align-self: center;
			flex-flow: column;
		}
		.title-subheading {
			display: inline-flex;
			.bx--inline-loading {
				width: auto;
				position: relative;
				margin-left: 10px;
				top: -10px;
			}
			.date-wrap {
				font-size: 12px;
				font-style: italic;
				color: black;
				padding-left: 12px;
			}
		}
		.chart-title {
			whitespace: nowrap;
			font-weight: bold;
			padding-left: 12px;
			padding-right: 16px;
			float: left;
		}
		.chart-edit {
			margin-top: 6px;
			cursor: pointer;
		}
	}

	// This is the viewport width that causes the loading and
	// store to local charts checkbox to overlap.
	@media screen and (max-width: 67.0625rem) {
		.edit-content {
			.title-subheading {
				flex-flow: column;
				.bx--inline-loading {
					margin-top: 10px;
				}
			}
		}
	}

	// This is the viewport width that causes the store to local
	// charts checkbox and last modified label to overlap.
	@media screen and (max-width: 58.125rem) {
		.edit-content {
			flex-direction: column;
			.title-wrap {
				margin-top: 10px;
				align-self: auto;
			}
			.title-subheading {
				flex-direction: row;
				.bx--inline-loading {
					margin-top: 0px;
				}
			}
		}
	}

	// This is the viewport width that causes the loading and store
	// to local charts to be disfigured.
	@media screen and (max-width: 42.6875rem) {
		.edit-content {
			.title-subheading {
				flex-direction: column;
				.bx--inline-loading {
					margin-top: 10px;
				}
			}
		}
	}
`;

const toolBarAction = css`
	background: #f4f4f4;
	margin-right: 13px;
`;

const chartEditToolBar = css`
	display: flex;
	margin-right: 2rem;
	margin-top: 8px;
	margin-bottom: 8px;
	button {
		height: 3rem;
	}
	.toolBarButtons {
		min-width: 13.75rem
	}
	// This is the viewport width that causes the store to local
	// charts checkbox and last modified label to overlap.
	@media screen and (max-width: 58.125rem) {
		margin-left: 10px;
		flex-direction: row-reverse;
		place-self: start;
	}
	// This is the viewport width that causes the loading and store
	// to local charts to be disfigured.
	@media screen and (max-width: 42.6875rem) {
		margin-left: 10px;
		margin-top: 20px;
		flex-direction: column-reverse;
		place-self: start;
	}
`;

export const EditHeader = ({ chart }: any) => {
	const [, dispatchModal] = useContext(ModalContext);
	const [localCharts, updateLocalCharts] = useContext(LocalChartsContext);
	const [{ currentlyProcessing }] = useContext(ChartsContext);

	return (
		<header
			className={editHeader}
			aria-label={`Header for '${chart.title}'`}
			role='banner'
			tabIndex={0}>
			<div className='edit-content'>
				<div className='title-wrap'>
					<p className='chart-title'>{chart.title}</p>
					{/* 🏗️🏗️🏗️ Under construction, add in later 🏗️🏗️🏗️ */}
					{/* <div onClick={() => { console.log('Edit clicked.'); }}>
						<Edit16 className='chart-edit' />
					</div> */}

					<div className='title-subheading'>
						<div className='date-wrap'>{`Last modified ${ chart.lastModified}`}</div>
						{!!currentlyProcessing
							&& <InlineLoading
								description='Chart is updating...'
								iconDescription='Active loading indicator'
								status='active' />
						}
					</div>
				</div>
				<div className={chartEditToolBar}>
					<Checkbox
						id='local-chart-checkbox'
						className={css`margin-top: 12px; margin-right: 9px`}
						defaultChecked={!!localCharts.find((c: any) => c.id === chart.id)}
						labelText={
							<label className={css`margin-right: 3px; font-size: 0.75rem`}>
								Store to local charts
							</label>
						}
						onChange={(checked: boolean) => {
							if (checked) {
								updateLocalCharts({
									type: LocalChartActionType.ADD,
									data: { id: chart.id }
								});
							} else {
								updateLocalCharts({
									type: LocalChartActionType.REMOVE,
									data: { id: chart.id }
								});
							}
						}} />
					<div className='toolBarButtons'>
						<Button
							kind='ghost'
							aria-label='Duplicate chart'
							title='Duplicate chart'
							onClick={() => dispatchModal({
								type: ModalActionType.setDuplicationModal,
								id: chart.id
							})}
							className={toolBarAction}>
							<Copy16 fill="black" />
						</Button>
						<Button
							kind='ghost'
							aria-label='Delete chart'
							title='Delete chart'
							onClick={() => dispatchModal({
								type: ModalActionType.setDeletionModal,
								id: chart.id
							})}
							className={toolBarAction}>
							<Delete16 fill="black" />
						</Button>
						<Button
							kind='ghost'
							aria-label='Share chart'
							title='Share chart'
							onClick={() => dispatchModal({
								type: ModalActionType.setShareModal,
								id: chart.id
							})}
							className={toolBarAction}>
							<Share16 fill="black" />
						</Button>
						<Button
							kind='ghost'
							aria-label='Chart settings'
							title='Chart settings'
							onClick={() => dispatchModal({
								type: ModalActionType.setSettingsModal,
								id: chart.id
							})}
							className={toolBarAction}>
							<Settings16 fill="black" />
						</Button>
					</div>
				</div>
			</div>
			<ChartModal chart={chart} />
		</header>
	);
};
