import React from "react";
import "./LolChampItem.css"

const LolChampItem = ({ champ, champImg, OnRemove })=>{
  const keys = ["Q", "W", "E", "R"];
  
  return(
    <article className="LolChampItem">
      <button 
        className="LolChampItem-btn" 
        onClick={()=> OnRemove(champ.id)}
      />
      <h3>{champ.name}</h3>

      <figure>
        <img src={champImg + champ.image.full} alt={"Foto de " + champ.id} />
      </figure>

      <ol>
        {champ.spells.map((spell,index) => (
          <li 
            key={spell.id}
          > 
            <span>{keys[index]}</span>
            <p>{spell.name}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}

export { LolChampItem };