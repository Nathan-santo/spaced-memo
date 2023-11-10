import { Toast } from "primereact/toast";

const CustomToast = ({ ref }) => {
  return <Toast ref={ref} className="toast_alert" />;
};

export default CustomToast;
