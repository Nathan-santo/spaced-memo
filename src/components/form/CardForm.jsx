import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { uid } from "uid";

const CardForm = ({ actions }) => {
  const [formState, setFormState] = useState({
    title: "",
    ask: "",
    response: "",
    position: 1,
    id: uid(16),
    lastView: null,
  });

  function resetForm() {
    setFormState({
      title: "",
      ask: "",
      response: "",
      position: 1,
      id: uid(16),
      lastView: null,
    });
  }

  function saveCard(e) {
    e.preventDefault();
    const card = {
      ...formState,
    };

    actions.save_newCard(card);
    actions.show("Enregistré", "success");
    resetForm();
  }

  return (
    <form onSubmit={saveCard} className="form_container">
      <label htmlFor="title_input">Titre de la carte.</label>
      <InputText
        id="title_input"
        className="p-inputtext-sm"
        value={formState.title}
        onChange={(e) =>
          setFormState((state) => ({ ...state, title: e.target.value }))
        }
        minLength={4}
        required
      />
      <label htmlFor="quizz_input">Quizz</label>
      <InputTextarea
        id="quizz_input"
        value={formState.ask}
        onChange={(e) =>
          setFormState((state) => ({ ...state, ask: e.target.value }))
        }
        autoResize
        rows={4}
        minLength={10}
        required
      />

      <label htmlFor="response_input">Réponse</label>
      <InputText
        id="response_input"
        value={formState.response}
        onChange={(e) =>
          setFormState((state) => ({ ...state, response: e.target.value }))
        }
        minLength={3}
        required
      />
      <label htmlFor="sumbit_input">Soumettre</label>
      <Button id="sumbit_input" type="submit">
        Ajouté
      </Button>
    </form>
  );
};

export default CardForm;
