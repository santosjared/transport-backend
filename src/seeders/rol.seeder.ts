export const RolSeeder = async(Model)=>{
    await Model.create({name:'Administrador'})
    await Model.create({name:'Chofer'})
}

export const ComponentsSeeder = async(Model) =>{
    await Model.create({name:'monitoreo'})
    await Model.create({name:'usuarios'})
    await Model.create({name:'estados de conexion'})
    await Model.create({name:'roles y permisos'})
    await Model.create({name:'microbus'})
    await Model.create({name:'tarifas'})
    await Model.create({name:'horarios'})
    await Model.create({name:'rutas'})
    await Model.create({name:'lineas'})

}

export const permissionSeeder = async(Model) =>{
    await Model.create({name:'Editar'})
    await Model.create({name:'Eliminar'})
    await Model.create({name:'Crear'})
    await Model.create({name:'Listar'})
}