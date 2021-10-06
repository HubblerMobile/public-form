import React, {useState,useCallback} from 'react'
import {Modal, Button, Form,message} from 'antd';
import VendorForm from './VendorForm/VendorForm'
import axios from "axios"
import {axiosApiCallCommonMethod} from "../helper";


const VendorManagement = () => {
    const [form] = Form.useForm();
    const [submitLoader, setSubmitLoader] = useState(false)
    const [address, setAddressField] = useState()

    const [fileList, setPanFileList] = useState([])
    const [gstinFileList, setGstinFileList] = useState([])
    const [chequeFileList, setChequeFileList] = useState([])

    let apiUrl = 'https://sandconsole.hubblerapp.com/hubbler/web/form-media/'






    const onCreate = (values) => {
        setSubmitLoader(true)
        let addRess = `${address.street}, ${address.locality}, ${address.city},  ${address.district},  ${address.state}, ${address.pin_code}, ${address.country}`
        //Strret, Loca, City, District, starte, 99, Country
        let data = {
            "57697ca3f955d303e826afdfce262d5f": values.owner_category,
            "222039a16fc1018fccd2fdd057ce1803": values.first_name,
            "d3d714f37fb0f2424aa1a95aefffb8ac": addRess,
            "455218b834e44d0b05e56ef0349276f8": address.street,
            "496a20e7dd0deb38a969871f7c90fd13": address.state,
            "5ea2ed269c40d777863a82e33f967902": address.city,
            "ad4d366c65c28dc1ca8f79bb4fddf72f": address.country,
            "ee2bcaf7d6e199341f7fda6bfef8a8e9": address.pin_code,
            "a695bb35e9898dc11dde33ef416fc880": "",
            "caade9b0470ae94fb36cd32736f259eb": "",
            "16751a03fc4333fcc3bb0d290af96929": address.district,
            "68432d1463335477d6b17832290fe651": values.phone,
            "162c2f838038de6191c4587c54783dde": values.email,
            "7e81826c7963e83b2bffac34bfcb9c9e": values.PAN,
            "43a5cb5b8a120c23f2681f00f1801cea": values.TDS_percentage,
            "de8ff1acef29425fb708b4ea3886d6ce": values.upload_pan,
            "e38cb94a5f13a6fbf1f7d2f5df46860f": values.GSTIN,
            "8e5c058424e034e244d5890d4c5fd529": values.upload_gstin,
            "fc65206866e8041a44c54a77c55e0d08": values.my_gst,
            "6bec509e1244870c7b94551c76106baa": values.bank_name,
            "2dac265d71631d1f85dfca2f33fa01c1": values.bank_branch,
            "39427b285913a1cf1b629dd769259f91": values.bank_acc_number,
            "368c7653b000d60420c459dd910d078d": values.bank_ifsc,
            "f885ffac2101b58b786aae00e4c32782": values.upload_cancelled_cheque,
        }




        axios.post("https://console.hubblerapp.com/integrations/workflow/incoming-hook/?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50IjoiNTViNzljYzI4NzJlZjg3YzE4MjRmMGI2IiwiYXBwIjoiNjEyODg0OWFlZDZiNmFjYmE0YmQ2NzQxIiwiY29uZmlnX2lkIjoiNjEyODliMDgxNmY2Zjk3M2Y3MzRiZGYzIiwiYXBwX2NvZGUiOiIifQ.vyzuOubIu1cXeXs3qxS01YMZ_7p2aQ3C9SYf2iikxiY"
            , data ).then((response)=>{
            let result = response.data.result
            if(result && !result.invalid){
                message.success(result.message ||'Successfully posted')
            }else{
                message.error(result.error)
            }
            setSubmitLoader(false)
            console.log(response)

        })
        console.log('Received values of form: ', values);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                // form.resetFields();
                onCreate(values);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleReset = () => {
        form.resetFields();
        setPanFileList([]);
        setGstinFileList([]);
        setChequeFileList([]);
    };

    const onFinish = (values) =>{
        console.log('Received values of form: ', values);
    }

    const setAddress = (addObj) =>{
        setAddressField(addObj)
    }


    const setPanList = async (file) => {
        await setPanFileList((oldData) => [...oldData, {
            uid: file.uid,
            name: file.name,
            status: 'uploading'

        }])
    }

    const setGstinList = (file) => {
        setGstinFileList((oldData) => [...oldData, {
            uid: file.uid,
            name: file.name,
            status: 'uploading'

        }])

    }
    const setChequeList = (file) => {
        setChequeFileList((oldData) => [...oldData, {
            uid: file.uid,
            name: file.name,
            status: 'uploading'

        }])

    }

    const fileListPan = (finalData) => {
        setPanFileList((oldData) => oldData.map(item => {
            if (item.uid === finalData.uid) {
                return {...item, ...finalData}
            } else {
                return item
            }
        }))
    }
    const fileListGstin = (finalData) => {
        setGstinFileList((oldData) => oldData.map(item => {
            if (item.uid === finalData.uid) {
                return {...item, ...finalData}
            } else {
                return item
            }
        }))
    }
    const fileListCheque = (finalData) => {
        setChequeFileList((oldData) => oldData.map(item => {
            if (item.uid === finalData.uid) {
                return {...item, ...finalData}
            } else {
                return item
            }
        }))
    }

    const fileListElsePan = (file) => {
        setPanFileList((oldData) => oldData.map(item => {
            if (item.uid !== file.uid) {
                return item
            }
        }))
    }
    const fileListElseGstin = (file) => {
        setGstinFileList((oldData) => oldData.map(item => {
            if (item.uid !== file.uid) {
                return item
            }
        }))
    }
    const fileListElseCheque = (file) => {
        setChequeFileList((oldData) => oldData.map(item => {
            if (item.uid !== file.uid) {
                return item
            }
        }))
    }


    const customRequest = useCallback(async ({file}, type) => {
        if (type === 'pan') {
            setPanList(file)
        } else if (type === 'gstin') {
            setGstinList(file)
        } else {
            setChequeList(file)
        }

        let url = apiUrl
        if (apiUrl) {
            let fileType = file.type.split('/')
            if (fileType[0] === 'image') {
                url += `image/`
            } else {
                url += `file/`
            }
        }
        let formData = new FormData();
        formData.append(file.name, file)
        const upLoadFile = await axiosApiCallCommonMethod("post", url || "/profile-picture/", formData, true)
        if (upLoadFile) {
            const finalData = {
                uid: file.uid,
                name: file.name,
                status: 'done',
                url: upLoadFile.result[0].filepath,
                original: upLoadFile.result[0].filepath,
                originalObj: upLoadFile.result[0]
            }

            if (type === 'pan') {
                fileListPan(finalData)
            } else if (type === 'gstin') {
                fileListGstin(finalData)
            } else {
                fileListCheque(finalData)
            }

        } else {
            if (type === 'pan') {
                fileListElsePan(file)
            } else if (type === 'gstin') {
                fileListElseGstin(file)
            } else {
                fileListElseCheque(file)
            }

        }
    }, [apiUrl])

    const removePan = (filelistValue) => {
        setPanFileList([...filelistValue])
    }
    const removeGstin = (filelistValue) => {
        setGstinFileList([...filelistValue])
    }
    const removeCheque = (filelistValue) => {
        setChequeFileList([...filelistValue])

    }

    const onRemove = useCallback((file, type) => {
        let filelistValue = fileList
        if (type === 'pan') {
            filelistValue = fileList
        } else if (type === 'gstin') {
            filelistValue = gstinFileList
        } else {
            filelistValue = chequeFileList
        }
        const index = filelistValue.findIndex(data => data === file.uid)
        filelistValue.splice(index, 1);
        if (type === 'pan') {
            removePan(filelistValue)
        } else if (type === 'gstin') {
            removeGstin(filelistValue)
        } else {
            removeCheque(filelistValue)
        }

    }, [gstinFileList, fileList, chequeFileList])




    return (
        <div className={'vendor-management'}>
            <Modal footer={[
                <Button key="back" onClick={handleReset} >
                    Reset
                </Button>,
                <Button key="submit" type="primary" loading={submitLoader} onClick={handleOk}>
                    Submit
                </Button>]}
                   title={<div className={'title-wrap'}
                               destroyOnClose={true}>
                       <div className={'hubbler-logo'}></div>
                       <div className={'title-parent'}>
                           <span>Vendor Management Form</span>
                       </div>

                   </div>}visible={true} onOk={handleOk} onCancel={handleReset}  className={'vendor-modal'}>
                <VendorForm onFinish={onFinish} form={form} setAddress={setAddress} customRequest={customRequest} onRemove={onRemove} fileList={fileList} gstinFileList={gstinFileList} chequeFileList={chequeFileList}/>
            </Modal>

        </div>
    )



}

export default VendorManagement
