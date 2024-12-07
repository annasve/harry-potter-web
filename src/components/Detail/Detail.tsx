import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CharacterAttributes } from '../../types/Attributes';
import InfoSection from './InfoSection/InfoSection';

import './styles.css';

//TODO - think about how to display family members

//TODO compare with App.tsx ApiResponse and think about sharing it across files

//TODO resolve "possibly undefined" situations for characterInfo cases systematically here and in InfoSection

interface ApiResponse {
  data: {
    id: string;
    type: string;
    attributes: CharacterAttributes;
    links: {
      self: string;
    };
  };
  meta: {
    copyright: string;
    generated_at: string;
  };
  links: {
    self: string;
  };
}

export const Detail = () => {
  const [characterInfo, setCharacterInfo] =
    useState<CharacterAttributes | null>(null);

  const { id } = useParams(); //(id destructured to a variable of the same name)

  //Retrieve information for a single character by its id
  useEffect(() => {
    const fetchCharacter = async () => {
      if (id) {
        try {
          const response = await fetch(
            `https://api.potterdb.com/v1/characters/${id}`,
          );

          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const result = (await response.json()) as ApiResponse;
          const characterAttributes = result?.data?.attributes;
          setCharacterInfo(characterAttributes);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchCharacter();
  }, [id]);

  //Display info from arrays
  const formatStringArr = (arr: string[]) => {
    if (arr.length > 0)
      return arr
        ?.map((item: string, index) =>
          index === arr.length - 1 ? item : `${item}, `,
        )
        .join('');
  };

  //Information for each category (basic, physical, magical, affiliation)

  const basicInfo = [
    { label: 'Born: ', value: characterInfo?.born },
    { label: 'Died: ', value: characterInfo?.died },
    { label: 'Species: ', value: characterInfo?.species },
    { label: 'Gender: ', value: characterInfo?.gender },
    { label: 'Blood status: ', value: characterInfo?.blood_status },
    { label: 'Nationality: ', value: characterInfo?.nationality },
  ];

  const physicalInfo = [
    { label: 'Height: ', value: characterInfo?.height },
    { label: 'Weight: ', value: characterInfo?.weight },
    { label: 'Skin color: ', value: characterInfo?.skin_color },
    { label: 'Hair color: ', value: characterInfo?.hair_color },
  ];

  const magicalAbilities = [
    { label: 'Animagus: ', value: characterInfo?.animagus },
    { label: 'Patronus: ', value: characterInfo?.patronus },
    { label: 'Boggart: ', value: characterInfo?.boggart },
    {
      label: 'Wand(s): ',
      value: characterInfo ? formatStringArr(characterInfo.wands) : '',
    },
  ];

  const affiliation = [
    { label: 'House: ', value: characterInfo?.house },
    {
      label: 'Job(s): ',
      value: characterInfo ? formatStringArr(characterInfo.jobs) : '',
    },
  ];

  return (
    //TODO link to Home
    <>
      <section className="profile-card">
        {characterInfo && (
          <section className="avatar">
            <h1>{characterInfo?.name}</h1>
            {characterInfo?.titles?.length > 0 && (
              <p>
                <span className="category-name">also </span>
                <span>{formatStringArr(characterInfo.alias_names)}</span>
                <span>{formatStringArr(characterInfo.titles)}</span>
              </p>
            )}

            <img src={`${characterInfo?.image || '/default-img.svg'}`} alt="" />
          </section>
        )}

        <div className="character-facts">
          <InfoSection name="Basic information" info={basicInfo} />
          <InfoSection name="Physical information" info={physicalInfo} />
          <InfoSection name="Magical abilities" info={magicalAbilities} />
          <InfoSection name="Affiliation" info={affiliation} />
        </div>
      </section>
    </>
  );
};

export default Detail;
