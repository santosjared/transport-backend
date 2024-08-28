export const TarifaSeeder = async(Model) =>{
    await Model.create({ tipo: 'Escolar', tarifa: 'Bs. 0.50' })
    await Model.create({ tipo: 'Universitario', tarifa: 'Bs. 1' })
    await Model.create({ tipo: 'Adulto', tarifa: 'Bs. 1.50' })
    await Model.create({ tipo: 'Tercera Edad', tarifa: 'Bs. 1' })
}