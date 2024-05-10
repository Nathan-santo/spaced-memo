import {Button} from "primereact/button";
import React from "react";
import { useEffect } from "react";
import customCard from "../card/CustomCard.jsx";

const AddCard = () => {
    return (
        <div>
            <div className="customAddCard">
                <p>Je suis un titre</p>
                <input/>
                <Button type={"submit"}>Submit</Button>
            </div>
        </div>
    );
};

export default AddCard;
