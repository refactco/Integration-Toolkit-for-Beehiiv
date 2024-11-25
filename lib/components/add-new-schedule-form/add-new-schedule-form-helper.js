/* eslint-disable camelcase */

const apiFetch = wp.apiFetch;
import { toast } from 'react-toastify';
import { logger, delay } from '../../common/common-function';

export function addNewScheduleFormHelper(
	state,
	setState,
	onClose,
	handleRefreshScheduleData,
	scheduleId
) {
	async function getDefaultOptions() {
		try {
			const response = await apiFetch( {
				path: 'itfb/v1/import-defaults-options',
			} );
			const { post_statuses, authors, current_server_time, post_types } =
				response;

			if ( authors.length === 0 ) {
				toast.error(
					'You should add at least one new user with rule Author.Navigating to the Add New User page...'
				);
				await delay( 5000 );
				window.location.href = 'user-new.php';
				return false;
			}

			const postStatusesData = Object.entries( post_statuses ).map(
				( [ key, value ] ) => ( {
					label: value,
					value: key,
				} )
			);
			const selectedPostType = post_types[ 0 ].post_type;
			const taxonomies = post_types[ 0 ].taxonomies
				? post_types[ 0 ].taxonomies
				: [];
			const selectedTaxonomy =
				taxonomies.length > 0 ? taxonomies[ 0 ].taxonomy_slug : '';
			const terms = taxonomies[ 0 ].terms ? taxonomies[ 0 ].terms : [];
			const selectedTerm = terms.length > 0 ? terms[ 0 ].term_id : '';
			const selectedAuthor = authors[ 0 ].id;

			setState( {
				...state,
				postStatuses: postStatusesData,
				postTypes: post_types,
				taxonomies,
				selectedTaxonomy,
				selectedPostType: selectedPostType ? selectedPostType : 'post',
				terms,
				selectedTerm,
				authors,
				selectedAuthor,
				serverTime: current_server_time,
			} );
		} catch ( error ) {
			logger( error );
		}
	}

	function handleInputChange( value, name ) {
		setState( ( prevState ) => {
			const newState = { ...prevState, [ name ]: value };

			const {
				publishedCampaigns,
				draftededCampaigns,
				archivedCampaigns,
			} = newState;

			if ( name === 'selectedPostType' ) {
				const selectedPostType = state.postTypes.find(
					( pt ) => pt.post_type === value
				);
				newState.taxonomies = selectedPostType
					? selectedPostType.taxonomies
					: [];
				newState.selectedTaxonomy =
					newState.taxonomies.length > 0
						? newState.taxonomies[ 0 ].taxonomy_slug
						: '';
				newState.selectedTerm =
					newState.taxonomies.length > 0 && newState.terms.length > 0
						? newState.terms[ 0 ].term_id
						: '';
				newState.terms = newState.selectedTaxonomy
					? newState.taxonomies.find(
							( pt ) =>
								pt.taxonomy_slug === newState.selectedTaxonomy
					  ).terms
					: [];
			}

			if ( name === 'selectedTaxonomy' ) {
				const selectedTaxonomy = state.taxonomies.find(
					( pt ) => pt.taxonomy_slug === value
				);
				newState.terms = selectedTaxonomy ? selectedTaxonomy.terms : [];
				newState.selectedTerm =
					newState.terms.length > 0
						? newState.terms[ 0 ].term_id
						: '';
			}
			if (
				( name === 'publishedCampaigns' ||
					name === 'draftededCampaigns' ||
					name === 'archivedCampaigns' ) &&
				value
			) {
				newState.errors = { ...prevState.errors, campaignStatus: '' };
				newState.isFormDisabled = false;
			}
			if (
				! publishedCampaigns &&
				! draftededCampaigns &&
				! archivedCampaigns
			) {
				newState.errors = {
					...prevState.errors,
					campaignStatus:
						'You should select at least one campaign status',
				};
				newState.isFormDisabled = true;
			}
			if( name === 'createNewConnection' && value ){
				newState.selectedConnection = 'not_set';
				newState.isFormDisabled = true;
			}

			return newState;
		} );
	}

	function validateInput( name, value ) {
		switch ( name ) {
			case 'apiKey':
				if ( ! value && state.createNewConnection ) return 'API Key is required.';
				if ( value.length !== 64  && state.createNewConnection )
					return 'API Key must be 64 characters.';
				break;
			case 'publicationId':
				if ( ! value  && state.createNewConnection ) return 'Publication ID is required.';
				if ( value.length !== 40  && state.createNewConnection )
					return 'Publication ID must be 40 characters.';
				break;
			case 'runHour':
				if ( ! value ) return 'Run hour is required.';
				if ( value < 1 || value > 24 )
					return 'The run hour should be between 1 to 24';
				if ( ! /^(?:[01]?[0-9]|2[0-4])$/.test( value ) )
					return 'Invalid hour format';
				break;
			case 'runTime':
				if ( ! value ) return 'Run time is required.';
				if ( ! /^(?:[01]\d|2[0-3]):[0-5]\d$/.test( value ) )
					return 'Invalid time format. Use "HH:mm" (e.g., "02:00").';
				break;
			case 'connectionName':
				if ( ! value && state.includeAsConnection && state.createNewConnection) return 'Connection name is required.';
				break;
			case 'includeAsConnection':
				
				if ( !value ) {
					setState( ( prevState ) => ( {
						...prevState,
						errors: { ...prevState.errors, connectionName: '' },
						isFormDisabled: false,
					} ) );
				} else {
					if ( ! state.connectionName ) {
						return 'Connection name is required.';
					}
				}
			default:
				return '';
		}
	}

	function handleBlur( name, value ) {
		const error = validateInput( name, value );
		if ( error ) {
			setState( ( prevState ) => ( {
				...prevState,
				errors: { ...prevState.errors, [ name ]: error },
				isFormDisabled: true,
			} ) );
		} else {
			setState( ( prevState ) => ( {
				...prevState,
				errors: { ...prevState.errors, [ name ]: '' },
				isFormDisabled: false,
			} ) );
		}
	}




	async function startImportHandler( event ) {
		event.preventDefault();
		const {
			apiKey,
			publicationId,
			publishedCampaigns,
			publishedWrodpressPostStatus,
			draftededCampaigns,
			draftedWrodpressPostStatus,
			archivedCampaigns,
			archivedWrodpressPostStatus,
			selectedPostType,
			selectedTaxonomy,
			selectedTerm,
			selectedAuthor,
			importCampaignTagAs,
			importOption,
			frequency,
			runHour,
			runTime,
			runDay,
			contentType,
            includeAsConnection,
			connectionName,
			selectedConnection,
		} = state;
		if(state.includeAsConnection && !state.connectionName && state.createNewConnection){
			setState( ( prevState ) => ( {
				...prevState,
				errors: { ...prevState.errors, connectionName: 'Connection name is required' },
				isFormDisabled: true,
			} ) );
			toast.error('Connection name is required');

			return;
		} else {
			const post_status = {};
			if ( publishedCampaigns ) {
				post_status.confirmed = publishedWrodpressPostStatus;
			}
			if ( draftededCampaigns ) {
				post_status.draft = draftedWrodpressPostStatus;
			}
			if ( archivedCampaigns ) {
				post_status.archived = archivedWrodpressPostStatus;
			}
			const schedule_settings = {};
	
			schedule_settings.enabled = 'on';
			schedule_settings.frequency = frequency;
			if ( frequency === 'hourly' ) {
				schedule_settings.specific_hour = runHour;
			} else if ( frequency === 'daily' ) {
				schedule_settings.time = runTime;
			} else {
				schedule_settings.time = runTime;
				schedule_settings.specific_day = runDay;
			}
		
	
			const data = {
				credentials: JSON.stringify( {
					api_key: apiKey,
					publication_id: publicationId,
				} ),
				post_status: JSON.stringify( post_status ),
				post_type: selectedPostType,
				taxonomy: selectedTaxonomy ?? null,
				taxonomy_term: selectedTerm ?? null,
				author: selectedAuthor ?? null,
				import_cm_tags_as: importCampaignTagAs ?? null,
				import_option: importOption ?? null,
				schedule_settings: JSON.stringify( schedule_settings ),
				audience: contentType,
				include_as_connection: includeAsConnection,
				new_connection_name: connectionName,
				selected_connection: selectedConnection,
			};
			if(scheduleId) {
				data.id = scheduleId;
			}
			console.log(scheduleId);
			try {
				setState( ( prevState ) => ( {
					...prevState,
					isFormDisabled: true,
					disableInput: true,
				} ) );
	
				let path = 'itfb/v1/add-scheduled-import';
				if(scheduleId) {
					path = 'itfb/v1/edit-scheduled-import';
				}
				const response = await apiFetch( {
					path,
					method: 'POST',
					data,
				} );
				const {  message } = response;
				
				setState( ( prevState ) => ( {
					...prevState,
					errors: { ...prevState.errors, requestError: '' },
					disableInput: false,
				} ) );
				if(response.data){
					toast.error(message)
				} else {
					onClose();
					handleRefreshScheduleData();
					toast.success( message );
				}
			} catch ( error ) {
				console.log(error)
				const { message } = error;
	
				setState( ( prevState ) => ( {
					...prevState,
					errors: { ...prevState.errors, requestError: message },
					isFormDisabled: false,
					disableInput: false,
				} ) );
	
				toast.error( message );
			}
		}
		
	}

	async function getAllConnections() {
		try {
			const response = await apiFetch( {
				path: 'itfb/v1/get-all-connections',
				method: 'GET',
			} );
			const selectedConnection = Object.keys(response).length > 0  ? Object.keys(response)[0] : 'not_set';
			setState( ( prevState ) => ( {
				...prevState,
				connections: response,
				loading: scheduleId ? true : false,
				selectedConnection,
				isFormDisabled: selectedConnection === 'not_set' ? true : false,
			} ) );
		} catch ( error ) {
			const { message } = error;
			toast.error( message );
		}

	}

	async function getScheduleById( id ) {
		try {
			const response = await apiFetch( {
				path: `itfb/v1/get-scheduled-import-by-id/?id=${ id }`,
				method: 'POST',
			} );
			console.log(response);
			const { params } = response;
			const {audience, author, credentials, import_cm_tags_as, import_option, include_as_connection, new_connection_name, post_status
				,post_type,schedule_settings, selected_connection,taxonomy, taxonomy_term} = params[0];
				const {api_key, publication_id} = credentials;
				const {confirmed, draft, archived} = post_status;
				const {frequency, specific_hour, specific_day, time} = schedule_settings;
				

				setState( ( prevState ) => ( {
					...prevState,
					apiKey: api_key ?? '',
					publicationId: publication_id ?? '',
					publishedCampaigns: confirmed ? true : false,
					publishedWrodpressPostStatus: confirmed,
					draftededCampaigns: draft ? true : false,
					draftedWrodpressPostStatus: draft,
					archivedCampaigns: archived ? true : false,
					archivedWrodpressPostStatus: archived,
					selectedPostType: post_type,
					selectedTaxonomy: taxonomy,
					selectedTerm: taxonomy_term,
					selectedAuthor: author,
					importCampaignTagAs: import_cm_tags_as,
					importOption: import_option,
					frequency,
					runHour: specific_hour ?? 1,
					runTime: time ?? '00:00',
					runDay: specific_day ?? 'monday',
					contentType: audience,
					includeAsConnection: include_as_connection === "1"? true : false,
					connectionName: new_connection_name,
					selectedConnection: selected_connection,
					loading: false,
				} ) );
		} catch (error) {
			toast.error(error.message);
		}
	}

	return {
		getDefaultOptions,
		handleInputChange,
		handleBlur,
		startImportHandler,
		getAllConnections,
		getScheduleById
	};
}
