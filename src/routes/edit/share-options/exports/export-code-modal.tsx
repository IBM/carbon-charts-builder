import React, { useContext } from 'react';

import { ShareOptionsModals } from '../share-options-modal';

import { createChartSandbox } from './create-chart-sandbox';
import { createReactChartApp } from './frameworks/react-chart';
import { createAngularChartApp } from './frameworks/angular-chart';
import { createVanillaChartApp } from './frameworks/vanilla-chart';
import { createVueChartApp } from './frameworks/vue-chart';

import {
	CodeSnippet,
	Modal,
	Tab,
	Tabs
} from 'carbon-components-react';
import { css } from 'emotion';
import { ModalContext, ModalActionType } from '../../../../context/modal-context';

const codeSnippetWrapper = css`
    margin-top: 20px;
    p {
        margin-bottom: 7px;
    }
`;

const titleWrapper = css`
    display: flex;
    margin-top: 30px;
    a {
        margin-left: auto;
    }
`;

const codeSnippet = css`
    .bx--copy-btn {
        background: white;
    }
`;

interface ExportCodeProps {
    chart: any,
    displayedModal: ShareOptionsModals | null,
    setDisplayedModal: (displayedModal: ShareOptionsModals | null) => void
}

export const ExportCode = ({
	chart,
	displayedModal,
	setDisplayedModal
}: ExportCodeProps) => {
	const [modalState, dispatchModal] = useContext(ModalContext);

	const vanillaCode: any = createVanillaChartApp(chart);
	const reactCode: any = createReactChartApp(chart);
	const angularCode: any = createAngularChartApp(chart);
	const vueCode: any = createVueChartApp(chart);

	const generateSandboxUrl = (parameters: any) => (
		`https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`
	);

	return (
		<Modal
			hasForm
			open={modalState.ShowModal && displayedModal === ShareOptionsModals.CODE_EXPORTS}
			onRequestClose={() => dispatchModal({ type: ModalActionType.closeModal })}
			primaryButtonText='Done'
			secondaryButtonText='Back to export options'
			onRequestSubmit={() => dispatchModal({ type: ModalActionType.closeModal })}
			onSecondarySubmit={() => { setDisplayedModal(ShareOptionsModals.SHARE_OPTIONS); }}
			modalHeading={`Export "${chart.title}" code`}>
			<Tabs>
				<Tab
					id='vanilla'
					label='Vanilla JS'
					role='presentation'
					tabIndex={0}>
					<div className={titleWrapper}>
						<h3>Vanilla JS Code</h3>
						<a
							href={generateSandboxUrl(createChartSandbox(vanillaCode))}
							target='_blank'
							rel='noopener noreferrer'>
							Edit on CodeSandbox
						</a>
					</div>
					{
						Object.keys(vanillaCode).map((fileName: string) => (
							<div className={codeSnippetWrapper} key={fileName}>
								<p>{fileName}</p>
								<CodeSnippet
									type='multi'
									light
									className={codeSnippet}
									copyButtonDescription={`Copy ${fileName} to clipboard`}>
									{
										fileName !== 'package.json'
											? vanillaCode[fileName]
											: JSON.stringify(vanillaCode[fileName], null, '\t')
									}
								</CodeSnippet>
							</div>
						))
					}
				</Tab>
				<Tab
					id='Angular'
					label='Angular'
					role='presentation'
					tabIndex={0}>
					<div className={titleWrapper}>
						<h3>Angular Code</h3>
						<a
							href={generateSandboxUrl(createChartSandbox(angularCode))}
							target='_blank'
							rel='noopener noreferrer'>
							Edit on CodeSandbox
						</a>
					</div>
					{
						Object.keys(angularCode).map((fileName: string) => (
							<div className={codeSnippetWrapper} key={fileName}>
								<p>{fileName}</p>
								<CodeSnippet
									type='multi'
									light
									className={codeSnippet}
									copyButtonDescription={`Copy ${fileName} to clipboard`}>
									{
										fileName !== 'package.json'
											? angularCode[fileName]
											: JSON.stringify(angularCode[fileName], null, '\t')
									}
								</CodeSnippet>
							</div>
						))
					}
				</Tab>
				<Tab
					id='react'
					label='React'
					role='presentation'
					tabIndex={0}>
					<div className={titleWrapper}>
						<h3>React Code</h3>
						<a
							href={generateSandboxUrl(createChartSandbox(reactCode))}
							target='_blank'
							rel='noopener noreferrer'>
							Edit on CodeSandbox
						</a>
					</div>
					{
						Object.keys(reactCode).map((fileName: string) => (
							<div className={codeSnippetWrapper} key={fileName}>
								<p>{fileName}</p>
								<CodeSnippet
									type='multi'
									light
									className={codeSnippet}
									copyButtonDescription={`Copy ${fileName} to clipboard`}>
									{
										fileName !== 'package.json'
											? reactCode[fileName]
											: JSON.stringify(reactCode[fileName], null, '\t')
									}
								</CodeSnippet>
							</div>
						))
					}
				</Tab>
				<Tab
					id='vue'
					label='Vue'
					role='presentation'
					tabIndex={0}>
					<div className={titleWrapper}>
						<h3>Vue Code</h3>
						<a
							href={generateSandboxUrl(createChartSandbox(vueCode))}
							target='_blank'
							rel='noopener noreferrer'>
							Edit on CodeSandbox
						</a>
					</div>
					{
						Object.keys(vueCode).map((fileName: string) => (
							<div className={codeSnippetWrapper} key={fileName}>
								<p>{fileName}</p>
								<CodeSnippet
									type='multi'
									light
									className={codeSnippet}
									copyButtonDescription={`Copy ${fileName} to clipboard`}>
									{
										fileName !== 'package.json'
											? vueCode[fileName]
											: JSON.stringify(vueCode[fileName], null, '\t')
									}
								</CodeSnippet>
							</div>
						))
					}
				</Tab>
			</Tabs>
		</Modal>
	);
};
