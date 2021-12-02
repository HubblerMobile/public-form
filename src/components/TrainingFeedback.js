/**
 * Created by Zac on 01/12/21
 * © Hubbler Pvt. Ltd. (2012-Present) All Rights Reserved
 */

import React, {useState} from 'react'
import {Modal, Button, Form, message} from 'antd';
import TrainingFeedbackForm from './TrainingFeedbackForm/TrainingFeedbackForm'
import axios from "axios"

const TrainingFeedback = () => {
    const [form] = Form.useForm();
    const [submitLoader, setSubmitLoader] = useState(false)
    const [address, setAddressField] = useState()

    const onCreate = (values) => {
        console.log(values);
        setSubmitLoader(true);
        let postData = Object.assign({}, values);
        postData['ee2433259b0fe399b40e81d2c98a38b6'] = ''; // #TODO - Creator's info is expected here
        postData['5dc8c37f2c7ded4ccc55b3debd4759b7'] = postData['5dc8c37f2c7ded4ccc55b3debd4759b7'].format('DD-MM-YYYY');
        delete postData['619370bcc61f20ea6a490e2e'];
        postData['6982b08826796bb729b56df167ef5d62'] = Number(postData['6982b08826796bb729b56df167ef5d62']);
        postData['0156391719dfc4fbaa0b4165e7b4e647'] = Number(postData['0156391719dfc4fbaa0b4165e7b4e647']);
        postData['36b7a949dc09a5635a8270b8b8b3e67c'] = Number(postData['36b7a949dc09a5635a8270b8b8b3e67c']);
        postData['54be9ff1609aa104dca9886bf62032cf'] = Number(postData['54be9ff1609aa104dca9886bf62032cf']);
        postData["d1b6de9071d12a11bb7a7f09618b0389"] = address.house_name;
        postData["88929c1013f35dc608af3ba3b1fbac2f"] = address.street;
        postData["5074bb8d15e2a796c6f2e432acc86811"] = address.state;
        postData["34077c7222e7d956d494e8f45c60b48e"] = address.city;
        postData["2c79d07f076f0e865b18b9f5d8603967"] = address.country;
        postData["7333456ff2e0909d8f08c56ace255af7"] = address.pin_code;
        postData["b99eca5145ee4760b67a872ce7f1cc4a"] = address.landmark;
        postData["a594a770f2b539b4548077c19abd7f67"] = address.gstin;
        postData['8105f9f380bdf8f03337bcddb3479f79'] = postData['8105f9f380bdf8f03337bcddb3479f79'].join(', ');
        postData['a9a3928c912b2955cfaa9e702c749a78'] = postData['a9a3928c912b2955cfaa9e702c749a78'].join(', ');
        postData['475d9f9a5e77c98bb9d98e14150d7941'] = postData['475d9f9a5e77c98bb9d98e14150d7941'].join(', ');

        let postURL = "https://hubbler.in/integrations/workflow/incoming-hook/?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50IjoiNjA5Mzc2ODU1ZjYyZGY0Mzc3ZmY1NTU4IiwiYXBwIjoiNjE1NWM2YTg3YmFmMGFhODk0ZDM0NDc3IiwiY29uZmlnX2lkIjoiNjFhNjE2Y2E0NWY4MWY3YmZhMTM1ZWM1IiwiYXBwX2NvZGUiOiIifQ._HAg67dkBSeMglOA0gfVif5zvoQiMfS7jvjpXSyidzY";
        axios.post(postURL, postData).then((response) => {
            let result = response.data.result
            result && !result.invalid ? message.success(result.message || 'Successfully posted') : message.error(result.error);
            setSubmitLoader(false);

        });
    };

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                onCreate(values);
            })
            .catch(info => {
                console.log('Validation failed for : ', info);
            });
    };

    const handleReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    }

    const setAddress = (addObj) => {
        setAddressField(addObj)
    }

    return (
        <div className={'vendor-management'}>
            <Modal footer={[
                <Button key="back" onClick={handleReset}>
                    Reset
                </Button>,
                <Button key="submit" type="primary" loading={submitLoader} onClick={handleOk}>
                    Submit
                </Button>]}
                   title={<div className={'title-wrap'} destroyOnClose={true}>
                       <div className={'hubbler-logo'}></div>
                       <div className={'title-parent'}>
                           <span>Training Feedback</span>
                       </div>

                   </div>} visible={true} onOk={handleOk} className={'vendor-modal'}>
                <TrainingFeedbackForm onFinish={onFinish} form={form} setAddress={setAddress}/>
            </Modal>

        </div>
    )
}

export default TrainingFeedback;
