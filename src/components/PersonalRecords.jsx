const PersonalRecords = ({ personalRecords }) => (
    <section className="mb-8">
      <h2 className="text-2xl font-bold">Melhores Marcas</h2>
      {Object.entries(personalRecords).map(([label, value]) => (
        <p key={label}>{label}: {value}s</p>
      ))}
    </section>
  );
  export default PersonalRecords;
  