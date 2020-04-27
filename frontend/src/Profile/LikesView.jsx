import React from 'react';
import { Likes } from './Likes';
import { AxiosRequests } from '../api';
import { Link } from 'react-router-dom';

export class LikesView extends React.Component {

    profileRequests = new AxiosRequests();

    state = {
        likes: [],
        dislikes: []
    }

    deleteLiked(foodName) {
        if(window.confirm("Are you sure you want to delete this liked product from your profile?")) {
            let account = JSON.parse(sessionStorage.getItem('account'));
            this.profileRequests.deleteLikedProduct(account.userId, foodName)
            .then(() => {
                this.setState({ 
                    likes: this.state.likes.filter(x => x.foodName !== foodName)
                });
                alert("Liked Product Removed");
            });
        }
    }

    deleteDisliked(foodName) {
        if(window.confirm("Are you sure you want to delete this disliked product from your profile?")) {
            let account = JSON.parse(sessionStorage.getItem('account'));
            this.profileRequests.deleteDislikedProduct(account.userId, foodName)
            .then(() => {
                this.setState({ 
                    dislikes: this.state.dislikes.filter(x => x.foodName !== foodName)
                });
                alert("Disliked Product Removed");
            });
        }
    }

    render() {
        return <>
            <div>
                <Likes deleteLiked={name => this.deleteLiked(name)} likes={this.state.likes} deleteDisliked={name => this.deleteDisliked(name)} dislikes={this.state.dislikes} />
                <Link className="btn btn-secondary btn-block mt-2" to={`/${sessionStorage.getItem("username")}`}>
                    Return to Profile
                </Link>
            </div> 
        </>
    }

    componentDidMount() {
        let account = JSON.parse(sessionStorage.getItem("account"));
        this.profileRequests.getAccountLikes(account.username, account.userId)
            .then(likes => this.setState({ likes }));
        this.profileRequests.getAccountDislikes(account.username, account.userId)
            .then(dislikes => this.setState({ dislikes }));
    }

}

export default LikesView;