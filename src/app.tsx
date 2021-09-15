import React from 'react';
import {
	Route, BrowserRouter as Router, Switch
} from 'react-router-dom';
import { Notification } from './components/index';
import {
	Dashboard,
	Edit,
	ErrorBoundary,
	NotFound
} from './routes';
import { ChartsContextProvider } from './context/charts-context';
import { ModalContextProvider } from './context/modal-context';
import { NotificationContextProvider } from './context/notification-context';
import { UIShell } from './components/ui-shell';
import { css } from 'emotion';


const app = css`
	nav.bx--side-nav--expanded + div#edit-content {
		padding-left: calc(2.25rem + 16rem);
	}
	// This is the viewport width that causes the edit header items to overlap
	@media screen and (max-width: 38.75rem) {
		nav.bx--side-nav--expanded + div#edit-content {
			padding-left: 36px;
		}
	}
`;

export const App = () => (
	<Router basename='carbon-charts-builder'>
		<div className={app}>
			<ErrorBoundary>
				<ChartsContextProvider>
					<NotificationContextProvider>
						<UIShell />
						<Notification />
						<ModalContextProvider>
							<Switch>
								<Route path='/' exact component={Dashboard} />
								<Route
									path={['/edit', '/edit/:id']}
									exact
									component={Edit} />
								<Route path="*" component={NotFound} />
							</Switch>
						</ModalContextProvider>
					</NotificationContextProvider>
				</ChartsContextProvider>
			</ErrorBoundary>
		</div>
	</Router>
);
