const applyPagination = (LIMIT:number,page:number,count:number) =>{
    let metadata = { items:LIMIT,
        totalItems: count,
        page:page}

        if(count === 0) return {msg:'no-data',metadata,error:null}      
        const pages = Math.ceil(count / LIMIT)
        metadata['TotalPages'] = pages
        if(page > pages) return {msg:'no-page',metadata}
        if(count < LIMIT) return {msg:'less-limit',metadata}
        const limit = LIMIT;
        const skip = LIMIT * (page - 1);
        return {data:'data',metadata,skip,limit};
}

module.exports = {
    applyPagination
  }