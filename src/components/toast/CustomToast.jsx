import { Toast } from "primereact/toast";
import { forwardRef } from "react";

const CustomToast = forwardRef(({}, ref) => {
  return <Toast ref={ref} className="toast_alert" />;
});

export default CustomToast;
