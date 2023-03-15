import React, { useEffect, useState } from "react";
import {doc, getDoc, deleteDoc} from "firebase/firestore";
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { getStorage, ref, deleteObject } from "firebase/storage";
import './tagsinput.css';

// will display all listing details when a listing is clicked on from home page
const Listingdetails = () => {
    // get document id by parsing url
    const did = window.location.pathname.split("/")[2];
    const [details, setDetails] = useState([]);

    // grabs the single document from db based on the document ID
    useEffect(()=>{
        const getDetails = async () => {
                const docRef = doc(db, "marketListings", did); // getting document reference 
                await getDoc(docRef).then((docData)=>{
                    const newData = docData.data();
                    setDetails(newData);
                    console.log(details, newData);
                })
        }
        getDetails();
    }, []);
    
    // checking if seller of listing is current user or not to display correct HTML
    let editButton;
    let listingButton; // this will either read "dm user" or "delete listing" based on who the seller is
    let submitEvent; // this will determine if user will delete the listing or be sent to "dm user" page...
    // checking is the seller of THIS listing is same as current user by checking emails since they're unique
    if (details.seller !== JSON.parse(window.localStorage.getItem('USER_EMAIL'))){
        listingButton = <button type="submit">dm user button</button>
        //submitEvent = navigate to dm user or similar....
        
    } else {
        editButton = <Link to={{pathname:`/edit-listing/${did}`}}>edit</Link>
        listingButton = <button type="submit">delete listing</button>
        submitEvent = (event)=>deleteListing(event); // DELETES LISTING FROM DATABASE
    }

    // BE CAREFUL DEBUGGING! DELETES LISTING FROM DATABASE
    const deleteListing = async (e) => {
        e.preventDefault();

        try{
            // delete photo from storage first
            const storage = getStorage();
            const photoRef = ref(storage, 'marketListings/'+details.photoFileName);
            console.log(details.photoFileName);
            // Delete the file
            //https://firebase.google.com/docs/storage/web/delete-files
            deleteObject(photoRef).then(() => {
                console.log("Photo deleted successfully!");
            }).catch((error) => {
                console.log("Error deleting photo: ", e);
            });

            // grabs the document in database by the document ID
            const docRef = doc(db, "marketListings", did);
            await deleteDoc(docRef); // deletes document
            console.log("Document successfully deleted! ");

            window.location.href='/home'; // takes user to home page once record has been deleted
        } catch(e){
            console.log("Error deleting document: ", e);
        } 
    }

    document.title="Listing Details";

    return (
        <div className="padding container"> {/* using grid system (className=container/row/col) for layout: https://react-bootstrap.github.io/layout/grid/*/}
            {/* using bootstrap for search bar form */}
            <div className="row">
                <div className="col">
                    <img src={details.photo} alt="..." width="300" height="300"/>
                    <p>compare item link goes here</p>
                </div>
                <div className="col">
                    <div>
                        {/* uses details from document grabbed earlier to fill out elements below */}
                        <h4>Price: {details.price}</h4> 
                        <h4>Title: {details.title}</h4>
                        <h5>Seller:</h5>
                        <p><a href="/">{details.seller}</a></p> {/* TO-DO: link to user profile*/}
                        <h5>Description:</h5>
                        <p>{details.description}</p>
                        <h5>Tags:</h5>
                        <div className="tags-input-container">
                                { details.tags?.map((tag, index) => (
                                    <div className="tag-item" id={index} key={index}>
                                        <span className="text">{tag}</span>
                                    </div>
                                )) }
                            </div>
                        {editButton}
                        {/* based on if listing belongs to current user, action of the button is different, as shown above */}
                        <form onSubmit={submitEvent}>{listingButton}</form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Listingdetails;