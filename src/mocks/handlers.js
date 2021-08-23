import { rest } from "msw";
import devices from "./devices.json";

const delay = 5000;

export const handlers = [
  rest.get("/api/devices", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(delay), ctx.json(devices));
  })
];
