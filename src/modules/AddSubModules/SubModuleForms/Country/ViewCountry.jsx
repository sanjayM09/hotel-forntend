import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddCountry from './AddCountry'
import { CommonLoading, CustomModal, Flex } from '@components/others'
import { TableIconHolder } from '@components/others/Style'
import { FiEdit } from 'react-icons/fi'
import { THEME } from '@theme/index'
import { CustomTable } from '@components/form'
import { getCountryDetails } from '@modules/AddSubModules/SubModulesSlice'
import { CustomNetWorkError } from '@components/common'

const ViewCountry = ({ active }) => {

    const dispatch = useDispatch()
    const [dataSource, setDataSource] = useState()

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trigger, setTrigger] = useState(0)

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const [formReset, setFormReset] = useState(0);
    const [modelwith, setModelwith] = useState(0);

    // ===== Modal Functions Start =====

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        FormRest()

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const FormRest = () => {
        setFormReset(formReset + 1)
    }

    // ===== Modal Functions End =====

    const { countryList, status, error } = useSelector((state) => state.subModule)

    useEffect(() => {
        allCountry()
    }, [active])

    const allCountry = () => [
        dispatch(getCountryDetails())
    ]

    useEffect(() => {
        setDataSource(countryList)
    }, [countryList])


    const UpdateCountry = (record) => {
        setTrigger(trigger + 1)
        setModelwith(500)
        setModalTitle("Update Country");
        setModalContent(<AddCountry allCountry={allCountry} trigger={trigger} formname={'updateCountry'} record={record} handleOk={handleOk} />)
        showModal();
    }

    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Country Name',
            dataIndex: 'countryName',
        },
        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center={"true"} gap={'10px'}>

                        <TableIconHolder color={THEME.blue} size={'22px'} onClick={() => { UpdateCountry(record) }}>
                            <FiEdit />
                        </TableIconHolder>
                    </Flex>
                );
            },
        }
    ]


    let content;

    if (status === 'loading') {
        content = <CommonLoading />
    } else if (status === 'succeeded') {
        const rowKey = (dataSource) => dataSource.countryId;
        content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} />
    } else if (status === 'failed') {
        if (error.code === 'ERR_NETWORK') {
            content = (<CustomNetWorkError/>);
        } else {
            content = (<h1>Something Went Wrong</h1>);
        }
    }
    console.log(dataSource, 'idgsftud');
    return (
        <div>
            {content}
            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modelwith} modalTitle={modalTitle} modalContent={modalContent} />

        </div>
    )
}

export default ViewCountry
