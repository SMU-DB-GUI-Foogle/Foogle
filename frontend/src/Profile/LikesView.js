import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const LikesView = props => {

    let account = JSON.parse(sessionStorage.getItem("account"));

    return <>
        <div>
            {/* <p>My Likes ({props.account.likes.length})</p> */}
            <p>My Likes ({account.likes.length})</p>
            <ul className="list-group">
                { !account.likes.length && (
                    <li className="list-group-item">
                        You haven't liked any food yet!
                    </li>)
                }
                {
                    account.likes.map((p, i) => 
                        <li className="list-group" key={ i } id="group">
                            <div className=" list-group-item list-group-item-secondary">{ i + 1 }. { p }</div>
                            <div className="list-group-item">
                                <Link to={`/product/${ p }`}>Link to { p }'s product page</Link>
                                <Button className="float-right" type="button">Add to Recipe</Button>
                            </div>
                        </li>)
                }
            </ul>

            {/* <p>My Dislikes ({props.account.dislikes.length})</p> */}
            <p>My Disikes ({account.dislikes.length})</p>
            <ul className="list-group">
                { !account.dislikes.length && (
                    <li className="list-group-item">
                        You haven't disliked any food yet!
                    </li>)
                }
                {
                    account.dislikes.map((p, i) => 
                        <li className="list-group" key={ i } id="group">
                            <div className=" list-group-item list-group-item-secondary">{ i + 1 }. { p }</div>
                            <div className="list-group-item">
                                <Link to={`/product/${ p }`}>Link to { p }'s product page</Link>
                                <Button className="float-right" type="button">Add to Recipe</Button>
                            </div>
                        </li>)
                }
            </ul>
        </div>
    </>
}

export default LikesView;