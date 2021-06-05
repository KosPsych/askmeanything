
import nats, { Stan,Message }from 'node-nats-streaming';
import {Answer} from './db_model'
import {update_after_edit} from './utils'



class NatsClient {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }


  listen(){
    const options = this.client.subscriptionOptions().setManualAckMode(true)
    const subscription = this.client.subscribe('question:edited',options)
    subscription.on('message',(msg:Message)=>{
      update_after_edit(this.parseMessage(msg),msg)
          })
     }
 
  


  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsclient = new NatsClient();