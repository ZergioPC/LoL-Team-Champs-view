import './LolSearch.css'

const LolSearch = ({ query, teamName, champList, OnSetQuery, OnAddChamp })=>{  
  return(
    <header className="LolSearch">
      <h2>{teamName}</h2>
      <div className="LolSearch-input">
        <input
          type="text" 
          value={query}
          placeholder="Buscar Champ"
          onChange={(e)=>OnSetQuery(e.target.value)}
        />
        
        {query && <ul className="LolSearch-results">
          {champList.length === 0 && <li key="0">No hay Coincidencias</li>}
          {champList.length > 0 && champList.map( champ =>(
            <li key={champ.id}>
              <button
                onClick={()=> OnAddChamp(champ.id)} 
              >{champ.name}</button>
            </li>
          ))}
        </ul>}
      </div>
    </header>
  );
}

export { LolSearch };
