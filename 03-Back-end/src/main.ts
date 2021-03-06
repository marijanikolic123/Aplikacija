import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import Router from './router';
import CategoryRouter from './components/category/router';
import CategoryService from './components/category/service';
import IApplicationResources from './common/IApplicationResources.interface';
import * as mysql2 from "mysql2/promise";
import FeatureService from "./components/feature/service";
import FeatureRouter from "./components/feature/router";
import ArticleService from "./components/article/service";
import ArticleRouter from "./components/article/router";
import fileUpload = require("express-fileupload");
import AdministratorService from "./components/administrator/service";
import AdministratorRouter from "./components/administrator/router";
import UserRouter from './components/user/router';
import UserService from "./components/user/service";
import AuthRouter from './components/auth/router';

async function main() {
    const application: express.Application = express();

    application.use(cors({
        origin: "http://localhost:3000",
        credential: true,
    }));

    application.use(express.json());

    application.use(fileUpload({
        limits: {
            fileSize: Config.fileUpload.maxSize,
            files: Config.fileUpload.maxFiles,
        },
        useTempFiles: true,
        tempFileDir: Config.fileUpload.temporaryDirectory,
        uploadTimeout: Config.fileUpload.timeout,
        safeFileNames: true,
        preserveExtension: true,
        createParentPath: true,
        abortOnLimit: true,
    }));
    
    const resources: IApplicationResources = {
        databaseConnection: await mysql2.createConnection({
            host: Config.database.host,
            port: Config.database.port,
            user: Config.database.user,
            password: Config.database.password,
            database: Config.database.database,
            charset: Config.database.charset,
            timezone: Config.database.timezone,
            supportBigNumbers: true,
        }),
    }

    resources.databaseConnection.connect();

    resources.services = {
        categoryService: new CategoryService(resources),
        featureService: new FeatureService(resources),
        articleService: new ArticleService(resources),
        administratorService: new AdministratorService(resources),
        userService: new UserService(resources),
    };

    application.use(
        Config.server.static.route,
        express.static(Config.server.static.path, {
            index: Config.server.static.index,
            cacheControl: Config.server.static.cacheControl,
            maxAge: Config.server.static.maxAge,
            etag: Config.server.static.etag,
            dotfiles: Config.server.static.dotfiles,
        }),
    );

    Router.setupRoutes(application, resources, [
        new CategoryRouter(),
        new FeatureRouter(),
        new ArticleRouter(),
        new AdministratorRouter(),
        new UserRouter(),
        new AuthRouter(),
        // ...
    ]);

    application.use((req, res) => {
        res.sendStatus(404);
    });

    application.use((err, req, res, next) => {
        res.status(err.status).send(err.type);
    });

    application.listen(Config.server.port);
} main();