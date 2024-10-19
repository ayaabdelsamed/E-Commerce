import { globalError } from "../middleware/globalError.js"
import categoryRouter from "./category/category.routes.js"


export const bootstrap=(app)=>{
    app.use('/api/v1',categoryRouter)
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use(globalError)
}