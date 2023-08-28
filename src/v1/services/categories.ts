const ModelCategories = require('../database/models/categories')

/**
 * Get Categories
 */
const getCategories = async () => {
    const categories = await ModelCategories.find()
    if(categories) return {error:null,data:categories}
    return {error:'No hay cateegorias',data:null}
  }

  module.exports= {
    getCategories
}