import accomplishmentData from "./accomplishmentData";

function AccomplishmentList({ data, id }) {
  return (
    <>
      <li key={id}>{data}</li>
      {id != accomplishmentData.length && <div className="divider-accom"></div>}
    </>
  );
}
function Accomplishment() {
  return (
    <div className="accomplish-section">
      <ul>
        {accomplishmentData.map((item) => (
          <AccomplishmentList data={item.data} id={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default Accomplishment;
