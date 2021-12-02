/**
 * Created by Zac on 01/12/21
 * © Hubbler Pvt. Ltd. (2012-Present) All Rights Reserved
 */

import React, {useState} from 'react';
import {Form, Input, Select, DatePicker, InputNumber} from 'antd';
import './trainingFeedbackForm.scss'
const {Option} = Select;

const ADDRESS_FIELD_DATA = [
    {id: "house_name", lbl: "House Name"},
    {id: "street", lbl: "Street"},
    {id: "city", lbl: "City"},
    {id: "district", lbl: "District"},
    {id: "state", lbl: "State"},
    {id: "country", lbl: "Country"},
    {id: "landmark", lbl: "Landmark"},
    {id: "gstin", lbl: "GSTIN"}
];

const PAGE_FIELDS = [{
        "_id": "5dc8c37f2c7ded4ccc55b3debd4759b7",
        "type": "date",
        "lbl": "Date of Training",
        "required": true,
        "dateFormat": "dd-mm-yyyy",
    }, {
        "_id": "33da5040945f0b41d88402ca30c3e56d",
        "type": "dropdown",
        "lbl": "Day",
        "source_id": "610277857fe44e23da5ef5df",
        "source": "list",
    }, {
        "_id": "d43703ab701b279a38f2880912d9f993",
        "type": "email",
        "lbl": "Client Email",
        "required": true,
    }, {
        "_id": "619370bcc61f20ea6a490e2e",
        "type": "location",
        "lbl": "Client Address",
        "locationType": "manualEntry",
    }, {
        "_id": "8105f9f380bdf8f03337bcddb3479f79",
        "type": "multiSelect",
        "lbl": "Vertical",
        "source_id": "610a3e1f6eba84bcadeb83a5",
        "source": "list",
    }, {
        "_id": "a9a3928c912b2955cfaa9e702c749a78",
        "type": "multiSelect",
        "lbl": "Planned Traninig Details",
        "source_id": "610a3dacc05c52f6e4ac66b5",
        "source": "list",
    }, {
        "_id": "ab4c4c8415f2be764c6ac3d412236f15",
        "type": "text",
        "lbl": "Module Coverage- Topic Name",
    }, {
        "_id": "475d9f9a5e77c98bb9d98e14150d7941",
        "type": "multiSelect",
        "lbl": "Methodology",
        "source_id": "6102755a568dc305a59a223e",
        "source": "list",
    }, {
        "_id": "6982b08826796bb729b56df167ef5d62",
        "type": "number",
        "lbl": "Training Duration (in Hrs)",
        "maxPrecision": 1,
    }, {
        "_id": "8eec0af53ab57c2cbaa0594b270fef13",
        "type": "text",
        "lbl": "Name of Trainer",
    }, {
        "_id": "61a0de9b957e070ef154ef40",
        "type": "sectionBreak",
        "lbl": "Feedback",
        "style": "underline",
    }, {
        "_id": "9ed21b3aa28162baf0b272d5a9422cd8",
        "type": "text",
        "lbl": "Name of the Employee",
    }, {
        "_id": "0156391719dfc4fbaa0b4165e7b4e647",
        "type": "number",
        "lbl": "Employee Code",
    }, {
        "_id": "1bcb86a2abf9449056c993d15f4905f8",
        "type": "text",
        "lbl": "Department",
    }, {
        "_id": "36b7a949dc09a5635a8270b8b8b3e67c",
        "type": "number",
        "lbl": "Pre Effectiveness",
    }, {
        "_id": "54be9ff1609aa104dca9886bf62032cf",
        "type": "number",
        "lbl": "Post Effectiveness",
    }, {
        "_id": "29cdee993acd6dacac6d47ccbf60bd2b",
        "type": "dropdown",
        "lbl": "Employee feedback fo the Training",
        "source_id": "61123a49b3eef605bbd8cb3f",
        "source": "list",
    }, {
        "_id": "74f96f72e4fba757bf0899d78638ebd7",
        "type": "text",
        "lbl": "Any other suggestion/ comment received",
    }, {
        "_id": "631174f40ac558c48c507f4bde97485f",
        "type": "text",
        "lbl": "Overall remarks of the evaluator for the session",
    }
];

const DROPDOWN_VALUES_610277857fe44e23da5ef5df = [
    {"_id": "610277a170028b52643fc998", "option": "Monday"},
    {"_id": "610277a170028b52643fc999", "option": "Tuesday"},
    {"_id": "610277a170028b52643fc99a", "option": "Wednesday"},
    {"_id": "610277a170028b52643fc99b", "option": "Thursday"},
    {"_id": "610277a170028b52643fc99c", "option": "Friday"},
    {"_id": "610277a170028b52643fc99d", "option": "Saturday"},
    {"_id": "610277a170028b52643fc99e", "option": "Sunday"}
];

