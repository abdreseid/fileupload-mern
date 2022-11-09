const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const Student = require('../model/student');
const students = require('../students');

const getStudents = (req, res) => {
    res.json(res.pagination)
};

const addStudent = (req, res, next)=> {
    // if(!req.body.name || !req.body.city || !req.body.gender || !req.body.image || !req.body.blood){
    //     res.status(404).json({message:"Please fill in all details"})
    // }
    const id = uuidv4()
    const name=req.body.name
    const size=req.body.size
    const image=req.file.path
    const data = { id, name, image, size };
    
    
    // const errors = validationResult(req);
    // if( !errors.isEmpty() ) {
    //     res.status(404).send({ error: 'true', msg: errors.errors[0]});
    //     res.end();
    // }
    // else {
        const newStudent = new Student(data)
        newStudent
            .save()
            .then((res) => res.status(200).json(" Data Added Successfully"))
            .catch((err) => res.status(400).json("Error :" + err))
   // }
}

const deleteStudent = (req,res)=>{
    const studentId = req.params.id

    Student.findByIdAndDelete(studentId)
    .then((res) => res.json("Data Deleted Successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
}

const editStudent = (request,response)=>{
    const name=req.body.name
    const size=req.body.size
    const image=req.file.path
    const updatedData = { name, image, size }

    Student.updateOne({_id: id}, updatedData )
        .then((update) => {
            if(update) {
                return response.status(200).json("Updated Successfully");
            } else {
                return response.status(404).json("Error while Updating")
            }
        })
        .catch((err) => response.status(404).json("Error:" + err)); 

}

const db = mongoose.connection;
db.once("open", async () => {
  if ((await Student.countDocuments().exec()) > 0) {
    return;
  }
  Student.insertMany(students)
    .then((res) => res.json("added Successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = { getStudents, addStudent, deleteStudent, editStudent }