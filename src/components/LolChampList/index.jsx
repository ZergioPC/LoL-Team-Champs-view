import './LolChampList.css'

const LolChampList = ({children})=>{
  return(
    <main>
      <ul className="LolChampList">
        {children}
      </ul>
    </main>
  );
}

export { LolChampList };
