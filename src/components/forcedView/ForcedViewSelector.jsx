import { MultiSelect } from "primereact/multiselect";

const ForcedViewSelector = ({ forcedView, actions }) => {
  const cities = [
    { position: 1, niveau: "Niveau 1" },
    { position: 2, niveau: "Niveau 2" },
    { position: 3, niveau: "Niveau 3" },
    { position: 4, niveau: "Niveau 4" },
    { position: 5, niveau: "Niveau 5" },
    { position: 6, niveau: "Niveau 6" },
    { position: 7, niveau: "Niveau 7" },
  ];

  return (
    <div className="selector">
      <label htmlFor="forced_selector">Vue forcé des niveaux</label>
      <MultiSelect
        id="forced_selector"
        value={forcedView}
        onChange={(e) => actions.update_forcedView(e.value)}
        options={cities}
        optionLabel="niveau"
        selectAllLabel="Tous"
        display="chip"
        placeholder="Forcer l'affichage par niveau"
        maxSelectedLabels={8}
      />
    </div>
  );
};

export default ForcedViewSelector;
