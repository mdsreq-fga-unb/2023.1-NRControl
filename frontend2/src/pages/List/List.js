import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function List() {
    const navigateTo = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

    const [listOfEmployees, setListOfEmployees] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3005/register").then((response)=>{
            setListOfEmployees(response.data);
        })
    }, []);
    return (
        <div>
            {listOfEmployees.map((value, key) => {
            return (
            <div className="post">
                <div className="name">{value.name}</div>
                <div className="cpf">{value.cpf}</div>
                <div className="email">{value.email}</div>
                <div className="address">{value.address}</div>
                <div className="phonenumber">{value.phonenumber}</div>
                <div className="birthday">{value.birthday}</div>
                <div className="admissiondate">{value.admissiondate}</div>
                <div className="asodate">{value.asodate}</div>
            </div>
            );
            })}
        </div>
    )
}

export default List