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
                    this.sendTemp(uuid, currentDate, this.data);
                }
            });

            bean.connectAndSetup(() => {
            });
        });
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
