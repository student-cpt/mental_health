// import mongoose from "mongoose";


// export const Connection = async () => {
//     const URL = process.env.MOGODB_URL;

//     try {
//         await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true});
//         console.log ('Database connected successfully!!!');
//     } catch (error) {
//         console.log ('Error while connecting with the database', error.message);
//     }
// }

// export default Connection;



import mongoose from "mongoose";

export const Connection = async() => {
    const URL = process.env.MOGODB_URL || "mongodb://localhost:27017/mentalhealth";

    try {
        await mongoose.connect(URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Database connected successfully!!!");
    } catch (error) {
        console.log("Error while connecting with the database:", error.message);
    }
};

export default Connection;