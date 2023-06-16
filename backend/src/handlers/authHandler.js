const Users = require('../models/Users')
const Roles = require('../models/Roles');

const authHandler = async (req, res) => {
    const { username , roles } = req.body;
    try {
        const allRoles = await Roles.find()
        const oneUser = await Users.findOne({username: username})
        if (oneUser) return res.status(200).json(oneUser)
        if (!roles) {
            const newUser = new Users({
                username,
                roles: [allRoles[1]]
            })
            await newUser.save()
            res.status(200).json(newUser)
        } else {
            const newUser = new Users({
                username,
                roles: [allRoles[0]]
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};

const getUser = async (req, res) => {
    try {
        const allUsers = await Users.find()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const enableUsers = async (req, res) => {
    const { enable } = req.body;
    const { id } = req.params;
    try {
      const findUser = await Users.updateOne(
        { _id: id }, 
        { $set: { enable: enable } } 
      );

      

      res.status(200).json(findUser);

    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  const getEnable = async(req, res) => {

    try{

    const {email} = req.query

    const user = await Users.findOne({ username: email });

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

    const enable = user.enable

    res.status(200).json(enable);

    }catch(error){
        res.status(500).json({ error: 'Error en el servidor' });
    }







  }
  

module.exports = {
    authHandler,
    getUser,
    enableUsers,
    getEnable
};
  


