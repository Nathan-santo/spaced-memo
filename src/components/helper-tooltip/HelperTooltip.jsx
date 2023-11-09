import { Dialog } from "primereact/dialog";
import { useState } from "react";

const HelperTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);
  function helpFunction() {
    setIsVisible(true);
  }
  function onHide() {
    setIsVisible(false);
  }
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "30px",
          right: "30px",
          display: "flex",
          placeContent: "center",
          width: "30px",
          height: "30px",
          border: "1px white dotted",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onClick={helpFunction}
      >
        <i
          className="pi pi-question"
          style={{ transform: "translateY(25%)" }}
        ></i>
      </div>
      <Dialog
        header={"Aide"}
        visible={isVisible}
        onHide={onHide}
        style={{ width: "80vw" }}
      >
        <p>{`Pour chaques niveau correspond une durée de réactivation de l'information.
        A chaques rendu un calcul est fais pour savoir si le dernière fois que la carte à été lue correspond au moins à cette durée.
        
        Les règles : 
                - Soyez clair et verbeux dans vos questions.
                - Soyez honnêtes avec vous-même.
                - L'aciduité paye mieux que l'acharnement.
                - Amusez-vous de vos réponses !
        
        Pour facilité l'accès :
                - Ajoutez un rendez-vous réccurent dans votre agenda.
                - Installez le site en tant qu'aplication mobile. (Chrome, parametre, ajouter à l'écran d'accueil).

        Pour allez plus loin : 
                - Créez un compte gitHub.
                - Star le projet.
                - Contribuez à celui-ci en rajoutant des fonctionnalités. (Je vous aiderez à le faire)
        `}</p>
      </Dialog>
    </>
  );
};

export default HelperTooltip;
