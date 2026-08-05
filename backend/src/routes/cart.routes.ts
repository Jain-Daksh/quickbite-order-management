import { Router } from "express";

import { CartController } from "../controllers/cart.controller";


const router = Router();


export default (app: Router) => {

  router.post(
    "/",
    CartController.getCart
  );

  app.use("/api/cart", router);
};