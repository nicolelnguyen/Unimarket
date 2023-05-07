import React, { useState, useContext, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../App.css";
import profilepic from "../assets/profilepic.png";
import "../css/userprofile.css";
import profilebackground from "../assets/profilebackground.png";
import userhistory from "../assets/userhistory.png";
import { AuthContext } from "../context/AuthContext";

function UserProfile() {
  document.title = "UserProfile";
  const [userProfileData, setUserProfileData] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser.uid;

  useEffect(() => {
    async function getUserProfileData() {
      try {
        const docRef = doc(db, "userInfo", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Data from Firebase:", data);
          setUserProfileData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    }

    getUserProfileData();
  }, [uid]);

  console.log("UserProfileData:", userProfileData);

  return (
    <main>
      <section>
        <div className="profilecontainer">
          <h1 className="userprofile">{userProfileData?.email}</h1>
          <img className="profilepic" src={profilepic} alt="profilepic" />
          <div className="userinformation">
            <p className="userprofile">
              {userProfileData?.school}
              <br />
              {userProfileData?.username}
            </p>
          </div>
          <button className="userhistory">
            <a href="/userhistory">
              <img src={userhistory} alt="userhistory" />
            </a>
          </button>
        </div>
        <img
          className="profilebackground"
          src={profilebackground}
          alt="profilebackground"
        />
      </section>
    </main>
  );
}

export default UserProfile;