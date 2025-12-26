import { CloudTasksClient } from "@google-cloud/tasks";

const client = new CloudTasksClient();

const PROJECT = process.env.GCP_PROJECT_ID;
const QUEUE = "mixtapequeue";
const LOCATION = process.env.GCP_LOCATION || "us-central1";
const SERVICE_ACCOUNT_EMAIL = process.env.GCP_SERVICE_ACCOUNT_EMAIL;

const BACKEND_URL = process.env.BACKEND_URL;

export const createConversionTask = async (jobId: string) => {
  const parent = client.queuePath(PROJECT!, LOCATION, QUEUE);

  const url = `${BACKEND_URL}/worker/process`;

  const task = {
    httpRequest: {
      httpMethod: "POST" as const,
      url,
      body: Buffer.from(JSON.stringify({ jobId })).toString("base64"),
      headers: {
        "Content-Type": "application/json",
      },
      // Security: Google will sign the request so you know it's not a hacker
      oidcToken: {
        serviceAccountEmail: SERVICE_ACCOUNT_EMAIL,
      },
    },
  };

  const [response] = await client.createTask({ parent, task });
  console.log(`Created task ${response.name}`);
};
