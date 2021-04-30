import React from 'react';
import {
	HeaderMenuButton,
	HeaderName,
	HeaderNavigation,
	Header as ShellHeader
} from 'carbon-components-react/lib/components/UIShell';
import { css } from 'emotion';
import { HeaderMenuItemLink } from './header-menu-item-link';
import { useHistory } from 'react-router-dom';

export const Header = ({ isSideNavExpanded, setIsSideNavExpanded }: any) => {
	const history = useHistory();

	const headerName = css`
		&:hover {
			cursor: pointer;
		}
	`;

	return (
		<ShellHeader aria-label="IBM Xenon" role='banner' tabIndex={0}>
			<HeaderMenuButton
				aria-label={`${isSideNavExpanded ? 'Close menu' : 'Open menu'}`}
				isActive={isSideNavExpanded}
				onClick={() => setIsSideNavExpanded(!isSideNavExpanded)} />
			<HeaderName
				prefix="IBM"
				tabIndex={0}
				title='Xenon home'
				className={headerName}
				onClick={() => history.push('/')}
				onKeyDown={(event: any) => event.key === 'Enter' && history.push('/')}>
				Xenon {process.env.NODE_ENV === 'development' ? 'Dev' : ''}
			</HeaderName>
		</ShellHeader>
	);
};
