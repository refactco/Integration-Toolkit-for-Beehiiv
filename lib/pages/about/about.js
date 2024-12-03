/* eslint-disable react/no-unescaped-entities */

import { Section } from '@refactco/ui-kit';
import { styled } from 'styled-components';
import { AboutPlugin } from '../../components/about-plugin';
import { SubscriptionBox } from '../../components/subscription-box';
import { CollectData } from '../../components/collect-data';
import { PoweredBy } from '../../components/powered-by';
import { OurProduct } from '../../components/our-product';

const About = () => {
	return (
		<AboutContainer>

			<AboutLayout>
				<div>
					<AboutPlugin />
					<Divider />
					<SubscriptionBox />
					<Divider />
					<CollectData />
				</div>
				<div>
					<PoweredBy />
					<OurProduct />
				</div>
				
			</AboutLayout>
			
		</AboutContainer>
	);
};

const AboutContainer = styled.div`
	margin-top: -70px;
	padding: 32px;
`

const AboutLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
   & > * {
    flex: 1;
  }

  @media (min-width: 768px) {
	flex-direction: row;
  	gap: 103px;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  margin: 24px 0;
`;

export default About;
