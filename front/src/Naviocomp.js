import React from "react";
import navio from "navio";
import "./NavioComp.css"

class Navio extends React.Component{
    componentDidMount(){
        console.log("Navio did mount")
        this.navio = navio(this.myDiv,620);
    }

    componentDidUpdate(prevProps){
        if (this.props.data) {
            this.navio.data(this.props.data);
            this.navio.addAllAttribs();
        }
        else if (prevProps.data.length !== this.props.data.length){
            this.navio.data(prevProps.data);
            this.navio.addAllAttribs();
        }
    }

    addingData(){
    }
    
    render(){
        return(
            <div className="navio" ref={myDiv => this.myDiv = myDiv}>
            </div>
        )
    }
}

export default Navio;