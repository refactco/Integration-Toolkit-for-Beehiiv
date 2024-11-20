import { styled } from 'styled-components';
import {  ButtonColor } from '@refactco/ui-kit';
import AddButton from './add-button';
const CustomSection = ( {
	title,
	description,
	showButton,
	buttonText,
	buttonIcon,
	iconPosition = 'left',
	buttonColor = ButtonColor.GREEN,
	onClick,
} ) => {
	
	return (
		<StyledSection>
			<div>
				<StyledH2>{ title }</StyledH2>
				<StyledParagraph> { description }</StyledParagraph>
			</div>
			{ showButton ? (
				<AddButton
					icon={ buttonIcon}
					onClick={ onClick }
					iconPosition={ iconPosition }
					color={ buttonColor }
				>
					{ buttonText }
				</AddButton>
			) : null }
		</StyledSection>
	);
};

export default CustomSection;

const StyledSection = styled.div`
	background-color: #fff;
	padding: 32px;
	border-radius: 4px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #d7dbdb;
`;
const StyledH2 = styled.h2`
	color: #002729;
	font-size: 22px;
	font-weight: 600;
	line-height: 28px;
	margin: 0;
`;
const StyledParagraph = styled.p`
	color: #798686;
	font-size: 14px;
	font-weight: 400;
	line-height: 28px;
	margin: 4px 0 0 0;
`;
