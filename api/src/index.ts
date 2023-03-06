import express, {Request, Response,} from 'express';
import bodyParser from 'body-parser';
import {absences, members} from "./api";

const app = express();
app.use(bodyParser.json());

app.get('/api/members',async (req: Request, res: Response) => {
    try {
        const data = await members();
        res.status(200).send({
            data,
            message: "Members returned"
        });
    }
    catch (e: unknown) {
        const error = e as { message?: string; status?: number };
        const errorMessage = error?.message ?? 'Error getting members';
        const statusCode = error?.status ?? 500;
        res.status(statusCode).send({
            error: e,
            message: errorMessage
        });
    }
});

app.get('/api/absences', async (req: Request, res: Response) => {
    try {
        const data = await absences();
        res.status(200).send({
            data,
            message: "Absences returned"
        })
    }
    catch (e: unknown) {
        const error = e as { message?: string; status?: number };
        const errorMessage = error?.message ?? 'Error getting absences';
        const statusCode = error?.status ?? 500;
        res.status(statusCode).send({
            error: e,
            message: errorMessage
        });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});