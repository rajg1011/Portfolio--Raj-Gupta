function Card({ img, words, client, occupation }) {
  //Testimony Card
  return (
    <div className="card">
      <div className="image">
        <img src={img} alt="Client Image" />
        <div className="icon">
          <i className="fa-solid fa-quote-left"></i>
        </div>
      </div>
      <div className="data">
        <p>{words}</p>
      </div>
      <div className="divider"></div>
      <div className="name">
        <h3>{client}</h3>
        <span>{occupation}</span>
      </div>
    </div>
  );
}

export default Card;
