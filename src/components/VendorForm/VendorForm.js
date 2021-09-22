import React, {useState, useCallback} from 'react';
import {Form, Input, Select, Checkbox, Button, InputNumber, Upload} from 'antd';
import './vendorForm.scss'
import {UploadOutlined, PlusOutlined} from '@ant-design/icons';
import {axiosApiCallCommonMethod} from '../../helper'


const {Option} = Select;


let addressFieldData = [{id: "street", lbl: "Street"}, {id: "locality", lbl: "Locality"}, {
    id: "city",
    lbl: "City"
}, {id: "district", lbl: "District"}, {id: "state", lbl: "State"}, {id: "country", lbl: "Country"}]

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const normFile = (e) => {
    debugger
    // console.log('Upload event:', e);
    // if (Array.isArray(e)) {
    //     return e;
    // }
    // return e && e.fileList;
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const panCardValidation = (text) => {

    let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    return regex.test(text);


}


const VendorForm = (props) => {
    const [fileList, setPanFileList] = useState([])
    const [gstinFileList, setGstinFileList] = useState([])
    const [chequeFileList, setChequeFileList] = useState([])

    let apiUrl = 'https://sandconsole.hubblerapp.com/hubbler/web/form-media/'


    const onFinish = (values) => {
        props.onFinish(values)
    };

    const setPanList = (file) => {
        setPanFileList((oldData) => [...oldData, {
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

    const fileListElsePan = (file) =>{
        setPanFileList((oldData) => oldData.map(item => {
            if (item.uid !== file.uid) {
                return item
            }
        }))
    }
    const fileListElseGstin = (file) =>{
        setGstinFileList((oldData) => oldData.map(item => {
            if (item.uid !== file.uid) {
                return item
            }
        }))
    }
    const fileListElseCheque = (file) =>{
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

    const removePan = (filelistValue) =>{
        setPanFileList([...filelistValue])
    }
    const removeGstin = (filelistValue) =>{
        setGstinFileList([...filelistValue])
    }
    const removeCheque = (filelistValue) =>{
        setChequeFileList([...filelistValue])

    }

    const onRemove = useCallback((file, type) => {
        let filelistValue = fileList
        if(type === 'pan'){
            filelistValue = fileList
        }else if(type === 'gstin'){
            filelistValue = gstinFileList
        }else{
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

    }, [gstinFileList,fileList,chequeFileList])


    // const onPreview = useCallback(async file => {
    //     if (previewInPopup) {
    //         if (file.originalObj.type !== 'file') {
    //             setPreviewImg(file.original)
    //             setPopupClose(true)
    //         } else if (file.originalObj) {
    //             var createA = document.createElement('a');
    //             createA.setAttribute('href', file.original);
    //             createA.setAttribute('target', '_blank');
    //             document.body.appendChild(createA)
    //             createA.click()
    //             createA.remove()
    //         }
    //     } else {
    //         let src = file.original;
    //         const image = new Image();
    //         image.src = src;
    //         const imgWindow = window.open(src);
    //         imgWindow.document.write(image.outerHTML);
    //     }
    // }, [previewInPopup]);


    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);


    return (
        <Form
            form={props.form}
            layout={"vertical"}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            scrollToFirstError

        >
            <Form.Item
                name="owner_category"
                label="Owner Category"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please owner category!',
                //     },
                // ]}
            >
                <Select placeholder="Select owner category">
                    <Option value="category_1">Category 1</Option>
                    <Option value="category_2">Category 2</Option>
                    <Option value="category_3">Category 3</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                        whitespace: true,
                    },
                ]}
            >
                <Input placeholder={"Single-line-text"}/>
            </Form.Item>

            <Form.Item name="address"
                       label="Address">
                <div className="address_data_input_fields">
                    {
                        addressFieldData.map(singleField =>
                            singleField.id !== "state"
                                ?

                                <div key={`${singleField.id}AddressData`} className="single_addressField">
                                    <Input className={`addressFields_${singleField.id}`}
                                           placeholder={`Enter ${singleField.lbl}`}
                                    />
                                </div>

                                :
                                <div key={`${singleField.id}Postal_codeAddressData`}
                                     className={`multiple_addressField`}>
                                    <Input className={`addressFields_${singleField.id}`}
                                           placeholder={`Enter ${singleField.lbl}`}
                                    />
                                    <InputNumber className={`addressFields_postal_code`}
                                                 placeholder={`Enter Pincode`}/>

                                </div>
                        )
                    }

                </div>
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your phone number!',
                //     },
                // ]}
            >
                <Input
                    type={"number"}
                    placeholder={"Phone number"}
                    // addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>


            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input placeholder={"Email"}/>
            </Form.Item>


            <Form.Item
                name="PAN"
                label="PAN"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your phone number!',
                //     },
                //     ({ getFieldValue }) => ({
                //         validator(_, value) {
                //             let   regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
                //             if (regex.test(value)) {
                //                 return Promise.resolve();
                //             }
                //             return Promise.reject(new Error('Entered PAN is invalid'));
                //         },
                //     }),
                // ]}
            >
                <Input
                    placeholder={"Single-line-text"}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item
                name="TDS_percentage"
                label="TDS Rate %"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input TDS rate %!',
                //
                //     },
                // ]}
            >
                <Input type={"number"} placeholder={"Single-line-text"} defaultValue={10}/>
            </Form.Item>

            <Form.Item
                name="upload_pan"
                label="Upload PAN"

                // rules={[
                //     {
                //         required: true,
                //         message: 'Please upload PAN',
                //     },
                // ]}
            >
                <Upload name="upload_pan" listType="picture-card" fileList={fileList}
                        customRequest={(f) => customRequest(f, 'pan')}
                        action='/image/'
                        onRemove={(f) => onRemove(f,"pan")}
                >
                    {/*<Button icon={<UploadOutlined />}>Click to upload</Button>*/}
                    <div>
                        <PlusOutlined/>
                        <div style={{marginTop: 8}}>Upload</div>
                    </div>

                </Upload>
            </Form.Item>

            <Form.Item
                name="GSTIN"
                label="GSTIN"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your GSTIN!',
                //     },
                //     ({ getFieldValue }) => ({
                //         validator(_, value) {
                //             let regTest = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(value)
                //             if (regTest) {
                //                 return Promise.resolve();
                //             }
                //             return Promise.reject(new Error('Entered GSTIN is invalid'));
                //         },
                //     }),
                // ]}
            >
                <Input
                    placeholder={"Single-line-text"}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>


            <Form.Item
                name="upload_gstin"
                label="Upload GSTIN"

                // rules={[
                //     {
                //         required: true,
                //         message: 'Please upload GSTIN',
                //     },
                // ]}
            >
                <Upload name="gstin" listType="picture" fileList={gstinFileList}
                        customRequest={(f) => customRequest(f, 'gstin')}
                        action='/image/'
                        onRemove={(f) => onRemove(f,"gstin")}>
                    <Button icon={<UploadOutlined/>}>Click to upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                name="my_gst"
                label="My GST"
            >
                <Input type={"number"} placeholder={"Number"}/>
            </Form.Item>

            <Form.Item
                name="bank_name"
                label="Bank Name"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your bank name!',
                //         whitespace: true,
                //     },
                // ]}
            >
                <Input placeholder={"Single-line-text"}/>
            </Form.Item>

            <Form.Item
                name="bank_branch"
                label="Bank Branch"
            >
                <Input placeholder={"Single-line-text"}/>
            </Form.Item>

            <Form.Item
                name="bank_acc_number"
                label="Bank Account Number"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your bank account number!',
                //         whitespace: true,
                //     },
                // ]}
            >
                <Input placeholder={"Single-line-text"}/>
            </Form.Item>

            <Form.Item
                name="bank_ifsc"
                label="Bank IFSC"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your bank IFSC!',
                //         whitespace: true,
                //     },
                // ]}
            >
                <Input placeholder={"Single-line-text"}/>
            </Form.Item>

            <Form.Item
                name="upload_cancelled_cheque"
                label="Cancelled Cheque"
                // valuePropName="fileList"
                // getValueFromEvent={normFile}
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please upload GSTIN',
                //     },
                // ]}
            >
                <Upload name="cancel_cheque_upload" listType="picture" fileList={chequeFileList}
                        customRequest={(f) => customRequest(f, 'cheque')}
                        action='/image/'
                        onRemove={(f) => onRemove(f,'cheque')}>
                    <Button icon={<UploadOutlined/>}>Click to upload</Button>
                </Upload>
            </Form.Item>


            <Form.Item
                name="agreement"
                valuePropName="checked"
                // rules={[
                //     {
                //         validator: (_, value) =>
                //             value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                //     },
                // ]}

            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            {/*<Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>*/}
        </Form>
    );
};

export default VendorForm