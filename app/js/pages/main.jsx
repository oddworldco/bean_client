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
      let intervalId,
          connectedBean;

      Bean.discover((bean) => {
        console.log('bean found!');
        console.log('bean: ' + bean);

        connectedBean = bean;
        process.on('SIGINT', exitHandler.bind(this));

        bean.on("serial", function(data, valid){
          console.log(data.toString());
        });

        bean.on("disconnect", function(){
          process.exit();
        });

        bean.connectAndSetup(function(){

        });
        // bean.on('temp', (temp, valid) => {
        //   let currentDate = new Date(),
        //     uuid = bean.uuid;

        //   if (valid) {
        //     console.log('send temp prep');
        //     //this.sendTemp(uuid, currentDate, temp);
        //     }
        // });

        // bean.connectAndSetup(() => {
        //   console.log('connect and setup');
        //   let readData = () => {
        //     console.log('read data');

        //     bean.requestTemp(() => {
        //         console.log('request temp sent');
        //     });
        //   }

        //     intervalId = setInterval(readData, 30000); //CHANGE BACK
        //   });
      });
      //process.stdin.resume();//so the program will not close instantly
      let triedToExit = false;

      //turns off led before disconnecting
      let exitHandler = function exitHandler() {

        let self = this;
        if (connectedBean && !triedToExit) {
          triedToExit = true;
          console.log('Turning off led...');
          clearInterval(intervalId);
          connectedBean.setColor(new Buffer([0x0,0x0,0x0]), function(){});
          //no way to know if succesful but often behind other commands going out, so just wait 2 seconds
          console.log('Disconnecting from Device...');
          setTimeout(connectedBean.disconnect.bind(connectedBean, function(){}), 2000);
        } else {
          process.exit();
        }
      };
    }


    sendTemp(uuid, currentDate, temp) {
        console.log('sending post request to server');
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          }
        }
        //http://localhost:3000/collect_data
        axios.post('https://oddworld.herokuapp.com/collect_data', {  //CHANGE BACK
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
