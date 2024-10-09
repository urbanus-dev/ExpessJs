import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Response, Request } from "express";
import { getXataClient } from "./src/xata";

const xata = getXataClient();
const app: Express = express();
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send("Express server is running");
});

app.get("/api/v2/events", async (req: Request, res: Response) => {
    try {
        const events = await xata.db.users.getAll();
        res.status(200).json({
            message: "Events found",
            data: events,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//post method
app.post("/api/v2/events", async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const latestEvent = await xata.db.users.sort('ID', 'desc').getFirst();
        const newId = latestEvent ? latestEvent.ID + 1 : 1;
        const newEvent = await xata.db.users.create({ ...body, ID: newId });

        res.status(201).json({
            message: "Event created",
            payload: newEvent,
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Internal Server Error" });
    }
});

   // PATCH request
app.patch("/api/v2/events/:id", async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            res.status(400).json({ message: "Invalid ID" });
        } else {
            // Find the event by ID
            const events = await xata.db.users.filter({ ID: parsedId }).getAll();
            const event = events[0];
            if (!event) {
                res.status(404).json({ message: "Event not found" });
            } else {
                // Update the event
                const updatedEvent = await xata.db.users.update(event.xata_id, body);
                res.status(200).json({
                    message: "Event updated",
                    payload: updatedEvent,
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// DELETE request
app.delete("/api/v2/events/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            res.status(400).json({ message: "Invalid ID" });
        } else {
            // Find the event by ID
            const events = await xata.db.users.filter({ ID: parsedId }).getAll();
            const event = events[0];
            if (!event) {
                res.status(404).json({ message: "Event not found" });
            } else {
                // Delete the event
                await xata.db.users.delete(event.xata_id);
                res.status(200).json({ message: "Event deleted" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//put method
app.put("/api/v2/events/:id", async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            res.status(400).json({ message: "Invalid ID" });
        } else {
            // Find the event by ID
            const events = await xata.db.users.filter({ ID: parsedId }).getAll();
            const event = events[0];
            if (!event) {
                res.status(404).json({ message: "Event not found" });
            } else {
                // Update the event
                const updatedEvent = await xata.db.users.update(event.xata_id, body);
                res.status(200).json({
                    message: "Event updated",
                    payload: updatedEvent,
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

