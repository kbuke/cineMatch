import { useEffect, useState } from "react";

export default function UploadPic({
    loggedUser,
    allUsers,
    allProfilePictures,
    setAllProfilePictures
}) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newPic, setNewPic] = useState(null); // Holds the File object
    const [preview, setPreview] = useState(null); // Holds the preview URL

    // Set the selected user when allUsers updates
    useEffect(() => {
        const user = allUsers.find(user => user.id === loggedUser.id);
        setSelectedUser(user);
    }, [allUsers, loggedUser.id]);

    // Set preview URL when selectedUser or newPic updates
    useEffect(() => {
        if (selectedUser) {
            setPreview(selectedUser.profile_picture.picture_route);
        }
    }, [selectedUser]);

    useEffect(() => {
        // Create a preview URL when newPic changes
        if (newPic) {
            const previewUrl = URL.createObjectURL(newPic);
            setPreview(previewUrl);

            // Clean up preview URL when component unmounts or newPic changes
            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [newPic]);

    const pictureId = selectedUser?.profile_picture.id;

    // Update newPic on file input change
    const handleUpdatePic = (e) => {
        const file = e.target.files[0];
        setNewPic(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newPic) {
            setError("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append("image", newPic);

        fetch(`/profilepics/${pictureId}`, {
            method: "PATCH",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false);
            if (data.error) {
                setError("Failed to update profile picture");
            } else {
                // Update preview with the new image URL
                setPreview(data.picture_route);
                setAllProfilePictures(prev => 
                    prev.map(pic => pic.id === pictureId ? data : pic)
                );
            }
        })
        .catch(() => setError("An error occurred while uploading"));
    };

    return (
        <form 
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit}
        >
            <h1>Upload Profile Picture</h1>

            <img 
                src={preview} // Use preview URL here
                alt="Profile"
                style={{
                    height: "300px",
                    width: "200px"
                }}
            />
            
            <input 
                type="file"
                id="fileSelect"
                accept=".png, .jpg, .jpeg"
                onChange={handleUpdatePic}
            />

            <div>
                <button>Previous</button>

                <button
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

