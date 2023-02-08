import React, { useEffect, useState } from "react";
import {collection, addDoc} from "firebase/firestore";
import { useLocation, Link } from "react-router-dom";
import { db } from '../firebaseConfig';

const Createlisting = () => {
    const[title, setTitle] = useState("");
    const[desc, setDesc] = useState("");
    const[price, setPrice] = useState("");
    const currUser = window.localStorage.getItem('USER_EMAIL');

    const addListing = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "marketListings"), {
                title: title,
                description: desc,
                price: price,
                seller: JSON.parse(currUser)
            });
            console.log("Document submitted successfully");
            window.location.href='/listing-details/'+docRef.id; // on creation, redirect to the listing details you just created
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    document.title="Create Listing";
    return (
        <div className="padding container">
            <div className="row row-style">
                <div className="col col-style">
                    <img src=""></img>
                    <p>item upload goes here</p>
                </div>
                <div className="col col-style">
                    <div>
                        <form style={{marginTop:"50px" }} onSubmit={(event) => {addListing(event)}}>
                            <h5>item title:</h5>
                            <input type="text" placeholder="title"
                            onChange={(e)=>{setTitle(e.target.value)}} />
                            <br/><br/>
                            <h5>item description:</h5>
                            <textarea type="text" placeholder="description"
                            onChange={(e)=>{setDesc(e.target.value)}}/>
                            <br/><br/>
                            <h5>item price:</h5>
                            <input type="text" placeholder="your price"
                            onChange={(e)=>{setPrice(e.target.value)}}/>
                            <br/><br/>
                            <button type="submit">list item</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Createlisting;