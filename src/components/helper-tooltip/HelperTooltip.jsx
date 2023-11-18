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
      <div className="helper_tooltip_container">
        <div className="helper_tooltip" onClick={helpFunction}>
          <i className="pi pi-question icon_helper"></i>
        </div>
      </div>
      <Dialog
        header={"Aide"}
        visible={isVisible}
        onHide={onHide}
        style={{ width: "80vw" }}
      >
        <p>
          Pour chaques niveau correspond une durée de réactivation de
          l'information. <br />
          <a href="https://youtu.be/RVB3PBPxMWg" target="_BLANK">
            Source : Science étonnante
          </a>
        </p>
        <p>
          A chaques rendu un calcul est fais pour savoir si le dernière fois que
          la carte à été lue correspond au moins à cette durée.
        </p>
        <p>Les règles : </p>
        <ul>
          <li>Soyez clair et verbeux dans vos questions.</li>
          <li>Soyez honnêtes avec vous-même.</li>
          <li>L'aciduité paye mieux que l'acharnement.</li>
          <li>Amusez-vous de vos réponses !</li>
        </ul>
        <p>Pour facilité l'accès : </p>
        <ul>
          <li>Ajoutez un rendez-vous réccurent dans votre agenda.</li>
          <li>
            Installez le site en tant qu'application mobile (Chrome, paramètres,
            ajouter à l'écran d'accueil).
          </li>
        </ul>
        <p>Pour allez plus loin :</p>
        <ul>
          <li>Créez un compte gitHub.</li>
          <li>Vote pour le projet.</li>
          <li>
            Contribuez à celui-ci en rajoutant des fonctionnalités (Je vous
            aiderez à le faire)
          </li>
        </ul>
        <p>Me contacter, ressources :</p>
        <ul>
          <li>
            <a href="mailto:adresse-email@exemple.com?subject=A%20propos%20du%20d%C3%A9pot%20spaced-memo&body=Salut%20Pierre%2C%20j'ai%20une%20question%20%C3%A0%20te%20pos%C3%A9%2C%20">
              Par email
            </a>
          </li>
          <li>
            <a href="https://discord.gg/QcBMfFPd" target="_BLANK">
              Par Discord
            </a>
          </li>
          <li>
            <a href="https://github.com/solarpush/spaced-memo" target="_BLANK">
              Le projet complet(README.EN)
            </a>
          </li>
          <li>
            <a
              href="https://github.com/solarpush/spaced-memo/blob/main/README-FR.md"
              target="_BLANK"
            >
              Le projet complet(README.FR)
            </a>
          </li>
        </ul>
      </Dialog>
    </>
  );
};

export default HelperTooltip;
