import React, {Component} from 'react';
import {index,destroy} from './api'
import {Link} from 'react-router-dom';
import "./Student.css";

class StudentIndex extends Component{
    state={
        students:[]
    }
    printFunction =()=> {
        window.print();
      }
      onChange = (event) =>{
        const value = event.currentTarget.value
        const studentId = event.currentTarget.name.split("-")[1]
        // const date = new Date().toString()

        console.log({value, studentId})
      }
    componentDidMount(){
        const user = this.props.user
        const courcesId = this.props.courcesId
        index(user, courcesId)
        .then(response => {
           const allStudents = response.data.students;
           this.setState({
               students:allStudents
           })
        })
        .catch((error) => console.log(error))
    }

    render(){
        console.log(this.props.user)
        return(
            <div className="Student">
                <br/>
                <table >
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Present</th>
                        <th>Absent</th>
                        <th>Absent Excuse</th>
                        <th>Late</th>
                        <th>Late Excuse</th>
                        <th>Attendees</th>
                    
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.students.map((student,index) => (
                        <tr key={index}>
                        
                            <td>{student.firstName} {student.lastName}</td>
                            <td><input type="radio" onChange={this.onChange} name={`record-${student._id}`} value="Present"/> </td>
                            <td><input type="radio" onChange={this.onChange} name={`record-${student._id}`} value="Absent"/> </td>
                            <td><input type="radio" onChange={this.onChange} name={`record-${student._id}`} value="Absent Excuse"/> </td>
                            <td><input type="radio" onChange={this.onChange} name={`record-${student._id}`} value="Late"/> </td>
                            <td><input type="radio" onChange={this.onChange} name={`record-${student._id}`} value="Late Excuse"/> </td>
                            <td><Link to={`/cources/${this.props.courcesId}/students/${student._id}/attendees`}><img src='https://files.slack.com/files-pri/TA2AHQDQ8-FLHR9AC9F/user_4.jpg'  height="50px" width="50px"/></Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Link to={`/optionPage/${this.props.courcesId}`}><button>Back</button></Link>
                <button onClick ={this.printFunction}>Print</button>
            </div>
        )
    }
}



export default StudentIndex



{/* <table >
<thead>
    <tr>
        <th>Firstname</th>
        <th>Lastname</th> 
        <th>Email</th>
        <th>Delete</th>
        <th>Edit</th>
        <th>Attendees</th>
    
    </tr>
    </thead>
    <tbody>
    {this.state.students.map((student,index) => (
        <tr key={index}>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.email}</td>
            <td><button onClick={() => this.destroy(student._id)}>Delete</button></td>
            <td><Link to={`/cources/${this.props.courcesId}/students/${student._id}/edit`}><button>Edit</button></Link></td>
            <td><Link to={`/cources/${this.props.courcesId}/students/${student._id}/attendees`}><img src='https://files.slack.com/files-pri/TA2AHQDQ8-FLHR9AC9F/user_4.jpg'  height="50px" width="50px"/></Link></td>
        </tr>
    ))}
    </tbody>
</table> */}