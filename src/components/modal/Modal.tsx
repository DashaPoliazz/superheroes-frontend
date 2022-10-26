import React, { useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IPicture } from "../../types/superhero";
import { Loader } from "../loader/Loader";

import "./modal.scoped.scss";

export const Modal = () => {
  const { addNewSuperhero, toggleModal } = useActions();

  const [nickname, setNickaname] = useState("");
  const [realname, setRealname] = useState("");
  const [superheroDescription, setSuperheroDescription] = useState("");
  const [catchphrase, setCatchphrase] = useState("");
  const [superpowers, setSuperpowers] = useState("");

  const { isLoading } = useAppSelector(state => state.superheroes);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSuperhero = {
      nickname: nickname,
      real_name: realname,
      origin_description: superheroDescription,
      superpowers: [superpowers],
      catch_phrase: catchphrase,
      currentImage: null,
      Images: [],
    };

    addNewSuperhero(newSuperhero);
    toggleModal();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <p className="modal__title">Let's add some new hero!</p>
          <button onClick={e => toggleModal()} className="modal__button-close">
            X
          </button>
        </div>
        <div className="modal__body">
          <form
            onSubmit={e => onSubmitHandler(e)}
            action="submit"
            className="modal__form form"
          >
            <input
              value={nickname}
              onChange={e => setNickaname(e.target.value)}
              type="text"
              className="form__name input"
              placeholder="Please, enter nickname"
            />
            <input
              value={realname}
              onChange={e => setRealname(e.target.value)}
              type="text"
              className="form__name input"
              placeholder="Please, enter real name"
            />
            <textarea
              value={superheroDescription}
              onChange={e => setSuperheroDescription(e.target.value)}
              className="form__description"
              name="origin_description"
              id="origin_description"
              placeholder="Please, enter new description"
            />
            <input
              value={catchphrase}
              onChange={e => setCatchphrase(e.target.value)}
              type="text"
              className="form__name input"
              placeholder="Please, enter catch phrase"
            />
            <input
              value={superpowers}
              onChange={e => setSuperpowers(e.target.value)}
              type="text"
              className="form__name input"
              placeholder="Please, enter superpower"
            />
            <button type="submit" className="form__button">
              Add hero
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
