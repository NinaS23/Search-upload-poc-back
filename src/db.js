import { MongoClient, ObjectId } from "mongodb";




let db;
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
const promise = mongoClient.connect();

promise.then(() => {
    db = mongoClient.db("pesquisa");
    console.log(`conectou ao banco do `);
})
promise.catch(res => console.log(chalk.red("deu xabu"), res))

export {
    db ,
    ObjectId
}