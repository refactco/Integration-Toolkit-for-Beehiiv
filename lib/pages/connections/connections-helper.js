const apiFetch = wp.apiFetch;
import { toast } from 'react-toastify';

export function connectionsHelper( state, setState ) {
    async function getAllConnections() {
		try {
			const response = await apiFetch( {
				path: 'itfb/v1/get-all-connections',
				method: 'GET',
			} );
			setState( ( prevState ) => ( {
				...prevState,
				connections: response,
				loading: scheduleId ? true : false,
			} ) );
		} catch ( error ) {
			const { message } = error;
			toast.error( message );
		}

	}

    return{
        getAllConnections   
    }   
}
