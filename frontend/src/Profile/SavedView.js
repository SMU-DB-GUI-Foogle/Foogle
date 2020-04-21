import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const SavedView = props => {

    return <>
        <div>
            <p>My Saved Items ({props.saves.length})</p>
            <ul className="list-group">
                { !props.saves.length && (
                    <li className="list-group-item">
                        You don't have any saved items!
                    </li>)
                }
                {
                    props.saves.length && props.saves.map((p, i) => 
                        <li className="list-group m-1" key={ i } id="group">
                            <div className=" list-group-item list-group-item-secondary">{ i + 1 }. { p.foodName }</div>
                            <div className="list-group-item">
                                <Link to={`/product/${ p.foodName }`}>Link to { p.foodName }'s product page</Link>
                                <Button className="float-right btn-danger" type="button" onClick={e => props.deleteSaved(p.foodName)}>X</Button>
                            </div>
                        </li>)
                }
            </ul>
        </div>
    </>
}

export default SavedView;