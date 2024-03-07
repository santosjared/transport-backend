
export const DaysSeeder = async(Model)=>{
    await Model.create({name:'Lunes'})
    await Model.create({name:'Martes'})
    await Model.create({name:'Miércoles'})
    await Model.create({name:'Jueves'})
    await Model.create({name:'Viernes'})
    await Model.create({name:'Sábado'})
    await Model.create({name:'Domingo'})
}