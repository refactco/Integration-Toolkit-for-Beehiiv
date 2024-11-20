import { Button, ButtonColor } from '@refactco/ui-kit';
const AddButton = ({ 
    children,
	icon,
	iconPosition = 'left',
	buttonColor = ButtonColor.GREEN,
	onClick,
 }) => { 

    return(
        <Button
            color={ buttonColor }
            icon={ icon ??  null }
            iconPosition={ iconPosition }
            style={ { display: 'flex', alignItems: 'center' } }
            onClick={ onClick }
        >
            { children }
        </Button>
        )
};

export default AddButton;