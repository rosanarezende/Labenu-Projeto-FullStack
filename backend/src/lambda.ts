import app from "./index";
import { createLambdaHandler } from "lbn-lambda-express";

export const handler = createLambdaHandler(app);