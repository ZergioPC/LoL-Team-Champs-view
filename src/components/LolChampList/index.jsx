import './LolChampList.css'

const LolChampList = ({children})=>{
  return(
    <main className="LolChampListWrap">
      <ul className="LolChampList">
        {children}
      </ul>
    </main>
  );
}

export { LolChampList };
