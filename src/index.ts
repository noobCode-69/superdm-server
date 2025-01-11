import express, { Request, Response } from 'express';
import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser';
import envs from './configs/envs';
import tasksRouter from './routes/tasks';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: envs.FRONTEND_URL,
}));

app.use('/tasks', tasksRouter);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is running" });
    return;
})


app.listen(envs.PORT, () => {
    console.log(`Server running at http://localhost:${envs.PORT}`);
});
