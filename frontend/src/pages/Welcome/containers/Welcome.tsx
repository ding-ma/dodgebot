import React from 'react';
import cover from "../../../images/League_Cover.jpg";
import {BACKEND, FEEDBACK, LOGIN} from "../../../constants/environment";


export default function Welcome() {
    return <header className="">
        <img src={cover} alt="logo"/>
        <p>
            Hey, this site is still under construction. Please come back later :)!
        </p>
        <p>
            backend: {BACKEND}
        </p>
        <p>
            feedback: {FEEDBACK}
        </p>
        <p>
            login: {LOGIN}
        </p>
    </header>;
}
