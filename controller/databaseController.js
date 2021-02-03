const {
    MongoClient
} = require('mongodb');
const uri = "mongodb+srv://osmancadc:4321@cluster0.ge4gy.mongodb.net/Users?retryWrites=true&w=majority";

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
                        .find({ status:true}).toArray()
    await client.close();   
    callback(result)
}