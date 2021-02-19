import React from 'react';
import {useGlobalContext} from "../../../context";
import {useHistory} from "react-router-dom";

const Dashboard = () =>{
    const {account} = useGlobalContext();
    const history = useHistory();
    console.log(account.currentUser)
    return(
      <div>
          Welcome back {account.currentUser['summonerName']}!
      </div>
    );
}

export default Dashboard;

