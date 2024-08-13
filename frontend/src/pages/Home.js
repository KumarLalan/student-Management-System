import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"
import { toast } from 'react-toastify';
import axios from "axios";



function Home() {
  const [data,setData] = useState([]);

  const loaddata = async ()=>{
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };
  useEffect(()=>{
    loaddata();
  },[]);
const deleteContact=(id)=>{
  if(window.confirm("want to delete this contact ?")){
    axios.delete(`http://localhost:5000/api/remove/${id}`);
    toast.success("contact deleted susecfully");
    setTimeout(() => {
      loaddata()
    }, 500);

  }
}

  return (
    <div  className="container" style={{marginTop:"150px"}}>
      <Link to="/addContact">
      <button className='btn btn-contact'> ADD contact</button></Link>
     
    <table className='styled-table'>
      <thead>
        <tr>
          <th style={{textAlign:"center"}}>No.</th>
          <th style={{textAlign:"center"}}>Name</th>
          <th style={{textAlign:"center"}}>email</th>
          <th style={{textAlign:"center"}}>Mobile Number</th>
          <th style={{textAlign:"center"}}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item,index)=>{
          return(
            <tr key={item.id}>
              <th scope="row"> {index+1}</th>
              <td> {item.name}</td>
              <td> {item.email}</td>
              <td> {item.number}</td>
              <td>
                <Link to={`/update/${item.id}`}> <button className='btn btn-edit'>Edit </button></Link>
                <button className='btn btn-delete' onClick={()=>deleteContact(item.id)}>Delete </button>
                <Link to={`/view/${item.id}`}> <button className='btn btn-view'>View </button></Link>

              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  )
}

export default Home