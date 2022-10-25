import { Carousel } from "react-responsive-carousel";
import { useAppSelector } from "../../hooks/useAppSelector";

export const CCarousel = () => {
  const { superheroes, activeSuperhero } = useAppSelector(
    state => state.superheroes,
  );

  const currentSuperhero = superheroes.find(
    superhero => superhero._id === activeSuperhero,
  );

  return (
    <Carousel>
      {currentSuperhero?.Images.map(image => (
        <div>
          <img src={image} />
        </div>
      ))}
    </Carousel>
  );
};
