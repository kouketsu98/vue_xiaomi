import axios from "axios";

function http(userOptions) {
        var defaultOptions = { method: "get" };
        var ajaxOptions = Object.assign({}, defaultOptions, userOptions);
        ajaxOptions.headers = Object.assign({}, { Authorization: sessionStorage.getItem('token') }, userOptions.headers);
        return axios(ajaxOptions)
                .then(res =>  {
                        if(res.status === 200) {
                                switch(res.data.code) {
                                        case 200:
                                                return res.data.data;
                                                break;
                                        case 199:
                                        case 401:
                                        case 404:
                                        case 500:
                                                throw new Error(res.data.msg);
                                }
                        } else {
                                throw new Error(res.statusText);
                        }
                })
                .catch(err => {
                        // 对错误进行统一的提示处理，然后还是要返回一个失败的Promise
                        console.log(err.message);
                        return Promise.reject();
                });
}

export default http;