import React from 'react';
import {
	Col, Main, Row
} from '../components';
import { Link } from 'react-router-dom';

import { Add16 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';

export const Data = () => (
	<Main>
		<Row>
			<Col cols={{ sm: 1 }}>
				<Link to="/data/add">
					<Button>
							Add a dataset
						<Add16 className="bx--btn__icon"/>
					</Button>
				</Link>
			</Col>
		</Row>
	</Main>
);
