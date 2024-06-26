import React, { useEffect, useState } from "react";
import './createtask.css'
import axios from 'axios';
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Createtask() {
    const navigatee=useNavigate()

    const [user1, setUser1] = useState([]);
    const [error, setError] = useState("");
    const [toggle, setToggle] = useState(false);
    const [formdata, setFormdata] = useState({
        taskname: "",
        status: "",
        users: [],
        start_date: "",
        end_date: "",
        description: ""
    });

    const handlehome=()=>{
        navigatee('/adminpage')
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp1/userlist/')
            .then(response => {
                setUser1(response.data);
                console.log(response.data)
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    const handleUserSelect = (selectedOption) => {
        const userId = selectedOption.value;
        setFormdata(prevState => ({
            ...prevState,
            users: [...prevState.users, userId]
        }));
    };

    const handleUserRemove = (removedOption) => {
        const userId = removedOption.value;
        const updatedUsers = formdata.users.filter(id => id !== userId);
        setFormdata(prevState => ({
            ...prevState,
            users: updatedUsers
        }));
    };
    
    

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskname = e.target.elements.taskname.value;
        const status = e.target.elements.status.value;
        const start_date = e.target.elements.start_date.value;
        const end_date = e.target.elements.end_date.value;
        const description = e.target.elements.description.value;
    
        const formData = {
            task_name: taskname,
            task_status: status,
            task_members: formdata.users,
            task_start: start_date,
            task_end: end_date,
            task_description: description
            
        };
    
        axios.post('http://127.0.0.1:8000/myapp1/addtask/',formData)
        .then(response=>{
            console.log("task added successfully",response.data)
            toast.success("Task Added Successfully");
            setFormdata({
                taskname: "",
                status: "",
                users: [],
                start_date: "",
                end_date: "",
                description: ""
            });
        })
        .catch(error=>{
            console.log("error adding task",error)
        });
        
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h2>Add Task</h2>
            <div className="box1234">
                <form onSubmit={handleSubmit}>
                    <div className="main23">
                        <div className="container231">
                            <div className="container23">
                                <div className="container24">
                                    <label>Taskname</label>
                                    <input className="inputboxx1" type="text" placeholder="Enter Task" name="taskname" />
                                </div>
                                <div className="container24">
                                    <label>Status</label>
                                    <select name="status">
                                        <option value=""></option>
                                        <option value="Started">Started</option>
                                        <option value="Finished">Finished</option>
                                        <option value="InProgress">In Progress</option>
                                    </select>
                                </div>
                                <div className="container24">
                                    <div className="select-container">
                                        <label htmlFor="users">Assign</label>
                                        <button className="select-containerbtn" type="button" onClick={() => setToggle(true)}>Add User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container251">
                            <div className="container25">
                                <div className="container26">
                                    <label>Start</label>
                                    <input className="inputboxx" type="date" name="start_date" />
                                </div>
                                <div className="container26">
                                    <label>End</label>
                                    <input className="inputboxx" type="date" name="end_date" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container27">
                        <textarea name="description" className="inputboxx27" rows="10"></textarea>
                    </div>
                      <div className="container28">
                        <div className="btnboxx28">
                            <button className="btnn28" type="submit">ADD</button>
                            <button className="btnn28" type="submit" onClick={handlehome}>Home</button>
                        </div>
                    </div>
                </form>
                {toggle &&
                    <div className="modal-container">
                        <div className="modal">
                        <Select
                            options={user1.map(user => ({ value: user.id, label: user.username }))}
                            isMulti
                            onChange={selectedOptions => {
                                selectedOptions.forEach(option => handleUserSelect(option));
                            }}
                            onRemove={removedOption => handleUserRemove(removedOption)}
                            styles={{
                                option: (provided) => ({
                                    ...provided,
                                    color: 'black',
                                }),
                            }}
                        />

                        <ImCross className="closeicon" onClick={handleToggle}/>  
                        </div>
                    </div>
                }        
            </div>
            <div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Createtask;
