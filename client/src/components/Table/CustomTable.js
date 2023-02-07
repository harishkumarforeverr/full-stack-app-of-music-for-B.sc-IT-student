import React, { useEffect } from "react";
import "./CustomTable.scss";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { setTableLoadingTrue, setTableLoadingFalse } from "../../store/SpinSlice/SpinSlice";
const CustomTable = (props) => {
  const dispatch = useDispatch();
  const spinState = useSelector((state) => state.spin);

  // useEffect(() => {
  //   if (spinState.loading) {
  //     dispatch(setTableLoadingTrue());
  //   }
  // }, [spinState.loading]);
  return (
    <>
      <Table
        getPopupContainer={(trigger) => trigger.parentNode}
        showSorterTooltip={false}
        className="CustomTable"
        {...props}
        loading={spinState?.TableLoading}
      />
    </>
  );
};

export default CustomTable;
