import "./SettingsModal.css";

import { Modal } from "../Modal";

const SettingsModal = ({ settings, onChange, onClose }) => {
  const toggle = (key) => onChange({ ...settings, [key]: !settings[key] });

  return (
    <Modal onClose={onClose}>
      <div className="SettingsModal">
        <h2>Ajustes</h2>

        <label className="SettingsModal-option">
          <div>
            <h3>Mantener barra de búsqueda visible</h3>
            <p>
              Muestra siempre el buscador sin necesidad de pasar el mouse.
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.keepHeaderVisible}
            onChange={() => toggle("keepHeaderVisible")}
          />
        </label>

        <label className="SettingsModal-option">
          <div>
            <h3>Mostrar habilidades (Q W E R)</h3>
            <p>Muestra la lista de habilidades de cada campeón.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.showSpells}
            onChange={() => toggle("showSpells")}
          />
        </label>

        <label className="SettingsModal-option">
          <div>
            <h3>Modo Lol CLasic</h3>
            <p>Activado muestra únicamente campeones del Clasic. Desactivado los oculta.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.jadeOnly}
            onChange={() => toggle("jadeOnly")}
          />
        </label>
      </div>
    </Modal>
  );
};

export { SettingsModal };
