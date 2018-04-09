import React, {Component} from 'react';
import './Filter.css';


const filter = (props) => {

	let users = <option value=''></option>;
		users = props.users.map(user => {

				return <option key={user.name} value={user.name}>{user.name}</option>;
			});
	return (
		<div className="filterPanel">
			<label>Filter by Author: </label>
			<select value={props.author} onChange={(event) => props.changed(event, event.target.value)}>
				{users}
			</select>
		</div>
	);
}



export default filter;