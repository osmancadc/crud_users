const {
    MongoClient
} = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb";

exports.getClient = ()=>{ return new MongoClient(uri)}

exports.getUser = async (client,username,password,callback) => {
    await client.connect();
    result = await client.db("Users").collection("users")
                        .findOne({ username: username,password:password });
    await client.close();   
    callback(result)
}

exports.getAllUsers = async (client,callback) =>{
    await client.connect();
    result = await client.db("Users").collection("users")
                        .find({ status:true});
    await client.close();   
    callback(result)
}
// try {
//     databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// } catch (e) {
//     console.error(e);
// } finally {
//     await client.close();
// }