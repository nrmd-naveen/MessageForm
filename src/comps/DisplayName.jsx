import './../styles/displayNames.scss';
import React from "react";
import Icon from "react-crud-icons";

const DisplayName = (props) =>{
    
    return(
        <div className='user' > 
            <span>{props.index+1} </span>
            <p>{props.name}</p>
            <div>
                <button>Edit <Icon name="edit" theme="light" size="tiny"/></button>
                <button>Delete <Icon name="delete" theme="light" size="tiny"/></button>
            </div>
        </div>
    )
}

export default DisplayName;