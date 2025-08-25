// =========  Initial
import React, { useState } from 'react'
// =========  Components
import { Button } from '@components/form';
import { CustomCardView,CustomModal,Flex } from '@components/others';
import { CustomPageFormTitle } from '@components/others/CustomPageTitle';
// ======== Named Components
import { ExampleForm } from '@modules/Example/Partials/ExampleForm'
import { ExampleTable } from '@modules/Example/Partials/ExampleTable'

export const ExampleContainer = () => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);


    // ===== Modal Functions Start =====

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        FormCancelRest();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormCancelRest();
    };

    // ===== Modal Functions End =====

    // -------  Form Reset Funtion

    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const AddNewCompany = () => {
        setModalTitle("Add Company");
        setModalContent(<ExampleForm formname={'AddForm'} handleOk={handleOk} formReset={formReset} />);
        showModal();
    };


    return (

        <CustomCardView>

            <CustomPageFormTitle Heading={'View Company'} />
            
            <ExampleTable />

            <Flex gap={'20px'} center={"true"} margin={'10px 0'}>
                <Button.Primary text={'Add'} onClick={AddNewCompany} />
            </Flex>

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </CustomCardView>


    )
}
