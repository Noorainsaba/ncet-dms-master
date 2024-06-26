const router=require('express').Router()
const User=require('../models/user.model')
const mongoose=require('mongoose')
const { ensureLoggedIn } = require('connect-ensure-login');
const { roles } = require('../utils/constants');

router.get('/users',async(req,res,next)=>{
    try {
        const users =await User.find()
        // res.send(users) 
        res.render('manage-documents',{users})
    } catch (error) {
        next(error)
    }
})

router.get('/user/:id',async(req,res,next)=>{
    try {
        const {id}=req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            req.flash('error','Invalid Id')
            res.redirect('/admin/users')
            return
        }const person=await User.findById(id)
        res.render('profile',{person})
    } catch (error) {
        next(error)
    }
})
function ensureAdmin(req, res, next) {
    if (req.user.role === roles.admin) {
      next();
    } else {
      req.flash('warning', 'You are not authorized to view this route.');
      res.redirect('/auth/login');
    }
  }

  
module.exports=router 
// const express = require('express');
// const mongoose = require('mongoose');
// const { ensureLoggedIn } = require('connect-ensure-login');
// const { roles } = require('../utils/constants');
// const User = require('../models/user.model');

// const router = express.Router();

// function ensureAdmin(req, res, next) {
//   if (req.user.role === roles.admin) {
//     next();
//   } else {
//     req.flash('warning', 'You are not authorized to view this route.');
//     res.redirect('/auth/login');
//   }
// }

// // List all users
// router.get('/users', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureAdmin, async (req, res, next) => {
//   try {
//     const users = await User.find();
//     res.json(users); // Return users as JSON for Postman
//   } catch (error) {
//     next(error);
//   }
// });

// // Get a specific user
// router.get('/user/:id', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureAdmin, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user); // Return user as JSON
//   } catch (error) {
//     next(error);
//   }
// });

// // Create a new user
// router.post('/users', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureAdmin, async (req, res, next) => {
//   try {
//     const { username, password, role } = req.body;
//     const newUser = new User({ username, password, role });
//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (error) {
//     next(error);
//   }
// });

// // Update a user
// router.put('/users/:id', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureAdmin, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }
//     const { username, role } = req.body;
//     const user = await User.findByIdAndUpdate(id, { username, role }, { new: true });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User updated successfully', user });
//   } catch (error) {
//     next(error);
//   }
// });

// // Delete a user
// router.delete('/users/:id', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureAdmin, async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }
//     const user = await User.findByIdAndDelete(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
