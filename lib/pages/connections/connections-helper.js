const apiFetch = wp.apiFetch;
import { toast } from 'react-toastify';

export function connectionsHelper( state, setState ) {
    async function getAllConnections() {
		try {
			const response = await apiFetch( {
				path: 'itfb/v1/get-all-connections',
				method: 'GET',
			} );
            const connections = Object.keys(response).map((connection_name) => ([
                 connection_name,
                response[connection_name].publication_id,
        ]));
            
			setState( ( prevState ) => ( {
				...prevState,
				connections: connections,
				loading:  false,
			} ) );
		} catch ( error ) {
			const { message } = error;
			toast.error( message );
		}

	}

    const handleRefreshConnectionsData = () => {
        setState( ( prevState ) => ( {
            ...prevState,
            refreshConnectionsData: !prevState.refreshConnectionsData,
        } ) );
    }

    const closeAddNewConnectionModalHandler = () => {
        setState( ( prevState ) => ( {
            ...prevState,
            showAddNewConnectionModal: false,
        } ) );
    }

    function showDeleteConnectionModalHandler( index ) {
		const row = state.connections[ index ];
		setState( {
			...state,
			selectedRowInfo: row[0],
			showDeleteConnectionModal: true,
		} );
	}
    function deleteConnectionModalCloseHandler() {
		setState( {
			...state,
			showDeleteConnectionModal: false,
			selectedRowInfo: null,
		} );
	}
    async function deleteConnectionHandler() {
		const { selectedRowInfo, connections } = state;
      
		if ( selectedRowInfo ) {
			try {
				setState( ( prevState ) => ( {
					...prevState,
					loadingDeleteAction: true,
				} ) );
				const response = await apiFetch( {
					path: `itfb/v1/delete-connection`,
					method: 'DELETE',
                    body: JSON.stringify({
                        connection_name: selectedRowInfo,
                      }),
				} );

				if ( response ) {
                    const newConnections = connections.filter(
                        (item) => item[0] !== selectedRowInfo
                    );
    
                    setState((prevState) => ({
                        ...prevState,
                        connections: newConnections,
                        showDeleteConnectionModal: false,
                    }));
		
					toast.success( response.message );
				} else {
					toast.error( response.message );
				}
			} catch ( error ) {
				logger( error );
				toast.error( error.message );
			} finally {
				setState( ( prevState ) => ( {
					...prevState,
					loadingDeleteAction: false,
					selectedRowInfo: null,
					showDeleteConnectionModal: false,
				} ) );
			}
		}
	}
    return{
        getAllConnections,
        handleRefreshConnectionsData,
        closeAddNewConnectionModalHandler,
        showDeleteConnectionModalHandler,
        deleteConnectionModalCloseHandler,
        deleteConnectionHandler
    }   
}
