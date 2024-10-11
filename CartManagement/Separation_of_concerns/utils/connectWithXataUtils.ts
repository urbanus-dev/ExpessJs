//connect wtih xata utils   
import { getXataClient } from "../../src/xata";
import { NextFunction, Response, Request } from "express";

const xata = getXataClient();