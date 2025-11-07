import React from "react";
import logo from '../assets/logo.png'
import flower from '../assets/login_flower.png'

function Login () {
    return(
        <>
        <div className="bg-[#6E0027] h-fit">

            <div className="flex flex-wrap items-center justify-between">

                <img className="h-[1007px]" src={flower} alt="" />

                <div >
                    <img src={logo} alt="logo" />
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;