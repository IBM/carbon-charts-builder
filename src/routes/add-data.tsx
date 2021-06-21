import React, { useState } from 'react';
import { css } from 'emotion';
import {
	Button,
	CodeSnippet,
	ContentSwitcher,
	Form,
	FormLabel,
	Switch,
	TextInput
} from 'carbon-components-react';

import {
	Col, LinkButton, Main, Row
} from './../components';
import { marginTop } from './../styles';

const placeholder = css`height: 100px; background: #f3f3f3;`;

const switchDataType = (name: string) => {
	if (name === 'upload') {
		return (
			<>
				<TextInput id="createTitle" labelText="Title" placeholder="My awesome dataset" />

				<FormLabel className={marginTop()}>Files</FormLabel>
				<div className={placeholder}>
					uploader
				</div>

				<FormLabel className={marginTop()}>Mapping</FormLabel>
				<div className={placeholder}>
					mapping of cols/rows to fields
				</div>
			</>
		);
	}

	if (name === 'api') {
		return (
			<>
				<TextInput id="createTitle" labelText="Title" placeholder="My awesome dataset" />

				<FormLabel className={marginTop()}>Endpoint</FormLabel>
				<CodeSnippet>https://carbon-charts-builder.ibm.com/api/upload/eGVub24gaXMgYXdlc29tZQ==</CodeSnippet>

				<FormLabel className={marginTop()}>Get started</FormLabel>
				<div className={placeholder}>
					how to use endpoint
				</div>

				<FormLabel className={marginTop()}>Mapping</FormLabel>
				<div className={placeholder}>
					declaration of availiable fields
				</div>
			</>
		);
	}
	return null;
};

export const AddData = () => {
	const [type, setType] = useState('upload');

	return (
		<Main>
			<Row>
				<h1 className="bx--col">New dataset</h1>
			</Row>
			<Row>
				<Col cols={{ sm: 2 }}>
					<ContentSwitcher onChange={(event: any) => setType(event.name)}>
						<Switch name="upload" text="Upload"/>
						<Switch name="api" text="Endpoint"/>
					</ContentSwitcher>
					<Form className={marginTop()}>
						{switchDataType(type)}

						<LinkButton className={marginTop()} kind="secondary" to="/data">Cancel</LinkButton>

						<Button className={marginTop()}>Save</Button>
					</Form>
				</Col>
			</Row>
		</Main>
	);
};
