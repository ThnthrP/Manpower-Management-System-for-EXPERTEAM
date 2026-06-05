import express from "express";

import {
  getContracts,
  getPositions,
  getRequirements,
} from "../controllers/trainingMatrix.controller.js";

const router = express.Router();

router.get("/contracts", getContracts);

router.get("/positions/:contractId", getPositions);

router.get("/requirements", getRequirements);

export default router;
