import { styled } from 'styled-components';
import { PasswordlessLoginIcon } from './icon/passwordless-login';
import { CampaignUrlBuilderIcon } from './icon/campaign-url-builder';
import { EverhourTimeOffIcon } from './icon/everhour-time-off';

export function OurProduct() {
    const products = [
        {
            title: 'Passwordless Login',
            description: 'Allow users to register with and log into WordPress without a password, using an',
            logo: <PasswordlessLoginIcon />,
            backgroundColor: 'linear-gradient(292deg, #E8F0FF 26.93%, #D0E0FD 94.62%)',
            href: 'https://refact.co/toolkit/',
            target: '_blank'
        },
        {
            title: 'Campaign URL Builder',
            description: 'Create custom URLs and add tracking parameters to monitor campaign performance...',
            logo: <CampaignUrlBuilderIcon />,
            backgroundColor: 'linear-gradient(109deg, #93F6C1 -2.19%, #D3F8E4 65.57%)',
            href: 'https://refact.co/campaign-url-builder/',
            target: '_blank'
        },
        {
            title: 'Everhour Time-Off Management',
            description: 'Pull time-off data from Everhour and display it in Google Calendar and Slack channels.',
            logo: <EverhourTimeOffIcon />,
            backgroundColor: 'linear-gradient(256deg, #E7F9FB -3.17%, #BAE9F1 108.64%)',
            href: 'https://refact.co/google-calendar-slack-integration-to-manage-time-off/',
            target: '_blank'
        }
    ];
    return (
        <OurProductContainer>
             <h2>Our other products</h2>
            <OurProductWrapper>         
                {
                    products.map((product, index) => {
                        return (
                            <OurProductItem key={index} href={product.href} target={product.target}>
                                <OurProductItemLogo backgroundColor={product.backgroundColor}>
                                    {product.logo}
                                </OurProductItemLogo>
                                <OurProductItemContent>
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                </OurProductItemContent>
                            </OurProductItem>
                        )
                    })
                } 
            </OurProductWrapper>
        </OurProductContainer>
    )
}

const OurProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    gap: 12px;
    & > * {
        margin: 0;
    }
`;

const OurProductWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const OurProductItem = styled.a`
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #D7DBDB;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover {
        border-color: #2E9E62;
        background-color: #E5F7E3;
    }
`;
const OurProductItemLogo = styled.div`
   display: flex;
   width: 32px;
   height: 32px;
   padding: 16px;
   justify-content: center;
   align-items: center;
   border-radius: 4px;
   background: ${props => props.backgroundColor || 'transparent'};
`;

const OurProductItemContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    & > * {
        margin: 0;
    }
    & > p {
        color: #798686;
    }
`;