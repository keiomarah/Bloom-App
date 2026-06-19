import { useEffect, useRef } from "react";
import { MenuIcon } from "../components/MenuIcon";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
function AccountDetails() {
  let user;
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const currentPasswordRef = useRef(null);
  useEffect(() => {
    async function getUserDetails() {
      const firstname = firstnameRef.current;
      const lastname = lastnameRef.current;
      const email = emailRef.current;
      const currentPassword = currentPasswordRef.current;
      try {
        const response = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        console.log(response.data);
        user = response.data;

        firstname.value = user.name;
        lastname.value = user.surname;
        email.value = user.email;
        currentPassword.value = "123456789012345";
      } catch (error) {
        console.log(error);
      }
    }

    getUserDetails();
  }, []);
  return (
    <div className="account-details">
      <form>
        <h1>Account</h1>
        <fieldset>
          <legend>Full Name</legend>
          <div className="form-group">
            <label>First name</label>
            <input ref={firstnameRef} type="text" />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input ref={lastnameRef} type="text" />
          </div>
        </fieldset>
        <fieldset>
          <legend>Contact Email</legend>
          <div className="form-group">
            <label>Email</label>
            <div>
              <div className="form-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>

              <input ref={emailRef} type="email" />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Password</legend>
          <div className="form-group">
            <label>New Password</label>
            <div>
              <div className="form-icon">
                <FontAwesomeIcon icon={faLock} />
              </div>

              <input ref={currentPasswordRef} type="password" />
            </div>
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <div>
              <div className="form-icon">
                <FontAwesomeIcon icon={faLock} />
              </div>

              <input type="password" />
            </div>
          </div>
        </fieldset>
        <button className="btn-primary">Save Changes</button>
      </form>
      <p className="delete-account-btn">Delete Account</p>
    </div>
  );
}
export function Account() {
  return (
    <div className="account-page">
      <MenuIcon />
      <AccountDetails />
    </div>
  );
}
