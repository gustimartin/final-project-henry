const Roles = require('../models/Roles')

const createRoles = async () => {

    try{

    const count = await Roles.estimatedDocumentCount()

    if (count > 0){
        return
    }else{
        const value = await Promise.all([
            new Roles({
                name: 'admin'
            }).save(),

            new Roles({
                name: 'user'
            }).save()
        ])
    }

    console.log(value)

}catch(error){
    console.log(error.message)
}

}


module.exports = {
    createRoles,
}