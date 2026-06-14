import { Server } from "socket.io";
import colors from "colors";

// Single shared Socket.io server instance, created once in app.ts via initSocket()
// and reachable from anywhere (controllers, cron jobs) via getIO().
let io: Server | null = null;

export const getIO = (): Server | null => io;

export const initSocket = (server: any): Server => {
    io = new Server(server, {
        pingTimeout: 20000, // waits 20s; if idle, closes the connection to save bandwidth.
        cors: {
            origin: "http://localhost:3000",
        },
    });

    io.on("connection", (socket) => {
        console.log(
            colors.bgGreen.black(`CONNECTION: User has connected to socket: ${socket.id}`)
        );

        // This will take the user data from frontend:
        socket.on("setup", (userData: any) => {
            // create a room exclusive to this user, keyed by their employeeId,
            // so we can target them directly for chat AND mail notifications.
            socket.join(userData.employeeId);
            console.log(
                colors.bgWhite.black(`SETUP: Joined user whose id = ${userData.employeeId}`)
            );
            socket.emit("connected"); // inform the frontend side that the user is connected
        });

        // Join a specific chat room/channel (direct or group):
        socket.on("join chat", (room) => {
            socket.join(room);
            console.log(
                colors.bgBlue.black(`JOIN CHAT: User Joined room: ${room}`)
            );
        });

        // Typing indicators:
        socket.on("typing", (channelId) => socket.in(channelId).emit("typing"));
        socket.on("stop typing", (channelId) => socket.in(channelId).emit("stop typing"));

        socket.on("new message", (data) => {
            let { newMessageReceived, targetChat } = data;
            if (!targetChat.members) return console.log("targetChat.members not defined");

            // Emit the message to all users inside the room (except the sender):
            targetChat.members.forEach((member: any) => {
                if (member.memberId == newMessageReceived.senderId) return;
                socket.in(member.memberId).emit("message received", newMessageReceived);
            });
        });

        socket.off("setup", (userData: any) => {
            console.log(colors.red(`User disconnected from socket: ${socket.id}`));
            socket.leave(userData?.employeeId);
        });
    });

    return io;
};
