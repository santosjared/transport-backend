export const BusMarkerSeeder = async(Model) =>{
    await Model.create({name:'Nissan'})
    await Model.create({name:'Toyota'})
    await Model.create({name:'Mercedes Benz'})
    await Model.create({name:'Mitsubishi'})
    await Model.create({name:'Scania'})
    await Model.create({name:'Hyundai'})
    await Model.create({name:'Volkwagen'})
    await Model.create({name:'Foton'})
    await Model.create({name:'Joylon'})
    await Model.create({name:'King Long'})
    await Model.create({name:'Otro'})
}
