import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
import { Cron } from '@nestjs/schedule';
import { AuthService } from 'src/auth/auth.service';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { Catch, HttpStatus } from '@nestjs/common';
import { LocationsService } from '../locations/locations.service';
import { LineaService } from 'src/linea/linea.service';
import { StatusService } from 'src/status/status.service';
import { FiltersDto } from 'src/utils/filters.dto';

const time = 20;//seconds
@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clients: Map<string, any> = new Map();
  constructor(
    private readonly socketService: SocketService,
    private readonly authService: AuthService,
    private readonly locationService:LocationsService,
    private readonly lineaService: LineaService,
    private readonly statusService:StatusService
  ) { }
  @WebSocketServer()
  server: Server
  async handleConnection(client: Socket) {
    const filter = {filter:'',skip:0,limit:10}
    const users = await this.statusService.findAll(filter)
    await client.emit('updateStatus', users)
    console.log('cliente conectado ', client.id)
  }

  async handleDisconnect(client: Socket) {
    client.disconnect()
    console.log('se desconecto cliente ', client.id)
    if(client.handshake.query){
      await this.socketService.updateStatusUser(client.handshake.query.id as string,'signal')
      const filter = {filter:'',skip:0,limit:10}
      const users = await this.statusService.findAll(filter)
      await this.locationService.updateStatus(client.handshake.query.id as string,true)
      this.server.emit('updateStatus', users)
      }
      this.clients.delete(client.id);       
  }
  @Cron(`*/${time} * * * * *`)
  async handleLocation() {
    this.server.emit('getlocation')
    const linea = await this.lineaService.findLinea()
    this.server.emit('updateLocations',linea)
  }
  @SubscribeMessage('sendLocation')
  async create(@MessageBody() message: any, @ConnectedSocket() client: Socket) {
    console.log(message)
    try{
      if(client.handshake.query.id){
        this.socketService.logical(message,time)
      }
    }catch{
      return null
    }

  }
  @SubscribeMessage('login')
  async device(@MessageBody() auth: CreateAuthDto, @ConnectedSocket() client: Socket) {
    try {
      const user = await this.authService.validateUser(auth)
      if (user.statusCode === HttpStatus.FORBIDDEN || user.statusCode === HttpStatus.UNAUTHORIZED) {
        client.emit('response', user)
        client.disconnect();
      } else {
        const decode:any = this.socketService.verifayToken((user as any).token)
        if(decode){
          await this.socketService.updateStatusUser(decode._id,'connected')
          await this.socketService.create(decode)
          client.emit('response', user)
          client.handshake.query.id = decode._id
          const filter = {filter:'',skip:0,limit:10}
          const users = await this.statusService.findAll(filter)
          this.server.emit('updateStatus', users)
        }
        
      }
    } catch (err){
      console.log(err)
      client.emit('response', { message: 'UNAUTHORIZED', statusCode: HttpStatus.UNAUTHORIZED })
      client.disconnect()
    }
  }
  @SubscribeMessage('logout')
  async logout(@ConnectedSocket() client:Socket){
    if(client.handshake.query.id){
      await this.socketService.removeLoaction(client.handshake.query.id as string)
      await this.socketService.updateStatusUser(client.handshake.query.id as string,'disconnected')
      client.handshake.query=null
      const filter = {filter:'',skip:0,limit:10}
      const users = await this.statusService.findAll(filter)
      this.server.emit('updateStatus', users)
      client.disconnect()
    }
  }
  @SubscribeMessage('linea')
  async linea(@MessageBody() filters: FiltersDto, @ConnectedSocket() client: Socket){
    const users = await this.statusService.findAll(filters)
      client.emit('updateStatus', users)
  }
  @SubscribeMessage('newStatus')
  async newStatus (){
    const linea = await this.lineaService.findLinea()
    this.server.emit('updateLocations',linea)
  }

  @SubscribeMessage('nearbus')  
  async nearbus(@MessageBody() data:any, @ConnectedSocket() client: Socket){
    const nearBus = await this.socketService.nearBus(data)
    client.emit('buses', nearBus)
  }
}
