export const isTime = (value:Array<{hora:string}>):boolean =>{
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
    return value.every((item)=>timeRegex.test(item.hora));
}