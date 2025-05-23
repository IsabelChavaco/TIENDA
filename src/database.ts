import mongoose from "mongoose";
import config from "./config";

(async () => {
    try {
        const db = await mongoose.connect(
            `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`);
        console.log('Base de datos conectada', db.connection.name);
} catch (error) { 
    console.log(error); 
} 
})();