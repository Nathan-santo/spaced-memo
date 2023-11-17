import { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import CustomCard from "./components/card/CustomCard";
import CustomDialog from "./components/dialog/CustomDialog";
import CardForm from "./components/form/CardForm";
import dayjs from "dayjs";
import ForcedViewSelector from "./components/forcedView/ForcedViewSelector";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import spacedLogo from "./assets/spaced-memo.png";
import first_Data from "./mock_data.json";
import HelperTooltip from "./components/helper-tooltip/HelperTooltip";
import CustomToast from "./components/toast/CustomToast";
import CustomStats from "./components/stats/CustomStats";
import { PrimeReactContext } from "primereact/api";
import { InputSwitch } from "primereact/inputswitch";

//The App function return Jsx.ELEMENT => return after compilation html and javascript vanilla only
function App() {
  const today = new dayjs();
  const toast = useRef(null);
  const [data, setData] = useState(
    localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
  );
  const [forcedView, setForcedView] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formDisplay, setFormDisplay] = useState(false);
  const [cardInformations, setCardInformations] = useState(null);
  function setDialogVisibility() {
    setVisible(true);
  }
  function hide() {
    setVisible(false);
  }
  function setCardInfo(card) {
    setCardInformations(card);
  }
  function save_newCard(card) {
    setData((oldState) => {
      const newData = [...oldState, card];
      return newData;
    });
  }
  function update_forcedView(selectedView) {
    setForcedView(selectedView);
  }

  function update_positionCard(card, upOrDown) {
    switch (upOrDown) {
      case "up":
        setData((oldState) => {
          let OnlyIfDelete = null;
          const newState = oldState
            .map((element) => {
              if (element.id === card.id) {
                if (element.position <= 6) {
                  const newElement = {
                    ...element,
                    position: ++element.position,
                    lastView: today,
                  };

                  return newElement;
                }
              } else return element;
            })
            .filter((element) => {
              if (element !== undefined) {
                return element;
              } else {
                const numberOf_cardsClosed =
                  localStorage.getItem("CardsClosed");
                const numberOf_ten_cardsClosed =
                  localStorage.getItem("TenCardsClosed");
                const numberOf_undred_cardsClosed =
                  localStorage.getItem("UndredCardsClosed");
                if (
                  numberOf_cardsClosed &&
                  parseInt(numberOf_cardsClosed) < 9
                ) {
                  localStorage.setItem(
                    "CardsClosed",
                    (numberOf_cardsClosed
                      ? parseInt(numberOf_cardsClosed) + 1
                      : 0
                    ).toString()
                  );
                } else if (
                  numberOf_ten_cardsClosed &&
                  parseInt(numberOf_ten_cardsClosed) < 9
                ) {
                  localStorage.setItem(
                    "TenCardsClosed",
                    (numberOf_ten_cardsClosed
                      ? parseInt(numberOf_ten_cardsClosed) + 1
                      : 1
                    ).toString()
                  );
                  localStorage.setItem("CardsClosed", "0");
                } else if (
                  numberOf_undred_cardsClosed &&
                  parseInt(numberOf_undred_cardsClosed) < 9
                ) {
                  localStorage.setItem(
                    "UndredCardsClosed",
                    (numberOf_undred_cardsClosed
                      ? parseInt(numberOf_undred_cardsClosed) + 1
                      : 1
                    ).toString()
                  );
                  localStorage.setItem("TenCardsClosed", "0");
                  localStorage.setItem("CardsClosed", "0");
                } else {
                  localStorage.setItem("UndredCardsClosed", "0");
                  localStorage.setItem("TenCardsClosed", "0");
                  localStorage.setItem("CardsClosed", "1");
                }
              }
            });
          if (OnlyIfDelete) {
            return OnlyIfDelete;
          }
          return newState;
        });
        break;
      case "down":
        setData((oldState) => {
          const newState = oldState.map((element) => {
            if (element.id === card.id) {
              if (element.position >= 2) {
                const newElement = {
                  ...element,
                  position: --element.position,
                  lastView: today,
                };
                return newElement;
              } else {
                const newElement = {
                  ...element,
                  lastView: today,
                };
                return newElement;
              }
            } else return element;
          });
          return newState;
        });
        break;

      default:
        break;
    }
  }

  function is_good_moment_for_display_this_card(card) {
    const { lastView, position } = card;
    function get_diff_between_lastView_and_now(lastView) {
      return today.diff(dayjs(lastView), "day");
    }
    if (get_diff_between_lastView_and_now(lastView) > position + 1) {
      return true;
    } else {
      return false;
    }
  }

  function is_forceView_contain_element_position(card) {
    const { position } = card;
    if (forcedView && Array.isArray(forcedView)) {
      const forcedView_reduced = forcedView.reduce((acc, curr) => {
        acc.push(curr.position);
        return acc;
      }, []);
      if (forcedView_reduced.includes(position)) {
        return true;
      } else return false;
    }
  }

  const show = (message = <b>Validé</b>, severity = "info") => {
    toast.current.show({
      severity: severity,
      detail: <b>{message}</b>,
    });
  };

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstOpened");
    if (data.length === 0 && !isFirstVisit) {
      //Si pas de donnés intégration de la maquette de donnée dans le local storage
      localStorage.setItem("data", JSON.stringify(first_Data));
      localStorage.setItem("firstOpened", "true");
      //Ajout de ces données par le hook useState
      setData(first_Data);
    } else {
      //sinon Enregistrement des données par écrasement des données précédentes
      localStorage.setItem("data", JSON.stringify(data));
    }
    //fonction executé  à chaques modification de data
  }, [data]);

  const { changeTheme } = useContext(PrimeReactContext);
  function switch_theme(e) {
    setIsDarkMode(e.value);

    // Obtenez le thème actuel de l'élément de lien
    const currentTheme = document
      .getElementById("theme-link")
      .getAttribute("href");

    // Choisissez le nouveau thème en fonction du thème actuel
    const newTheme = e.value
      ? "/themes/lara-dark-indigo/theme.css"
      : "/themes/lara-light-indigo/theme.css";

    // Utilisez la fonction changeTheme pour changer le thème dynamiquement
    changeTheme(currentTheme, newTheme, "theme-link");
  }
  return (
    <div className="app_container">
      <div className="header_container">
        <div className="switch">
          <label htmlFor="dark_switch">{isDarkMode ? "Dark" : "Light"}</label>
          <InputSwitch
            id="dark_switch"
            la
            checked={isDarkMode}
            onChange={(e) => switch_theme(e)}
          />
        </div>
        <HelperTooltip />
        <img id="logo-app" src={spacedLogo} alt="Spaced-logo" />
        <h1>Apprend à apprendre</h1>
        <div className="header_toolbar">
          <Button
            className="add_card_button"
            onClick={() => setFormDisplay(true)}
          >
            Ajouter une carte
          </Button>
          <ForcedViewSelector
            forcedView={forcedView}
            actions={{ update_forcedView: update_forcedView }}
          />
        </div>
      </div>
      <div className="app_content">
        <CustomDialog
          data={cardInformations}
          visible={visible}
          actions={{
            hide: hide,
            update_positionCard: update_positionCard,
            show: show,
          }}
        />
        <div className="card_and_stats_container">
          <div className="cards_container">
            <h3>Mes cartes à mémorisé</h3>
            <div className="cards_content">
              <Dialog
                header="Ajouter une carte"
                visible={formDisplay}
                onHide={() => setFormDisplay(false)}
              >
                <CustomCard
                  actions={{
                    setCardInfo: setCardInfo,
                  }}
                  data={{
                    title: "",
                    form: (
                      <CardForm
                        actions={{
                          save_newCard: save_newCard,
                          show: show,
                        }}
                      />
                    ),
                  }}
                />
              </Dialog>
              {data.map((element) => {
                if (
                  is_good_moment_for_display_this_card(element) ||
                  is_forceView_contain_element_position(element)
                ) {
                  return (
                    <CustomCard
                      key={element.id}
                      data={element}
                      actions={{
                        setCardInfo: setCardInfo,
                        setDialogVisibility: setDialogVisibility,
                      }}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className="stats_container">
            <h3>Stats</h3>
            <span>Nombre de cartes terminés</span>
            <div className="stats_content">
              <CustomStats />
            </div>
          </div>
        </div>
      </div>
      <CustomToast ref={toast} />
    </div>
  );
}

export default App;
