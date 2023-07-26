"use client";
import react, { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Validator from "@/components/validator";
import { action } from "@/app/redux/features/user-slice";
import { Toast } from "@/components/Toast";
import isEmailValid from "../api/isEmailValid";
import LoadingModal from "@/components/Loading";
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      console.log(state.user)
      console.log(action.payload)
      return {
        ...state,
        user: { ...state.user, [action.field]: action.payload },
      };
    case "INVALID":
      return {
        ...state,
        valid: { ...state.valid, [action.field]: action.payload },
      };
    default:
      return state;
  }
};
export default function page() {
  const router = useRouter();
  const user = useSelector((state) => state.userSlice);
  const [state, dispatch] = useReducer(reducer, user);
  const [errorMessages, setErrorMessages] = useState([]);
  const reduxDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (errorMessages.length > 0) {
      const timer = setTimeout(() => {
        setErrorMessages([]); // Clear all error messages
      }, 5000); // hide the toast after 5 seconds

      return () => {
        clearTimeout(timer); // this will clear the timeout if the component is unmounted before the time is up
      };
    }
  }, [errorMessages]);
  useEffect(() => {
    if(user.progress.page1) return
    reduxDispatch(action({type:'RESET'}))
  },[])
  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !state.user.name ||
      !state.user.email ||
      !state.user.password ||
      !state.user.password2
    ) {
      setErrorMessages([
        { isError: true, message: "Please fill in all fields." },
      ]);
      return;
    }
    if (state.user.password !== state.user.password2) {
      setErrorMessages([
        { isError: true, message: "Password does not match." },
      ]);
      return;
    }
    setIsLoading(true);
    isEmailValid(state.user.email).then((res) => {
    if (res.isValid) {
        setIsLoading(false);
        reduxDispatch(
        action({ type: "COMPLETE", payload: true, field: "page1" })
        );
        console.log(state)
        reduxDispatch(action({ type: "UPDATE", payload: state.user }));
        return router.push("/register/detail");

    }
    //display error message here "This email is already used"
    setIsLoading(false);
    setErrorMessages([{ isError: true, message: "Email already used" }]);
    }).catch(error => {
    setIsLoading(false);
    setErrorMessages([{ isError: true, message: error.message }]);
    });
    
  };
  return (
    <div className="weak-green-background">
      {isLoading && <LoadingModal />}
      <Toast
        messages={errorMessages}
        onClose={(index) => {
          setErrorMessages(errorMessages.filter((_, i) => i !== index));
        }}
      />
      <form className="card">
        <label className="input-label">
          <span className="span-child-detail">ชื่อ</span>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="ชื่อ"
            required
            value={state.user.name}
          />
        </label>
        <label className="input-label">
          <span className="span-child-detail">Email</span>

          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
            value={state.user.email}
          />
        </label>
        <label className="input-label">
          <span className="span-child-detail">Password</span>

          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
            value={state.user.password}
          />
        </label>
        <label className="input-label">
          <span className="span-child-detail">ConfirmPassword</span>

          <input
            type="password"
            name="password2"
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            value={state.user.password2}
          />
          <Validator
            validation={{
              valid: state.user.password ===  state.user.password2,
              message: "Password does not match",
            }}
          />
        </label>

        <button className="primary-button" onClick={handleSubmit} type="button">
          ถัดไป
        </button>
      </form>
    </div>
  );
}
