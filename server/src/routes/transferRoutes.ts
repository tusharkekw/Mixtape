import { Router } from "express";
import { randomUUID } from "node:crypto";
import prisma from "../lib/prisma";
import { createConversionTask } from "../lib/cloudTasks";
import { TransferPayloadSchema } from "../utils/validation";
import { ensureAuthenticated } from "../auth/middleware";

const router = Router();

router.post("/start", ensureAuthenticated, async (req, res) => {
  const validationResult = TransferPayloadSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid payload",
      details: validationResult.error.format(),
    });
  }

  const { data } = validationResult;

  try {
    const job = await prisma.conversionJob.create({
      data: {
        userId: (req.user as any).id,
        progress: 0,
        status: "PENDING",
        data: data as any, // Prisma expects JSON, casting for simplicity
      },
    });

    await createConversionTask(job.id);

    return res.json({ success: true, data: { jobId: job.id } });
  } catch (error) {
    console.log("failed to create job", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

router.get("/progress/:jobId", ensureAuthenticated, async (req, res) => {
  const { jobId } = req.params;
  const userId = (req.user as any).id;

  try {
    const job = await prisma.conversionJob.findFirst({
      where: {
        id: jobId,
        userId: userId,
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        error: "Job not found or unauthorized",
      });
    }

    return res.json({
      success: true,
      data: {
        jobId: job.id,
        progress: job.progress,
        isJobCompleted: job.status === "COMPLETED",
        responseJobData: job.resultData,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

export default router;

