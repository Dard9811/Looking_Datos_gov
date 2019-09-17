import React from "react";
import navio from "navio";

function Navio(props){
  return(
    <div>
      {props.datos}
    </div>
  )
}

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

  onChange(){
    this.setState({
      inValue: this.myIn.value
    })
  }

  render(){
    return(
        <div className="container">
          <input
            type="text"
            ref={myIn => this.myIn.myIn}
            value={this.state.inValue}
            onChange={this.onChange.bind(this)}
          />
          <navio data={this.state.datos}></navio>
        </div>
    );
  }
}

export default App;
