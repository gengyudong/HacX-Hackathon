const colourMapping = {
  "United States": "black",
  Canada: "blue",
  "United Kingdom": "green",
  Australia: "yellow",
  Germany: "purple",
  France: "orange",
  India: "pink",
  Japan: "brown",
  Malaysia: "red",
  "Brazil:": "lightblue",
};

const Legend = () => {
    return (
      <div>
        <h3>Legend</h3>
        <ul>
          {Object.keys(colourMapping).map((country) => (
            <li key={country}>
              <span
                style={{
                  backgroundColor: colourMapping[country],
                  width: "10px",
                  height: "10px",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              ></span>
              {country}
            </li>
          ))}
        </ul>
      </div>
    );
    };

export default Legend;
