import { useEffect, useState } from "react";
import "./2-SignUp.css";
import { useFormik } from "formik";
import * as yup from "yup";

export default function SignUp() {
    const [signUpComplete, setSignUpComplete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailInUse, setEmailInUse] = useState(false)

    const userTypes = ["Viewer", "Actor", "Director"];

    const renderTypes = [
        <option key="default" value="" disabled>
            Please select account type
        </option>,
        ...userTypes.map((type, index) => (
            <option key={index} value={type}>
                {type}
            </option>
        )),
    ];

    const formSchema = yup.object().shape({
        newUserEmail: yup
            .string()
            .email("Invalid email address")
            .required("Must enter email"),
        newUserFirstName: yup
            .string()
            .required("Must enter first name"),
        newUserLastName: yup
            .string()
            .required("Must enter last name"),
        newUserType: yup
            .string()
            .required("Must select account type"),
        newUserCity: yup.string(),
        newUserPassword: yup
            .string()
            .required("Must enter a password"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("newUserPassword"), null], "Passwords must match")
            .required("Must confirm password"),
    });

    const formik = useFormik({
        initialValues: {
            newUserEmail: "",
            newUserFirstName: "",
            newUserLastName: "",
            newUserType: "",
            newUserCity: "",
            newUserPassword: "",
            confirmPassword: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            setLoading(true);
            fetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
                .then((res) => {
                    setLoading(false);
                    if (res.status === 201) {
                        setSignUpComplete(true);
                    } else if (res.status === 400) {
                        setEmailInUse(true)
                    }
                })
                .catch(() => {
                    setLoading(false);
                });
        },
    });

    const signUpInput = (ph, type, variable) => (
        <>
            <input
                className="signUpInput"
                placeholder={ph}
                type={type}
                onChange={formik.handleChange}
                name={variable}
                value={formik.values[variable]}
            />
            <p style={{ color: "red" }}>{formik.errors[variable]}</p>
        </>
    );

    return signUpComplete ? (
        <div id="signUpConfirmed">
            <h2>Thank you for signing up to Flix-Ation</h2>
            <h2 style={{ marginLeft: "10px", marginRight: "10px" }}>
                Please log in to get your cinematic journey started
            </h2>
        </div>
    ) : (
        <form id="signUpForm" onSubmit={formik.handleSubmit}>
            <h1 style={{ fontWeight: "200", fontSize: "300%" }}>Sign Up</h1>
    
            {signUpInput("Please enter YOUR email", "text", "newUserEmail")}
            {signUpInput("Please enter your FIRST name", "text", "newUserFirstName")}
            {signUpInput("Please enter your LAST name", "text", "newUserLastName")}
            {signUpInput("Please enter your CITY", "text", "newUserCity")}
    
            <>
                <select
                    name="newUserType"
                    onChange={formik.handleChange}
                    value={formik.values.newUserType}
                    className="signUpInput"
                >
                    {renderTypes}
                </select>
                <p style={{ color: "red" }}>{formik.errors["newUserType"]}</p>
            </>
    
            {signUpInput("Please enter your PASSWORD", "password", "newUserPassword")}
            {signUpInput("Confirm your PASSWORD", "password", "confirmPassword")}
    
            {loading ? (
                <p>Signing Up...</p>
            ) : (
                <>
                    {emailInUse ? (
                        <p style={{ color: "red" }}>
                            This email is already registered
                        </p>
                    ) : null}
    
                    <button
                        type="submit"
                        style={{
                            marginBottom: "10px",
                            width: "40%",
                            alignSelf: "center",
                            cursor: "pointer",
                            borderRadius: "24px",
                            fontSize: "120%",
                            marginTop: "0px",
                        }}
                    >
                        Sign Up To Flix-Ation
                    </button>
                </>
            )}
        </form>
    )
}
