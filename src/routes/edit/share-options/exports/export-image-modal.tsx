import React, {
	useState,
	useEffect,
	useRef,
	useContext
} from 'react';
import {
	Modal,
	TextInput,
	Form,
	Select,
	SelectItem,
	Checkbox,
	NumberInput,
	Loading
} from 'carbon-components-react';
import { css } from 'emotion';
import domtoimage from 'dom-to-image';
import debounce from 'lodash/debounce';
import { saveBlob, getFullFileName } from '../../../../utils/file-tools';
import { ShareOptionsModals } from '../share-options-modal';
import { ModalContext, ModalActionType } from '../../../../context/modal-context';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router';
import { Chart } from '../../../../components';
import { ChartsContext } from '../../../../context';

const exportSettingForm = css`
	width: 23rem;
`;
const exportSettingFormGroup = css`
	width: 320px;
	display: flex;
`;
const previewContainer = css`
	float: left;
	background-color: #e0e0e0;
	width: 100%;
	height: 100%;
	margin-top: 3rem;
	margin-left: 1rem;
	display: flex;
	align-items: center;
`;
const selectInputWH = css`
	margin-bottom: 1.5rem;
	float: left;
	width: 150px;
`;
const selectInput = css`
	margin-bottom: 1.5rem;
	width: 320px;
`;

const chartImage = css`
	max-height: 100%;
	max-width: 100%;
	display: block;
	margin: 0;
`;

export interface ExportImageProps {
	chart: any,
	displayedModal: ShareOptionsModals | null,
	setDisplayedModal: (displayedModal: ShareOptionsModals | null) => void
}

let updatePreviewUrl = async() => console.log('updatePreviewUrl not initialized yet');
let handleResize = () => console.log('handleResize not initialized yet');
const doInputChange = debounce(() => updatePreviewUrl(), 400);
const doUpdatePreviewSize = debounce(() => handleResize(), 200);

export const ExportImageModal = (props: ExportImageProps) => {
	const [modalState, dispatchModal] = useContext(ModalContext);
	const [chartState] = useContext(ChartsContext);
	const history = useHistory();
	const location = history.location.pathname;
	const pathSegments = location.split('/');

	const id = `${chartState.currentId || pathSegments[pathSegments.length - 1]}`;
	const chart = chartState.charts.find((chart: any) => chart.id === id);

	const exportSettings = {
		width: 800,
		height: 400,
		unit: 'pixels',
		ratioLock: false,
		chartName: props.chart.title,
		format: 'image/png',
		curRatio: 0
	};
	const [inputs, setInputs] = useState(exportSettings);
	const [previewUrl, setPreviewUrl] = useState(props.chart.preview);
	const [isPerformingAction, setIsPerformingAction] = useState(false);
	const previewContainerRef = useRef<HTMLDivElement>(null);
	const [imageContainerSize, setImageContainerSize] = useState<any>();

	handleResize = () => {
		if (!previewContainerRef || !previewContainerRef.current) {
			return;
		}
		setImageContainerSize({
			width: previewContainerRef.current.offsetWidth,
			height: previewContainerRef.current.offsetHeight
		});
	};
	useEffect(() => {
		window.addEventListener('resize', doUpdatePreviewSize);
		if(previewContainerRef) {
			doUpdatePreviewSize();
		}
		return () => {
			window.removeEventListener('resize', doUpdatePreviewSize);
		};
	}, [previewContainerRef]);

	const getPreviewSize = (width: number, height: number) => {
		let fitRatio: number;
		if (width <= height) {
			// preview is square or tall rectangle (mobile)
			fitRatio = imageContainerSize.height / height;
		} else {
			// preview is long rectangle
			fitRatio = imageContainerSize.width / width;
		}
		return {
			width: width * fitRatio,
			height: height * fitRatio
		};
	};

	updatePreviewUrl = async() => {
		const previewSize = getPreviewSize(inputs.width, inputs.height);
		const renderProps: RenderProps = {
			id: props.chart.id,
			name: inputs.chartName,
			width: inputs.width,
			height: inputs.height,
			preview: {
				format: inputs.format,
				width: previewSize.width,
				height: previewSize.height
			}
		};
		const imageBlob = await getImage(renderProps);
		const reader = new FileReader();
		reader.readAsDataURL(imageBlob ? imageBlob : new Blob());
		reader.onloadend = () => {
			const imageUrl: string = reader.result ? reader.result.toString() : '';
			setPreviewUrl(imageUrl);
		};
	};

	const onSubmit = async() => {
		if (isPerformingAction) {
			return;
		}
		setIsPerformingAction(true);
		const renderProps: RenderProps = {
			id: props.chart.id,
			name: inputs.chartName,
			width: inputs.width,
			height: inputs.height,
			format: inputs.format
		};
		const imageBlob = await getImage(renderProps);

		const fileName = getFullFileName(inputs.chartName, inputs.format);
		saveBlob(imageBlob, fileName);
		setIsPerformingAction(false);
	};

	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	const getImage = async(props: RenderProps) => {
		const element = document.createElement('div');
		element.className = 'render-preview';
		chart.options.rawChartOptions.height = `${props.height || 400}px`;
		chart.options.rawChartOptions.animations = false;

		(element as HTMLElement).style.position = 'absolute';
		(element as HTMLElement).style.zIndex = '-1';
		(element as HTMLElement).style.width = `${props.width || 800}px`;
		(element as HTMLElement).style.height = `${props.height || 400}px`;
		(element as HTMLElement).style.minHeight = `${props.height || 400}px`;
		ReactDOM.render(<Chart chart={chart} />, element);
		document.body.appendChild(element);

		await sleep(50); // wait for render to finish
		
		const imageBlob = await domtoimage.toBlob(element as Node);
		(element as HTMLElement).remove();
		return imageBlob;
	};

	const handleChange = (id: any, value: any) => {
		setInputs({
			...inputs,
			[id]: value
		});
		doInputChange();
	};

	useEffect(() => {
		doInputChange();
	}, []);

	return (
		<Modal
			hasForm
			onRequestSubmit={() => {
				// TODO look into whether it's a better user experience to have the
				// processing in the background, perhaps with the saving indication
				onSubmit().then(dispatchModal({ type: ModalActionType.closeModal }));
			}}
			onSecondarySubmit={() => { props.setDisplayedModal(ShareOptionsModals.SHARE_OPTIONS); }}
			open={modalState.ShowModal && props.displayedModal === ShareOptionsModals.IMAGE_EXPORTS}
			onRequestClose={() => dispatchModal({ type: ModalActionType.closeModal })}
			primaryButtonText='Export'
			secondaryButtonText='Back to export options'
			modalHeading={`Export '${props.chart.title}' as image`}>
			<p>
				Export a static image of this chart for use in presentation decks or designs.
			</p>
			<div style={{
				display: 'flex',
				marginTop: '3rem'
			}}>
				<ExportModalSettings inputs={inputs} handleChange={handleChange} />
				<div className={previewContainer} ref={previewContainerRef}>
					<img
						id="previewimg"
						className={chartImage}
						src={previewUrl}
						alt={`chart preview: ${props.chart.title}`} />
				</div>
			</div>
			<Loading active={isPerformingAction} />
		</Modal>
	);
};

