import { useEffect } from "react";
import profiler from "../images/profile.png";
import Link from "next/link";
import Image from "next/image";
const ProfileDetails = () => {
  return (
    
    useEffect(() => {

        
        if (typeof localStorage !== 'undefined') {
            return <div className="form-container">
            <form className="form">
              <label htmlFor="user-company-name">Company Name:</label>
              <input
                type="text"
                value={localStorage.getItem("Cname")}
                id="user-company-name"
              />
              <label htmlFor="email">Email</label>
              <input type="email" value={localStorage.getItem("Cmail")} id="email" />
      
              <label>Mobile:</label>
              <input
                type="tel"
                name="tel"
                value={localStorage.getItem("Ctelephone")}
                id="user-company-telephone"
              />
      
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={localStorage.getItem("Caddress")}
                id="user-company address"
              />
      
              <label>Motto:</label>
              <input
                type="text"
                name="motto"
                value={localStorage.getItem("Cmotto")}
                id="user-company-motto"
              />
      
              <input type="submit" value="Done" className="text-white bg-green-800" />
            </form>
          </div>
        }

        else {
          <div className="userhandler">
          <Link href="/SignUp">
            <Image
              src={profiler}
              alt="no-user"
              quality={100}
              className="cursor-pointer mover"
            />
          </Link>
          <p>Click the icon to add image</p>
        </div>
        }
        
      }, [])
  );
};

export default ProfileDetails;
