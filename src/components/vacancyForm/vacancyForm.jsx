import "./../../pages/addVacancy/addVacancy.css";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { VacancyFormLogic } from "./vacancyFormLogic";

function VacancyForm() {
  const { formState, quillRef, handleSaveClick, handleInputChange, handleSubmit, handlemessageChange, modules } = VacancyFormLogic();

  return (
    <form className="form-block" onSubmit={handleSubmit} autoComplete="off">
      <p className="organization">Логотип</p>
      <input
        type="text"
        name="organization_icon"
        value={formState.formValues.organization_icon}
        onChange={handleInputChange}
      />

      <p className="organization">Организация</p>
      <input
        type="text"
        name="organization"
        value={formState.formValues.organization_name}
        onChange={handleInputChange}
      />

      <p className="position">Должность</p>
      <div className="positionVacancy">
        <input
          type="text"
          name="position"
          value={formState.formValues.position}
          onChange={handleInputChange}
        />
        <p>Например “Junior C# Developer”</p>
      </div>

      <p className="contact">Оклад</p>
      <input
        type="number"
        name="salary"
        value={formState.formValues.salary}
        onChange={handleInputChange}
      />

      <p className="message">Описание вакансии</p>
      <div className="messageVacancy">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={formState.message}
          onChange={handlemessageChange}
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
          value={formState.formValues.telegram}
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
        value={formState.formValues.skype}
        onChange={handleInputChange}
      />

      <p className="contact">E-Mail</p>
      <input
        type="email"
        name="email"
        value={formState.formValues.email}
        onChange={handleInputChange}
      />

      <p className="contact">Телефон</p>
      <input
        type="tel"
        name="phone"
        value={formState.formValues.phone}
        onChange={handleInputChange}
      />

      <p className="contact">Тип</p>
      <div className="typeVacancy">
        <select
          className="multiselect__content"
          name="type"
          value={formState.formValues.type}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Выберите тип работы
          </option>
          <option className="multiselect__element" value="position">
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
          disabled={formState.isSaveButtonDisabled}
          onClick={handleSaveClick}
        >
          Сохранить
        </button>
      </div>
    </form>
  );
}

export default VacancyForm;
