const chatHistories = {}; // Stores messages per chatroom

const chatroomSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected to chatroom");

        // ✅ **Join a Chatroom**
        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`User joined chatroom: ${room}`);

            if (!chatHistories[room]) {
                chatHistories[room] = [];
            }

            // Send previous chat history to the user
            socket.emit("chatHistory", chatHistories[room]);
        });

        // ✅ **Leave a Chatroom**
        socket.on("leaveRoom", (room) => {
            socket.leave(room);
            console.log(`User left chatroom: ${room}`);
        });

        // ✅ **Handle Chatroom Messages**
        socket.on("sendMessage", (data) => {
            const { group, text, sender } = data;

            if (!chatHistories[group]) {
                chatHistories[group] = [];
            }

            const messageData = { text, sender };

            chatHistories[group].push(messageData);

            // Broadcast message only to users in this chatroom
            io.to(group).emit("receiveMessage", messageData);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected from chatroom");
        });
    });
};

module.exports = chatroomSocket;
