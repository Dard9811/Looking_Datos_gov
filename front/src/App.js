import React from "react";
import Navio from "./Naviocomp.js";
import navio from "navio";

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      url: "",
      datos: [],
      inValue: ""
    }
  }

  componentDidMount(){
    fetch("https://www.datos.gov.co/resource/9gm2-sqzd.json")
    .then(res => res.json())
    .then((datos) => this.setState({
      datos: datos
    }))
  }

  componentDidUpdate(prevProps){
    if (this.props.datos !== prevProps.datos) {

    }
  }

  renderDatos(){
    return this.state.datos.map(d  => <Navio data={d}></Navio>)
  }

  onChange(event){
    console.log(event.target.inValue)
    this.setState({
      inValue: event.target.inValue
    })
  }

  render(){
    return(
        <div className="container">
          <h1>Binevenido a Looking Datos.gov.co</h1>
          <input
            type="text"
            ref={myIn => this.myIn.myIn = myIn}
            value={this.state.inValue}
            onChange={this.onChange.bind(this)}
          />
          {this.renderDatos()}
        </div>
    );
  }
}

export default App;
