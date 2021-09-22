import axios from 'axios'
import {message} from 'antd'

const headers = {
    'Authorization': "Basic YXB1YmxpYzpmb3Jt"

};


export const axiosApiCallCommonMethod = (apiMethod, apiUrl, apiData, showSuccessMessage) =>{
    return axios[apiMethod](apiUrl, apiData, {headers})
        .then( (response) => {
            const intialResponse = response.data
            if(intialResponse && intialResponse.success){
                if(showSuccessMessage) message.success(intialResponse.message || "Successfully uploaded" )
                return intialResponse
            }else{
                message.error(intialResponse.error || 'Something went wrong')
            }
        })
        .catch( (error)=> {
            message.error("Some Error Occured")
        })
}