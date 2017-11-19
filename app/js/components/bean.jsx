// Bean
import Bean from 'ble-bean';
import beanStream from 'ble-bean-stream';

export default class BleBean {
    
    streamData() {
        this.discoverBean();
    }
    
    discoverBean() {
        // Ask ble-bean to discover a Bean
        Bean.discover((bean) => {
            return bean;

            console.log(bean);
        });
    }

    // createStream(bean) {
    //     // Transform stream that formats data as JSON strings
    //     let json = new require('stream').Transform({objectMode: true});
        
    //     json._transform = (chunk, encoding, callback) => {
    //         json.push(JSON.stringify(chunk) + '\r\n');
    //         callback();
    //     }
    //     // Start Bean streaming
    //     // NOTE: The Readable stream will call bean.connectAndSetup()
    //     let beanReadable = beanStream.createReadStream(bean, {
    //         poll: 5000, // Interval in millis
    //         pollTemp: true
    //     });

    //     return beanReadable.pipe(json).pipe(process.stdout);
    // }    
}