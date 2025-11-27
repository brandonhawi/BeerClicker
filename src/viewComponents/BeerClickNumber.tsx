export default function BeerClickNumber() {
  return (
    <span
      id="beer-click-number-template"
      className="visible"
      style={{
        position: "absolute",
        userSelect: "none",
        color: "#f2f2f2",
        fontWeight: "800",
        fontSize: "20px",
        textShadow: "1px 1px 2px black",
        display: "none",
      }}
    ></span>
  );
}
