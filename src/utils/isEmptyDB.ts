
export const IsEmptyDB = async(Model):Promise<boolean>=>{
    const count = await Model.countDocuments().exec()
    return count === 0;
}
