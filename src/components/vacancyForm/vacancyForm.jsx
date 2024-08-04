import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./../../pages/addVacancy/addVacancy.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VacancyForm() {
  const [formValues, setFormValues] = useState({
    logo: "",
    organization: "",
    office: "",
    telegram: "",
    skype: "",
    email: "",
    salary: "",
    phone: "",
    jobType: "",
  });
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [lastSavedText, setLastSavedText] = useState("");
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const quillRef = useRef(null); // Create a ref for the ReactQuill component

  useEffect(() => {
    setIsSaveButtonDisabled(text === lastSavedText);
  }, [text, lastSavedText]);

  const handleSaveClick = () => {
    setLastSavedText(text);
    setIsSaveButtonDisabled(true);
    console.log("Текст сохранен:", text);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormValues = {
      ...formValues,
      id: Date.now(),
      description,
    };
    console.log("Form values:", updatedFormValues);
    axios
      .post("http://3.38.98.134/jobs", updatedFormValues)
      .then((res) => {
        console.log(res.data);
        navigate("/jobOpenings");
      })
      .catch((err) => {
        console.error("Ошибка при отправке формы:", err);
      });
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setText(value);
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <form className="form-block" onSubmit={handleSubmit} autoComplete="off">
      <p className="organization">Logo</p>
      <input
        type="text"
        name="logo"
        value={formValues.logo}
        onChange={handleInputChange}
      />

      <p className="organization">Организация</p>
      <input
        type="text"
        name="organization"
        value={formValues.organization}
        onChange={handleInputChange}
      />

      <p className="office">Должность</p>
      <div className="officeVacancy">
        <input
          type="text"
          name="office"
          value={formValues.office}
          onChange={handleInputChange}
        />
        <p>Например “Junior C# Developer”</p>
      </div>

      <p className="contact">Оклад</p>
      <input
        type="number"
        name="salary"
        value={formValues.salary}
        onChange={handleInputChange}
      />

      <p className="description">Описание вакансии</p>
      <div className="descriptionVacancy">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={description}
          onChange={handleDescriptionChange}
          style={{
            height: "234px",
            width: "466px",
            fontSize: "16px",
          }}
          modules={modules}
        />
        <p>
          Здесь <strong>необходимо</strong> указать условия труда, требования и
          обязанности. <br />
          Также вы можете указать краткое описание компании, например: <br />
          <br />
          “В дружный отдел дизайна игровой студии ”Bloody Fun” требуется <br />
          проект менеджер со стажем”
        </p>
      </div>
      <br />
      <br />
      <br />

      <p className="contact">Telegram</p>
      <div className="telegramVacancy">
        <input
          type="text"
          name="telegram"
          value={formValues.telegram}
          onChange={handleInputChange}
        />
        <p>
          <strong>Не обязательно</strong> заполнять все поля для контактов.
          Например, если у вас нет почты или вы не хотите оставлять свой
          телеграм, <br />
          <strong>оставьте поля пустыми.</strong>
        </p>
      </div>

      <p className="contact">Skype</p>
      <input
        type="text"
        name="skype"
        value={formValues.skype}
        onChange={handleInputChange}
      />

      <p className="contact">E-Mail</p>
      <input
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleInputChange}
      />

      <p className="contact">Телефон</p>
      <input
        type="tel"
        name="phone"
        value={formValues.phone}
        onChange={handleInputChange}
      />

      <p className="contact">Тип</p>
      <div className="typeVacancy">
        <select
          className="multiselect__content"
          name="jobType"
          value={formValues.jobType}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Выберите тип работы
          </option>
          <option className="multiselect__element" value="office">
            Работа в офисе (только Кыргызстан)
          </option>
          <option className="multiselect__element" value="project">
            Разовая работа (Проект)
          </option>
          <option className="multiselect__element" value="remote">
            Удаленная работа (Remote)
          </option>
          <option className="multiselect__element" value="relocation">
            Переезд (Работа за границей)
          </option>
          <option className="multiselect__element" value="internship">
            Стажировка (только Кыргызстан)
          </option>
        </select>
        <p>
          Обязательное поле, в котором вы можете выбрать тип работы для вашей
          вакансии.
        </p>
      </div>

      <div className="form-buttons">
        <button type="submit">Продолжить</button>
        <button
          type="button"
          disabled={isSaveButtonDisabled}
          onClick={handleSaveClick}
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}

export default VacancyForm;
