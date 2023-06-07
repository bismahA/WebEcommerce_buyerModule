const userM=require("../models/user")
const jwt=require("jsonwebtoken");



let signup=(req,res)=>{

    let { email, password, firstName, lastName, confirmPass } = req.body;

    if (password !== confirmPass) {
      res.status(401).send("Password not matching");
    } else {
      // Check if the email already exists
      userM.findOne({ email: email })
        .then((existingUser) => {
          if (existingUser) {
            // Email already exists, return an error
            res.status(409).json({ error: "Email already exists" });
          } else {
            // Create a new user
            let newUser = new userM({
              email,
              password,
              firstName,
              lastName,
              confirmPass,
            });
  
            newUser
              .save()
              .then((user) => {
                res.status(200).json({ message: "User created", user: user });
              })
              .catch((err) => {
                res
                  .status(500)
                  .json({ message: "User not created", error: err });
              });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "Internal server error", error: err });
        });
    }
    
}

let login=(req,res)=>{
    let {email,password}=req.body;
    userM.findOne({ email: email }).then((user) => {
        if (!user) 
        {
           res.status(404).json({ message: "User not found" });
        //   res.status(404).send( "User not found" );
        //  res.render("errorLogU")
          
        } 
        else if (user.password !== password) 
        {
           res.status(401).json({ message: "Incorrect password" });
        //   res.status(401).send( "incorrect password");
        //  res.render("errorLogP")
          
        } 
        else 
        {
            let token=jwt.sign({  //token generated where users id and its role is saved which is deleted after 24h
                id:user._id,
                role:user.role
            },process.env.SECRET_KEY, {
                expiresIn:'24h'
            });
            // jobListM.find().then(jobs => {
            //     res.render('jobLogin', { jobs: jobs });
            //   })
            //   .catch(err => {
            //     console.error(err);
            //     res.status(500).json({ message: "Server error" });
            //   });

          res.status(200).json({ message: "Login successful", user: user,token:token }); //pass the token as well to get the token value
         //  res.render("jobLogin")
        }
      }).catch((err) => {
        res.status(500).json({ message: "Server errorr", err: err });
      });
    };
    


module.exports={
   
    signup,
    login
}