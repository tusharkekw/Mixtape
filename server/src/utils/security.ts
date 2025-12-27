import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

/**
 * Verifies that the request came from Google Cloud Tasks.
 * Checks the Authorization header for a valid OIDC token.
 */
export const verifyCloudTaskRequest = async (authHeader: string | undefined): Promise<boolean> => {
  if (!authHeader) return false;
  
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return false;
  const token = parts[1];

  try {
    const audience = `${process.env.BACKEND_URL}/worker/process`;

    await client.verifyIdToken({
      idToken: token,
      audience: audience,
    });
    
    return true;
  } catch (error) {
    console.error("Cloud Task token verification failed:", error);
    return false;
  }
};
