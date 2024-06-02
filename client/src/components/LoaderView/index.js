import { GridLoader } from "react-spinners";

const LoaderView = () => {
  return (
    <div className=" flexColCenter" style={{ height: "60vh" }}>
      <GridLoader color="black" height="80" width="80" />
    </div>
  );
};

export default LoaderView;
