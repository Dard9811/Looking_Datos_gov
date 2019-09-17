import React from "react";
import navio from "navio";

class Navio extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                {this.props.data.nit}
            </div>
        )
    }
}

export default Navio;