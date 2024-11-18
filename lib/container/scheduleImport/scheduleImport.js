/* eslint-disable react/no-unescaped-entities   */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable  no-nested-ternary */
import { styled } from 'styled-components';
import { Table, ButtonColor } from '@refactco/ui-kit';
const { useState, useEffect } = wp.element;
import Spinner from '../../components/spinner';
import { scheduleImportHelper } from './scheduleImportHelper';
import CustomSection from '../../components/custom-section';
import InfoModal from '../../components/info-modal';
import DeleteScheduleModal from '../../components/delete-schedule-modal';

const ScheduledImport = () => {
	const [ state, setState ] = useState( {
		loadingScheduledImports: true,
		scheduledImports: [],
		rowData: [],
		selectedRowInfo: null,
		showMoreInfoModal: false,
		showDeleteScheduleModal: false,
		loadingDeleteAction: false,
	} );
	const {
		loadingScheduledImports,
		rowData,
		selectedRowInfo,
		showMoreInfoModal,
		showDeleteScheduleModal,
	} = state;

	const helper = scheduleImportHelper( state, setState );
	const {
		getScheduledImports,
		moreInfoModalCloseHandler,
		showMoreInfoModalHandler,
		getRecurrenceText,
		showDeleteScheduleModalHandler,
		deleteScheduleModalCloseHandler,
		loadingDeleteAction,
		deleteScheduleHandler,
	} = helper;

	const actions = [
		{
			color: ButtonColor.BLUE,
			text: 'More Info',
			onClick: ( index ) => {
				showMoreInfoModalHandler( index );
			},
		},
		{
			color: ButtonColor.RED,
			text: 'Delete',
			onClick: ( index ) => {
				showDeleteScheduleModalHandler( index );
			},
		},
	];

	useEffect( () => {
		( async () => {
			await getScheduledImports();
		} )();
	}, [] );

	const headers = [ 'Schedule Id', 'Recurrency ', 'Publication Id' ];

	return (
		<>
			<CustomSection
				title="Scheduled Imports"
				description="Schedule your content imports from Beehiiv to your WordPress site."
				showButton
				buttonText="Add a Schedule Import"
				buttonIcon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
					>
						<path
							d="M19 11.5V12.5C19 12.7761 18.7761 13 18.5 13H13V18.5C13 18.7761 12.7761 19 12.5 19H11.5C11.2239 19 11 18.7761 11 18.5V13H5.5C5.22386 13 5 12.7761 5 12.5V11.5C5 11.2239 5.22386 11 5.5 11H11V5.5C11 5.22386 11.2239 5 11.5 5H12.5C12.7761 5 13 5.22386 13 5.5V11H18.5C18.7761 11 19 11.2239 19 11.5Z"
							fill="white"
						/>
					</svg>
				}
				iconPosition="left"
				buttonColor={ ButtonColor.GREEN }
				onClick={ () => {
					// console.log( 'Add a Schedule Import' );
				} }
			/>
			<StyledWrapper>
				{ loadingScheduledImports ? (
					<Spinner />
				) : rowData.length > 0 ? (
					<Table
						headers={ headers }
						actions={ actions }
						dataRows={ rowData }
						noDraggable
					/>
				) : (
					<p>No scheduled imports found.</p>
				) }
			</StyledWrapper>
			<InfoModal
				show={ showMoreInfoModal }
				selectedRowInfo={ selectedRowInfo }
				onClose={ moreInfoModalCloseHandler }
				getRecurrenceText={ getRecurrenceText }
			/>
			<DeleteScheduleModal
				show={ showDeleteScheduleModal }
				selectedRowInfo={ selectedRowInfo }
				onClose={ deleteScheduleModalCloseHandler }
				loadingDeleteAction={ loadingDeleteAction }
				deleteScheduleHandler={ deleteScheduleHandler }
			/>
		</>
	);
};

const StyledWrapper = styled.div`
	background-color: #fff;
	padding: 32px;
`;

export default ScheduledImport;
