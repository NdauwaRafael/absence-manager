import express, {Request, Response,} from 'express';
import bodyParser from 'body-parser';
import {absences, members} from "./api";
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

app.get('/api/members', async (req: Request, res: Response) => {
    try {
        const data = await members();
        res.status(200).send({
            data,
            message: "Members returned"
        });
    } catch (e: unknown) {
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
        interface IFilter {
            startDate?: string; // optional string property for startDate
            endDate?: string; // optional string property for endDate
            type?: string; // optional array of string for types
        }

        const page = Number(req.query.page) || 1;
        const pageSize = Math.min(Number(req.query.pageSize) || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const data = await absences();
        const membersJson = await members();
        const membersMap = new Map(membersJson.map((member: any) => [member.userId, member]));

        const { startDate, endDate, type }: IFilter = req.query;
        const filtered = data.filter((d: any) => {
            if (startDate && new Date(d.startDate) < new Date(startDate)) return false;
            if (endDate && new Date(d.endDate) > new Date(endDate)) return false;
            if (type && d.type !== type) return false;
            return true;
        });
        filtered.forEach((absence: any) => {
            absence.member = membersMap.get(absence.userId);
        });

        res.status(200).send({
            data: filtered.slice(startIndex, endIndex),
            message: "Absences returned",
            pages: Math.ceil(filtered.length/pageSize)
        })
    } catch (e: unknown) {
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