import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DeleteTwoTone } from '@ant-design/icons';

export const Likes = props => {

    return <>
        {!props.checked
        ?
        <div className="card p-2 m-2">
        
            <h2>My Likes ({props.likes.length})</h2>
            <ul className="list-group">
                { !props.likes.length && (
                    <li className="list-group-item">
                        You haven't liked any food yet!
                    </li>)
                }
                {
                    props.likes.length && props.likes.map((p, i) => 
                        <li className="list-group my-1" key={ i } id="group">
                            <div id = "profileCard" className=" list-group-item list-group-item-secondary">{ i + 1 }. { p.foodName }</div>
                            <div className="list-group-item">
                                <Link to={`/product/${ p.foodName }`}>Link to { p.foodName }'s product page</Link>
                                <Button className="float-right btn-danger" type="button" onClick={e => props.deleteLiked(p.foodName)}>
                                    <DeleteTwoTone className="align-middle" twoToneColor="#a8a8a8"/>
                                </Button>
                            </div>
                        </li>)
                }
            </ul>
        </div>
        :
        <div className="card p-2 m-2">
            <h2>My Dislikes ({props.dislikes.length})</h2>
            <ul className="list-group">
                { !props.dislikes.length && (
                    <li className="list-group-item">
                        You haven't disliked any food yet!
                    </li>)
                }
                {
                    props.dislikes.length && props.dislikes.map((p, i) => 
                        <li className="list-group my-1" key={ i } id="group">
                            <div id = "profileCard" className=" list-group-item list-group-item-secondary">{ i + 1 }. { p.foodName }</div>
                            <div className="list-group-item">
                                <Link to={`/product/${ p.foodName }`}>Link to { p.foodName }'s product page</Link>
                                <Button className="float-right btn-danger" type="button" onClick={e => props.deleteDisliked(p.foodName)}>
                                    <DeleteTwoTone className="align-middle" twoToneColor="#a8a8a8"/>
                                </Button>
                            </div>
                        </li>)
                }
            </ul>
        </div>
        }
    </>
}

export default Likes;