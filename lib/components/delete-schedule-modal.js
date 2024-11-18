import Modal from './modal';
import { Button, ButtonColor } from '@refactco/ui-kit';
import { styled } from 'styled-components';

const DeleteScheduleModal = ( {
	show,
	selectedRowInfo,
	onClose,
	loadingDeleteAction,
	deleteScheduleHandler,
} ) => (
	<Modal show={ show } modalClosed={ onClose }>
		{ selectedRowInfo && (
			<>
				<h3>
					Are you sure you want to delete schedule with id{ ' ' }
					{ selectedRowInfo.id }?
				</h3>
				<ButtonContainer>
					<Button
						color={ ButtonColor.RED }
						disabled={ loadingDeleteAction }
						onClick={ deleteScheduleHandler }
					>
						Delete Schedule
					</Button>
					<Button
						onClick={ onClose }
						disabled={ loadingDeleteAction }
					>
						Cancel
					</Button>
				</ButtonContainer>
			</>
		) }
	</Modal>
);

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	margin-top: 20px;
	gap: 1rem;
`;

export default DeleteScheduleModal;