const DROPDOWN_VALUES_610a3e1f6eba84bcadeb83a5 = [
    {"_id": "610a3eab81b8c935e46d1ce6", "option": "Healthcare"},
    {"_id": "610a3eab81b8c935e46d1ce7", "option": "BFSI"},
    {"_id": "610a3eab81b8c935e46d1ce8", "option": "Education"},
    {"_id": "610a3eab81b8c935e46d1ce9", "option": "Retail/Mall/Shop"},
    {"_id": "610a3eab81b8c935e46d1ceb", "option": "Hospitality (Guest House/Hostel)"},
    {"_id": "610a3eab81b8c935e46d1cec", "option": "IT"},
    {"_id": "610a3eab81b8c935e46d1ced", "option": "Manufacturing/Warehouse"},
    {"_id": "610a3eab81b8c935e46d1cee", "option": "Powerplant"},
    {"_id": "610a3eab81b8c935e46d1cef", "option": "Cinema"},
    {"_id": "610a3eab81b8c935e46d1cf0", "option": "Golden Temple"},
    {"_id": "610a3eab81b8c935e46d1cf1", "option": "Residential"},
    {"_id": "610a3eab81b8c935e46d1cf2", "option": "F& B Serices"},
    {"_id": "610a3eab81b8c935e46d1cf3", "option": "Technical"},
    {"_id": "610a7c31556344680b8968d9", "option": "General"}
];

const DROPDOWN_VALUES_610a3dacc05c52f6e4ac66b5 = [
    {"_id": "610a3f6ee374eaf3caca82c3", "option": "Sector Specific"},
    {"_id": "610a3f6ee374eaf3caca82c4", "option": "Orientation & Induction"},
    {"_id": "610a3f6ee374eaf3caca82c5", "option": "Facility Management General"},
    {"_id": "610a3f6ee374eaf3caca82c6", "option": "Health Safety & Environment"},
    {"_id": "610a3f6ee374eaf3caca82c7", "option": "Facility Management- Machine Operations"},
    {"_id": "610a3f6ee374eaf3caca82c8", "option": "Facility Management- Housekeeping"}
];

const DROPDOWN_VALUES_6102755a568dc305a59a223e = [
    {"_id": "61027582b6c82150ccf50d49", "option": "Classroom"},
    {"_id": "61027582b6c82150ccf50d4a", "option": "OJT"},
    {"_id": "61027582b6c82150ccf50d4b", "option": "Virtual"}
];

const DROPDOWN_VALUES_61123a49b3eef605bbd8cb3f = [
    {"_id": "61123a53db8d4f5d72ee9249", "option": "1"},
    {"_id": "61123a53db8d4f5d72ee924a", "option": "2"},
    {"_id": "61123a53db8d4f5d72ee924c", "option": "3"},
    {"_id": "61239605d6cd590e181ce163", "option": "4"},
    {"_id": "61239605d6cd590e181ce164", "option": "5"}
];

const DROPDOWN_VALUES_MAPPER = {
    '610277857fe44e23da5ef5df': DROPDOWN_VALUES_610277857fe44e23da5ef5df,
    '610a3e1f6eba84bcadeb83a5': DROPDOWN_VALUES_610a3e1f6eba84bcadeb83a5,
    '610a3dacc05c52f6e4ac66b5': DROPDOWN_VALUES_610a3dacc05c52f6e4ac66b5,
    '6102755a568dc305a59a223e': DROPDOWN_VALUES_6102755a568dc305a59a223e,
    '61123a49b3eef605bbd8cb3f': DROPDOWN_VALUES_61123a49b3eef605bbd8cb3f
}

