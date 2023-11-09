import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";

const CustomDialog = ({ data, visible, actions }) => {
  const footerContent = (
    <div>
      <h4>C'est ce à quoi tu penses ?</h4>
      <Button
        label="Non"
        icon="pi pi-times"
        onClick={rejectButton}
        className="p-button-text"
      />
      <Button label="OuI" icon="pi pi-check" onClick={acceptButton} autoFocus />
    </div>
  );

  function rejectButton() {
    actions.update_positionCard(data, "down");
    actions.onHide();
  }
  function acceptButton() {
    actions.update_positionCard(data, "up");
    actions.onHide();
  }

  return (
    <>
      <Dialog
        header={data?.title}
        visible={visible}
        footer={footerContent}
        style={{ width: "70vw" }}
      >
        <p> Réponse : {data?.response}</p>
      </Dialog>
    </>
  );
};

export default CustomDialog;
