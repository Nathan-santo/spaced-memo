import { useEffect, useRef, useState } from "react";
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
import { Knob } from "primereact/knob";
import HelperTooltip from "./components/helper-tooltip/HelperTooltip";
import CustomToast from "./components/toast/CustomToast";

//The App function return Jsx.ELEMENT => return after compilation html and javascript vanilla only
function App() {
  const today = new dayjs();
  const toast = useRef(null);
  const [data, setData] = useState(
    localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
  );
  const [forcedView, setForcedView] = useState(null);

  const [visible, setVisible] = useState(false);
  const [formDisplay, setFormDisplay] = useState(false);
  const [cardInformations, setCardInformations] = useState(null);
  function setDialogVisibility() {
    setVisible(true);
  }
  function onHide() {
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
                if (
                  numberOf_cardsClosed &&
                  parseInt(numberOf_cardsClosed) < 100
                ) {
                  localStorage.setItem(
                    "CardsClosed",
                    (parseInt(numberOf_cardsClosed) + 1).toString()
                  );
                } else {
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

    switch (position) {
      case 0:
        if (get_diff_between_lastView_and_now(lastView) > 1) {
          return true;
        } else {
          return false;
        }

      case 1:
        if (get_diff_between_lastView_and_now(lastView) > 2) {
          return true;
        } else {
          return false;
        }

      case 2:
        if (get_diff_between_lastView_and_now(lastView) > 3) {
          return true;
        } else {
          return false;
        }

      case 3:
        if (get_diff_between_lastView_and_now(lastView) > 4) {
          return true;
        } else {
          return false;
        }

      case 4:
        if (get_diff_between_lastView_and_now(lastView) > 5) {
          return true;
        } else {
          return false;
        }

      case 5:
        if (get_diff_between_lastView_and_now(lastView) > 6) {
          return true;
        } else {
          return false;
        }

      case 6:
        if (get_diff_between_lastView_and_now(lastView) > 7) {
          return true;
        } else {
          return false;
        }

      case 7:
        if (get_diff_between_lastView_and_now(lastView) > 8) {
          return true;
        } else {
          return false;
        }

      default:
        return true;
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

  const CustomKnobs = (data) => {
    const numberOf_cardsClosed = localStorage.getItem("CardsClosed");
    return (
      <Knob
        value={numberOf_cardsClosed ? parseInt(numberOf_cardsClosed) : 0}
        step={1}
      />
    );
  };
  useEffect(() => {
    if (data.length === 0) {
      //Si pas de donnés intégration de la maquette de donnée dans le local storage
      localStorage.setItem("data", JSON.stringify(first_Data));
      //Ajout de ces données par le hook useState
      setData(first_Data);
    } else {
      //sinon Enregistrement des données par écrasement des données précédentes
      localStorage.setItem("data", JSON.stringify(data));
    }
    //fonction executé  à chaques modification de data
  }, [data]);

  return (
    <div className="app_container">
      <div className="header_container">
        <HelperTooltip />
        <img id="logo-app" src={spacedLogo} alt="Spaced-logo" />
        <h1>Mémorisation espacée</h1>
        <Button onClick={() => setFormDisplay(true)}>Ajouter une carte</Button>
      </div>
      <div className="app_content">
        <ForcedViewSelector
          forcedView={forcedView}
          actions={{ update_forcedView: update_forcedView }}
        />
        <CustomDialog
          data={cardInformations}
          visible={visible}
          actions={{
            onHide: onHide,
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
            <div className="stats_content">
              <span>Nombre de cartes terminés</span>
              <CustomKnobs />
            </div>
          </div>
        </div>
      </div>

      <CustomToast ref={toast} />
    </div>
  );
}

export default App;
