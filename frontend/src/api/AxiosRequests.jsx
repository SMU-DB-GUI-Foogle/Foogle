import axios from 'axios';

export class AxiosRequests {

    url = "http://localhost:8000"

    config = {

    }

    //login/register and update/delete account requests
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


    //saves requests (get, add remove)
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


    //likes requests (get, add remove)
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


    //dislikes requests (get, add remove)
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

    //groups requests (get, add remove)
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


    //recipes requests (get, get individual, add, add ingredient, remove ingredient, remove)
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

    getRecipeByName(userName, userId, recipeName) {
        var config = this.config;
        config.params = { userId };
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${userName}/recipes/${recipeName}`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    createRecipe(userName, userId, recipeName) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/${userName}/recipes`, { userId, recipeName }, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    createIngredient(userName, userId, recipeName, ingredient, amount) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/${userName}/recipes/${recipeName}`, { userId, recipeName, ingredient, amount }, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    deleteIngredient(userName, userId, recipeName, ingredient) {
        var config = this.config;
        config.params = { userId, ingredient };
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/${userName}/recipes/${recipeName}`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    deleteRecipe(userName, userId, recipeName) {
        var config = this.config;
        config.params = { userId, recipeName };
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/${userName}/recipes`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    //product requests (get, get all, add, update, delete)
    getProductByName(foodName) {
        var config = this.config;
        config.params = { foodName }
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/product/${foodName}`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    getAllProducts() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/product`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    createProduct(foodName, servingPortion, foodGroupId, totalCalories, totalFat, transFat, saturatedFat, cholesterol, sodium, totalCarbohydrate, sugars, protein) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/product/add`, { foodName, servingPortion, foodGroupId, totalCalories, totalFat, transFat, saturatedFat, cholesterol, sodium, totalCarbohydrate, sugars, protein }, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    updateProduct(foodId, foodName, servingPortion, foodGroupId, totalCalories, totalFat, transFat, saturatedFat, cholesterol, sodium, totalCarbohydrate, sugars, protein) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/product/${foodName}`, { foodId, foodName, servingPortion, foodGroupId, totalCalories, totalFat, transFat, saturatedFat, cholesterol, sodium, totalCarbohydrate, sugars, protein }, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    deleteProduct(foodName) {
        var config = this.config;
        config.params = { foodName };
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/product/${foodName}`, config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

}

export default AxiosRequests;