import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
import { DiviceService } from 'src/divice/divice.service';
import { CodesService } from 'src/codes/codes.service';
import { Cron } from '@nestjs/schedule';
import { LogicService } from 'src/logic/logic.service';
import { LocationsService } from 'src/locations/locations.service';

const seconds = 20;
@WebSocketGateway({
  cors:{
    origin:'*'
  }
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect{
  constructor(
    private readonly socketService: SocketService,
    private readonly diviceService: DiviceService,
    private readonly codesService:CodesService,
    private readonly logicService:LogicService,
    private readonly locationsService:LocationsService,
    ) {}
  @WebSocketServer()
  server:Server
  async handleConnection(client: Socket) {
    console.log('cliente conectado ',client.id)
    console.log(`Dirección IP del cliente: ${client.handshake.address}`);
  }
  async handleDisconnect(client: Socket) {
    client.disconnect()
    console.log('se desconecto cliente ', client.id)
  }
  
  @Cron('*/20 * * * * *')
  handleLocation(){
    this.server.emit('getlocation')
  }
  convertirCoordenadas(coordenadas) {
    const [lng, lat, user] = coordenadas;
    return { lat, lng, user };
  }
  cords(coordenadas) {
    const [latitude, longitude] = coordenadas;
    return { latitude, longitude};
  }
  @SubscribeMessage('sendLocation')
  async create(@MessageBody() location: any,@ConnectedSocket() client:Socket) {
    const cordenates = this.convertirCoordenadas(location)
    const findUser = await this.locationsService.findUser(cordenates.user)
    if(findUser){
      const cordsA=this.cords(findUser.cords)
      const cordsB = {latitude:cordenates.lat,longitude:cordenates.lng}
      const distance = this.logicService.Distance(cordsA,cordsB)
      console.log('a: ',cordsA,"b: ", cordsB,"distancia ",distance)
      let speed = this.logicService.speed(distance,seconds/3600)
      const data = {
        cords:[cordenates.lat,cordenates.lng],
        speed:speed,
        distance:distance,
        user:cordenates.user
      }
      await this.locationsService.update(cordenates.user,data)
    }else{
      const cordA =this.cords(location)
      const distance = this.logicService.Distance(cordA,cordA)
      const speed = this.logicService.speed(distance,seconds/3600)
      const data = {
        cords:[cordenates.lat,cordenates.lng],
        speed:speed,
        distance:distance,
        user:cordenates.user
      }
      await this.locationsService.create(data)
    }
    const locations = await this.locationsService.findAll()
    this.server.emit('reSedLocation',locations)
  }
  @SubscribeMessage('divice')
  async device(@MessageBody() data:any,@ConnectedSocket() client:Socket){
    if(data){
      const [user, key]=data;
      const newdata = {user,key}
      if(await this.diviceService.verifyDiviceCredentials(newdata))
        {
          client.emit('resDivice','success')
          const findUser = await this.diviceService.findUser(user)
          await this.diviceService.updateStatus(findUser.id,true);  
          const response = await this.diviceService.findAll()
          this.server.emit('diviceAll',response)
        }else{
          client.emit('resDivice', 'error')
          client.disconnect()
        }
    }else{
      client.emit('resDivice','error')
      client.disconnect()
    }
  }
  @SubscribeMessage('datadivice')
  async dataDivice(){
    const response = await this.diviceService.findAll()
    this.server.emit('diviceAll',response)
  }
  @SubscribeMessage('disconnectedDivice')
  async disconnectedDivice(@MessageBody() data:any, @ConnectedSocket() client:Socket){
    const findUser = await this.diviceService.findUser(data)
    if(findUser){
      if(await this.diviceService.updateStatus(findUser.id,false)){
        client.emit('resdisconnected');
        client.disconnect();
        const response = await this.diviceService.findAll();
        this.server.emit('diviceAll',response);
      }
    }
  }
}
