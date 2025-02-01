import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { globalError } from "./src/middleware/globalError.js";
import { bootstrap } from "./src/modules/bootstrap.js";
import { AppError } from "./src/utils/appError.js";
import multer from "multer";

const app = express();
const port = 3000;
app.use(express.json());
app.use('/uploads',express.static('uploads'))
bootstrap(app);

app.use("*", (req, res, next) => {
    next(new AppError(`route not found: ${req.originalUrl}`, 404));
});

app.use(globalError);
dbConnection();
const upload = multer({dest: 'uploads/'});

// app.post('/photos',upload.single('photo'),(req,res,next)=>{
//     console.log(req.file);
//     console.log(req.body);
//     res.json({message:'success'})
// })
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
