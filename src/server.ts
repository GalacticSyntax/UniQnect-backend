import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { Server } from "http";

const { PORT, DB_CONNECTION_STRING } = config;

let server: Server;

(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log({ DB_CONNECTION_STRING });

    await mongoose.connect(DB_CONNECTION_STRING as string);
    
    // app.use("/api/teacher", TeacherRoutes); 
    // app.use("/api/dept", DepartmentRoutes); 

    server = app.listen(PORT, () =>
      // eslint-disable-next-line no-console
      console.log(`http://localhost:${PORT}/`),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
})();

process.on("unhandledRejection", (reason, promise) => {
  // eslint-disable-next-line no-console
  console.error("Unhandled Rejection at:", promise, "reason:", reason);

  if (server) return server?.close(() => process.exit(1));

  process.exit(1);
});

process.on("uncaughtException", () => {
  // eslint-disable-next-line no-console
  console.log("uncaughtException is detected.....");
  process.exit(1);
});
