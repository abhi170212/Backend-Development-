const mongoose = require("mongoose");
require('dotenv').config();
const dbUrl = process.env.URL;


mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("DB Connected successfully");
  })
  .catch((evt) => {
    console.log(evt);
  });


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  tags: [String],
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
});


// create user model
const User = mongoose.model("User", userSchema); // ab monggodb me users name se ek collection hoga cause 'User' hai to.

async function runQueriesExamples() {
  try {
    // creating a new user
    
    const newuser = await User.create({
      name: "Abhishek Singh",
      email: "abhi@gmail.com",
      age: 23,
      tags: ['developer','devops','ai'],
      isActive: true,
    });
    // another way to create a new user
    const anotherUser = await new User({
     name: "Abhishek Singh2",
      email: "abhi22@gmail.com",
      age: 22,
      tags: ['developer','devops','ai'],
      isActive: false
    })
    await anotherUser.save();
    console.log(newuser,anotherUser);

    // Get all Users :-
    const allUsers = await User.find({});
    console.log(allUsers);

    // Get users whose isActive is false:-
    const getUsersOfActiveFalse= await User.find({isActive:false});
    console.log(getUsersOfActiveFalse); 

    // find the first one 
    const getFirstUser = await User.findOne({isActive:false});
    console.log(getFirstUser);

    //fetch only selected fields 
    const selectedFields = await User.find().select("name email -_id");
    console.log(selectedFields); // returns an array of objects and each object has keys as the selected ones 

    //limited users 
    const limitedUsers=await User.find().limit(5).skip(2).select("name age email -_id");
    console.log(limitedUsers); // returns an array too.

    // sorting 
    const sortedUsers = await User.find().sort({age:-1});// sorting on the basis of age in descendig order 
    console.log(sortedUsers);

    // count all the documents 
    const countDocuments = await User.countDocuments({isActive:true});
    console.log(countDocuments);

       //update the user 
    const updatedUser = await User.findByIdAndUpdate(newuser._id,{
     $set:{age:100},$push:{tags:'updated'}
    },{returnDocument: 'after'})

    
    // earlier it was new:true now it has changed and 
    // returnDocument:'after'
    console.log(updatedUser);


    // delete the user 
    const deleteduser = await User.findByIdAndDelete(newuser._id);
    console.log('deleteduser->> ',deleteduser);


  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.connection.close();
  }
}
runQueriesExamples();
