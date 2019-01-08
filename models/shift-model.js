const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const moment = require("moment");

const shiftSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  employee: {
  type: Schema.Types.ObjectId,
  ref: "Employee", 
  required: true,
  },
}, {
  timestamps: true,
});

// used npm package "moment" to format the date to a more readable format 
shiftSchema.virtual("shortDate").get(function() {
  return moment(this.date).format("DD/MM/YYYY");
});


const Shift = mongoose.model("Shift", shiftSchema);
module.exports = Shift;