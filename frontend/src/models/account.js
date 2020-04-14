export class Account {
    constructor(firstName, lastName, email, username, password, likes, dislikes, saved, groups, recipes) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.likes = likes;
        this.dislikes = dislikes;
        this.saved = saved;
        this.groups = groups;
        this.recipes = recipes;
    }
}

export default Account;