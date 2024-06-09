import educationData from "./educationData";

function Education() {
  return (
    <div className="education">
      <ul>
        {educationData.map((item) => {
          return (
            <li key={item.id}>
              <div className="institute-name-year">
                <span className="institute-name">
                  <h3>{item.name}</h3>
                </span>
                <span className="year">
                  {item.EnterYear}-{item.EndYear}
                </span>
              </div>
              <div className="divider-education"></div>
              <div className="education-details">
                <span>{item.data1}</span>
                <p>{item.data2}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Education;
