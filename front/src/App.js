import React from "react";
import Navio from "./Naviocomp.js";
import Historico from "./Historico.js";

//https://www.datos.gov.co/resource/94x9-w4r3.json
//https://www.datos.gov.co/resource/2kuk-p27q.json

let his = [];

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      url: "https://www.datos.gov.co/resource/gg99-dx5z.json",
      datos: [],
      displayNavio: false,
      tamanio: 2470,
      historico: []
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClickData = this.handleClickData.bind(this);
  }

  componentDidMount(){
    this.addData();
    fetch("/getData")
    .then(res => res.json())
    .then(datos => {
      this.setState({
        historico: datos
      })
      for (let i = 0; i < datos.length; i++) { 
       his.push(datos[i].url)
      }
   });
  }

  addData(){
    let datosPar = [];
    let datosFull = [];
    let cont = Math.ceil(this.state.tamanio/100);

    for (let i = 0; i < this.state.tamanio + 100; i = i + 100) {
      fetch(this.state.url.concat("?$limit=100&$offset=").concat(i.toString()))
      .then(res => res.json())
      .then((data) => {
        if (data.length === 0) {

        }
        else{
          datosPar.push(data);
          if (cont === datosPar.length) {
            for (let j = 0; j < datosPar.length; j++) {
              datosFull = datosFull.concat(datosPar[j]);
            }
            this.setState({
              datos: datosFull
            })
            i = this.state.tamanio;
          }
        }
    })}
  }

  uploadData(){
    let data = {url: this.state.url, tamanio: parseInt(this.state.tamanio)};
    fetch("addData", {
      method: "POST",
      body: JSON.stringify(data),
      headers:{
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", response));
  }


  renderData(){
    return this.state.historico.map(h => 
      <Historico datos={h} onClick={this.handleClickData}></Historico>
    );
  }

  onChange(event){
    this.setState({
      url: event.target.value
    })
  }

  onChangeTamanio(event){
    this.setState({
      tamanio: event.target.value
    })
  }

  handleClick(){
    this.setState({
      displayNavio: true
    });
    this.addData();
    setTimeout(() => {
      this.setState({
        displayNavio: false
      })
    }, 2000);
    this.uploadData();
    this.renderData();
  }

  
  handleClickData(){
    let req = {};
    req.url = this.state.url;
    fetch("getUrl", {
      method: "POST",
      body: JSON.stringify(req),
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        url: data[0].url,
        tamanio: data[0].tamanio 
      })
    })
  }

  render(){
    return(
        <div className="container">
          <h1>Welcome to looking datos.gov.co</h1>
          <form>
            <div className="form-group">
              <p>You are visualizing an example data, please insert your url below and be sure to know the exact size of your data.</p>
              <label htmlFor="myIn"> Insert your link of the json from <a href="https://www.datos.gov.co/browse?sortBy=newest" target="_blank">datos.gov.co</a></label>
              <input
              id="myIn"
              type="text"
              placeholder={"Put here your url " + this.state.url}
              onChange={this.onChange.bind(this)}
              className="form-control ml-2 "
              />
              <label htmlFor="myInTwo"> Insert the size of the json</label>
              <input
              id="myInTwo"
              type="text"
              placeholder={"Insert size (e.g) " + this.state.tamanio}
              onChange={this.onChangeTamanio.bind(this)}
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
          <div className="historico">
            <h3>Historial de consultas</h3>
            {this.renderData()}
          </div>
        </div>
    );
  }
}

export default App;
