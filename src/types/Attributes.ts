export interface Character {
  id: string;
  type: string;
  attributes: CharacterAttributes;
  links: Links;
}

export interface CharacterAttributes {
  slug: string;
  alias_names: string[];
  animagus: string;
  blood_status: string;
  boggart: string;
  born: string;
  died: string;
  eye_color: string;
  family_members: string[];
  gender: string;
  hair_color: string;
  height: string;
  house: string;
  image: string;
  jobs: string[];
  marital_status: string;
  name: string;
  nationality: string;
  patronus: string;
  romances: string[];
  skin_color: string;
  species: string;
  titles: string[];
  wands: string[];
  weight: string;
  wiki: string;
}

export interface Links {
  self: string;
}

export default Character;
//TODO skoro všechno je string OR null - je potřeba to sem psát?!
