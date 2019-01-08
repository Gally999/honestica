const express = require('express');
const Employee = require("../models/employee-model");
const Shift = require("../models/shift-model");
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET Employee page
router.get("/employees", (req, res, next) => {
  Employee.find()
    .then(employeeResults => {
      res.locals.employeeArray = employeeResults;
      res.render("employees.hbs");
    })
    .catch(err => next(err));
});

// POST Add a new employee
router.post("/process-add-employee", (req, res, next) => {
  const { firstName, status } = req.body;
  console.log(firstName, status);
  Employee.create({firstName, status})
    .then(employeeDoc => {
      //res.render(employeeDoc);
      res.redirect("/employees");
    })
    .catch(err => next(err));
});

// GET Edit an empoloyee
router.get("/employee/:employeeId/employee-edit", (req, res, next) => {
  const { employeeId } = req.params;
  Employee.findById(employeeId)
    .then(employeeDoc => {
      res.locals.oneEdit = employeeDoc;
      res.render("employee-edit.hbs");
    })
    .catch(err => next(err));
});

// POST Edit an employee
router.post("/employee/:employeeId/process-edit-employee", (req, res, next) => {
  const { employeeId } = req.params;
  const { firstName, status } = req.body;
  Employee.findByIdAndUpdate(
    employeeId,
    { $set: {firstName, status } }, 
    { runValidators: true }
  )
  .then(employeeDoc => {
    res.locals.oneEdit = employeeDoc;
    res.redirect("/employees");
  })
  .catch(err => next(err));
});


// ----------------------------- SHIFTS ------------------
// GET Shifts page
router.get("/shifts", (req, res, next) => {
  Employee.find()
    .then(employeeResult => {
      res.locals.employeeArray = employeeResult;
      return Shift.find()
      .populate("employee")
      .sort({date: 1})
       
    })
    .then(shiftResult => {
      res.locals.shiftArray = shiftResult;
      
      res.render("shifts.hbs");
    })
    .catch(err => next(err));
});

// POST Add a shift
router.post("/process-add-shift", (req, res, next) => {
  const { date, employee } = req.body;
  Employee.findOne({ firstName: { $eq: employee } })
  .then(employeeDoc => {
    const employeeId = employeeDoc._id;
    return Shift.create({date, employee: employeeId})
  })
  .then(shiftDoc => {
    res.redirect("/shifts");
  })
  .catch(err => next(err));
});


module.exports = router;
