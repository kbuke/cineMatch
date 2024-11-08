


export default function Socials({
    instaLogo
}){
    return(
        <div
            style={{
                backgroundColor: "black",
                marginTop: "0px",
                color: "white",
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center"
            }}
        >
            <h2>Follow us on</h2>
            <img 
                src={instaLogo}
                alt="instalink"
                style={{
                    height: "80px",
                    width: "80px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    marginTop: "5px",
                    marginBottom: "5px"
                }}
            />
        </div>
    )
}