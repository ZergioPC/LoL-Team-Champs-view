import { LolSearch } from "../LolSearch";
import { LolChampList } from "../LolChampList";
import { LolChampItem } from "../LolChampItem";
import { LolChampItemLoad } from "../LolChampItemLoad";

const TeamPanel = ({
  team,
  className,
  teamName,
  query,
  champList,
  champs,
  loading,
  champImg,
  onSetQuery,
  onAddChamp,
  onRemove,
}) => (
  <section className={className}>
    <LolSearch
      query={query}
      teamName={teamName}
      champList={champList}
      OnSetQuery={onSetQuery}
      OnAddChamp={(id) => onAddChamp(team, id)}
    />

    <LolChampList>
      {champs.map((champ) => (
        <LolChampItem
          key={champ.id}
          champ={champ}
          champImg={champImg}
          OnRemove={() => onRemove(champ.id)}
        />
      ))}
      {loading && <LolChampItemLoad />}
    </LolChampList>
  </section>
);

export { TeamPanel };
