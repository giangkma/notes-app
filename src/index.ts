import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { isAuth } from './middlewares/auth';
import authRoute from './routes/auth.routes';
import taskRoute from './routes/task.routes';
import descriptionRoute from './routes/description.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

mongoose
    .connect(process.env.DB_MONGO)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(`/api/auth`, authRoute);
app.use(`/api/task`, taskRoute);
app.use(`/api/description`, descriptionRoute);

app.use(isAuth);

app.get('/', (req, res) => {
    res.send(`Listening on port ${port}`);
});

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
server.timeout = 3000;
