import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  const roles = {} as any; // To store the roles of connected clients

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    //2
    // Store role when the client registers
    socket.on("register_role", ({ role }) => {
      console.log(role, "2222222");
      roles[socket.id] = role; //mathi roles = {} lai populate gareko
      console.log(`User ${socket.id} registered as ${role}`);
    });

    //5
    // Handle new notifications, excluding the admin
    socket.on("send_notification", (newNotification) => {
      console.log("New notification:", newNotification);

      // Send notification to all normal users
      for (const [id, role] of Object.entries(roles)) {
        if (role !== "ADMIN" && id !== socket.id) {
          io.to(id).emit("send_notification", newNotification);
        }
      }
    });
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // delete roles[socket.id]; // Clean up role on disconnect
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
});
