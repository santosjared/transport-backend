import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
import { DiviceService } from 'src/divice/divice.service';
import { CodesService } from 'src/codes/codes.service';
import { Cron } from '@nestjs/schedule';
import { LogicService } from 'src/logic/logic.service';


@WebSocketGateway({
  cors:{
    origin:'*'
  }
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly socketService: SocketService,
    private readonly diviceService: DiviceService,
    private readonly codesService:CodesService,
    private readonly logicService:LogicService
    ) {}
  @WebSocketServer()
  server:Server
  async handleConnection(client: Socket) {
    console.log('cliente conectado ',client.id)
    console.log(`Dirección IP del cliente: ${client.handshake.address}`);
    if(client.handshake.address !== '::ffff:127.0.0.1' && client.handshake.address !== '::1')
    {
      const data = client.handshake.query.key
      const diviceID = await this.diviceService.findOne(data.toString())
      const code = await this.codesService.verifcate(data.toString())
      if(diviceID)
      {
        const update = await this.diviceService.updateStatus(data.toString(), true)
      }else{
        if(!code){
          client.disconnect()
        }
      }
    }
  }
  async handleDisconnect(client: Socket) {
    if(client.handshake.address !== '::ffff:127.0.0.1' && client.handshake.address !== '::1')
      {
        const data = client.handshake.query.key
        const diviceID = await this.diviceService.findOne(data.toString())
        if(diviceID){
          const update = await this.diviceService.updateStatus(data.toString(), false)
        }else{
        }
      }
    client.disconnect()
    console.log('se desconecto cliente ', client.id, 'su id',client.handshake.query.key)
  }
  
  @Cron('*/10 * * * * *')
  handleLocation(){
    this.server.emit('getlocation')
  }
  p = [
    { "lat": -19.556845, "lng": -65.77071 },
    { "lat": -19.556577, "lng": -65.769905 },
    { "lat": -19.556425, "lng": -65.769379 },
    { "lat": -19.556284, "lng": -65.768859 },
    { "lat": -19.556112, "lng": -65.768312 },
    { "lat": -19.55594, "lng": -65.767743 },
    { "lat": -19.555784, "lng": -65.767201 },
    { "lat": -19.555627, "lng": -65.766707 },
    { "lat": -19.55547, "lng": -65.766155 },
    { "lat": -19.555304, "lng": -65.765607 },
    { "lat": -19.555162, "lng": -65.765124 },
    { "lat": -19.555041, "lng": -65.764545 },
    { "lat": -19.554945, "lng": -65.763445 },
    { "lat": -19.555263, "lng": -65.76301 },
    { "lat": -19.555789, "lng": -65.762941 },
    { "lat": -19.556993, "lng": -65.762646 },
    { "lat": -19.557503, "lng": -65.762597 },
    { "lat": -19.558817, "lng": -65.76227 },
    { "lat": -19.559221, "lng": -65.762168 },
    { "lat": -19.559792, "lng": -65.762055 },
    { "lat": -19.560227, "lng": -65.761969 },
    { "lat": -19.560676, "lng": -65.761851 },
    { "lat": -19.561576, "lng": -65.76169 },
    { "lat": -19.563005, "lng": -65.761503 },
    { "lat": -19.563854, "lng": -65.761449 },
    { "lat": -19.564268, "lng": -65.761202 },
    { "lat": -19.565016, "lng": -65.760671 },
    { "lat": -19.565511, "lng": -65.760349 },
    { "lat": -19.565739, "lng": -65.760108 },
    { "lat": -19.566779, "lng": -65.759491 },
    { "lat": -19.567368, "lng": -65.759131 },
    { "lat": -19.568076, "lng": -65.758605 },
    { "lat": -19.568374, "lng": -65.758412 },
    { "lat": -19.568697, "lng": -65.758036 }
  ]

  j = 0
  convertirCoordenadas(coordenadas) {
    const [lng, lat] = coordenadas[0];
    return { lat, lng };
  }
  @SubscribeMessage('sendLocation')
  create(@MessageBody() location: any,@ConnectedSocket() client:Socket) {
    
    console.log('location ',location, 'id: ',client.id, 'idf: ',client.handshake.query.key)
    //const gps = this.p[this.j]
    this.server.emit('reSedLocation',{location})
    this.j++
    if(this.j==this.p.length)
    {
      this.j=0
    }
  }
  @SubscribeMessage('register')
  async register (@MessageBody() message:any, @ConnectedSocket() client:Socket){
    const {name,brand,model, lat, lng} = message
    const data = {name:name,brand:brand,model:model}
    const response = await this.diviceService.create(data)
    if(response){
      const {id}=response
      client.emit('register',{id})
      client.handshake.query.key = id
      this.server.emit('newDivice', message)
    }else{
      client.disconnect()
    }
  }
  @SubscribeMessage('divice')
  async device(){
    const response = await this.diviceService.findAll()
    this.server.emit('diviceAll',response)
  }
}
