import { Router } from "express";

const router = Router();

router.post("/convert", (req, res) => {
  console.log("converting playlist");
  console.log("successfully converted playlist");

  console.log(req.body);
  return;
});
