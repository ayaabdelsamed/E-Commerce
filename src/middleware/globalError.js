

export const globalError = (err,req,res,next)=>{
    let code = err.statuscode || 500
    if(process.env.Mode == 'development')
        res.status(err.statusCode).json({error:"error",message : err.message,code, stack:err.stack})
    else
        res.status(err.statusCode).json({error:"error",message})
}