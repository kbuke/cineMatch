
import "./VerticalNav.css";

import { TiHomeOutline } from "react-icons/ti";
import { BsFilm } from "react-icons/bs";
import { FaTv } from "react-icons/fa";
import { FaTheaterMasks } from "react-icons/fa";
import { GiDirectorChair } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";

export default function VerticalNav({ 
    loggedUser,
    chosenNav,
    setChosenNav 
}) {

    //Get logged profile id and image
    const profilePic = loggedUser?.profile_picture?.picture_route
    const profileId = loggedUser.id

    // Render containers for links
    const navLinkContainer = (IconComponent, text) => {
        return (
            <div 
                className="navImgContainer"
                onClick={() => setChosenNav(text)}
                id={chosenNav === text ? "chosenNav" : ""}
            >
                <IconComponent 
                    className="navImg"  
                />

                <p
                    className="navText"
                >
                    {text}
                </p>
            </div>
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

                {navLinkContainer(FaTheaterMasks, "Actors")}

                {navLinkContainer(GiDirectorChair, "Directors")}

                {navLinkContainer(FaUsers, "Users")}

                <img 
                    src={profilePic}
                    id="navProfilePic"
                />
            </div>
        </div>
    ) : null;
}
