const Space = ({ height, width }) => {
  return (
    <div style={{ height: height, width: width ? width : 0 }}>
    </div>
  );
};

export default Space;