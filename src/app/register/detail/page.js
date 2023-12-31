"use client";
import react, { useState, useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlinePhone } from "react-icons/ai";
import ImageComponent from "@/components/ImageComponent";
import { useDispatch, useSelector } from "react-redux";
import { action } from "@/app/redux/features/user-slice";
import { callRegister } from "@/app/redux/features/auth-slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Toast } from "@/components/Toast";
import LoadingModal from "@/components/Loading";
const initialState = {
  isLoading: true,
  user: {
    nickName: "",
    age: "",
    picture: "/User-avatar.svg.png",
    father: "",
    fatherPhone: "",
    mother: "",
    motherPhone: "",
  },
  valid:{
    nickName:  false,
    age: false,
    picture: false,
    father:  false,
    fatherPhone:  false,
    mother:  false,
    motherPhone:  false,
  }
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { isLoading: false, user: action.payload };
    case "FETCH_ERROR":
      return { ...state, isLoading: false };
    case "UPDATE_FIELD":
      return {
        ...state,
        user: { ...state.user, [action.field]: action.payload },
        valid: { ...state.valid,[action.field]:true}
      };
    case "RESET":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
export default function page() {
  const user = useSelector((state) => state.userSlice.user);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const regisProgress = useSelector((state) => state.userSlice.progress);
  const reduxDispatch = useDispatch();
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState([]);
  useEffect(() => {
    if (!regisProgress.page1) router.push("/register");
  }, []);
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

  const handleChangePicture = (e) => {
    const file = e.target.files[0];

    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      setIsLoading(true)
      reader.onloadend = () => {
        dispatch({
          type: "UPDATE_FIELD",
          field: "picture",
          payload: reader.result,
        });
        setIsLoading(false)
      };
      reader.readAsDataURL(file);
    } else {
      dispatch({ type: "UPDATE_FIELD", field: "picture", payload: null });
    }
  };

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
        console.log("WTF")
      // Update state or do something with the value
      dispatch({
        type: "UPDATE_FIELD",
        field: e.target.name,
        payload: e.target.value,
      });
    }
  }

  const handleSubmit = (e) => {
    const isValid = Object.values(state.valid).every(val => val === true)
    console.log(isValid)
    if(!isValid){
        setErrorMessages([{ isError: true, message: "Please fill in all fields." }]);
        return
    }
    
    reduxDispatch(action({ type: "UPDATE", payload: state.user }));
    setIsLoading(true); // <-- Start loading here
    reduxDispatch(callRegister({ ...user, ...state.user }))
      .then(unwrapResult)
      .then((obj) => {
        reduxDispatch(
          action({ type: "COMPLETE", payload: true, field: "page2" })
        );
        setErrorMessages([
          { isError: false, message: "Details submitted successfully" },
        ]);
        router.push("/register/success");
        setIsLoading(false); // <-- End loading here
      })
      .catch((err) => {
        console.log(err.toString());
        setErrorMessages([
          {
            isError: true,
            message: "Error in submitting details. Please try again",
          },
        ]);
        setIsLoading(false); // <-- End loading here
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
        <div className="flex gap-2">
          <ImageComponent key={state.user.picture} src={state.user.picture} />
          <div className="child-detail">
            <label className="input-label">
              <span className="span-child-detail">ชื่อเล่น</span>

              <input
                type="text"
                name="nickName"
                onChange={handleChange}
                value={state.user.nickname}
                placeholder="ชื่อเล่น"
                required
              />
            </label>
            <label className="input-label">
              <span className="span-child-detail">อายุ</span>
              <input
                type="text"
                name="age"
                onChange={handleNumberChange}
                value={state.user.age}

                placeholder="อายุ"
                required
              />
            </label>
          </div>
        </div>
        <label className="input-label">
          <span className="span-parent-detail">ชื่อบิดา</span>
          <input
            type="text"
            name="father"
            value={state.user.father}

            onChange={handleChange}
            placeholder="ชื่อบิดา"
            required
          />
        </label>
        <label className="input-label">
          <span className="span-parent-detail">
            เบอร์โทรบิดา <AiOutlinePhone size={20} />
          </span>
          <input
            type="text"
            name="fatherPhone"
            value={state.user.fatherPhone}

            onChange={handleNumberChange}
            placeholder="เบอร์โทรบิดา"
            required
          />
        </label>
        <label className="input-label">
          <span className="span-parent-detail">ชื่อมารดา</span>
          <input
            type="text"
            name="mother"
            value={state.user.mother}

            onChange={handleChange}
            placeholder="ชื่อมารดา"
            required
          />
        </label>
        <label className="input-label">
          <span className="span-parent-detail">
            เบอร์โทรมารดา <AiOutlinePhone size={20} />
          </span>
          <input
            type="text"
            name="motherPhone"
            value={state.user.motherPhone}

            onChange={handleNumberChange}
            placeholder="เบอร์โทรมารดา"
            required
          />
        </label>
        <label className="upload font-bold">
          รูปภาพ
          <input
            type="file"
            accept="image/*"
            onChange={handleChangePicture}
            required
          />
        </label>

        <button className="primary-button" type="button" onClick={handleSubmit}>
          ถัดไป
        </button>
      </form>
    </div>
  );
}
