import { useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ISuperhero } from "../../types/superhero";
import "./editor.scoped.scss";

interface Props {
  keyToChange: string;
}

export const Editor: React.FC<Props> = ({ keyToChange }) => {
  const [updatedKey, setUpdatedKey] = useState("");

  const { updateSuperhero } = useActions();

  const { superheroes, activeSuperhero } = useAppSelector(
    state => state.superheroes,
  );

  const currentSuperhero = superheroes.find(
    superhero => superhero._id === activeSuperhero,
  );

  if (!currentSuperhero) {
    return <h1>Please, choose superhero</h1>;
  }

  const updateCurrentSuperhero = () => {
    const preparedSuperhero =
      keyToChange === "superpowers"
        ? {
            ...currentSuperhero,
            [keyToChange]: [...currentSuperhero.superpowers, updatedKey],
          }
        : {
            ...currentSuperhero,
            [keyToChange]: updatedKey,
          };

    updateSuperhero(preparedSuperhero);
  };

  return (
    <div className="superhero__editor">
      <p className="superhero__current-info">
        Current {keyToChange}: {currentSuperhero.nickname}
      </p>
      <input
        value={updatedKey}
        onChange={e => setUpdatedKey(e.target.value)}
        type="text"
        placeholder={keyToChange}
        className="input superhero__edit-name"
      />
      <button
        onClick={e => updateCurrentSuperhero()}
        className="superhero__button-name"
      >
        Change
      </button>
    </div>
  );
};
