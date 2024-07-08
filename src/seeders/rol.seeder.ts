export const RolSeeder = async(Model)=>{
    await Model.create({name:'Administrador'})
    await Model.create({name:'Chofer'})
}

export const ComponentsSeeder = async(Model) =>{
    await Model.create({name:'Listar-monitoreo'})
    await Model.create({name:'Listar-usuarios'})
    await Model.create({name:'Editar-usuarios'})
    await Model.create({name:'Eliminar-usuarios'})
    await Model.create({name:'Crear-usuarios'})
    await Model.create({name:'Detalles-usuarios'})
    await Model.create({name:'Listar-rol'})
    await Model.create({name:'Editar-rol'})
    await Model.create({name:'Eliminar-rol'})
    await Model.create({name:'Crear-rol'})
    await Model.create({name:'Agregar-rol'})
    await Model.create({name:'Quitar-rol'})
    await Model.create({name:'Listar-microbus'})
    await Model.create({name:'Editar-microbus'})
    await Model.create({name:'Eliminar-microbus'})
    await Model.create({name:'Crear-microbus'})
    await Model.create({name:'Detalles-microbus'})
    await Model.create({name:'Asignar_usuario-microbus'})
    await Model.create({name:'Listar-tarifa'})
    await Model.create({name:'Editar-tarifa'})
    await Model.create({name:'Eliminar-tarifa'})
    await Model.create({name:'Crear-tarifa'})
    await Model.create({name:'Listar-horario'})
    await Model.create({name:'Editar-horario'})
    await Model.create({name:'Eliminar-horario'})
    await Model.create({name:'Crear-horario'})
    await Model.create({name:'Listar-ruta'})
    await Model.create({name:'Editar-ruta'})
    await Model.create({name:'Eliminar-ruta'})
    await Model.create({name:'Crear-ruta'})
    await Model.create({name:'Listar-linea'})
    await Model.create({name:'Editar-linea'})
    await Model.create({name:'Eliminar-linea'})
    await Model.create({name:'Crear-Linea'})
    await Model.create({name:'Listar_horario-linea'})
    await Model.create({name:'Listar_tarifas-linea'})
    await Model.create({name:'Listar_buses-linea'})
    await Model.create({name:'Listar_rutas-linea'})
    await Model.create({name:'Listar_buses_rutas-linea'})
    await Model.create({name:'Asignar_ruta-linea'})
    await Model.create({name:'Asignar_bus-linea'})
    await Model.create({name:'Asignar_tarifas-linea'})
    await Model.create({name:'Asignar_horarios-linea'})
    await Model.create({name:'Listar-conexiones'})
}
export const GenderSeeder = async(Model) =>{
    await Model.create({name:'Masculino'})
    await Model.create({name:'Femenina'})
    await Model.create({name:'Otro'})
}
export const contrySeeder = async(Model) =>{
    await Model.create({ name: 'Bolivia' });
    await Model.create({ name: 'Afganistán' });
await Model.create({ name: 'Albania' });
await Model.create({ name: 'Alemania' });
await Model.create({ name: 'Andorra' });
await Model.create({ name: 'Angola' });
await Model.create({ name: 'Antigua y Barbuda' });
await Model.create({ name: 'Arabia Saudita' });
await Model.create({ name: 'Argelia' });
await Model.create({ name: 'Argentina' });
await Model.create({ name: 'Armenia' });
await Model.create({ name: 'Australia' });
await Model.create({ name: 'Austria' });
await Model.create({ name: 'Azerbaiyán' });
await Model.create({ name: 'Bahamas' });
await Model.create({ name: 'Bangladés' });
await Model.create({ name: 'Barbados' });
await Model.create({ name: 'Baréin' });
await Model.create({ name: 'Bélgica' });
await Model.create({ name: 'Belice' });
await Model.create({ name: 'Benín' });
await Model.create({ name: 'Bielorrusia' });
await Model.create({ name: 'Birmania' });
await Model.create({ name: 'Bosnia y Herzegovina' });
await Model.create({ name: 'Botsuana' });
await Model.create({ name: 'Brasil' });
await Model.create({ name: 'Brunéi' });
await Model.create({ name: 'Bulgaria' });
await Model.create({ name: 'Burkina Faso' });
await Model.create({ name: 'Burundi' });
await Model.create({ name: 'Bután' });
await Model.create({ name: 'Cabo Verde' });
await Model.create({ name: 'Camboya' });
await Model.create({ name: 'Camerún' });
await Model.create({ name: 'Canadá' });
await Model.create({ name: 'Catar' });
await Model.create({ name: 'Chad' });
await Model.create({ name: 'Chile' });
await Model.create({ name: 'China' });
await Model.create({ name: 'Chipre' });
await Model.create({ name: 'Ciudad del Vaticano' });
await Model.create({ name: 'Colombia' });
await Model.create({ name: 'Comoras' });
await Model.create({ name: 'Corea del Norte' });
await Model.create({ name: 'Corea del Sur' });
await Model.create({ name: 'Costa de Marfil' });
await Model.create({ name: 'Costa Rica' });
await Model.create({ name: 'Croacia' });
await Model.create({ name: 'Cuba' });
await Model.create({ name: 'Dinamarca' });
await Model.create({ name: 'Dominica' });
await Model.create({ name: 'Ecuador' });
await Model.create({ name: 'Egipto' });
await Model.create({ name: 'El Salvador' });
await Model.create({ name: 'Emiratos Árabes Unidos' });
await Model.create({ name: 'Eritrea' });
await Model.create({ name: 'Eslovaquia' });
await Model.create({ name: 'Eslovenia' });
await Model.create({ name: 'España' });
await Model.create({ name: 'Estados Unidos' });
await Model.create({ name: 'Estonia' });
await Model.create({ name: 'Etiopía' });
await Model.create({ name: 'Filipinas' });
await Model.create({ name: 'Finlandia' });
await Model.create({ name: 'Fiyi' });
await Model.create({ name: 'Francia' });
await Model.create({ name: 'Gabón' });
await Model.create({ name: 'Gambia' });
await Model.create({ name: 'Georgia' });
await Model.create({ name: 'Ghana' });
await Model.create({ name: 'Granada' });
await Model.create({ name: 'Grecia' });
await Model.create({ name: 'Guatemala' });
await Model.create({ name: 'Guinea ecuatorial' });
await Model.create({ name: 'Guinea' });
await Model.create({ name: 'Guinea-Bisáu' });
await Model.create({ name: 'Guyana' });
await Model.create({ name: 'Haití' });
await Model.create({ name: 'Honduras' });
await Model.create({ name: 'Hungría' });
await Model.create({ name: 'India' });
await Model.create({ name: 'Indonesia' });
await Model.create({ name: 'Irak' });
await Model.create({ name: 'Irán' });
await Model.create({ name: 'Irlanda' });
await Model.create({ name: 'Islandia' });
await Model.create({ name: 'Islas Marshall' });
await Model.create({ name: 'Islas Salomón' });
await Model.create({ name: 'Israel' });
await Model.create({ name: 'Italia' });
await Model.create({ name: 'Jamaica' });
await Model.create({ name: 'Japón' });
await Model.create({ name: 'Jordania' });
await Model.create({ name: 'Kazajistán' });
await Model.create({ name: 'Kenia' });
await Model.create({ name: 'Kirguistán' });
await Model.create({ name: 'Kiribati' });
await Model.create({ name: 'Kuwait' });
await Model.create({ name: 'Laos' });
await Model.create({ name: 'Lesoto' });
await Model.create({ name: 'Letonia' });
await Model.create({ name: 'Líbano' });
await Model.create({ name: 'Liberia' });
await Model.create({ name: 'Libia' });
await Model.create({ name: 'Liechtenstein' });
await Model.create({ name: 'Lituania' });
await Model.create({ name: 'Luxemburgo' });
await Model.create({ name: 'Madagascar' });
await Model.create({ name: 'Malasia' });
await Model.create({ name: 'Malaui' });
await Model.create({ name: 'Maldivas' });
await Model.create({ name: 'Malí' });
await Model.create({ name: 'Malta' });
await Model.create({ name: 'Marruecos' });
await Model.create({ name: 'Mauricio' });
await Model.create({ name: 'Mauritania' });
await Model.create({ name: 'México' });
await Model.create({ name: 'Micronesia' });
await Model.create({ name: 'Moldavia' });
await Model.create({ name: 'Mónaco' });
await Model.create({ name: 'Mongolia' });
await Model.create({ name: 'Montenegro' });
await Model.create({ name: 'Mozambique' });
await Model.create({ name: 'Namibia' });
await Model.create({ name: 'Nauru' });
await Model.create({ name: 'Nepal' });
await Model.create({ name: 'Nicaragua' });
await Model.create({ name: 'Níger' });
await Model.create({ name: 'Nigeria' });
await Model.create({ name: 'Noruega' });
await Model.create({ name: 'Nueva Zelanda' });
await Model.create({ name: 'Omán' });
await Model.create({ name: 'Países Bajos' });
await Model.create({ name: 'Pakistán' });
await Model.create({ name: 'Palaos' });
await Model.create({ name: 'Panamá' });
await Model.create({ name: 'Papúa Nueva Guinea' });
await Model.create({ name: 'Paraguay' });
await Model.create({ name: 'Perú' });
await Model.create({ name: 'Polonia' });
await Model.create({ name: 'Portugal' });
await Model.create({ name: 'Reino Unido' });
await Model.create({ name: 'República Centroafricana' });
await Model.create({ name: 'República Checa' });
await Model.create({ name: 'República de Macedonia' });
await Model.create({ name: 'República del Congo' });
await Model.create({ name: 'República Democrática del Congo' });
await Model.create({ name: 'República Dominicana' });
await Model.create({ name: 'República Sudafricana' });
await Model.create({ name: 'Ruanda' });
await Model.create({ name: 'Rumanía' });
await Model.create({ name: 'Rusia' });
await Model.create({ name: 'Samoa' });
await Model.create({ name: 'San Cristóbal y Nieves' });
await Model.create({ name: 'San Marino' });
await Model.create({ name: 'San Vicente y las Granadinas' });
await Model.create({ name: 'Santa Lucía' });
await Model.create({ name: 'Santo Tomé y Príncipe' });
await Model.create({ name: 'Senegal' });
await Model.create({ name: 'Serbia' });
await Model.create({ name: 'Seychelles' });
await Model.create({ name: 'Sierra Leona' });
await Model.create({ name: 'Singapur' });
await Model.create({ name: 'Siria' });
await Model.create({ name: 'Somalia' });
await Model.create({ name: 'Sri Lanka' });
await Model.create({ name: 'Suazilandia' });
await Model.create({ name: 'Sudán del Sur' });
await Model.create({ name: 'Sudán' });
await Model.create({ name: 'Suecia' });
await Model.create({ name: 'Suiza' });
await Model.create({ name: 'Surinam' });
await Model.create({ name: 'Tailandia' });
await Model.create({ name: 'Tanzania' });
await Model.create({ name: 'Tayikistán' });
await Model.create({ name: 'Timor Oriental' });
await Model.create({ name: 'Togo' });
await Model.create({ name: 'Tonga' });
await Model.create({ name: 'Trinidad y Tobago' });
await Model.create({ name: 'Túnez' });
await Model.create({ name: 'Turkmenistán' });
await Model.create({ name: 'Turquía' });
await Model.create({ name: 'Tuvalu' });
await Model.create({ name: 'Ucrania' });
await Model.create({ name: 'Uganda' });
await Model.create({ name: 'Uruguay' });
await Model.create({ name: 'Uzbekistán' });
await Model.create({ name: 'Vanuatu' });
await Model.create({ name: 'Venezuela' });
await Model.create({ name: 'Vietnam' });
await Model.create({ name: 'Yemen' });
await Model.create({ name: 'Yibuti' });
await Model.create({ name: 'Zambia' });
await Model.create({ name: 'Zimbabue' });
}
