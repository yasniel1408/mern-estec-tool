
const socket = io => {
    io.on("connection", socket => {
        console.log("Connected on Socket");
        obtenerPosts(socket)
        adicionarPost(socket)
        likePost(socket)
        dlikePost(socket)

        socket.on("disconnect", () => {
            console.log("Disconnected on Socket");
        });
    });
    
    // const obtenerPosts = async(socket) => {
    //         let posts = await Post.find()
    //         .populate('user');
    //         socket.emit("Posts", JSON.stringify(posts));
    // };

}

module.exports = socket;