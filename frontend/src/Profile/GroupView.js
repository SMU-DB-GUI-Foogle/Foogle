import React from 'react';

export const GroupView = props => {

    let account = JSON.parse(sessionStorage.getItem("account"));

    return <>
        <div>
            {/* <p>My Groups ({props.account.groups.length})</p> */}
            <p>My Groups ({account.groups.length})</p>
            <ul className="list-group">
                { !account.groups.length && (
                    <li className="list-group-item">
                        You aren't a part of any groups!
                    </li>)
                }
                {
                    account.groups.map((p, i) => 
                        <li className="list-group" key={ i } id="group">
                            <div className=" list-group-item list-group-item-secondary">{ i + 1 }. { p.name }</div>
                            <div className="list-group-item list-group-item-light">
                                Owner: { p.owner }
                                <ul className="list-group">
                                { !p.members.length && (
                                    <li className="list-group-item">
                                        There are no other members of this group!
                                    </li>)
                                }
                                {
                                    p.members.map((m,j) => 
                                        <li className="list-group" key={ j } id="member">
                                            <div className=" list-group-item list-group-item-secondary">{ j + 1 }. { m }</div>
                                        </li>)
                                }
                                </ul>
                                <span className="text-dark">"{ p.description }"</span>
                                
                            </div>
                        </li>)
                }
            </ul>
        </div>
    </>
}

export default GroupView;