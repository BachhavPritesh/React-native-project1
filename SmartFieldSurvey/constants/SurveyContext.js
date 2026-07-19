import React, { createContext, useState } from "react";

export const SurveyContext = createContext(null);

let idCounter = 1;

export function SurveyProvider({ children }) {
  const [surveys, setSurveys] = useState([]);
  const [draftPhoto, setDraftPhoto] = useState(null);
  const [draftLocation, setDraftLocation] = useState(null);
  const [draftContact, setDraftContact] = useState(null);
  const [draftNotes, setDraftNotes] = useState("");
  const [editingSurvey, setEditingSurvey] = useState(null);

  function addSurvey(survey) {
    const newSurvey = { ...survey, id: idCounter++ , date: survey.date || new Date().toLocaleDateString() };
    setSurveys((prev) => [newSurvey, ...prev]);
    return newSurvey;
  }

  function updateSurvey(updated) {
    setSurveys((prev) =>
      prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s))
    );
  }

  function deleteSurvey(id) {
    setSurveys((prev) => prev.filter((s) => s.id !== id));
  }

  function clearDraft() {
    setDraftPhoto(null);
    setDraftLocation(null);
    setDraftContact(null);
    setDraftNotes("");
    setEditingSurvey(null);
  }

  return (
    <SurveyContext.Provider
      value={{
        surveys,
        addSurvey,
        updateSurvey,
        deleteSurvey,
        draftPhoto,
        setDraftPhoto,
        draftLocation,
        setDraftLocation,
        draftContact,
        setDraftContact,
        draftNotes,
        setDraftNotes,
        editingSurvey,
        setEditingSurvey,
        clearDraft,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}
