import axios from 'axios';
import { message } from "antd";
/**
 * 封装ajax请求
 */
export default function ajax(url,data = null,method="GET",token, ...arr){
    return new Promise((resolve,reject)=>{
        let promise=0;
        if (!token){
            if (method === "GET"){
                promise = axios({
                    url:url,
                    method:method.toLowerCase(),
                    // withCredentials:true,
                    params:data,
                    headers:{
                        'Access-Control-Allow-Origin': 'http://localhost:8000',
                        'Access-Control-Allow-Credentials': true,
                        'Content-Type':'application/x-www-form-urlencoded',
                        "Access-Control-Allow-Headers":"Authorization,Origin, X-Requested-With, Content-Type, Accept"
                    }
                })
            }else{
                promise = axios({
                    url:url,
                    method:method.toLowerCase(),
                    data:data,
                    withCredentials:true,
                    headers:{
                        'Access-Control-Allow-Origin': 'http://localhost:8000',
                        'Content-Type':'application/x-www-form-urlencoded',
                        "Access-Control-Allow-Headers":"Authorization,Origin, X-Requested-With, Content-Type, Accept"
                    }
                });
            }
        }else{
            if (method === "GET"){
                promise = axios({
                    url:url,
                    method:method.toLowerCase(),
                    withCredentials:true,
                    params:data,
                    headers:{
                        'Authorization':`Bearer ${token}`,
                        'Access-Control-Allow-Origin': 'http://localhost:8000',
                        'Content-Type':'application/x-www-form-urlencoded',
                        "Access-Control-Allow-Headers":"Authorization,Origin, X-Requested-With, Content-Type, Accept"
                    }
                });
            }else{
                promise = axios({
                    url:url,
                    method:method.toLowerCase(),
                    data:data,
                    withCredentials:true, //允许跨域携带cookies
                    headers:{
                        'Authorization':`Bearer ${token}`,
                        'Access-Control-Allow-Origin': 'http://localhost:8000',
                        'Access-Control-Allow-Credentials': true,
                        'Content-Type':'application/x-www-form-urlencoded',
                        "Access-Control-Allow-Headers":"Authorization,Origin, X-Requested-With, Content-Type, Accept"
                    }
                });
            }
        }
        promise.then( res => {
            const { code }=res.data;
            if (code === 8){
                message.error("登录状态发生变化，请重新登录!");
                arr[0].props.history.push({pathname:'/login'});
            }else{
                resolve(res);
            }
        }).catch(err=>{
            reject(err);
        })
    })
}
