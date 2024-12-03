import {  Modal } from '@wordpress/components';
import { styled } from 'styled-components';
import { SubscriptionBox } from './subscription-box';
import { Divider } from '../pages/about/about';
import { CollectData } from './collect-data';
export const OnboardingModal = ({
    onClose,
}) => {
    return (
        <Modal onRequestClose={ onClose } size="large" >
            <OnboardingContainer>
                <h1> You’ve successfully installed Beehiiv to WP</h1>
                <SubscriptionBox marginTop="20px" />
                <Divider />
                <CollectData />
            </OnboardingContainer>
           
        </Modal>
    );
};

const OnboardingContainer = styled.div`
    padding: 16px 8px 20px;
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    gap: 24px;
    & > * {
        margin: 0;
    }
`;