
import nats, { Stan,Message }from 'node-nats-streaming'
import {create_question,edit_question,add_answer,edit_answer} from './db_utils'



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

    const question_create_subscription = this.client.subscribe('question:created',options)
    question_create_subscription .on('message',(msg:Message)=>{
          create_question(this.parseMessage(msg),msg)
          })

    const question_edit_subscription  = this.client.subscribe('question:edited',options)
    question_edit_subscription .on('message',(msg:Message)=>{
            edit_question(this.parseMessage(msg),msg)
        })
    
    const answer_create_subscription = this.client.subscribe('answer:created',options)
    answer_create_subscription .on('message',(msg:Message)=>{
          add_answer(this.parseMessage(msg),msg)
          })  
          
    const answer_edit_subscription = this.client.subscribe('answer:edited',options)
    answer_edit_subscription .on('message',(msg:Message)=>{
          edit_answer(this.parseMessage(msg),msg)
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
        reject('cannot connect to nats');
      });
    });
  }
}

export const natsclient = new NatsClient();