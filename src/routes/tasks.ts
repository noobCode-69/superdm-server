import { Router, Request, Response } from "express";
import { eq, sql, count } from 'drizzle-orm';
import { tasks } from '../db/schema';
import db from '../db';


const tasksRouter = Router();
const ITEMS_PER_PAGE = 15;


tasksRouter.get("/status-count", async (req: Request, res: Response) => {
    try {
        const results = await db
            .select({
                count: count(tasks.status),
                status: tasks.status,
            })
            .from(tasks)
            .groupBy(tasks.status);

        const formattedResults = results.reduce((acc, row) => {
            // @ts-ignore
            acc[row.status] = Number(row.count);
            return acc;
        }, {});


        res.json({ success: true, data: formattedResults });
        return

    } catch (error) {
        console.error("Error fetching task counts:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return
    }
});

tasksRouter.get("/get-assignee", async (req: Request, res: Response) => {
    try {
        const results = await db
            .select({
                assignee: tasks.assignee,
            })
            .from(tasks)
            .groupBy(tasks.assignee);


        res.json({ success: true, data: results });
        return;

    } catch (error) {
        console.error("Error fetching task counts:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return
    }
});

tasksRouter.post("/update-status", async (req: Request, res: Response) => {
    try {
        const { id, status, comment } = req.body;

        await db.update(tasks)
            .set({
                status,
                comment
            })
            .where(eq(tasks.id, id));

        res.json({ success: true });
        return

    } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return
    }
})


tasksRouter.post("/get", async (req: Request, res: Response) => {
    try {
        const { status, page } = req.body;
        const offset = (page - 1) * ITEMS_PER_PAGE;

        let query: any = db.select()
            .from(tasks)
            .limit(ITEMS_PER_PAGE)
            .offset(offset);

        if (status) {
            query = query.where(eq(tasks.status, status));
        }

        const tasksData = await query;

        const countQuery = db.select({
            count: sql<number>`count(*)`
        }).from(tasks);

        if (status) {
            countQuery.where(eq(tasks.status, status));
        }

        const [{ count }] = await countQuery;

        res.status(200).json({
            success: true,
            data: {
                tasks: tasksData,
                pagination: {
                    total: count,
                    hasMore: offset + ITEMS_PER_PAGE < count,
                    nextPage: offset + ITEMS_PER_PAGE < count ? page + 1 : null
                }
            }
        });
        return

    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch tasks'
        });
        return
    }
});



export default tasksRouter;