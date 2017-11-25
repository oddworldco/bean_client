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
      this.state = { connected: false, status: "loading temp...", counter: ""};
      this.data = {};
      this.dataCollected;
      this.connectedBean = "";
  }
  

  onclick_disconnectBean() {
    console.log("disconnecting...")
    setTimeout(this.connectedBean.disconnect.bind(this.connectedBean, function(){}), 2000);
    this.setState({ connected: false });
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
              var count = 60,
                  timer = setInterval(function() {
                  count = count-1;
                  console.log(count);
                  if(count == 1) clearInterval(timer);
                }, 1000);

              if (valid) {
                  console.log('valid');
                  this.splitString(dataString);
                  if(Object.keys(this.data).length > 5){
                    console.log("post!!!")
                    this.sendTemp(uuid, currentDate, this.data);
                    this.resetValues();
                  }
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
    console.log(stringArray);

    if(stringArray.length == 1){
      this.data["b"] = parseInt(stringArray[0],10);
    } else {
      this.createObj(stringArray);
    }
    console.log(this.data["b"])
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
        val = parseInt(tempArray[1],10);
        this.data[tempArray[0]] = val
        // if tempArray["b"] has one value, this needs to be concatinated with this.data["b"]
        // check if key is "b"
        // if(tempArray[0].hasOwnProperty("b")) {
        //   if(tempArray[1].length == 1){
        //     this.data[tempArray[0]] = tempArray[1] + this.data["b"]
        //   }
        // }
      } else if (tempArray[1] == ""){
        console.log("battery data found");
        delete tempArray[0];
      } else {
        console.log('4')
        console.log(this.data["b"]);
        console.log(tempArray[0]);
        val = tempArray[1].trim();
        this.data[tempArray[0]] = val;
      }
      
      console.log(tempArray[0]);
    }
    console.log("********")
    console.log(this.data);
  }

  sendTemp(uuid, currentDate, data) {
      this.setState({ status: "sending data to database"});

      console.log('sending post request to server for: ' + data);
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      }
      //http://localhost:3000/collect_data
      //'https://oddworld.herokuapp.com/collect_data'
      axios.post('https://oddworld.herokuapp.com/collect_data', {  //CHANGE BACK
          'uuid': uuid,
          'timeStamp': currentDate,
          'data': data,
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
            <h5>{ this.state.counter }</h5>
            <button onClick={this.onclick_dicoverBean}>
                Start streaming!
            </button>
            <button onClick={this.onclick_disconnectBean}>
                Stop streaing
            </button>
            <div><a href="https://www.tinyurl.com/smartypantsbbt">Log Oral Temp Data</a></div>
          </div>

      );
  }
}

render(<Hello />, document.getElementById('app'));
