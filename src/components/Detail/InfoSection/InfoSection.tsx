interface InfoField {
  label: string;
  value: string | undefined;
}

interface InfoSectionProps {
  name: string;
  info: InfoField[];
}

export const InfoSection: React.FC<InfoSectionProps> = ({ name, info }) => {
  //Adjustments for when some data are not present
  // // A) Eliminate solitary labels with no corresponding values
  const validInfo = info.filter(
    (field) => field.value !== null && field.value !== undefined,
  );
  //(null occurs when null comes from API, undefined when it is an empty array (wands, jobs))

  // // B) Check if the category contains any piece of information, if not, do not display it
  if (validInfo.length === 0) {
    return null;
  }
  return (
    <section className="info-section">
      <h2 className="section-name">{name}</h2>
      {validInfo.map((item) => (
        <p className="info" key={item.label}>
          <span className="category-name">{item.label}</span>
          {item.value}
        </p>
      ))}
    </section>
  );
};

export default InfoSection;
