import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/style.css';

import keenImage from '../assets/keen.png';
import Bean from 'ble-bean';
import axios from 'axios';

export default class Hello extends React.Component {
  constructor() {
      super();

      // This binding is necessary to make `this` work in the callback
      this.onclick_dicoverBean = this.onclick_dicoverBean.bind(this);
      this.onclick_disconnectBean = this.onclick_disconnectBean.bind(this);
      this.state = { connected: false, status: "", bodyTemp: "loading...", beanTemp: ""};
      this.data = {};
      this.dataCollected;
      this.uuid;
      this.currentDate;
      this.connectedBean = "";
  }
  

  onclick_disconnectBean() {
    console.log("disconnecting...")
    setTimeout(this.connectedBean.disconnect.bind(this.connectedBean, function(){}), 2000);
    this.setState({ connected: false, beanTemp: "", bodyTemp: "" });
  }

  onclick_dicoverBean() {
      let intervalId, obj;

      Bean.discover((bean) => {
          console.log('bean found!');
          console.log('bean: ' + bean);
          this.connectedBean = bean;
          this.setState({ connected: true });

          bean.on('serial', (data, valid) => {
              let currentDate = new Date(),
                  uuid = bean.uuid,
                  dataString = data.toString('utf8');
              this.setState({ status: "fetching data..."});
              
              if (valid) {
                  console.log('valid');
                  this.uuid = uuid;
                  this.currentDate = currentDate;
                  this.splitString(dataString)
              }
          });

          bean.connectAndSetup(() => {
          });
      });
  }

  resetValues() {
    this.data = {};
    this.setState({ status: "fetching data..."});
  }

  splitString(data) {
    var string = data,
    stringArray = new Array();

    this.setState({ status: "data received"});

    string = string.split(",");
    for(var i =0; i < string.length; i++){
      stringArray.push(string[i].trim());
    }

    if(stringArray.length == 1){
      delete stringArray[0]
    } else {
      this.createObj(stringArray);
    }
  }  

  createObj(data) {
    var array = data,
    jsonArray = {}
    console.log('0')
    this.setState({ status: "compiling data..."});

    for(var i =0; i < array.length; i++){
      var tempArray, val;
      console.log('1')
      tempArray = array[i].split(":");
      if(parseInt(tempArray[1],10)){
        console.log('2')
        val = Number(parseFloat(tempArray[1],10).toFixed(2));
        if (tempArray[0] == "bdy") {
          this.data["bodyTemp"] = val
          this.setState({ bodyTemp: val});
        } else if (tempArray[0] == "bn") {
          this.data["beanTemp"] = val
          this.setState({ beanTemp: val});
        } else {
          this.data[tempArray[0]] = val
        }
      } else if (tempArray[0]=="n"){
        console.log('4')
        console.log(tempArray[0]);
        val = tempArray[1].trim();
        this.data["name"] = val;
      }
      console.log(tempArray[0]);
    }
    console.log("********");


    if(Object.keys(this.data).length > 5){
      console.log(this.data);
      this.sendTemp(this.data);
      this.resetValues();
    }
  }

  sendTemp(data) {
      this.setState({ status: "sending data to database"});

      console.log('sending post request to server for: ' + data.name);
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      }
      //http://localhost:8080/web_test
      //'https://oddworld.herokuapp.com/collect_data'
      axios.post('https://oddworld.herokuapp.com/collect_data', {  //CHANGE BACK
          'data': data
      }, 'contentType': 'application/json', config)
      .then((response) => {
          this.setState({ status: "data logged!"});
          console.log(response);
      })
      .catch((error) => {
          this.setState({ status: "error logging data :("});
          console.log(error);
      });
  }

  render() {
      return (
          <div>
            <h1>Smarty Pants</h1>
            <h3>Collect fertility data in your sleep!</h3>
            <h4 data-connected = { this.state.connected } >{ this.state.connected ?  'You are connected' : 'Disconnected...' }</h4>
            <h4>{ this.state.connected ? this.state.status : "" }</h4>
            <h5>{ this.state.connected ?  'Body temp: ' : '' }{ this.state.bodyTemp }</h5>
            <h5>{ this.state.connected ?  'Ambient temp: ' : '' }{ this.state.beanTemp }</h5>
            <button onClick={this.onclick_dicoverBean}>
                Start streaming!
            </button>
            <button onClick={this.onclick_disconnectBean}>
                Stop streaming
            </button>
            <div><a href="https://www.tinyurl.com/smartypantsbbt">Log Oral Temp Data</a></div>
          </div>

      );
  }
}

render(<Hello />, document.getElementById('app'));
