/* eslint-disable react-hooks/exhaustive-deps */
const { useState, useEffect } = wp.element;
import { Header as RefactHeader } from '@refactco/ui-kit';
import { useNavigate, useLocation } from 'react-router-dom';
import { PluginLogo } from './icon/plugin-logo';

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [ activeItemIndex, setActiveItemIndex ] = useState( 0 );
	const items = [
		{
			item: 'import-campaigns',
			title: 'Import Campaigns',
			subHeaderItems: [
				{
					name: 'import_campaigns_manual',
					title: 'Manual Import',
					onClick: () => {
						navigate( '/import-campaigns/manual' );
					},
				},
				{
					name: 'import_campaigns_scheduled',
					title: 'Scheduled Import',
					onClick: () => {
						navigate( '/import-campaigns/scheduled' );
					},
				},
				{
					name: 'import_campaigns_connections',
					title: 'Connections',
					onClick: () => {
						navigate( '/connections' );
					},
				},
			],
			onClick: () => {
				navigate( '/import-campaigns' );
			},
		},
		{
			item: 'about',
			title: 'About',
			onClick: () => {
				navigate( '/about' );
			},
		},
	];

	const handleSelectItem = ( index ) => {
		setActiveItemIndex( index );
	};

	useEffect(() => {
		const handleDOMContentLoaded = () => {
			const path = location.pathname;
			if (path.includes('/import-campaigns') || path.includes('/connections')) {
				const tabPanelItems = document.querySelectorAll('.components-tab-panel__tabs-item');
				tabPanelItems.forEach((tabPanelItem) => {
					if ((path === '/import-campaigns/manual') && tabPanelItem.textContent.trim() === 'Manual Import') {
						tabPanelItem.click();
					} else if (path === '/import-campaigns/scheduled' && tabPanelItem.textContent.trim() === 'Scheduled Import') {
						tabPanelItem.click();
					} else if (path === '/connections' && tabPanelItem.textContent.trim() === 'Connections') {
						tabPanelItem.click();
					} else if ((path === '/import-campaigns') && tabPanelItem.textContent.trim() === 'Manual Import') {
						tabPanelItem.click();
					}
				});
			}
			const index = items.findIndex((item) => {
				if (item.item === 'settings' && path === '/') return true;
				return path.includes(item.item);
			});
			setActiveItemIndex(index === -1 ? 0 : index);
		};
	
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
		} else {
			handleDOMContentLoaded();
		}
	
		return () => {
			document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
		};
	}, [location.pathname]);

	return (
		<RefactHeader
			logoSource={ <PluginLogo />}
			items={ items }
			onSelectItem={ handleSelectItem }
			activeItemIndex={ activeItemIndex }
		/>
	);
};

export default Header;
