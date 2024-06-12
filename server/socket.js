// When a friend request is sent
socket.on("send-friend-request", async ({ userId, friendId }) => {
  // Save the friend request in the database
  const friendRequest = new Friend({ userId, friendId });
  await friendRequest.save();

  // Emit an event to notify the recipient
  io.to(friendId).emit("friend-request-received", { userId });
});

// When a friend request is accepted
socket.on("accept-friend-request", async ({ userId, friendId }) => {
  const friendship = await Friend.findOneAndUpdate(
    { userId: friendId, friendId: userId, status: "pending" },
    { status: "accepted" },
    { new: true }
  );

  if (friendship) {
    // Notify both users about the new friendship status
    io.to(userId).emit("friend-request-accepted", { friendId });
    io.to(friendId).emit("friend-request-accepted", { userId });
  }
});
