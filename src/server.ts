import app from "./config/app";
import config from "./config";
import { StartEmailCron } from "./utils/CronJobs/Email";

const port = config.app.port;

// StartEmailCron();

app.listen(port, () => {
  console.log(`PORT IS ACTIVE AT ${port}`);
});
