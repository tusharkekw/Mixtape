import { Router } from "express";
import { randomUUID } from "node:crypto";
import prisma from "../lib/prisma";
import { createConversionTask } from "../lib/cloudTasks";

const router = Router();

router.post("/start", async (req, res) => {
  const {} = req.body;
  //TODO validate/sanitize the data
  console.log("converting playlist");
  console.log("successfully converted playlist");

  try {
    const job = await prisma.conversionJob.create({
      data: {
        userId: (req?.user as any)?.id,
        progress: 0,
        status: "PENDING",
        data: req.body,
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

router.get("/progress/:jobId", async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await prisma.conversionJob.findFirst({
      where: {
        id: jobId,
      },
    });

    return res.json({
      success: true,
      data: {
        jobId: job?.id,
        progress: job?.progress,
        isJobCompleted: job?.status === "COMPLETED",
        responseJobData: job?.resultData,
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
