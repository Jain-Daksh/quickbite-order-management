import { Router } from "express";

import { MenuController } from "../controllers/menu.controller";


const router = Router();


export default (app: Router) => {

  router.get(
    "/",
    MenuController.getAllMenu
  );


  router.get(
    "/:id",
    MenuController.getMenuById
  );


  router.get(
    "/category/:category",
    MenuController.getMenuByCategory
  );


  app.use("/api/menu", router);
};