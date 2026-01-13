const cron = require("node-cron");
const { updateSilverRate } = require("./silverService");

// 6 AM & 6 PM IST
cron.schedule(
  "0 6,18 * * *",
  async () => {
    console.log(" Running silver cron");
    await updateSilverRate();
  },
  {
    timezone: "Asia/Kolkata",
  }
);

// Optional: run once when server starts
updateSilverRate();
