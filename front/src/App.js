import React from "react";
import Navio from "./Naviocomp.js";

//https://www.datos.gov.co/resource/54ah-2npf.json
//https://www.datos.gov.co/resource/94x9-w4r3.json

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      url: "https://www.datos.gov.co/resource/94x9-w4r3.json",
      limit: "?$limit=100",
      offset: "&$offset=",
      datos: [],
      displayNavio: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  addData(){
    let datosPar = [];
    let datosFull = [];
    for (let i = 0; i < 10000; i = i + 100) {
        fetch(this.state.url.concat(this.state.limit).concat(this.state.offset).concat(i.toString()))
        .then(res => res.json())
        .then((data) => {
          if (data.length === 0) {
            i = 1000000;
            
            for (let j = 0; j < datosPar.length; j++) {
              datosFull = datosFull.concat(datosPar[j]);
            }
            this.setState({
              datos: datosFull
            })
          }
          else{
            datosPar.push(data);
          }
      })
    }
  }

   componentDidMount(){
     this.addData()
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
                placeholder={"Put here your url " + this.state.url}
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
