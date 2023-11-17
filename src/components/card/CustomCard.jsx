import { Card } from "primereact/card";
import { Button } from "primereact/button";
import dayjs from "dayjs";
import { secondsToHms } from "../../time_function";

const CustomCard = ({ data, actions }) => {
  const displayRepsonseDialog = () => {
    actions.setDialogVisibility();
    actions.setCardInfo(data);
  };

  function get_time_for_next_appear(card) {
    const { lastView, position } = card;
    const today = new dayjs();

    function get_diff_between_nextView_and_now(lastView) {
      const seconde_before_nextView = today.diff(
        dayjs(lastView).add(position + 1, "day"),
        "second"
      );
      return secondsToHms(seconde_before_nextView * -1);
    }
    return get_diff_between_nextView_and_now(lastView);
  }

  const time_before_next_appear = get_time_for_next_appear(data);

  return (
    <Card
      className="card"
      title={data.title}
      subTitle={!data.form && "Niveau " + data.position}
      style={{ maxHeight: data.form ? "800px" : "450px" }}
    >
      {data.form ? data.form : <p>{data.ask}</p>}
      {!data.form && (
        <>
          <Button onClick={displayRepsonseDialog}>Voir la réponse</Button>
          {time_before_next_appear && <p>{time_before_next_appear}</p>}
        </>
      )}
    </Card>
  );
};

export default CustomCard;
