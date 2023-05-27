import  express, { Application, Request, Response, NextFunction, Router } from 'express';
import apiRoutes from '../routes';
import cors from 'cors';
class ExpressApp {
    public app: Application;
    private static instance: ExpressApp;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.errorHandlers();
    }

    public static getInstance():ExpressApp {
        if (!this.instance) {
            this.instance = new ExpressApp();
        }
        return this.instance;
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors())
    }

    private routes(): void {
        // Add routes here
        this.app.use('/api', apiRoutes());
        this.app.get('/', (req, res) => {
            res.send('Server is Working 🚀🚀🚀');
        });
    }

    private errorHandlers(): void {
        // Global error handler
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });

        // 404 error handler
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).send('Sorry, api not found!');
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }


    public createRouter(): Router {
        return express.Router();
    }
}

export default ExpressApp;