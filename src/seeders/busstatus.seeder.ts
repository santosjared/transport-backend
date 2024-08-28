export const BusStatusSeeder = async(Model)=>{
    await Model.create({name:'Activo'})
    await Model.create({name:'En mantenimiento'})
    await Model.create({name:'Inactivo'})
    await Model.create({name:'Otro'})
}
