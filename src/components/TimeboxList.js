import React, { useState, useContext, useEffect } from "react";

import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/FetchTimeboxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";
import timebox from "./Timebox";
// import Timebox from "./Timebox";

const Timebox = React.lazy(() => import("./Timebox"));

const TimeboxList = () => {
  const { accessToken } = useContext(AuthenticationContext);

  const [timeboxes, setTimeboxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    TimeboxesAPI.getAllTimeboxes(accessToken)
      .then((timeboxes) => setTimeboxes(timeboxes))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const addTimebox = (timebox) => {
    TimeboxesAPI.addTimebox(timebox, accessToken).then((addedTimebox) =>
      setTimeboxes((prevState) => [...prevState, addedTimebox])
    );
  };

  const removeTimebox = (indexToRemove) => {
    TimeboxesAPI.removeTimebox(timeboxes[indexToRemove], accessToken).then(() =>
      setTimeboxes((prevState) => {
        const timeboxes = prevState.filter(
          (timebox, index) => index !== indexToRemove
        );
        return timeboxes;
      })
    );
  };

  const updateTimebox = (indexToUpdate, timeboxToUpdate) => {
    TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken).then(
      (updatedTimebox) =>
        setTimeboxes((prevState) => {
          const timeboxes = prevState.map((timebox, index) =>
            index === indexToUpdate ? updatedTimebox : timebox
          );
          return timeboxes;
        })
    );
  };

  const handleCreate = (createdTimebox) => {
    try {
      addTimebox(createdTimebox);
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboxa:", error);
    }
  };

  return (
    <>
      <TimeboxCreator onCreate={handleCreate} />
      {loading ? "Timeboxy się ładują..." : null}
      {error ? "Nie udało się załadować :(" : null}
      {timeboxes.map((timebox, index) => (
        <React.Suspense fallback={"loading timebox..."}>
          <Timebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => this.removeTimebox(index)}
            onEdit={() =>
              updateTimebox(index, {
                ...timebox,
                title: "Updated timebox",
              })
            }
          />
        </React.Suspense>
      ))}
    </>
  );
};

TimeboxList.contextType = AuthenticationContext;

export default TimeboxList;
