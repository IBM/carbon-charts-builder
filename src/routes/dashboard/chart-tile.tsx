import React, { useContext } from 'react';
import { css } from 'emotion';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
	OverflowMenu,
	OverflowMenuItem,
	SkeletonText,
	Tile
} from 'carbon-components-react';
import { ModalContext, ModalActionType } from '../../context/modal-context';
import { useEffect } from 'react';
import { getChartPreview, RenderProps } from '../../utils/chart-tools';
import { useState } from 'react';

const tileWrapper = css`
	margin: 0.75rem;
	padding: 0;
	height: 250px;
	width: 350px;
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
	background-color: #ffffff;
	float: left;
`;

const tileStyle = css`
	padding: 0;
	background-color: #ffffff;
`;

const tileInnerWrapperBase = css`
	align-items: end;
`;

const tileInnerWrapper = css`
	${tileInnerWrapperBase}
	margin: 8px;
	h3 {
		font-size: 1rem;
		padding: 5px;
		padding-left: 16px;
	}
	.dashboard-link {
		color: black;
		text-decoration: none;
		transition: 0.3s;
	}
	.dashboard-link:hover {
		opacity: 0.6;
		color: #6f6f6f;
		cursor: pointer;
	}
	span {
		padding-left: 16px;
		font-style: italic;
		font-size: 0.75rem;
	}
`;

const chartImage = css`
	width: auto;
	height: auto;
	max-height: 173px;
	max-width: 333px;
	display: block;
	padding-top: 8px;
`;
const chartOverflow = css`
	right: 5px;
	position: absolute;
	margin-top: 1rem;
	padding: 5px;
`;
const chartInfo = css`
	display: flex;
`;

export const ChartTile = ({
	chart,
	title,
	to,
	lastModified,
	setModalChart
}: any) => {
	const history = useHistory();
	const [, dispatchModal] = useContext(ModalContext);
	const [previewUrl, setPreviewUrl] = useState('');
	const handleModalState = (modalAction: ModalActionType) => {
		setModalChart(chart);
		dispatchModal({
			type: modalAction,
			id: chart.id
		});
	};

	const renderProps: RenderProps = {
		id: chart.id,
		name: chart.title,
		width: 800,
		height: 400,
		preview: {
			format: 'png',
			width: 330,
			height: 200
		}
	};

	const resetPreview = async () => {
		const imageBlob = await getChartPreview(chart, renderProps);
		const reader = new FileReader();
		reader.readAsDataURL(imageBlob ? imageBlob : new Blob());
		reader.onloadend = () => {
			const imageUrl: string = reader.result ? reader.result.toString() : '';
			setPreviewUrl(imageUrl);
		};
	}

	useEffect(() => {
		resetPreview();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={tileWrapper}>
			<Tile className={tileStyle} >
				<div className={tileInnerWrapper}>
					<Link to={to}>
						<img
							loading='lazy'
							src={previewUrl}
							className={chartImage}
							alt={`chart preview: ${title}`} />
							{/* TODO actual preview images */}
					</Link>
					<div className={chartInfo}>
						<div>
							<Link to={to} className='dashboard-link'>
								<h3>{title}</h3>
							</Link>
							<span>{lastModified ? lastModified : 'Last modified date unknown'}</span>
						</div>
						<OverflowMenu
							className={chartOverflow}
							ariaLabel='Chart options'
							iconDescription=''
							onClick={
								(event: { stopPropagation: () => void; }) => { event.stopPropagation(); }
							}>
							<OverflowMenuItem
								itemText='Edit'
								onClick={() => { history.push(`/edit/${chart.id}`); }}/>
							<OverflowMenuItem
								itemText='Export'
								onClick={() => { handleModalState(ModalActionType.setShareModal); }}/>
							<OverflowMenuItem
								itemText='Duplicate'
								onClick={() => { handleModalState(ModalActionType.setDuplicationModal); }}/>
							<OverflowMenuItem
								itemText='Reset preview'
								onClick={resetPreview}/>
							<OverflowMenuItem
								itemText='Remove'
								onClick={() => { handleModalState(ModalActionType.setDeletionModal); }}
								isDelete />
						</OverflowMenu>
					</div>
				</div>
			</Tile>
		</div>
	);
};

export const SkeletonChartTile = () => (
	<div className={tileWrapper}>
		<Tile>
			<div className={tileInnerWrapperBase}>
				<SkeletonText heading width='150px' />
			</div>
		</Tile>
	</div>
);
