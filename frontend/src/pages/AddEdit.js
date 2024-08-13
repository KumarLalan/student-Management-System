import React, { useState, useEffect } from 'react';
import {   Link, useParams } from 'react-router-dom';
import {useHistory} from 'react-router-use-history';
import "./AddEdit.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    email: "",
    number: ""
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const { name, email, number } = state;

    const history=useHistory();

    const {id}=useParams();

    useEffect(()=>{
      axios.get(`http://localhost:5000/api/get/${id}`).then((resp)=> setState({...resp.data[0]}));
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault();
       if(!name || !email || !number){
        toast.error("please enter value in each field");
       }
       else{
        if(!id){
            axios.post("http://localhost:5000/api/post",{name,email,number}).then(()=>{
                setState({name:"",email:"",number:""})
            }).catch((error)=> toast.error(error.response.data));
            toast.success("data Added Successfully");
        }
        else{
            axios.put(`http://localhost:5000/api/update/${id}`,{name,email,number}).then(()=>{
                setState({name:"",email:"",number:""})
            }).catch((error)=> toast.error(error.response.data));
            toast.success("data updates Successfully");
        }
        
        setTimeout(()=>
        history.push("/")
        ,500)
       }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Your Name...'
                    value={name || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Email id...'
                    value={email ||""}
                    onChange={handleInputChange}
                />
                <label htmlFor='number'>Number</label>
                <input
                    type='text'
                    id='number'
                    name='number'
                    placeholder='Mob no.'
                    value={number||""}
                    onChange={handleInputChange}
                />
                <input type='submit' value={id ? "Update" : "Save"} />
                <Link to="/">
                <input type='button' value='go back' />
                </Link>
            </form>
          
        </div>
    );
};

export default AddEdit;
