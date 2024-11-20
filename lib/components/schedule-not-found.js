import { styled } from 'styled-components';
import AddButton from './add-button';
const { useState } = wp.element;
import AddNewScheduleModal from './add-new-schedule-modal';
const ScheduleNotFound = ({handleRefreshScheduleData}) => {
    const [showAddNewScheduleModal, setShowAddNewScheduleModal] = useState(false);
    const closeAddNewScheduleModalHandler = () => {
        setShowAddNewScheduleModal(false);
    }
    return (
        <StyledContainer>
            <StyledWrapper>
                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
                    <path d="M51.0876 7.99984H48.4209V2.6665H43.0876V7.99984H21.7542V2.6665H16.4209V7.99984H13.7542C10.8209 7.99984 8.4209 10.3998 8.4209 13.3332V50.6665C8.4209 53.5998 10.8209 55.9998 13.7542 55.9998H24.4209V50.6665H13.7542V23.9998H51.0876V50.6665H40.4209V55.9998H51.0876C54.0209 55.9998 56.4209 53.5998 56.4209 50.6665V13.3332C56.4209 10.3998 54.0209 7.99984 51.0876 7.99984ZM13.7542 18.6665V13.3332H51.0876V18.6665H13.7542ZM32.4209 31.9998L21.7542 42.6665H29.7542V58.6665H35.0876V42.6665H43.0876L32.4209 31.9998Z" fill="#D7DBDB"/>
                </svg>
                <h2>No Manual Schedule Found/Available.</h2>
            </StyledWrapper>
            <AddButton
                icon={
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
                    setShowAddNewScheduleModal(true);
                } }
            >
               Add a New Schedule Import
            </AddButton>
            {
                showAddNewScheduleModal ? <AddNewScheduleModal onClose={closeAddNewScheduleModalHandler} handleRefreshScheduleData={handleRefreshScheduleData} /> : null
            }
        </StyledContainer>
    );
};
const StyledContainer = styled.div`
	background-color: #fff;
	width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--Text-Gains-Boro, #D7DBDB);
    gap: 20px;
    min-height: 307px;
    flex-direction: column;
`;

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default ScheduleNotFound;