import React from 'react';
import { Likes } from './Likes';
import { AxiosRequests } from '../api';
import { Link } from 'react-router-dom';
import { notification } from 'antd';

export class LikesView extends React.Component {

    profileRequests = new AxiosRequests();

    state = {
        likes: [],
        dislikes: []
    }

    handleDeleteLiked(foodName) {
        notification.open({
            key: "like",
            message: `Are you sure you want to delete your like of ${foodName} from your profile?`,
            duration: 0,
            btn: <button type="button" className="btn btn-primary" size="small" onClick={e => { 
                    this.deleteLiked(foodName);
                    notification.close("like"); }}>Confirm</button>
        })
    }

    handleDeleteDisliked(foodName) {
        notification.open({
            key: "dislike",
            message: `Are you sure you want to delete your dislike of ${foodName} from your profile?`,
            duration: 0,
            btn: <button type="button" className="btn btn-primary" size="small" onClick={e => { 
                    this.deleteDisliked(foodName);
                    notification.close("dislike"); }}>Confirm</button>
        })
    }

    deleteLiked(foodName) {
        let account = JSON.parse(sessionStorage.getItem('account'));
        this.profileRequests.deleteLikedProduct(account.userId, foodName)
        .then(() => {
            this.setState({ 
                likes: this.state.likes.filter(x => x.foodName !== foodName)
            });
            notification.success({
                message: 'Liked Product Removed!',
                placement: 'bottomRight'
            });
        });
    }

    deleteDisliked(foodName) {
        let account = JSON.parse(sessionStorage.getItem('account'));
        this.profileRequests.deleteDislikedProduct(account.userId, foodName)
        .then(() => {
            this.setState({ 
                dislikes: this.state.dislikes.filter(x => x.foodName !== foodName)
            });
            notification.success({
                message: 'Disliked Product Removed!',
                placement: 'bottomRight'
            });
        });
    }

    render() {
        return <>
            <div>
                <Likes deleteLiked={name => this.handleDeleteLiked(name)} likes={this.state.likes} deleteDisliked={name => this.handleDeleteDisliked(name)} dislikes={this.state.dislikes} />
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