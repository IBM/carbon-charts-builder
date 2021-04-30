import React, { useContext } from 'react';
import { css } from 'emotion';
import {
	Button,
	InlineLoading
} from 'carbon-components-react';
import {
	Copy16,
	Delete16,
	Settings16,
	Share16
} from '@carbon/icons-react';
import { ModalContext, ModalActionType } from '../../context/modal-context';
import { ChartModal } from './chart-modal';
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
`;

export const EditHeader = ({ chart }: any) => {
	const [, dispatchModal] = useContext(ModalContext);
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
