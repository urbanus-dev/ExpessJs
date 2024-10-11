import { NextFunction, Response, Request } from "express";
import { getXataClient } from "../../src/xata";

type EventData = {
  eventID: number;
  Company: string;
  Date: string;
  Location: string;
  Price: string;
  Title: string;
  imageUrl: string;
};

// extend Request Object to include eventFoundIndex
interface CustomRequest extends Request {
  eventFoundIndex?: number;
  parsedId?: number;
}

const xata = getXataClient();

const resolveEventByIndex = () => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const {
      params: { id },
    } = req;
    const parsedID: number = parseInt(id);

    if (isNaN(parsedID)) {
      res.status(400).json({
        message: "ID not a number",
      });
    } else {
      try {
        // Fetch the event from the database
        const events = await xata.db.users.filter({ ID: parsedID }).getAll();
        const event = events[0];

        if (!event) {
          res.status(404).json({
            message: "Event unavailable",
          });
        } else {
          // Bind the foundIndex into the request
          req.eventFoundIndex = parsedID;
          req.parsedId = parsedID;
          next(); // passes the function to the next middleware
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
};

export { resolveEventByIndex, CustomRequest, EventData };