/* eslint-disable react/no-unescaped-entities   */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable  no-nested-ternary */
import { styled } from 'styled-components';
import { Table, ButtonColor, ButtonVariant } from '@refactco/ui-kit';
const { useState, useEffect } = wp.element;
import Spinner from '../../components/spinner';
import { scheduleImportHelper } from './scheduleImportHelper';
import CustomSection from '../../components/custom-section';
import InfoModal from '../../components/info-modal';
import DeleteModal from '../../components/delete-modal';
import ScheduleNotFound from '../../components/schedule-not-found';
import AddNewScheduleModal from '../../components/add-new-schedule-modal';



const ScheduledImport = () => {

 
	const [ state, setState ] = useState( {
		loadingScheduledImports: true,
		scheduledImports: [],
		rowData: [],
		selectedRowInfo: null,
		showMoreInfoModal: false,
		showDeleteScheduleModal: false,
		loadingDeleteAction: false,
		showAddNewScheduleModal: false,
		refreshScheduleData: false,
		scheduleId: null,
	} );
	const {
		loadingScheduledImports,
		rowData,
		selectedRowInfo,
		showMoreInfoModal,
		showDeleteScheduleModal,
		showAddNewScheduleModal,
		loadingDeleteAction,
		refreshScheduleData,
		scheduleId,
	} = state;

	const closeAddNewScheduleModalHandler = () => {
        setState( {
			...state,
			showAddNewScheduleModal: false,
			scheduleId: null,
		} );
    }

	const handleRefreshScheduleData = (  ) => {
		setState( ( prevState ) => ( {
			...prevState,
			refreshScheduleData: !prevState.refreshScheduleData,
		} ) );
	};



	const helper = scheduleImportHelper( 
		state,
		setState,
	);
	const {
		getScheduledImports,
		moreInfoModalCloseHandler,
		showMoreInfoModalHandler,
		getRecurrenceText,
		showDeleteScheduleModalHandler,
		deleteScheduleModalCloseHandler,
		deleteScheduleHandler,
		EditScheduleHandler,
	} = helper;

	const actions = [
		{
			color: ButtonColor.GREEN,
			variant: ButtonVariant.PRIMARY,
			text: 'Edit',
			onClick: ( index ) => {
				EditScheduleHandler( index );
			},
		},
		{
			color: ButtonColor.BLUE,
			variant: ButtonVariant.SECONDARY,
			text: 'More Info',
			onClick: ( index ) => {
				showMoreInfoModalHandler( index );
			},
		},
		{
			color: ButtonColor.RED,
			variant: ButtonVariant.SECONDARY,
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
	}, [refreshScheduleData] );

	const headers = [ 'Recurrency ', 'Publication ID', 'Next Run' ];
	

	return (
		<>
			<CustomSection
				title="Scheduled Imports"
				description="Schedule your content imports from Beehiiv to your WordPress site."
				showButton ={ rowData.length > 0 ? true : false }
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
				onClick={ () => {
					setState( {
						...state,
						showAddNewScheduleModal: true,
					} );
				} }
			/>
			<StyledWrapper>
				{
				loadingScheduledImports ? (
					<Spinner />
				) : rowData.length > 0 ? (
					<Table
						headers={ headers }
						actions={ actions }
						dataRows={ rowData.map(item => item.slice(0, 3)) }
						noDraggable
					/>
				) : (
					<ScheduleNotFound handleRefreshScheduleData={handleRefreshScheduleData} />
				) 
			}
			</StyledWrapper>
			<InfoModal
				show={ showMoreInfoModal }
				selectedRowInfo={ selectedRowInfo }
				onClose={ moreInfoModalCloseHandler }
				getRecurrenceText={ getRecurrenceText }
			/>
			<DeleteModal
				show={ showDeleteScheduleModal }
				selectedRowInfo={ selectedRowInfo }
				onClose={ deleteScheduleModalCloseHandler }
				loadingDeleteAction={ loadingDeleteAction }
				deleteScheduleHandler={ deleteScheduleHandler }
				title={`Are you sure you want to delete schedule with id ${ selectedRowInfo ? selectedRowInfo.id : '' }?`}
				textButton= "Delete Schedule"
			/>
			{	showAddNewScheduleModal ? <AddNewScheduleModal onClose={closeAddNewScheduleModalHandler} handleRefreshScheduleData={handleRefreshScheduleData} scheduleId={scheduleId} setSchedule={setState}  /> : null	}
		</>
	);
};

export const StyledWrapper = styled.div`
	background-color: #fff;
	padding: 32px;
	position: relative;
	min-height: 307px;
`;

export default ScheduledImport;
