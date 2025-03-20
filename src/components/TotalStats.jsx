const TotalStats = ({ totals }) => (
    <section>
      <h2 className="text-2xl font-bold">Totais</h2>
      <p>Atividades: {totals.totalActivities}</p>
      <p>Distância: {totals.totalDistance} km</p>
      <p>Tempo: {totals.totalTime} h</p>
      <p>Ganho de elevação: {totals.totalElevation} m</p>
    </section>
  );
  export default TotalStats;
  