import axios from "axios";
import prisma from "../../lib/prisma";

export const refreshAccessToken = async (providerId: string, provider: string, refreshToken: string) => {
  let accessToken, expiresIn;

  switch (provider) {
    case "google":
      ({ accessToken, expiresIn } = await refreshGoogleAccessToken(refreshToken));
      break;
    case "spotify":
      ({ accessToken, expiresIn } = await refreshSpotifyAccessToken(refreshToken));
      break;
  }

  if (accessToken && expiresIn) {
    await updateProvider(providerId, accessToken, new Date(Date.now() + expiresIn * 1000));
  }

  return accessToken;
};

const updateProvider = async (providerId: string, accessToken: string, expiresAt: any) => {
  await prisma.provider.update({
    where: {
      id: providerId,
    },
    data: {
      accessToken,
      expiresAt,
    },
  });
};

const refreshGoogleAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string; expiresIn: number }> => {
  const response = await axios.post("https://oauth2.googleapis.com/token", {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const { access_token, expires_in, id_token } = response.data;

  return { accessToken: access_token, expiresIn: expires_in };
};

const refreshSpotifyAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string; expiresIn: number }> => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { access_token, expires_in } = response.data;

  return { accessToken: access_token, expiresIn: expires_in };
};
