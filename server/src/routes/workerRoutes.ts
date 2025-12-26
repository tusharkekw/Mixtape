import { Router } from "express";

const router = Router();

router.post("/process", async (req, res) => {
  console.log(req.body);
  return res.json({ msg: "success" });
});

export default router;
