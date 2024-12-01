import { Modal } from '@wordpress/components';
import { Section } from '@refactco/ui-kit';
const { useState } = wp.element;
import { addNewConnectionModalHelper } from './add-new-connection-modal-helper';
import {
    Button,
    Input,
    InputType,
    Tooltip,
    TooltipMode,
    TooltipPlace,
} from '@refactco/ui-kit';
import { ErrorContainer } from '../add-new-schedule-form/add-new-schedule-form';
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    @media (min-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const InputWrapper = styled.div`
    width: 100%;
    margin-bottom: 16px;

    @media (min-width: 768px) {
        &:nth-child(1) {
            width: 48%;
        }
        &:nth-child(2),
        &:nth-child(3) {
            width: 24%;
        }
    }
`;

const AddNewConnectionModal = ({
    onClose,
    connectionId = null,
    handleRefreshConnectionsData,
}) => {
    const [state, setState] = useState({
        apiKey: '',
        publicationId: '',
        connectionName: '',
        isFormDisabled: connectionId ? false :true,
        errors: {},
        disableInput: false,
    });

    const {
        apiKey,
        publicationId,
        connectionName,
        isFormDisabled,
        errors,
        disableInput,
    } = state;

    const helper = addNewConnectionModalHelper(
        state,
        setState,
        handleRefreshConnectionsData,
        connectionId,
        onClose
    );
    const {
        handleInputChange,
        handleBlur,
        createNewConnectionHandler,
    } = helper;

    return (
        <Modal onRequestClose={onClose} size="fill">
            <Section
                headerProps={{
                    title: 'Create a New Connection',
                    description: 'Create a new connection to use in manual/scheduled imports.',
                }}
            >
                <form onSubmit={createNewConnectionHandler}>
                    <FormContainer>
                        <InputWrapper>
                            <label className="label" htmlFor="apiKey">
                                API Key
                                <Tooltip
                                    id="apiKey"
                                    mode={TooltipMode.DARK}
                                    place={TooltipPlace.TOP}
                                    content="The API Key is a unique identifier that allows you to access your Beehiiv account data. You can find your API Key by logging into your Beehiiv account and go to Settings > Integrations > which will open up the API tab"
                                >
                                    <div className="question-icon">?</div>
                                </Tooltip>
                            </label>
                            <Input
                                type={InputType.TEXT}
                                value={apiKey}
                                onChange={(value) => handleInputChange(value, 'apiKey')}
                                onBlur={() => handleBlur('apiKey', apiKey)}
                                required
                                hasError={errors.apiKey}
                                disabled={disableInput}
                                autoFocus
                            />
                            {errors.apiKey && <ErrorContainer>{errors.apiKey}</ErrorContainer>}
                        </InputWrapper>
                        <InputWrapper>
                            <label className="label" htmlFor="publicationId">
                                Publication ID
                                <Tooltip
                                    id="publicationId"
                                    mode={TooltipMode.DARK}
                                    place={TooltipPlace.TOP}
                                    content="The Publication ID is a unique identifier that allows you to access your Beehiiv account data. You can find your Publication ID by logging into your Beehiiv account and go to Settings > Integrations > which will open up the API tab"
                                >
                                    <div className="question-icon">?</div>
                                </Tooltip>
                            </label>
                            <Input
                                type={InputType.TEXT}
                                value={publicationId}
                                onChange={(value) => handleInputChange(value, 'publicationId')}
                                onBlur={() => handleBlur('publicationId', publicationId)}
                                required
                                hasError={errors.publicationId}
                                disabled={disableInput}
                            />
                            {errors.publicationId && <ErrorContainer>{errors.publicationId}</ErrorContainer>}
                        </InputWrapper>
                        <InputWrapper>
                            <label className="label" htmlFor="connectionName">
                                Name of Connection
                            </label>
                            <Input
                                type={InputType.TEXT}
                                value={connectionName}
                                onChange={(value) => handleInputChange(value, 'connectionName')}
                                onBlur={() => handleBlur('connectionName', connectionName)}
                                hasError={errors.connectionName}
                                required
                                disabled={disableInput}
                            />
                            {errors.connectionName && <ErrorContainer>{errors.connectionName}</ErrorContainer>}
                        </InputWrapper>
                    </FormContainer>
                    <Button
                        type="submit"
                        onClick={createNewConnectionHandler}
                        disabled={isFormDisabled }
                    >
                        {connectionId ? 'Edit Connection' : 'Create Connection'}
                    </Button>
                </form>
            </Section>
        </Modal>
    );
};

export default AddNewConnectionModal;