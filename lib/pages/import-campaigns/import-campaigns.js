/* eslint-disable react-hooks/exhaustive-deps */

import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ManualImport from '../../container/manaulImport/manualImport';
import ScheduledImport from '../../container/scheduleImport/scheduleImport';

const ImportCampaigns = () => {
	return (
		<TabPanelContainer>
			<Routes>
				<Route index element={ <ManualImport /> } />
				<Route path="manual" element={ <ManualImport /> } />
				<Route path="scheduled" element={ <ScheduledImport /> } />
			</Routes>
		</TabPanelContainer>
	);
};

// Styled component for the tab panel container
export const TabPanelContainer = styled.div`
	background-color: white; // Set background color to white
	box-shadow: 0px 2px 4px 0px rgba( 0, 0, 0, 0.08 );
	padding: 20px 0px 0px 20px;
	box-sizing: border-box;
`;

export default ImportCampaigns;
