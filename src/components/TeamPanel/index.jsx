import { LolChampList } from "../LolChampList";
import { LolChampItem } from "../LolChampItem";
import { LolChampItemLoad } from "../LolChampItemLoad";

const TeamPanel = ({ className, champs, loading, champImg, onRemove, showSpells = true }) => (
  <section className={className}>
    <LolChampList>
      {champs.map((champ) => (
        <LolChampItem
          key={champ.id}
          champ={champ}
          champImg={champImg}
          OnRemove={() => onRemove(champ.id)}
          showSpells={showSpells}
        />
      ))}
      {loading && <LolChampItemLoad />}
    </LolChampList>
  </section>
);

export { TeamPanel };
