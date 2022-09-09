import { Router } from "express";
import controller from "../controller";

const router = Router();

router.post("/registration", controller.registration.bind(controller));
router.post("/login", controller.login.bind(controller));
router.post("/logout", controller.logout.bind(controller));
router.post("/refresh", controller.refresh.bind(controller));

export default router;