import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import getConfig from 'src/config/environment'
import { LocationsService } from '../locations/locations.service';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Bus } from 'src/bus/entities/bus.entity';
import { Model } from 'mongoose';
import { BusDocmunet } from 'src/bus/schema/bus.schema';
import { Linea, LineaDocument } from 'src/linea/schema/linea.schema';

@Injectable()
export class SocketService {
  constructor(private locationsService: LocationsService,
    private userService:UsersService,
    @InjectModel(Bus.name) private readonly busModel:Model<BusDocmunet>,
    @InjectModel(Linea.name) private readonly lineaModel:Model<LineaDocument>
  ) { }
  async logical(message: any, time) {
    try {
      const { latitude, longitude, token } = message
      const decode: any = this.verifayToken(token)
      console.log(decode)
      if (decode) {
        const findLocation = await this.locationsService.findOne(decode.id)
        if (findLocation) {
          if(findLocation.cords.length === 0){
            const location = {
              cords: [latitude, longitude],
              oldcords:[latitude,longitude],
              speed: 0,
              distance: 0,
              userId: decode.id
            };
            await this.locationsService.update(findLocation.id, location);
          }
          if (findLocation.signal) {
            const location = {
              cords: [latitude, longitude],
              oldcords:findLocation.cords,
              speed: 0,
              distance: 0,
              userId: decode.id
            };
            await this.locationsService.update(findLocation.id, location);
            await this.locationsService.updateStatus(findLocation.userId,false)
          } else {
            const cordsA = this.convertCords(findLocation.cords)
            const cordsB = { latitude, longitude }
            const distance = this.Distance(cordsA, cordsB)
            const speed = this.speed(distance, time / 3600)

            const location = {
              cords: [latitude, longitude],
              oldcords:findLocation.cords,
              speed: speed,
              distance: distance,
              userId: decode.id
            };
            await this.locationsService.update(findLocation.id, location);
          }
        }
      }
    } catch {
      return null
    }

  }
  verifayToken(token: string) {
    try {
      const decode = jwt.verify(token, getConfig().token_Secret)
      return decode;
    } catch {
      return null
    }
  }
  private Distance(pointA: { latitude: number; longitude: number }, pointB: { latitude: number; longitude: number }): number {
    const earthRadiusKm = 6371;
    const latA = this.degreesToRadians(pointA.latitude);
    const lngA = this.degreesToRadians(pointA.longitude);

    const latB = this.degreesToRadians(pointB.latitude);
    const lngB = this.degreesToRadians(pointB.longitude);

    const dLat = latB - latA;
    const dLng = lngB - lngA;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latA) * Math.cos(latB) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;
    return this.round(distance, 4);
  }

  private degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }
  private speed(distance: number, time: number): number {
    if (distance === 0) {
      return 0
    }
    return this.round(distance / time, 0)
  }
  private time(distance: number, speed: number): number {
    if(speed===0)
      {
        return distance/14
      }
    return distance / speed
  }
  private round(decimal: number, length: number): number {
    const x = decimal.toFixed(length)
    return parseFloat(x)
  }
  private convertCords(coordenadas) {
    const [latitude, longitude] = coordenadas;
    return { latitude, longitude };
  }
  async updateStatusUser(id:string,status:string){
  await this.userService.updateStatus(id,status)
  }
  async create(decode:any){
    const bus = await this.busModel.find({userId:decode._id})
    if(bus){
      const findLocation = await this.locationsService.findOne(decode.id)
      if(findLocation){
        return findLocation
      }
      const data = {
        cords:[],
        speed:0,
        distance:0,
        userId:decode.id
      }
      const location = await this.locationsService.create(data)
      await this.busModel.findOneAndUpdate({userId:decode._id}, {locationId:location._id}, {new:true})
      return location
    }
  }
  async nearBus(location:{ latitude:number, longitude:number }){

    const buses = await this.busModel.find({
      locationId: { $ne: null },
      userId: { $ne: null }
    })
      .populate({
        path: 'userId',
        model:'Users',
        match: { status: { $in: ['signal', 'connected'] } }
      }).populate('locationId').populate('road');

    const filteredBuses = buses.filter(bus => bus.userId !== null && bus.locationId.cords.length !== 0);
    if (filteredBuses.length === 0) {
      return { message: 'NINGUN BUS EN OPERACION' };
    }
    
    const lineas = await this.lineaModel.find({ delete: false }).populate('buses');
    
    const lineaMap: { [key: string]: Linea } = {};
    
    lineas.forEach(linea => {
      linea.buses.forEach(buses => {
        lineaMap[buses.id] = linea;
      });
    });
    
    // Mapea los buses filtrados a sus respectivas líneas
    const busNear = filteredBuses.map(bus => {
      const linea = lineaMap[bus.id];
      const distance = this.Distance(location, this.convertCords(bus.locationId.cords))
      const oldDistance = this.Distance(location, this.convertCords(bus.locationId.oldcords))
      // console.log(distance,oldDistance)
      let status = 'alejandose'
      if(distance<oldDistance){
        status = 'acercandose'
      }
      if (linea) {
        return {
          trademark: bus.trademark,
          model: bus.model,
          type: bus.type,
          plaque: bus.plaque,
          cantidad: bus.cantidad,
          photo: bus.photo,
          ruat: bus.ruat,
          userId: bus.userId,
          locationId: bus.locationId,
          road: bus.road,
          delete: bus.delete,
          id: bus.id,
          linea: linea.name,
          status:status,
          distanceUser: this.Distance(location, this.convertCords(bus.locationId.cords))
        };
      }
      return null;
    }).filter(bus => bus !== null);    
    
    busNear.sort((a,b)=>a.distanceUser - b.distanceUser)
    const treeBus = busNear.slice(0,3)
    const busAproximed = treeBus.map((bus)=>{
      if(bus.road){
        let distance = 0
        for (const feature of bus.road.geojson.features) {
          if(feature.geometry){
            if(feature.geometry.type === 'LineString'){
              let localeUser = 0;
              let localeBus = 0;
              let distanceUser = 0;
              let distanceBus = 0;
              let index = 0
              for (const [lng,lat] of feature.geometry.coordinates){
                if(index==0){
                  distanceUser = this.Distance(location, {latitude:lat,longitude:lng})
                  distanceBus = this.Distance(this.convertCords(bus.locationId.cords), {latitude:lat,longitude:lng})
                }else{
                 const  distanceUserB = this.Distance(location, {latitude:lat,longitude:lng})
                  const distanceBusB = this.Distance(this.convertCords(bus.locationId.cords), {latitude:lat,longitude:lng})
                  if(distanceUserB<distanceUser){
                    distanceUser = distanceUserB
                    localeUser = index
                  }
                  if(distanceBusB<distanceBus){
                    distanceBus = distanceBusB
                    localeBus = index
                  }
                }
                index++;
              }
              distance +=distanceBus
              for(let index = localeBus; index<localeUser;index++){
                distance += this.Distance(this.convertCords(feature.geometry.coordinates[index]),this.convertCords(feature.geometry.coordinates[index+1]))
              }
            }
          }
        }
        const time = this.round(this.time(distance,bus.locationId.speed)*60,0)
        let timeF = time + ' minutos'
        if(time>60){
         const hrs = this.round(time/60,0)
         timeF = hrs + ' horas'
         if(hrs>24){
          const day = this.round(hrs/24,0)
          timeF = day + ' días'
         }
        }
        return {
        trademark:bus.trademark,
        model:bus.model,
        type:bus.type,
        plaque:bus.plaque,
        cantidad:bus.cantidad,
        photo:bus.photo,
        ruat:bus.ruat,
        userId:bus.userId,
        locationId:bus.locationId,
        road:bus.road,
        delete:bus.delete,
        id:bus.id,
        linea:bus.linea,
        status:bus.status,
        time: timeF
        }
      }else{
        const distance = this.Distance(location, this.convertCords(bus.locationId.cords))
        return {
        trademark:bus.trademark,
        model:bus.model,
        type:bus.type,
        plaque:bus.plaque,
        cantidad:bus.cantidad,
        photo:bus.photo,
        ruat:bus.ruat,
        status:bus.status,
        userId:bus.userId,
        locationId:bus.locationId,
        road:bus.road,
        delete:bus.delete,
        linea:bus.linea,
        id:bus.id,
        time: this.time(distance, bus.locationId.speed)
        }
      }
    })
    return {buses:busAproximed}
  }
}
