import { Link } from 'react-router-dom';

import Character from '../../types/Attributes';

import './styles.css';
export const Catalog = ({ data }: { data: Character[] }) => {
  return (
    <>
      <div className="catalog-container">
        {data.map((item, index: number) => (
          <article className="catalog-card" key={index}>
            <Link to={`character/${item?.id}`}>
              <img
                className="item-image"
                src={`${item?.attributes?.image || '/default-img.svg'}`}
                alt=""
              />
              <p>{item?.attributes?.name}</p>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
};

export default Catalog;
