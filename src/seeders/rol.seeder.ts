export const RolSeeder = async(Model)=>{
    await Model.create({name:'Administrador'})
    await Model.create({name:'Chofer'})
}