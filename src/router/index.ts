import exress from 'express'
import authentication from "./authentication" 
import users from "./users" 
const  router = exress.Router()

export default ():exress.Router =>{
    authentication(router);
    users(router);
    return router
}