import React, { useState } from "react";
import '../App.css';
import { auth } from '../firebaseConfig'
import { sendPasswordResetEmail } from "firebase/auth";
import '../css/forgotpassword.css';

function ForgotPassword (){
    // variable to get email from user input
    const [newEmail, setNewEmail] = useState("");

    // forgot password function
    const forgotPassword = () => {
        sendPasswordResetEmail(auth, newEmail)
        .then(() => {
            // Password reset email sent!
            console.log("password reset email sent!")
            // ..
        })
        .catch((error) => {
            console.log(error);
            // ..
        });
    };

    // visible portion of the page(buttons and input fields)
    return (
        <div className="ForgotPassword">
            <h2>ForgotPassword</h2>
                <form onSubmit={forgotPassword}>
                    <h4>Please enter email to send for password reset.</h4>
                    <div>
                    <h3>Enter email:
                    <input
                        type="email"
                        placeholder="Email..."
                        value={newEmail}
                        onChange={(event) => {
                            setNewEmail(event.target.value);
                        }}
                    />          
                    </h3>
                </div>
                <button type="submit"> Submit </button>
                </form>
        </div>
    );
}

export default ForgotPassword;