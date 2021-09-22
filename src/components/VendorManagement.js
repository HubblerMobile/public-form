import React, {useState} from 'react'
import {Modal, Button, Form,message} from 'antd';
import VendorForm from './VendorForm/VendorForm'
import axios from "axios"


const VendorManagement = () => {
    const [form] = Form.useForm();
    const [submitLoader, setSubmitLoader] = useState(false)


    const onCreate = (values) => {
        setSubmitLoader(true)
        let data = {
            "57697ca3f955d303e826afdfce262d5f": "",
            "222039a16fc1018fccd2fdd057ce1803": values.first_name,
            "d3d714f37fb0f2424aa1a95aefffb8ac": "",
            "455218b834e44d0b05e56ef0349276f8": "",
            "496a20e7dd0deb38a969871f7c90fd13": "",
            "5ea2ed269c40d777863a82e33f967902": "",
            "ad4d366c65c28dc1ca8f79bb4fddf72f": "",
            "ee2bcaf7d6e199341f7fda6bfef8a8e9": "",
            "a695bb35e9898dc11dde33ef416fc880": "",
            "caade9b0470ae94fb36cd32736f259eb": "",
            "16751a03fc4333fcc3bb0d290af96929": "",
            "68432d1463335477d6b17832290fe651": values.phone,
            "162c2f838038de6191c4587c54783dde": values.email,
            "7e81826c7963e83b2bffac34bfcb9c9e": "",
            "43a5cb5b8a120c23f2681f00f1801cea": "",
            "de8ff1acef29425fb708b4ea3886d6ce": "",
            "e38cb94a5f13a6fbf1f7d2f5df46860f": "",
            "8e5c058424e034e244d5890d4c5fd529": "",
            "fc65206866e8041a44c54a77c55e0d08": "",
            "6bec509e1244870c7b94551c76106baa": "",
            "2dac265d71631d1f85dfca2f33fa01c1": "",
            "39427b285913a1cf1b629dd769259f91": "",
            "368c7653b000d60420c459dd910d078d": "",
            "f885ffac2101b58b786aae00e4c32782": ""
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
                form.resetFields();
                onCreate(values);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {

    };

    const onFinish = (values) =>{
        console.log('Received values of form: ', values);
    }
    return (
        <div className={'vendor-management'}>
            <Modal footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={submitLoader} onClick={handleOk}>
                    Submit
                </Button>]} title={<div className={'title-wrap'} >
                <div className={'hubbler-logo'}></div>
                <div className={'title-parent'}>
                    <span>Vendor Management Form</span>
                </div>

            </div>}visible={true} onOk={handleOk} onCancel={handleCancel}  className={'vendor-modal'} style={{"width" : "80%"}}>
                <VendorForm onFinish={onFinish} form={form}/>
            </Modal>

        </div>
    )



}

export default VendorManagement