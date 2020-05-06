const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let details = [{
    "StudentId": "101",
    "StudentName":"vasanth",
    "StudentGrade":"B",
    "Course":"BE",
    "Address":"Chennai",
    "Phno":990897210,
},
{
    "StudentId": "102",
    "StudentName":"vijay",
    "StudentGrade":"A",
    "Course":"BE",
    "Address":"Mumbai",
    "Phno":9787878901,
}
];

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/student',(req,res) => {
    res.json(details);
});

app.get('/student/:StudentId',(req,res) =>
{   //reading from url
    const StudentId = req.params.StudentId;
    //searching the book with isbn
    for(let stud of details){
        if(stud.StudentId === StudentId){
            res.json(stud);
            return;
        }
    }
    //sending error if book not found
    res.status(404).send('Detail Not Found');

});

app.post('/student',(req,res) => {
    const stud = req.body;

    //output the book to console for debugg
    console.log(stud);
    details.push(stud);

    res.send('Detail is added to the DB');
});

 app.post('/student/:StudentId',(req,res) => {
    const StudentId = req.params.StudentId;
     const newStudent = req.body;
     //adding item to array
     for(let i=0; i<details.length; i++){
         let stud = details[i]

         if(stud.StudentId == StudentId ){
             details[i] = newStudent;
         }
     }
     
     res.send('List is edited');
 });

app.put('/student/:StudentId',(req,res) => {
    const StudentId = req.params.StudentId;
     const newStudent = req.body;
     //upadting item in the  array
     for(let i=0; i<details.length; i++){
         let stud = details[i]

         if(stud.StudentId == StudentId ){
             details[i] = newStudent;
         }
     }
     
     res.send('List is edited');
});
app.delete('/student/:StudentId', (req,res) => {
    //reading from url
    const StudentId = req.params.StudentId;

    //remove item from the  array
    details = details.filter(i => {
        if(i.StudentId !== StudentId){
            return true;
        }
        return false;
    });
    res.send('Detail is deleted');
});

app.listen(port, () =>
console.log(`Server listening on port ${port}!!`)
);