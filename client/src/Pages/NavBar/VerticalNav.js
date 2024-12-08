
import "./VerticalNav.css";

import { TiHomeOutline } from "react-icons/ti";
import { BsFilm } from "react-icons/bs";
import { FaTv } from "react-icons/fa";
import { FaTheaterMasks } from "react-icons/fa";
import { GiDirectorChair } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";


import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom";

export default function VerticalNav({ 
    loggedUser,
    chosenNav,
    setChosenNav 
}) {

    //Get logged profile id and image
    const profilePic = loggedUser?.profile_picture?.picture_route
    const profileId = loggedUser.id

    // Render containers for links
    const navLinkContainer = (IconComponent, text, link) => {
        return (
            <NavLink 
                className="navImgContainer"
                onClick={() => setChosenNav(text)}
                id={chosenNav === text ? "chosenNav" : ""}
                to={link}
            >
                <IconComponent 
                    className="navImg"  
                />

                <p
                    className="navText"
                >
                    {text}
                </p>
            </NavLink>
        );
    };

    return loggedUser && loggedUser.interests ? (
        <div
            id="unSelectVerticalNavBar"
        >
            <div
                id="verticalNavNoSelect"
            >
                {navLinkContainer(TiHomeOutline, "Home")}

                {navLinkContainer(BsFilm, "Movies")}

                {navLinkContainer(FaTv, "Tv")}

                {navLinkContainer(FaTheaterMasks, "Actors", "actors")}

                {navLinkContainer(GiDirectorChair, "Directors")}

                {navLinkContainer(FaUsers, "Users")}

                {loggedUser.user_type === "Admin" ? navLinkContainer(RiAdminFill, "Admin", "admin") : null}

                <img 
                    src={profilePic}
                    id="navProfilePic"
                />
            </div>
        </div>
    ) : null;
}
