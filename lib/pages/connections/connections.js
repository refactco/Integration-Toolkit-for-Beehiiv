const { useState, useEffect } = wp.element;
import CustomSection from '../../components/custom-section';
import { connectionsHelper } from './connections-helper';
import { StyledWrapper } from '../../container/scheduleImport/scheduleImport'
import Spinner from '../../components/spinner';
import { Table, ButtonColor, ButtonVariant } from '@refactco/ui-kit';
import ConnectionNotFound from '../../components/connection-not-found';
import AddNewConnectionModal from '../../components/add-new-connection-modal/add-new-connection-modal';
import DeleteModal from '../../components/delete-modal';

const Connections = () => {
	const [ state, setState ] = useState( {
		loading: true,
		showAddNewConnectionModal: false,
		refreshConnectionsData: false,
		connections: [],
		showDeleteConnectionModal: false,
		selectedRowInfo: null,
		loadingDeleteAction: false,
	} );
	const { 
		loading,
		connections,
		showAddNewConnectionModal,
		refreshConnectionsData,
		showDeleteConnectionModal,
		selectedRowInfo,
		loadingDeleteAction,
	} = state;

	const helper = connectionsHelper(
		state,
		setState,
	);

	const {
		getAllConnections,
		handleRefreshConnectionsData,
		closeAddNewConnectionModalHandler,
		showDeleteConnectionModalHandler,
		deleteConnectionModalCloseHandler,
		deleteConnectionHandler
	} = helper;

	useEffect( () => {
		( async () => {
			await getAllConnections();
		} )();
	}, [refreshConnectionsData] );


	const actions = [
		{
			color: ButtonColor.RED,
			variant: ButtonVariant.SECONDARY,
			text: 'Delete',
			onClick: ( index ) => {
				showDeleteConnectionModalHandler( index );
			},
		},
	];

	const headers = [ 'Connection Name' , 'Publication ID' ];

	return (
		<>
		<CustomSection
			title ="Connections"
			description="Manage the connections that you can be use in manaul/scheduled imports."
			showButton ={ connections.length > 0 ? true : false }
			buttonText="Add a New Connection"
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
					showAddNewConnectionModal: true,
				} );
			} }
		>
			
		</CustomSection>
		<StyledWrapper>
				{
				loading ? (
					<Spinner />
				) : connections.length > 0 ? (
					<Table
						headers={ headers }
						actions={ actions }
						dataRows={ connections }
						noDraggable
					/>
				) : (
					<ConnectionNotFound handleRefreshConnectionsData={handleRefreshConnectionsData} />
				) 
			}
			</StyledWrapper>
			<DeleteModal
				show={ showDeleteConnectionModal }
				selectedRowInfo={ selectedRowInfo }
				onClose={ deleteConnectionModalCloseHandler }
				loadingDeleteAction={ loadingDeleteAction }
				deleteScheduleHandler={ deleteConnectionHandler }
				title={`Are you sure you want to delete connection with name ${ selectedRowInfo ? selectedRowInfo : '' }?`}
				textButton= "Delete Connection"
			/>
			{
                showAddNewConnectionModal ? <AddNewConnectionModal onClose={closeAddNewConnectionModalHandler} handleRefreshConnectionsData={handleRefreshConnectionsData} /> : null
            }
		</>
	);
};

export default Connections;
