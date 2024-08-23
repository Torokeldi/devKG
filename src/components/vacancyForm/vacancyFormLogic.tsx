import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function VacancyFormLogic() {
  const [formState, setFormState] = useState({
    formValues: {
      organization_icon: "",
      organization_name: "",
      position: "",
      telegram: "",
      skype: "",
      email: "",
      salary: "",
      phone: "",
      type: "",
    },
    message: "",
    text: "",
    lastSavedText: "",
    isSaveButtonDisabled: true,
  });

  const navigate = useNavigate();
  const quillRef = useRef(null);

  const handleSaveClick = () => {
    setFormState(prevState => ({
      ...prevState,
      lastSavedText: prevState.text,
      isSaveButtonDisabled: true,
    }));
  };

  const handleInputChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      formValues: {
        ...prevState.formValues,
        [id]: value,
      },
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    axios.post("http://3.38.98.134/jobs", {
      ...formState.formValues,
      id: Date.now(),
      message: formState.message,
    })
    .then(() => navigate("/jobs"))
    .catch(console.error);
  };

  const handlemessageChange = (value: any) => {
    setFormState(prevState => ({
      ...prevState,
      message: value,
      text: value,
    }));
  };

  useEffect(() => {
    setFormState(prevState => ({
      ...prevState,
      isSaveButtonDisabled: prevState.text === prevState.lastSavedText,
    }));
  }, [formState.text, formState.lastSavedText]);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  return { formState, quillRef, handleSaveClick, handleInputChange, handleSubmit, handlemessageChange, modules };
}
