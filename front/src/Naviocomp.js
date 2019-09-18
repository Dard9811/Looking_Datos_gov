import React from "react";
import navio from "navio";
import "./NavioComp.css"

class Navio extends React.Component{
    
    getData(){
        setTimeout(() => {
            if (this.props.data.length > 0) {
                this.navio.data(this.props.data);
                this.navio.addAllAttribs();
            }
        }, 1000)
    }

    componentDidMount(){
        this.navio = navio(this.myDiv,620);
        this.getData();
    }
    
    render(){
        return(
            <div className="navio" ref={myDiv => this.myDiv = myDiv}>
            </div>
        )
    }
}

export default Navio;