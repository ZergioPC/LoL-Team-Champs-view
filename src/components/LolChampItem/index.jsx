import "./LolChampItem.css"

const SPELL_KEYS = ["Q", "W", "E", "R"];

const LolChampItem = ({ champ, champImg, OnRemove, showSpells = true })=>{
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

      {showSpells && (
        <ol>
          {champ.spells.map((spell,index) => (
            <li 
              key={spell.id}
            > 
              <span>{SPELL_KEYS[index]}</span>
              <p>{spell.name}</p>
            </li>
          ))}
        </ol>
      )}
    </article>
  );
}

export { LolChampItem };
