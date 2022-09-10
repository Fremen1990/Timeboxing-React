import React, { useState } from "react";

import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

const EditableTimebox = () => {
  const [title, setTitle] = useState("Uczę się Code splitting");
  const [totalTimeInMinutes, setTotalTimeInMinutes] = useState(15);
  const [isEditable, setIsEditable] = useState(false);

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };
  const handleTotalTimeInMinutesChange = ({ target }) => {
    setTotalTimeInMinutes(target.value);
  };
  const handleConfirm = () => {
    setIsEditable(false);
  };
  const handleEdit = () => {
    setIsEditable(true);
  };

  return (
    <>
      {isEditable ? (
        <TimeboxEditor
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={isEditable}
          onConfirm={handleConfirm}
          onTitleChange={handleTitleChange}
          onTotalTimeInMinutesChange={handleTotalTimeInMinutesChange}
        />
      ) : (
        <CurrentTimebox
          isEditable={isEditable}
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          onEdit={handleEdit}
        />
      )}
    </>
  );
};

export default EditableTimebox;
