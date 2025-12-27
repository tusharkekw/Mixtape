import { Router } from "express";
import prisma from "../lib/prisma";
import { processConversionLogic } from "../services/conversion/conversion-service";
import { updateConversionJobStatus } from "../utils/prismaUtils";
import { verifyCloudTaskRequest } from "../utils/security";

const router = Router();

router.post("/process", async (req, res) => {
  const isAuthorized = await verifyCloudTaskRequest(req.headers.authorization);
  const isDev = process.env.NODE_ENV === "development";

  // Allow bypass in dev mode if needed, otherwise enforce
  if (!isAuthorized && !isDev) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  const { jobId } = req.body;

  if (!jobId) {
    return res.status(500).json({ success: false, error: "missing job id" });
  }

  console.log(jobId);

  const transferJob = await prisma.conversionJob.findFirst({
    where: {
      id: jobId,
    },
  });

  if (!transferJob) {
    return res.status(500).json({ error: "Job not found" });
  }

  try {
    await processConversionLogic(transferJob);
  } catch (error) {
    console.log("Worker Failed", error);
    return res.status(500).json({ error: "worker failed" });
  }

  await updateConversionJobStatus(jobId);

  return res.json({ success: true, message: "Updated successfully" });
});

export default router;
