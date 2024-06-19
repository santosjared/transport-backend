import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Bus, BusDocmunet } from "src/bus/schema/bus.schema";
import { Linea, LineaDocument } from "src/linea/schema/linea.schema";
import { Users, UsersDocument } from "src/users/schema/users.schema";
import { FiltersDto } from "src/utils/filters.dto";


@Injectable()
export class StatusService {
    constructor(@InjectModel(Users.name) private readonly userModel:Model<UsersDocument>,
    @InjectModel(Bus.name) private readonly busModel:Model<BusDocmunet>,
    @InjectModel(Linea.name) private readonly lineaModel:Model<LineaDocument>
 ){}
 async findAll(filters: any) {
    const { filter, skip, limit } = filters;
  
    // Crear un objeto vacío para los filtros
    const searchFilters: any = { delete: false, busId: null };
  
    // Agregar condiciones dinámicamente basado en los filtros proporcionados
    if (filter) {
      if (filter.userName) {
        searchFilters['name'] = { $regex: new RegExp(filter.userName, 'i') };
      }
      if (filter.ci) {
        searchFilters['ci'] = { $regex: new RegExp(filter.ci, 'i') };
      }
      if (filter.email) {
        searchFilters['email'] = { $regex: new RegExp(filter.email, 'i') };
      }
      if (filter.status) {
        searchFilters['status'] = filter.status; // Filtrado exacto para status
      }
      // Puedes agregar más filtros según sea necesario
    }
  
    let resultado, total;
    if (skip !== undefined && limit !== undefined) {
      resultado = await this.userModel.find(searchFilters).skip(skip).limit(limit).exec();
      total = await this.userModel.countDocuments(searchFilters);
    } else {
      resultado = await this.userModel.find(searchFilters).exec();
      total = await this.userModel.countDocuments(searchFilters);
    }
    
    const result = await this.allData(resultado, filter);
    return { result, total };
  }
  
  async allData(data: any, filter: any) {
    const resultPromises = data.map(async (user) => {
      if (!user) {
        return null;
      }
      const bus = await this.busModel.findOne({ userId: user._id });
      let linea = null;
      if (bus) {
        linea = await this.lineaModel.findOne({ buses: bus._id });
      }
      const userData = {
        id: user.id,
        userName: user.name,
        profile: user.profile,
        ci: user.ci,
        status: user.status,
        email: user.email,
        lastConnect: user.lastConnect,
        busName: bus ? bus.trademark : null,
        plaque: bus ? bus.plaque : null,
        photo: bus ? bus.photo : null,
        linea: linea ? linea.name : null
      };
      if((filter.busName && filter.busName.toLowerCase() !=='ninguno' && !bus )||
      (filter.plaque && filter.plaque.toLowerCase() !=='ninguno' && !bus )||
      (filter.linea && filter.linea.toLowerCase() !=='ninguno' && !linea )
    ){
        return null
      }
      if (
        (filter.busName && bus && !bus.trademark.match(new RegExp(filter.busName, 'i'))) ||
        (filter.plaque && bus && !bus.plaque.match(new RegExp(filter.plaque, 'i'))) ||
        (filter.linea && linea && !linea.name.match(new RegExp(filter.linea, 'i'))) 
      ) {
        return null;
      }
  
      return userData;
    });
  
    // Filtrar resultados nulos y devolver el resultado
    const filteredResults = (await Promise.all(resultPromises)).filter(result => result !== null);
    return filteredResults;
  }
     
}