import { Injectable } from "@nestjs/common";
import { CreateLocationDto } from "../socket/dto/create-locations";
import { InjectModel } from "@nestjs/mongoose";
import { Locations, LocationsDocument } from "./schema/locations.schema";
import { Model } from "mongoose";

@Injectable()
export class LocationsService {
    constructor(@InjectModel(Locations.name) private readonly locationService:Model<LocationsDocument>){}
    async create(createLocationDto:CreateLocationDto){
        return await this.locationService.create(createLocationDto);
    }
    async update(id:string,createLocationDto:CreateLocationDto){
        const data = await this.locationService.findOneAndUpdate({_id:id},createLocationDto)
        return data
    }
    async findOne(id:string){
        return await this.locationService.findOne({userId:id})
    }
    async findAll(){
        return await this.locationService.find()
    }
    async remove(userId:string){
        return await this.locationService.findOneAndDelete({userId})
    }
    async updateStatus(userId:string, signal:boolean){
        return await this.locationService.findOneAndUpdate({userId},{signal:signal})
    }
} 