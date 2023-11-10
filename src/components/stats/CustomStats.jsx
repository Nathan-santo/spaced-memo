import { Knob } from "primereact/knob";

const CustomStats = () => {
  const numberOf_undred_cardsClosed = localStorage.getItem("UndredCardsClosed");
  const numberOf_ten_cardsClosed = localStorage.getItem("TenCardsClosed");
  const numberOf_cardsClosed = localStorage.getItem("CardsClosed");
  return (
    <>
      <div className="individual_stats">
        <Knob
          value={
            numberOf_undred_cardsClosed
              ? parseInt(numberOf_undred_cardsClosed)
              : 0
          }
          max={10}
          strokeWidth={4}
        />
        <span>Centaines</span>
      </div>
      <div className="individual_stats">
        <Knob
          value={
            numberOf_ten_cardsClosed ? parseInt(numberOf_ten_cardsClosed) : 0
          }
          max={10}
          strokeWidth={4}
        />
        <span>Dixaines</span>
      </div>
      <div className="individual_stats">
        <Knob
          value={numberOf_cardsClosed ? parseInt(numberOf_cardsClosed) : 0}
          max={10}
          strokeWidth={4}
        />
        <span>Unités</span>
      </div>
    </>
  );
};

export default CustomStats;
