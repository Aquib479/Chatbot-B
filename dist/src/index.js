import app from "./app.js";
import { connectToMongoDB } from "./db/connection.js";
// connections ans listeners
const port = process.env.PORT || 5000;
connectToMongoDB()
    .then(() => {
    app.listen(port, () => console.log("server has started & connected to DataBase"));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map