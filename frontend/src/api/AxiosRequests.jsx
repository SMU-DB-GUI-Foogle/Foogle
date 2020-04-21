import axios from 'axios';

export class AxiosRequests {

    url = "http://localhost:8000"

    config = {

    }

    getProductByName(foodName) {
        var config = this.config;
        config.params = { foodName }
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/products/${foodName}`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    // getProfileAccount(userName) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${this.url}/${userName}`, this.config)
    //             .then(x => resolve(x.data))
    //             .catch(x => {
    //                 alert(x);
    //                 reject(x);
    //             });
    //     });
    // }

    login(emailAddress, password) {
        var config = this.config;
        config.params = { emailAddress, password };
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/login`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    register(firstName, lastName, emailAddress, username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/register`, { firstName, lastName, emailAddress, username, password }, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    deleteAccount(userId) {
        var config = this.config;
        config.params = { userId };
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/:username`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getAccountSaves(userName, userId) {
        var config = this.config;
        config.params = { userId };
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${userName}/saves`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    saveProduct(userId, foodName) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/product/saves`, { userId, foodName }, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    deleteSavedProduct(userId, foodName) {
        var config = this.config;
        config.params = { userId, foodName };
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/product/saves`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getAccountLikes(userName, userId) {
        var config = this.config;
        config.params = { userId };
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${userName}/likes`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    likeProduct(userId, foodName) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/product/likes`, { userId, foodName }, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    deleteLikedProduct(userId, foodName) {
        var config = this.config;
        config.params = { userId, foodName };
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/product/likes`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getAccountDislikes(userName, userId) {
        var config = this.config;
        config.params = { userId };
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${userName}/dislikes`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    dislikeProduct(userId, foodName) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/product/dislikes`, { userId, foodName }, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    deleteDislikedProduct(userId, foodName) {
        var config = this.config;
        config.params = { userId, foodName };
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/product/dislikes`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getAccountGroups(userName, userId) {
        var config = this.config;
        config.params = { userId };
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${userName}/groups`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getAccountRecipes(userName, userId) {
        var config = this.config;
        config.params = { userId };
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${userName}/recipes`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    updateProfile(userId, firstName, lastName, emailAddress, username, password) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/${username}`, { userId, firstName, lastName, emailAddress, username, password }, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

}

export default AxiosRequests;