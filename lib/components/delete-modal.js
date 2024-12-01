import Modal from './modal';
import { Button, ButtonColor } from '@refactco/ui-kit';
import { styled } from 'styled-components';

const DeleteModal = ( {
	show,
	selectedRowInfo,
	onClose,
	loadingDeleteAction,
	deleteScheduleHandler,
	title,
	textButton
} ) => (
	<Modal show={ show } modalClosed={ onClose }>
		{ selectedRowInfo && (
			<>
				<h3>
					{ title }
				</h3>
				<ButtonContainer>
					<Button
						color={ ButtonColor.RED }
						disabled={ loadingDeleteAction }
						onClick={ deleteScheduleHandler }
					>
						{textButton}
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

export default DeleteModal;
