import React from 'react';
import Bean from 'ble-bean';
import axios from 'axios';

//Components

export default class Main extends React.Component {
    constructor() {
        super();

        // This binding is necessary to make `this` work in the callback
        this.onclick_dicoverBean = this.onclick_dicoverBean.bind(this);
    }

    onclick_dicoverBean() {
        let intervalId;

        Bean.discover((bean) => {
            console.log('bean found');
            console.log('bean: ' + bean);

            bean.on('temp', (temp, valid) => {
                let currentDate = new Date(),
                    uuid = bean.uuid;

                if (valid) {
                    console.log('send temp prep');
                    this.sendTemp(uuid, currentDate, temp);
                }
            });

            bean.connectAndSetup(() => {

                let readData = () => {

                    bean.requestTemp(() => {
                        console.log('request temp sent');
                    });
                }

                intervalId = setInterval(readData, 30000);
            });
        });
    }

    sendTemp(uuid, currentDate, temp) {
        console.log('sending post request');
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          }
        }
        //https://oddworld.herokuapp.com/collect_data
        axios.post('https://oddworld.herokuapp.com/collect_data', {
            'uuid': uuid,
            'timeStamp': currentDate,
            'temp': temp,
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
            	<h1>Hello World!!!</h1>
                <button onClick={this.onclick_dicoverBean}>
                    Discover Bean
                </button>
            </div>
        );
    }
}
