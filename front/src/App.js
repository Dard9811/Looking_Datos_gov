import React from "react";
import Navio from "./Naviocomp.js";

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      url: "https://www.datos.gov.co/resource/54ah-2npf.json",
    //  socrata: "$limit=100&$offset=0",
      datos: [],
      displayNavio: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

   componentDidMount(){
    fetch(this.state.url)
    .then(res => res.json())
    .then((data) => {this.setState({
      datos: data
    })
    console.log(this.state.datos.length)
    })  
   }

  onChange(event){
    this.setState({
      url: event.target.value
    })
  }

  handleClick(){
    this.setState({
      displayNavio: true
    })
    fetch(this.state.url)
    .then(res => res.json())
    .then((data) => {this.setState({
      datos: data
    })
    this.setState({
      displayNavio: false
    })
  })  
  }

  render(){
    return(
        <div className="container">
          <h1>Welcom to looking datos.gov.co</h1>
          <form>
            <div className="form-group">
              <p>This is our first visualice of the </p>
              <label htmlFor="myIn"> Insert your link of the json from <a href="https://www.datos.gov.co/browse?sortBy=newest" target="_blank">datos.gov.co</a></label>
                <input
                id="myIn"
                type="text"
                placeholder={"This is the url that is showing now " + this.state.url}
                onChange={this.onChange.bind(this)}
                className="form-control ml-2 "
                />
            </div>
          </form>
          <div>
              <button className="btn btn-success mt-1" onClick={this.handleClick}>Lets visualize</button>  
            </div>
          <div className="mt-5">
          {
            !this.state.displayNavio ? 
            <Navio data={this.state.datos}></Navio>
            :
            <h2>Loading data</h2>
          }
          </div>
        </div>
    );
  }
}

export default App;
