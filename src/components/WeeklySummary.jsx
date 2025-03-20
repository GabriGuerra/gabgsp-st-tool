const WeeklySummary = ({ weeklyStats }) => (
    <section className="mb-8">
      <h2 className="text-2xl font-bold">Últimas 4 Semanas</h2>
      <p>Atividades/semana: {weeklyStats.activitiesPerWeek}</p>
      <p>Média de distância/semana: {weeklyStats.avgDistancePerWeek} km</p>
      <p>Média de tempo/semana: {weeklyStats.avgTimePerWeek} h</p>
      <p>Ganho de elevação/semana: {weeklyStats.elevationGainPerWeek} m</p>
    </section>
  );
  export default WeeklySummary;
  