
/**
 * Function to handle pagination logic
 * @param {number} totalItems Total number of items
 * @param {number} currentPage Current page number
 * @param {number} limit Number of items per page
 * @returns {object} Pagination metadata
 */
const paginate = (totalItems, currentPage, limit) => {
    const totalPages = Math.ceil(totalItems / limit);
    const offset = limit * (currentPage - 1);
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;
  
    return {
      currentPage,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      offset,
      limit,
    };
  };

module.exports = {
    paginate
  }