export const GenderSeeder = async(Model) =>{
    await Model.create({name:'Masculino'})
    await Model.create({name:'Femenina'})
    await Model.create({name:'Otro'})
}