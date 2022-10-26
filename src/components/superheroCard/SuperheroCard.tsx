import { useActions } from "../../hooks/useActions";
import { ISuperhero } from "../../types/superhero";

import { useNavigate } from "react-router-dom";

import "./superheroCard.scoped.scss";
import { useAppSelector } from "../../hooks/useAppSelector";

interface Props {
  superHeroData: ISuperhero;
}

export const SuperheroCard: React.FC<Props> = ({ superHeroData }) => {
  const { nickname, _id, currentImage } = superHeroData;
  
  const navigate = useNavigate();

  const { setActiveSuperhero, setCurrentImage } = useActions();

  const { isLoading } = useAppSelector(state => state.files);


  const onChangeHandler = (e: any) => {
    console.log(e.target.files[0]);

    if (_id && e.target.files[0]) {
      setCurrentImage({
        imageToSet: e.target.files[0],
        superheroId: _id,
      });
    }
  };

  console.log(superHeroData);

  return (
    <a href="" className="card">
      <img
        src={
          isLoading
            ? "https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
            : currentImage?.imageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
        }
        className="card__image"
        alt=""
      />
      <div className="card__top-overlay">
        <div className="file-input">
          <label className="file-input__label">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="upload"
              className="svg-inline--fa fa-upload fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
              />
            </svg>
            <span>Upload file</span>
            <input
              onChange={e => onChangeHandler(e)}
              type="file"
              name="file-input"
              id="file-input"
              className="file-input__input"
            />
          </label>
        </div>
      </div>
      <div className="card__overlay">
        <div className="card__header">
          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>
          <div className="card__header-text">
            <h3 className="card__title">{nickname}</h3>
          </div>
        </div>
        <button
          onClick={e => {
            e.preventDefault();
            if (_id) {
              setActiveSuperhero(_id);
            }
            navigate("/superhero");
          }}
          className="button  card__button"
        >
          Show details
        </button>
      </div>
    </a>
  );
};
