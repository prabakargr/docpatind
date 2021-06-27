
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");


const login =async (req,res)=>{
    try {
        
    console.log("reached");

    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],

            errors = validationResult(req);

            
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            const { email, password } = req.body;
            try {
                let user = await User.findOne({
                    email
                });
                if (!user)
                    return res.status(400).json({
                        message: "User Not Exist"
                    });

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch)
                    return res.status(400).json({
                        message: "Incorrect Password !"
                    });

                const payload = {
                    user: {
                        id: user.id
                    }
                };

                jwt.sign(
                    payload,
                    "randomString",
                    {
                        expiresIn: 3600
                    },
                    (err, token) => {
                        if (err) throw err;
                        res.status(200).json({
                            token: token,
                            user: user
                        });
                    }
                );
            } catch (e) {
                console.error(e);
                res.status(500).json({
                    message: "Server Error"
                });
            }
    } catch (error) {
        console.log(error)
    }

}

const signup = async(req,res)=>{
        [
          check("username", "Please Enter a Valid Username").not().isEmpty(),
          check("email", "Please enter a valid email").isEmail(),
          check("password", "Please enter a valid password").isLength({
          min: 6
          })
        ],
           errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({
              errors: errors.array()
            });
          }
      
          const {
            username,
            email,
            password,
            userType
          } = req.body;
          try {
            let user = await User.findOne({
              email
            });
            if (user) {
              return res.status(400).json({
                msg: "User Already Exists"
              });
            }
      
            user = new User({
              username,
              email,
              password,
              userType
            });
      
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
      
            await user.save();
      
            const payload = {
              user: {
                id: user.id
              }
            };
      
            jwt.sign(
              payload,
              "randomString", {
              expiresIn: 10000
            },
              (err, token) => {
                if (err) throw err;
                res.status(200).json({
                  token
                });
              }
            );
          } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
          }
        

}


const allUsers = async (req, res) => {

    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.send({ error });
    }
}

const me = async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  }


module.exports = {
    login:login,
    signup:signup,
    allUsers:allUsers,
    me:me
}