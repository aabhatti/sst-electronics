const serverUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : process.env.MODE === "production"
  ? "https://sst-electronics-git-master-aabhattis-projects.vercel.app/api"
  : "http://localhost:3007/api";

export { serverUrl };
