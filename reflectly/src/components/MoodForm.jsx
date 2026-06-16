import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const MOODS = {
  Happy: [
    "Playful",
    "Content",
    "Curiosity",
    "Proud",
    "Acceptance",
    "Powerful",
    "Care",
    "Trust",
    "Hope",
  ],
  Surprise: ["Shock", "Confusion", "Amazement", "Excitement"],
  Bad: ["Boredom", "Busy", "Stressed", "Tired"],
  Afraid: ["Scared", "Anxious", "Insecure", "Weak", "Shaky", "Nervous"],
  Angry: [
    "Mistrust",
    "Shame",
    "Jealousy",
    "Mad",
    "Irritation",
    "Frustration",
    "Distant",
    "Critical",
  ],
  Disgust: ["Disapproval", "Disdain", "Sick", "Repulsion"],
};
function MainMood({ setShowMainMoods, setShowSubMood, setMainMood }) {
  function handleSelect(e) {
    setMainMood(e.currentTarget.textContent);
    setShowMainMoods(false);
    setShowSubMood(true);
  }

  return (
    <div className="main-mood-page">
      <div className="main-mood-btn-container">
        {Object.keys(MOODS).map((mainEmotion, index) => (
          <button
            key={mainEmotion}
            id={`btn-${mainEmotion}`}
            className="mood-btn btn-primary"
            onClick={handleSelect}
            style={{
              transform: `
        translate(-50%, -50%)
          rotate(${index * (360 / Object.keys(MOODS).length)}deg)
          translateY(-120px)
          rotate(${-index * (360 / Object.keys(MOODS).length)}deg)
      `,
            }}
          >
            {mainEmotion}
          </button>
        ))}
      </div>
      <h1>How are you feeling today?</h1>
    </div>
  );
}

function SubMood({
  mainMood,
  setSubMood,
  setShowSubMood,
  setShowJournalEntry,
}) {
  function handleSelect(e) {
    setSubMood(e.currentTarget.textContent);
    setShowSubMood(false);
    setShowJournalEntry(true);
  }
  return (
    <div className={`submood-page`}>
      <h1>{mainMood}?</h1>
      <div className="submood-container">
        {mainMood &&
          MOODS[mainMood].map((submood) => (
            <button
              key={submood}
              className="btn-primary"
              onClick={handleSelect}
            >
              {submood}
            </button>
          ))}
      </div>
    </div>
  );
}

function JournalEntry({ mainMood, subMood, setDraft, submitEntry }) {
  function updateDraft(e) {
    setDraft(e.target.value);
  }
  return (
    <div className={`journal-page background-${mainMood}`}>
      <h1>{subMood}?</h1>
      <textarea placeholder="I am feeling..." onChange={updateDraft}></textarea>
      <button className="menu-icon" onClick={submitEntry}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
}
export function MoodForm({ isOpen, setShowMoodForm }) {
  const [showMainMoods, setShowMainMoods] = useState(false);
  const [mainMood, setMainMood] = useState("");
  const [showSubMood, setShowSubMood] = useState(false);
  const [showJournalEntry, setShowJournalEntry] = useState(false);
  const [subMood, setSubMood] = useState("");
  const [draft, setDraft] = useState("");
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
      setShowMainMoods(true);
    } else {
      dialog.close();
    }
  }, [isOpen]);

  async function submitEntry() {
    try {
      const response = await axios.post(
        "/api/journal/entry",
        {
          mood: mainMood,
          "sub-mood": subMood,
          prompt: "None",
          text: draft,
        },
        { withCredentials: true },
      );
      const dialog = dialogRef.current;
      dialog.close();
      setShowMainMoods(false);
      setShowSubMood(false);
      setShowJournalEntry(false);
      setMainMood("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <dialog ref={dialogRef} className={`background-${mainMood}`}>
      <button
        className="close-dialog-btn control-btn"
        onClick={() => {
          setShowMoodForm(false);
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {showMainMoods && (
        <MainMood
          setShowMainMoods={setShowMainMoods}
          setMainMood={setMainMood}
          setShowSubMood={setShowSubMood}
        />
      )}
      {showSubMood && (
        <SubMood
          mainMood={mainMood}
          setSubMood={setSubMood}
          setShowSubMood={setShowSubMood}
          setShowJournalEntry={setShowJournalEntry}
        />
      )}

      {showJournalEntry && (
        <JournalEntry
          mainMood={mainMood}
          subMood={subMood}
          setDraft={setDraft}
          submitEntry={submitEntry}
        />
      )}
    </dialog>
  );
}