const TrainingFeedbackForm = (props) => {
    const [house_name, setHouseName] = useState()
    const [street, setStreet] = useState()
    const [gstin, setGSTIN] = useState()
    const [city, setCity] = useState()
    const [landmark, setLandmark] = useState()
    const [district, setDistrict] = useState()
    const [state, setState] = useState()
    const [country, setCountry] = useState()
    const [pin_code, setPinCode] = useState()

    const onChangeOfAddressDataInput = async (inputValue, fieldId) => {
        switch (fieldId) {
            case 'house_name':
                await setHouseName(inputValue)
                break;
            case 'street':
                await setStreet(inputValue)
                break;
            case 'gstin':
                await setGSTIN(inputValue)
                break;
            case 'city':
                await setCity(inputValue)
                break;
            case 'landmark':
                await setLandmark(inputValue)
                break;
            case 'district':
                await setDistrict(inputValue)
                break;
            case 'country':
                await setCountry(inputValue)
                break;
            case 'state':
                await setState(inputValue)
                break;
            case 'pin_code':
                await setPinCode(inputValue)
                break;
            default:
                await setStreet(inputValue)
                break;
        }
        props.setAddress({house_name, street, gstin, city, landmark, district, state, pin_code, country})
    }

    const onFinish = (values) => {
        props.onFinish(values)
    };

    return (
        <Form form={props.form} layout={"vertical"} name="register" onFinish={onFinish} scrollToFirstError
              initialValues={{
                  residence: ['zhejiang', 'hangzhou', 'xihu'],
                  prefix: '86',
              }}>
            {
                PAGE_FIELDS.map(field => {
                    switch (field.type) {
                        case 'text':
                            return <Form.Item name={field._id} label={field.lbl}
                                              rules={[
                                                  {
                                                      required: !!field.required,
                                                      message: `Please input your ${field.lbl}!`,
                                                      whitespace: true,
                                                  },
                                              ]}
                            >
                                <Input placeholder={`Enter ${field.lbl}`}/>
                            </Form.Item>
                        case 'number':
                            return <Form.Item name={field._id} label={field.lbl}
                                              rules={[
                                                  {
                                                      required: !!field.required,
                                                      message: `Please input ${field.lbl}!`,

                                                  }
                                              ]}
                            >
                                <Input type={"number"} placeholder={`Enter ${field.lbl}`}/>
                            </Form.Item>
                        case 'email':
                            return <Form.Item name={field._id} label={field.lbl}
                                              rules={[
                                                  {
                                                      type: 'email',
                                                      message: 'The input is not valid e-mail!',
                                                  },
                                                  {
                                                      required: !!field.required,
                                                      message: 'Please input your e-mail!',
                                                  }
                                              ]}
                            >
                                <Input placeholder={`Enter ${field.lbl}`}/>
                            </Form.Item>
                        case 'date':
                            return <Form.Item name={field._id} label={field.lbl}>
                                <DatePicker placeholder={`Select ${field.lbl}`}/>
                            </Form.Item>
                        case 'location':
                            return <Form.Item name={field._id} label={field.lbl}>
                                <div className="address_data_input_fields">
                                    {
                                        ADDRESS_FIELD_DATA.map(singleField =>
                                            singleField.id !== "state"
                                                ?
                                                <div key={`${singleField.id}AddressData`}
                                                     className="single_addressField">
                                                    <Input className={`addressFields_${singleField.id}`}
                                                           placeholder={`Enter ${singleField.lbl}`}
                                                           name={ADDRESS_FIELD_DATA.lbl}
                                                           onChange={(e) => onChangeOfAddressDataInput(e.target.value, singleField.id)}

                                                    />
                                                </div>
                                                :
                                                <div key={`${singleField.id}Postal_codeAddressData`}
                                                     className={`multiple_addressField`}>
                                                    <Input className={`addressFields_${singleField.id}`}
                                                           placeholder={`Enter ${singleField.lbl}`}
                                                           onChange={(e) => onChangeOfAddressDataInput(e.target.value, singleField.id)}
                                                    />
                                                    <InputNumber className={`addressFields_postal_code`}
                                                                 placeholder={`Enter Pincode`}
                                                                 onChange={(e) => onChangeOfAddressDataInput(e, "pin_code")}/>

                                                </div>
                                        )
                                    }
                                </div>
                            </Form.Item>
                        case 'dropdown':
                            return <Form.Item name={field._id} label={field.lbl}
                                              rules={[
                                                  {
                                                      required: !!field.required,
                                                      message: `Please select ${field.lbl}!`,
                                                  }
                                              ]}
                            >
                                <Select placeholder={`Select ${field.lbl}`}>
                                    {
                                        DROPDOWN_VALUES_MAPPER[field.source_id] ? DROPDOWN_VALUES_MAPPER[field.source_id].map(listItem => {
                                            return <Option value={listItem.option}>{listItem.option}</Option>
                                        }) : ''
                                    }
                                </Select>
                            </Form.Item>
                        case 'multiSelect':
                            return <Form.Item name={field._id} label={field.lbl}
                                              rules={[
                                                  {
                                                      required: !!field.required,
                                                      message: `Please select ${field.lbl}!`,
                                                  },
                                              ]}
                            >
                                <Select mode="multiple" allowClear placeholder={`Select ${field.lbl}`}>
                                    {
                                        DROPDOWN_VALUES_MAPPER[field.source_id] ? DROPDOWN_VALUES_MAPPER[field.source_id].map(listItem => {
                                            return <Option value={listItem.option}>{listItem.option}</Option>
                                        }) : ''
                                    }
                                </Select>
                            </Form.Item>
                    }
                })
            }
        </Form>
    );
};

export default TrainingFeedbackForm
