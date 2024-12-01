import {  Modal } from '@wordpress/components';
import { Section } from '@refactco/ui-kit'
import AddNewScheduleForm from './add-new-schedule-form/add-new-schedule-form';
const AddNewScheduleModal = ({
    onClose,
    handleRefreshScheduleData,
    scheduleId = null,
    setSchedule = null,
}) => {
    return (
        <Modal onRequestClose={ onClose } size="fill" >
            <Section
                headerProps={ {
                    title: 'Import Campaign Data',
                    description: 'Manually import content from Beehiiv to your WordPress site.',
                } }
            >
                <AddNewScheduleForm onClose={onClose} handleRefreshScheduleData={handleRefreshScheduleData} scheduleId={scheduleId} setSchedule={setSchedule} />
            </Section>
        </Modal>
    );
};

export default AddNewScheduleModal;