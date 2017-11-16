import React from 'react';
import Bean from 'ble-bean';
import axios from 'axios';

//Components
export default class Main extends React.Component {
    constructor() {
        super();

        // This binding is necessary to make `this` work in the callback
        this.onclick_dicoverBean = this.onclick_dicoverBean.bind(this);
        this.onclick_disconnectBean = this.onclick_disconnectBean.bind(this);
        this.state = { connected: false };
        this.data = {"b": ""};
        //this.batt = "";
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

                if (valid) {
                    console.log('valid');
                    this.splitString(dataString)
                    if(Object.keys(this.data).length > 6){
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
    }

    splitString(data) {
      var string = data,
      stringArray = new Array();
      
      string = string.split(",");
      for(var i =0; i < string.length; i++){
        stringArray.push(string[i].trim());
      }
      console.log(stringArray);
      if(stringArray.length == 1){
        this.data["b"] = stringArray[0];
      } else {
        this.createObj(stringArray);
      }
      console.log(this.data["b"])
    }

    createObj(data) {
      var array = data,
      jsonArray = {}
      
      for(var i =0; i < array.length; i++){
        var tempArray;
        tempArray = array[i].split(":");
        //tempObj = '"' + tempArray[0] + '": "' + tempArray[1] + '"';
        if(parseInt(tempArray[1],10)){
          this.data[tempArray[0]] = parseInt(tempArray[1],10)
        } else {
          this.data[tempArray[0]] = tempArray[1].trim();
        }
        if(this.data["b"]== ""){
          delete this.data["b"]
        } else {
          this.data["b"] = this.data["b"];
        }
      }
      console.log("********")
      console.log(this.data);
    }

    sendTemp(uuid, currentDate, data) {
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
        axios.post('https://oddworld.herokuapp.com/web_test', {  //CHANGE BACK
            'uuid': uuid,
            'timeStamp': currentDate,
            'data': data,
        }, 'contentType': 'application/json', config)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
            	<h1>Smarty Pants</h1>
              <h2>Collect fertility data in your sleep!</h2>
              <h4>{ this.state.connected ?  'You are connected' : 'Disconnected...' }</h4>

              <button onClick={this.onclick_dicoverBean}>
                  Start streaming!
              </button>
              <button onClick={this.onclick_disconnectBean}>
                  Stop streaing
              </button>
            </div>
        );
    }
}
