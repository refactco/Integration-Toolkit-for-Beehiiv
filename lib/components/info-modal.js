/* eslint-disable react/no-unescaped-entities   */
import Modal from './modal';

const InfoModal = ( { show, selectedRowInfo, onClose, getRecurrenceText } ) => (
	<Modal show={ show } modalClosed={ onClose }>
		{ selectedRowInfo && (
			<>
				<h3>Schedule Information</h3>
				<p>
					<b>Schedule Id:</b> { selectedRowInfo.id } <br />
				</p>
				<p>
					<b>Publication Id:</b>{ ' ' }
					{ selectedRowInfo.params[ 0 ].credentials.publication_id }{ ' ' }
					<br />
				</p>
				<p>
					<b>Content Type:</b>{ ' ' }
					{ selectedRowInfo.params[ 0 ].audience } <br />
				</p>
				<p>
					Campaign tags are imported as{ ' ' }
					<b>{ selectedRowInfo.params[ 0 ].import_cm_tags_as }</b> ,
					with the import option set to{ ' ' }
					<b>{ selectedRowInfo.params[ 0 ].import_option }</b>
					.<br />
				</p>
				<p>
					The post type specified is{ ' ' }
					<b>{ selectedRowInfo.params[ 0 ].post_type }</b>. <br />
				</p>
				<p>
					This schedule recurs{ ' ' }
					<b>
						{ getRecurrenceText(
							selectedRowInfo.params[ 0 ].schedule_settings
						) }
					</b>
					.<br />{ ' ' }
				</p>
				<p>
					The taxonomy used is{ ' ' }
					<b>{ selectedRowInfo.params[ 0 ].taxonomy }</b>.
					<br />
				</p>
				<p>
					Campaign status on Beehiiv is mapped to the post status on
					WordPress as follows:{ ' ' }
					{ selectedRowInfo.params[ 0 ].post_status.confirmed && (
						<>
							<b>'Confirmed'</b> corresponds to{ ' ' }
							<b>
								{
									selectedRowInfo.params[ 0 ].post_status
										.confirmed
								}
							</b>
						</>
					) }
					{ selectedRowInfo.params[ 0 ].post_status.draft && (
						<>
							{ selectedRowInfo.params[ 0 ].post_status.confirmed
								? ','
								: '' }
							<b>'Draft'</b> corresponds to{ ' ' }
							<b>
								{
									selectedRowInfo.params[ 0 ].post_status
										.draft
								}
							</b>
						</>
					) }
					{ selectedRowInfo.params[ 0 ].post_status.archived && (
						<>
							{ selectedRowInfo.params[ 0 ].post_status.draft ||
							selectedRowInfo.params[ 0 ].post_status.confirmed
								? ', and '
								: '' }
							<b>'Archived'</b> corresponds to{ ' ' }
							<b>
								{
									selectedRowInfo.params[ 0 ].post_status
										.archived
								}
							</b>
						</>
					) }
					.
				</p>
			</>
		) }
	</Modal>
);

export default InfoModal;