export interface RenderProps {
	id: string,
	name: string,
	width?: number,
	height?: number,
	format?: string,
	preview?: { // only sent for preview
		format?: string, // optional
		width: number,
		height: number
	}
}

const ExportModalSettings = ({ inputs, handleChange }: any) => {
	// We assume that a working ratio is never 0 (no 1D charts)
	const getRatio = () => (inputs.width / inputs.height).toFixed(2);

	const onDimensionChange = (id: any, value: any) => {
		if (!id) {
			return;
		}
		if (isNaN(value) || value === 0) {
			// eslint-disable-next-line no-param-reassign
			value = 1;
		}
		if (!inputs.ratioLock) {
			handleChange(id, value);
			return;
		}
		if (inputs.curRatio === 0) {
			handleChange('curRatio', getRatio());
		}
		handleChange(id, value);
		if (id === 'width') {
			handleChange('height', (value / inputs.curRatio).toFixed(0));
		} else {
			handleChange('width', (value * inputs.curRatio).toFixed(0));
		}
	};
	const numInputOnchange = (event: any) => {
		onDimensionChange(event.target.id, parseFloat(event.target.value));
	};
	const numInputOnClick = (event: any) => {
		if (event.imaginaryTarget && event.imaginaryTarget.value) {
			onDimensionChange(event.imaginaryTarget.id, parseFloat(event.imaginaryTarget.value));
		}
	};
	const inputChange = (event: any) => {
		handleChange(event.target.id, event.target.value);
	};

	return (
		<Form className={exportSettingForm}>
			<TextInput
				className={selectInput}
				id={'chartName'}
				labelText={'Name'}
				placeholder={'Chart name'}
				onChange={inputChange}
				type='text'
				defaultValue={inputs.chartName} />
			<div className={exportSettingFormGroup}>
				<NumberInput
					className={selectInputWH}
					id='width'
					label='Width'
					value={inputs.width}
					onClick={numInputOnClick}
					onChange={numInputOnchange} />
				<NumberInput
					className={selectInputWH}
					id='height'
					label='Height'
					value={inputs.height}
					onClick={numInputOnClick}
					onChange={numInputOnchange} />
			</div>
			<Checkbox
				className={selectInput}
				id='ratioLock'
				labelText='Preserve aspect ratio'
				defaultChecked={inputs.ratioLock}
				onChange={(event: any) => handleChange('ratioLock', event)} />
			<Select
				className={selectInput}
				value={inputs.unit}
				id={'unit'}
				onChange={inputChange}
				labelText='Units'>
				<SelectItem text='pixels' value='pixels' />
			</Select>
			<Select
				className={selectInput}
				value={inputs.format}
				id={'format'}
				onChange={inputChange}
				labelText='Format'>
				<SelectItem text='png' value='image/png' />
				<SelectItem text='jpeg' value='image/jpeg' />
				<SelectItem text='bmp' value='image/bmp' />
				<SelectItem text='gif' value='image/gif' />
			</Select>
		</Form>
	);
};
