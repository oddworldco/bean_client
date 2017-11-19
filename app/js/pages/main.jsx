import React from 'react';
// Bean
import Bean from 'ble-bean';
import beanStream from 'ble-bean-stream';
import { Transform } from 'stream';

export default class Main extends React.Component {
    constructor() {
        super();

        // This binding is necessary to make `this` work in the callback
        this.onclick_dicoverBean = this.onclick_dicoverBean.bind(this);
    }

    onclick_dicoverBean() {
        let json = new Transform({objectMode: true});

        json._transform = (chunk, encoding, callback) => {
            // let streamData = JSON.stringify(chunk);

            // console.log(streamData);

            // return streamData;
            json.push(JSON.stringify(chunk) + '\r\n');

            console.log('data: ', JSON.stringify(chunk));
            callback();
        }

        Bean.discover((bean) => {
            console.log('bean: ', bean);
            
            let beanReadable = beanStream.createReadStream(bean, {
                poll: 5000,
                pollTemp: true

                // beforePush: (data) => {
                //   data.timestamp = new Date();
                //   return data;
                // }
            });

            beanReadable.pipe(json);

            console.log('json:', json);
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