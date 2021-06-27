import mongoose from "mongoose";

export default mongoose
  .connect(`mongodb://localhost:27017/hammoq`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("db connection successfull....."))
  .catch((err) => console.log(err));
