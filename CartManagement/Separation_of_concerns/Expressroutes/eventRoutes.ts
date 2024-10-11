import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/v2/events', (req: Request, res: Response) => {
    const newEvent = {}; 
    res.status(201).json({
        message: "Event created",
        payload: newEvent,
    });
});

export default router;