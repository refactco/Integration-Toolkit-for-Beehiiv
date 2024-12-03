import { styled } from 'styled-components';
import { RefactLogo } from './icon/refact-logo';

export function PoweredBy() {
    return (
        <PoweredByContainer>
            <PoweredByWrapper>
                <h3>Powered by</h3>
                <RefactLogo />
                <p>When Refact needs something to make our projects easier and our clients more successful, we create it—and allow everyone else to use it too.</p>
            </PoweredByWrapper>
        </PoweredByContainer>
    )
}

const PoweredByContainer = styled.div`
    width: 100%;
    border-radius: 4px;
    border: 1px solid #D7DBDB;
    background:  #FFF;
    padding: 8px;
`;

const PoweredByWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
    border-radius: 4px;
    background:  #E5F7E3;
    align-items: flex-start;
    gap:8px;
    & > * {
        margin: 0;
        color: #002729;
    }
    & > p {
    margin-top: 8px;
    }
`;