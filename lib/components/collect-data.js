import { styled } from 'styled-components';
import {
	Tooltip,
	TooltipMode,
	TooltipPlace,
} from '@refactco/ui-kit';
export function CollectData() {
    return(
        <CollectDataWrapper>
            <TooltipContainer>
                <h2>Help RE/beehiiv better to everyone.</h2>
                <Tooltip
                    id="collect-data-tooltip"
                    mode={
                        TooltipMode.DARK
                    }
                    place={
                        TooltipPlace.TOP
                    }
                    content="We collect your info to enhance the experience."
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2ZM13 17.5C13 17.7761 12.7761 18 12.5 18H11.5C11.2239 18 11 17.7761 11 17.5V16.5C11 16.2239 11.2239 16 11.5 16H12.5C12.7761 16 13 16.2239 13 16.5V17.5ZM13.88 12.29C15.0655 11.9063 15.8716 10.806 15.88 9.56V9C15.88 8.23618 15.5766 7.50364 15.0365 6.96353C14.4964 6.42343 13.7638 6.12 13 6.12H11C9.40942 6.12 8.12 7.40942 8.12 9V9.5C8.12 9.77614 8.34386 10 8.62 10H9.38C9.65614 10 9.88 9.77614 9.88 9.5V9C9.88 8.38144 10.3814 7.88 11 7.88H13C13.3039 7.86914 13.5992 7.98233 13.8179 8.19356C14.0367 8.40479 14.1602 8.6959 14.16 9V9.56C14.161 10.0423 13.8557 10.4721 13.4 10.63L12.45 10.94C11.6818 11.1939 11.1622 11.9109 11.16 12.72V13.5C11.16 13.7761 11.3839 14 11.66 14H12.42C12.6961 14 12.92 13.7761 12.92 13.5V12.72C12.92 12.6675 12.9516 12.6202 13 12.6L13.88 12.29Z" fill="#798686"/>
                    </svg>
                </Tooltip>
            </TooltipContainer>
            <p>Can we collect your info to enhance the experience? </p>
        </CollectDataWrapper>
    )
}
const CollectDataWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    & > * {
        flex: 1;
        margin:0;
    }
    & > p {
        margin-top: 4px;
        color: #798686;
    }
`;

const TooltipContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    & > h2 {
        margin: 0;
    }
    & > svg {
        cursor: pointer;
    }
`;