
import AddButton from './add-button';
const { useState } = wp.element;
import { StyledContainer, StyledWrapper } from './schedule-not-found';
import AddNewConnectionModal from './add-new-connection-modal/add-new-connection-modal';

const ConnectionNotFound = ({handleRefreshConnectionsData}) => {
    const [showAddNewConnectionModal, setShowAddNewConnectionModal] = useState(false);
    const closeAddNewConnectionModalHandler = () => {
        setShowAddNewConnectionModal(false);
    }
    return (
        <StyledContainer>
            <StyledWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
                <path d="M24.4208 29.3334H40.4208C41.8875 29.3334 43.0875 30.5334 43.0875 32.0001C43.0875 33.4667 41.8875 34.6667 40.4208 34.6667H24.4208C22.9541 34.6667 21.7541 33.4667 21.7541 32.0001C21.7541 30.5334 22.9541 29.3334 24.4208 29.3334ZM56.2341 32.0001C57.8875 32.0001 59.0875 30.4267 58.7141 28.8267C57.9992 25.9289 56.3346 23.354 53.9856 21.5125C51.6367 19.6711 48.7388 18.6692 45.7541 18.6667H37.6208C36.2341 18.6667 35.0875 19.8134 35.0875 21.2001C35.0875 22.5867 36.2341 23.7334 37.6208 23.7334H45.7541C49.6208 23.7334 52.8741 26.4001 53.7808 29.9734C54.0741 31.1467 55.0341 32.0001 56.2341 32.0001ZM10.9808 30.3467C11.7275 26.4267 15.4075 23.7334 19.4075 23.7334H27.2208C28.6075 23.7334 29.7541 22.5867 29.7541 21.2001C29.7541 19.8134 28.6075 18.6667 27.2208 18.6667H19.6741C12.7141 18.6667 6.50079 23.7601 5.83412 30.6934C5.64976 32.5447 5.85524 34.4141 6.43735 36.1811C7.01946 37.9481 7.96527 39.5736 9.21386 40.9528C10.4624 42.332 11.9861 43.4344 13.6867 44.1889C15.3873 44.9434 17.227 45.3333 19.0875 45.3334H27.2208C28.6075 45.3334 29.7541 44.1867 29.7541 42.8001C29.7541 41.4134 28.6075 40.2668 27.2208 40.2668H19.0875C17.8626 40.263 16.6537 39.9879 15.5478 39.4614C14.4419 38.9348 13.4663 38.1698 12.6913 37.2213C11.9162 36.2729 11.3608 35.1645 11.0651 33.9759C10.7693 32.7872 10.7405 31.5478 10.9808 30.3467ZM48.4208 32.0001C46.9541 32.0001 45.7541 33.2001 45.7541 34.6667V40.0001H40.4208C38.9541 40.0001 37.7541 41.2001 37.7541 42.6667C37.7541 44.1334 38.9541 45.3334 40.4208 45.3334H45.7541V50.6667C45.7541 52.1334 46.9541 53.3334 48.4208 53.3334C49.8875 53.3334 51.0875 52.1334 51.0875 50.6667V45.3334H56.4208C57.8875 45.3334 59.0875 44.1334 59.0875 42.6667C59.0875 41.2001 57.8875 40.0001 56.4208 40.0001H51.0875V34.6667C51.0875 33.2001 49.8875 32.0001 48.4208 32.0001Z" fill="#D7DBDB"/>
            </svg>
                <h2>No Connection Found/Available.</h2>
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
                    setShowAddNewConnectionModal(true);
                } }
            >
               Add a New Connection
            </AddButton>
            {
                showAddNewConnectionModal ? <AddNewConnectionModal onClose={closeAddNewConnectionModalHandler} handleRefreshConnectionsData={handleRefreshConnectionsData} /> : null
            }
        </StyledContainer>
    );
};


export default ConnectionNotFound;