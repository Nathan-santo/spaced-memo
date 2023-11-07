import { useEffect, useState } from "react";
import "./App.css";
import CustomCard from "./components/card/CustomCard";
import CustomDialog from "./components/dialog/CustomDialog";
import CardForm from "./components/form/CardForm";
import dayjs from "dayjs";
import ForcedViewSelector from "./components/ForcedViewSelector/ForcedViewSelector";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

//The App function return Jsx.ELEMENT => return after compilation html and javascript vanilla only
function App() {
  const today = new dayjs();
  const [data, setData] = useState(
    localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []
  );
  const [forcedView, setForcedView] = useState(null);

  const [visible, setVisible] = useState(false);
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
  function delete_thisCard(data, cardId) {
    return data.filter((f) => f.id !== cardId);
  }

  function update_positionCard(card, upOrDown) {
    switch (upOrDown) {
      case "up":
        setData((oldState) => {
          let OnlyIfDelete = null;
          const newState = oldState.map((element) => {
            if (element.id === card.id) {
              if (element.position <= 6) {
                const newElement = {
                  ...element,
                  position: ++element.position,
                  lastView: today,
                };

                return newElement;
              } else {
                OnlyIfDelete = delete_thisCard(oldState, element.id);
              }
            } else return element;
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
            if (element.id === card.id && element.position >= 1) {
              const newElement = {
                ...element,
                position: --element.position,
                lastView: today,
              };
              return newElement;
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
    const { id, lastView, position } = card;
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
      console.log(forcedView_reduced);
      if (forcedView_reduced.includes(position)) {
        return true;
      } else return false;
    }
  }
  const [formDisplay, setFormDisplay] = useState(false);

  useEffect(() => {
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <div className="app_container">
      <div className="header_container">
        <h1>Spaced Mémo App</h1>
        <Button onClick={() => setFormDisplay(true)}>Ajouter une carte</Button>
      </div>
      <div className="app_container">
        <ForcedViewSelector
          forcedView={forcedView}
          actions={{ update_forcedView: update_forcedView }}
        />
        <CustomDialog
          data={cardInformations}
          visible={visible}
          actions={{ onHide: onHide, update_positionCard: update_positionCard }}
        />
        <div className="cards_container">
          <Dialog
            header="Ajouter une carte"
            visible={formDisplay}
            onHide={() => setFormDisplay(false)}
          >
            <CustomCard
              data={{
                title: "",
                form: (
                  <CardForm
                    actions={{
                      save_newCard: save_newCard,
                    }}
                  />
                ),
              }}
              actions={{
                setCardInfo: setCardInfo,
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
    </div>
  );
}

export default App;
