import React from "react";
import navio from "navio";

class Navio extends React.Component{
    constructor(props){
        super(props);
        this.myDiv = React.createRef()
    }

    componentDidMount(){
        navio(this.props.dataNavio)
    }

    render(){
        return(
            <div ref={myDiv => this.myDiv.myDiv = myDiv}>
            </div>
        )
    }
}

export default Navio;