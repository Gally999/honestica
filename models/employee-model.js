const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: {
    type: String, 
    required: true,
  },
  status: {
    type: String, 
    required: true,
  }
}, {
  timestamps: true,
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;