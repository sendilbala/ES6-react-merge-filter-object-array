import React, {Component} from 'react';
import './Filter.css';


const filter = (props) => {

	//let filterText =  props.listCount + " posts from all Authors " ;
let filterText = props.author === "" ? props.listCount + " posts from all Authors "  : props.listCount  + " posts from the Author " + props.author;    

	let users = <option value=''></option>;
		users = props.users.map(user => {

				return <option key={user.name} value={user.name}>{user.name}</option>;
			});

	return (
		<div className="filterPanel">
			<span className="listCount">{filterText}</span>
			<label>Filter by Author: </label>
			<select value={props.author} onChange={(event) => props.changed(event, event.target.value)}>
				<option value="">Please select</option>
				{users}
			</select>
		</div>
	);
}



export default filter;