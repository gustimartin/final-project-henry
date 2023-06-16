const {createPublications} = require('../controllers/publicationsController')
const {getAllPublications} = require('../controllers/publicationsController')

const createPublicationsHandler = async (req, res) => {
    const { description, score} = req.body;
  
    try {
      
  
      const newPublications = await createPublications(
      
        description,
        score
       
      );
  
      res.status(201).json(newPublications);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  const getPublicationsHandler = async(req, res) => {

    try{

    const publications = await getAllPublications()

    res.status(200).json(publications)

    }catch(error){

        res.status(400).json({error: error.message})
    }

}
  

module.exports = {
    createPublicationsHandler,
    getPublicationsHandler
}