const apiFetch = wp.apiFetch;
import { toast } from 'react-toastify';
export function addNewConnectionModalHelper( 
	state,
	setState,
	handleRefreshConnectionsData,
	connectionId,
	onClose 
) {
  
    function handleInputChange( value, name ) {
		setState( ( prevState ) => {
			const newState = { ...prevState, [ name ]: value };
			return newState;
		} );
	}
    function validateInput( name, value ) {
		switch ( name ) {
			case 'apiKey':
				if ( ! value ) return 'API Key is required.';
				if ( value.length !== 64   )
					return 'API Key must be 64 characters.';
				break;
			case 'publicationId':
				if ( ! value  ) return 'Publication ID is required.';
				if ( value.length !== 40  )
					return 'Publication ID must be 40 characters.';
				break;
			case 'connectionName':
				if ( ! value ) return 'Connection Name is required.';
				break;
			
			default:
				return '';
		}
	}

	function handleBlur(name, value) {
		const error = validateInput(name, value);
		setState((prevState) => {
			const newErrors = { ...prevState.errors, [name]: error };
			const isFormDisabled = Object.values(newErrors).some((err) => err);
	
			return {
				...prevState,
				errors: newErrors,
				isFormDisabled,
			};
		});
	}

	const createNewConnectionHandler = async (event) => {
		event.preventDefault();
		const { apiKey, publicationId, connectionName } = state;
		const data = {
			api_key: apiKey,
			publication_id: publicationId,
			connection_name: connectionName,
		};
		try {
			setState( ( prevState ) => ( {
				...prevState,
				isFormDisabled: true,
				disableInput: true,
			} ) );

			let path = 'itfb/v1/add-connection';
			if(connectionId) {
				path = `itfb/v1/add-connection/${connectionId}`;
			}
			const response = await apiFetch( {
				path,
				method: connectionId ? 'PUT':'POST',
				data,
			} );
			const {  message } = response;
			

			if(response.data){
				toast.error(message);
				
			} else {
				onClose();
				handleRefreshConnectionsData();
				toast.success( message );
				
			}


		} catch ( error ) {
			console.log(error)
			const { message } = error;

			setState( ( prevState ) => ( {
				...prevState,
				errors: {  },
				isFormDisabled: false,
				disableInput: false,
			} ) );

			toast.error( message );
		}
    }
    return {
        handleInputChange,
        handleBlur,
        createNewConnectionHandler,
    };
}