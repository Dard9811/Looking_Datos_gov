import React from "react";

class Historico extends React.Component{
    render(){
        return(
            <ul>
                <li>
                    <button onClick={this.props.onClick}>{this.props.datos.url}</button> 
                </li>
            </ul>
        )
    }
}

export default Historico;