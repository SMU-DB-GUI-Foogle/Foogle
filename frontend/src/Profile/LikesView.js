import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const LikesView = props => {

    return <>
        <div>
            <p>My Likes ({props.likes.length})</p>
            <ul className="list-group">
                { !props.likes.length && (
                    <li className="list-group-item">
                        You haven't liked any food yet!
                    </li>)
                }
                {
                    props.likes.length && props.likes.map((p, i) => 
                        <li className="list-group" key={ i } id="group">
                            <div className=" list-group-item list-group-item-secondary">{ i + 1 }. { p.foodName }</div>
                            <div className="list-group-item">
                                <Link to={`/product/${ p.foodName }`}>Link to { p.foodName }'s product page</Link>
                                <Button className="float-right btn-danger" type="button" onClick={e => props.deleteLiked(p.foodName)}>X</Button>
                            </div>
                        </li>)
                }
            </ul>

            <p>My Dislikes ({props.dislikes.length})</p>
            <ul className="list-group">
                { !props.dislikes.length && (
                    <li className="list-group-item">
                        You haven't disliked any food yet!
                    </li>)
                }
                {
                    props.dislikes.length && props.dislikes.map((p, i) => 
                        <li className="list-group" key={ i } id="group">
                            <div className=" list-group-item list-group-item-secondary">{ i + 1 }. { p.foodName }</div>
                            <div className="list-group-item">
                                <Link to={`/product/${ p.foodName }`}>Link to { p.foodName }'s product page</Link>
                                <Button className="float-right btn-danger" type="button" onClick={e => props.deleteDisliked(p.foodName)}>X</Button>
                            </div>
                        </li>)
                }
            </ul>
        </div>
    </>
}

export default LikesView;