import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const SavedView = props => {

    let account = JSON.parse(sessionStorage.getItem("account"));

    return <>
        <div>
            {/* <p>My Groups ({props.account.saved.length})</p> */}
            <p>My Saved Items ({account.saved.length})</p>
            <ul className="list-group">
                { !account.saved.length && (
                    <li className="list-group-item">
                        You aren't a part of any groups!
                    </li>)
                }
                {
                    account.saved.map((p, i) => 
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

export default SavedView;