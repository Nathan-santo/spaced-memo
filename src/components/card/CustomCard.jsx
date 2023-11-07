import { Card } from "primereact/card";
import { Button } from "primereact/button";

const CustomCard = ({ data, actions }) => {
  const displayRepsonseDialog = () => {
    actions.setDialogVisibility();
    actions.setCardInfo(data);
  };
  return (
    <Card
      className="card"
      title={data.title}
      subTitle={!data.form && "Niveau " + data.position}
    >
      {data.form ? data.form : <p>{data.ask}</p>}
      {!data.form && (
        <Button onClick={displayRepsonseDialog}>Voir la réponse</Button>
      )}
    </Card>
  );
};

export default CustomCard;
