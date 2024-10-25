import express from "express";
import { IRouteSchema } from "../interface/interface";
import { DummyRoutes } from "../modules/dummy/dummy.route";

const router = express.Router();

const moduleRoutes: Array<IRouteSchema> = [
  {
    path: "/dummy",
    route: DummyRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
