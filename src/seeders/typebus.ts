export const BusTypeSeeder = async(Model) =>{
    await Model.create({name:'Microbus'})
    await Model.create({name:'Bus'})
    await Model.create({name:'Micro'})
    await Model.create({name:'Minibus'})
    await Model.create({name:'Carry'})
    await Model.create({name:'Trufi'})
    await Model.create({name:'Otro'})
}