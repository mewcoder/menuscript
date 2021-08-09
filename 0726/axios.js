
function axios({ method, url, params, data }) {
    return new Promise((resolve, reject) => {

        method = method.toUpperCase()

        //1.创建对象
        const xhr = new XMLHttpRequest();

        //2.初始化
        let str = '';
        for (let k in params) {
            str += `${k}=${params[k]}&`;
        }
        if (str) {
            url = url + '?' + str.slice(0, -1);
        }


        xhr.open(method, url);

        //3.发送
        if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
            xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8')
            //设置请求体
            xhr.send(JSON.stringify(data))
        } else {
            xhr.send();
        }

        //4.处理结果
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        status: xhr.status,
                        message: xhr.statusText,
                        body: JSON.parse(xhr.response)
                    })
                } else {
                    reject(new Error('request error status is ' + xhr.status))
                }
            }
        }
    })
}


axios.get = function (url, options) {
    return axios(Object.assign(options, { url, method: 'get' }))
}

//post delete put 同

// // 使用形式：
// axios({

//     url: 'https://api.apiopen.top/getJoke',
//     method: 'GET',
//     params: {
//         a: 1,
//         b: 2
//     },
//     data: {
//         a: 2,
//         b: 4
//     }
// }).then(
//     response => {
//         console.log(response)
//     }).catch(error => {
//         console.log(error)
//     })


// 使用形式：
axios.get('https://api.apiopen.top/getJoke', {
    params: {
        a: 1,
        b: 2
    }
}).then(
    response => {
        console.log(response)
    }).catch(error => {
        console.log(error)
    })

