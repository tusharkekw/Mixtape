import prisma from "../lib/prisma";

export const updateJobProgress = async (jobId: string, progress: number) => {
  await prisma.conversionJob.update({
    where: {
      id: jobId,
    },
    data: {
      progress,
    },
  });
};

export const updateConversionJobStatus = async (jobId: string) => {
  await prisma.conversionJob.update({
    where: {
      id: jobId,
    },
    data: {
      status: "PROCESSING",
    },
  });
};
