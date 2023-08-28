 const CategoriesServices = require('../services/categories')
 
 /**
 *Login user
 * @param req Express Request
 * @param res Express Response
 */
 const getCategoriesController= async (req, res) => {

    const response = await CategoriesServices.getCategories()
    if(response.error === null){ 
        return res.status(200).send(response)
    } 
    return res.status(400).send(response)
  }

  module.exports = {
    getCategoriesController
}