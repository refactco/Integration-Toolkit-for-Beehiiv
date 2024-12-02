const { useState } = wp.element;
import { styled } from 'styled-components';
import {
	Button,
	Input,
	InputType,
} from '@refactco/ui-kit';
export function SubscriptionBox() {
    const [email, setEmail] = useState('')
    return(
        <SubscriptionBoxWrapper>
            <h2>Get Weekly media tech news in easy-to-read chunks.</h2>
            <p>Boost your productivity with our streamlined plugin, designed to simplify your workflow and integrate seamlessly with your favorite tools.</p>
            <SubscriptionForm>
                <InputContainer>
                    <Input
                        type={
                            InputType.TEXT
                        }
                        value={email}
                        onChange={(value)=>setEmail(value)}
                        required
                        placeholder="Enter your email address"
                    />
                    <p>No Spam. Unsubscribe any time.</p>
                </InputContainer>
                <Button
                    type="submit"
                >
                    Subscribe
                </Button>
            </SubscriptionForm>
        </SubscriptionBoxWrapper>
    );
}
const SubscriptionBoxWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    & > * {
        flex: 1;
        margin:0;
    }
    & > p {
        margin-top: 15px;
        color: #798686;
    }
`;

const SubscriptionForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    width: 100%;
    gap: 11px;
    @media (min-width: 768px) {
  	    margin-top: 31px;
        flex-direction: row;
  }
}`;

const InputContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 4px;
     & > * {
        margin:0;
    }
    & > p {
        color: #798686;
    }
`;