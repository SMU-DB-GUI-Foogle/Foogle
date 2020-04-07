import axios from 'axios';

export class AxiosRequests {

    url = "https://localhost.3000"

    config = {
        headers: {
            Authorization: 'jwerth'
        }
    }

    getProductByName(name) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/products/${name}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    getProfileAccount(userName) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/profile/${userName}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

}

export default AxiosRequests;