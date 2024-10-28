const serverUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : process.env.MODE === "production"
  ? "https://sst-electronics.vercel.app/api"
  : "http://localhost:3007/api";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const allowedAdmins = process.env.ADMINS?.split(",");

console.log(
  "serverUrl,googleClientId,googleClientSecret,githubClientId,githubClientSecret,allowedAdmins",
  serverUrl,
  googleClientId,
  googleClientSecret,
  githubClientId,
  githubClientSecret,
  allowedAdmins
);
export {
  serverUrl,
  googleClientId,
  googleClientSecret,
  githubClientId,
  githubClientSecret,
  allowedAdmins,
};
