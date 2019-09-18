import React from "react";
import Navio from "./Naviocomp.js";

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      url: "https://www.datos.gov.co/resource/54ah-2npf.json",
      datos: [],
      keys:[]
    }

    this.handleClick = this.handleClick.bind(this);
  }

   componentDidMount(){
    console.log("Did mount App")
    fetch(this.state.url)
    .then(res => res.json())
    .then((data) => {this.setState({
      datos: data
    })});
  }

/*   componentDidUpdate(prevProps){
    console.log("Did mount App 2")

    console.log(this.state.url !== prevProps.url)
    if (this.state.datos !== prevProps.datos) {
     // this.handleClick()
    }

    console.log("New props", this.state.url)
  } */

  onChange(event){
    this.setState({
      url: event.target.value
    })
  }
/* 
  handleClick(prevProps){
    if (this.state.url !== prevProps.url) {
      fetch(this.state.url)
      .then(res => res.json())
      .then((data) => {this.setState({
        datos: data
      })});
     }
  } */

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
                placeholder={this.state.url}
                onChange={this.onChange.bind(this)}
                className="form-control ml-2 "
                />
            </div>
            <div>
              <button className="btn btn-success mt-1" onClick={this.handleClick}>Lets visualize</button>  
            </div>
          </form>
          <div className="mt-5">
          {
            this.state.datos === 0 ? 
            <h2>Loading data</h2>
            :
            <Navio data={this.state.datos}></Navio>
          }
          </div>
        </div>
    );
  }
}

export default App;
