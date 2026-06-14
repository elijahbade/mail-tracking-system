import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors'; //Cross-Origin Resourse Sharing
import morgan from 'morgan';
import bodyParser from 'body-parser'; //for parsing req.body json data
import busboy from "connect-busboy";
import cookieParser from 'cookie-parser'; //for parisng the cookie string
import 'dotenv/config'
// ======== My defined Error Handlers Middleware Functions: ====================
import { myErrorHandler } from "./middlewares/errorHandlers"
import colors from "colors"; //for coloring the console (terminal)
import filesConfig from "./config/attachment";
// ------------------------- Socket.io -------------------------
import { initSocket } from "./socket";
// ------------------------- Background jobs -------------------------
import { startOverdueJob } from "./jobs/overdueJob";


const app: Application = express();

// Parsing Requests 
const port: number | string = process.env.PORT || 5000;
// ---------------- Regarding FileUpload: --------------------------
import fileUpload from "express-fileupload";
import path from "path";

// FileUpload package acts as a middleware inside ypu application, and parses the files inside req.files
app.use(fileUpload({
    useTempFiles: true, //Instead of keeping the uploaded files in the memory, we will keep the uploaded files inside the 'tmp' directory until they are transferred to their final destination (ex: public/uploads)
    tempFileDir: path.join(__dirname, "../", "tmp"),
    createParentPath: true, //Automatically creates the directory path specified in .mv(filePathName) if it is not created
    limits: { fileSize: filesConfig.MAX_UPLOAD_SIZE },
    // abortOnLimit: false, //Returns a HTTP 413 when the file is bigger than the size limit if true. Otherwise, it will add a truncated = true to the resulting file structure. (default is false)
    // responseOnLimit: `File size limit (${maxFileSize}) has been reached.`,
    // limitHandler: function(req, res, next) {
    //     res.json({
    //         message: `File size limit (${maxFileSize}) has been reached.`,
    //         status: 413,
    //     });
    // }
}));

app.use(busboy());
app.use(bodyParser.urlencoded({ extended: true })); // to decode data sent through html form
app.use(bodyParser.json()); //to decode data which sent as a JSON format
/*
    Built-in middleware functions in Express:
    _________________________________________
    1. urlencoded(): parses incoming requests with urlencoded payloads and is based on body-parser.

    2. bodyParser.json(): parses incoming requests with JSON payloads and is based on body-parser.

    Make sure urlencoded() comes before .json(), bcoz it first encodes the url, then converts it to JSON
*/
app.use("/static", express.static(path.join(__dirname, "../public"))); //to serve our `public` folder as the static folder.
// ex: http://localhost:5000/static/actions_attachments/22_24_1649886860601.pdf

app.use(cookieParser()); //for parisng the cookie string for all requests
app.use(morgan('dev')); //create new morgan logger middleware function
app.use(cors({
    origin: 'http://localhost:3000',
    // methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
})); // Cross-Origin Resource Sharing


import db from './models/index'; // our database connection object
const { models } = db.sequelize;
import config from './config/config.js'; //our database config file


// ====== IMPORT INDEX ROUTE =====
import indexRoute from './routes/index'; //the main route that leads to sub-routes
// ====== ROUTING =====
app.use('/api/v1', indexRoute);





// ==== SEEDERS ====
// import { users } from './seeders/users'; //List of users' records
// import { positionsList } from './seeders/Positions';
// import { jobTitlesList } from './seeders/JobTitles';
// import { classificationsList } from './seeders/Classifications';
// import { positionsJobTitlesList } from './seeders/Positions_JobTitles';
import { consigneesGroups } from './seeders/Consignees_Group';
import { consigneesGroupsMembers } from './seeders/Consignees_Group_Member';


// const createPositions = () => {
//     positionsList.map(pos => {
//         models.Position.create(pos)
//             .then((result: any) => console.log(result))
//             .catch((error: any) => console.log(error))
//     })
// }
// const createJobTitles = () => {
//     jobTitlesList.map((jobtitle: any) => {
//         models.JobTitle.create(jobtitle)
//             .then((result: any) => console.log(result))
//             .catch((error: any) => console.log(error))
//     })
// }
// const createClassifications = () => {
//     classificationsList.map((classf: any) => {
//         db.Classification.create(classf)
//             .then((result: any) => console.log(result))
//             .catch((error: any) => console.log(error))
//     })
// }
// const populateJunctionTable = () => {
//     positionsJobTitlesList.map((item: any) => {
//         db.Position_JobTitle.create(item)
//             .then((result: any) => console.log(result))
//             .catch((error: any) => console.log(error))
//     })
// }

const createConsigneesGroups = () => {
    consigneesGroups.map(group => {
        models.Consignees_Group.create(group)
            .then((result: any) => console.log(result))
            .catch((error: any) => console.log(error))
    })
}
const createConsigneesGroupsMembers = () => {
    consigneesGroupsMembers.map(groupMember => {
        models.Consignees_Group_Member.create(groupMember)
            .then((result: any) => console.log(result))
            .catch((error: any) => console.log(error))
    })
}

/*
.sync({ force: true })
{ force: true }: This option force Sequelize to create a table, dropping it first if it already existed
*/
db.sequelize
    .sync()
    .then(() => {
        const server = app.listen(port, () => {
            // A node http.Server is returned and stored in `const server = `
            console.log(colors.bgYellow.black(`Server running on port ${port}`));
            console.log(colors.bgGreen.black(`connected to Database: ${config.development.database}`));

            // Initialise the shared Socket.io server (chat + mail notifications).
            // The instance is reachable elsewhere via getIO() from ./socket.
            const io = initSocket(server);
            app.set("io", io);

            // Start the background job that scans for overdue mail and alerts recipients.
            startOverdueJob();
        });
    })
    .catch((err: any) => {
        console.log(err);
    })
// The above sequelize method means that before you run the server, go
// to the models folder where we store our tables (models), and check if all tables
// exist in the db, and if not exist, create them then run the server.
// But how does Node know which database we are adding these tables to?
// Answer: in the config/config.json, we write the database name


// ======== My defined Error Handlers Middleware Functions: ====================
// app.use(errorLogger);
// app.use(errorResponder);
// app.use(failSafeHandler);
app.use(myErrorHandler); //Now in catch blocks when I want I can pass the error to this middleware error handler function, by writing: next(error)
