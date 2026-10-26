import "./DashboardPage.css";

const overviewItems = [
  {
    title: "Connection",
    value: "Not connected",
    description: "ESP32 connection status",
    icon: "⌁",
  },
  {
    title: "Battery",
    value: "Unavailable",
    description: "Battery level",
    icon: "▰",
  },
  {
    title: "LED",
    value: "Unknown",
    description: "LED status",
    icon: "●",
  },
  {
    title: "Buttons",
    value: "Unknown",
    description: "Three physical buttons",
    icon: "▦",
  },
];

export function DashboardPage() {
  return (
    <div className="dashboard">
      <section className="dashboard__status-grid" aria-label="Device overview">
        {overviewItems.map((item) => (
          <article className="dashboard-card" key={item.title}>
            <div className="dashboard-card__header">
              <span className="dashboard-card__icon" aria-hidden="true">
                {item.icon}
              </span>
              <h2>{item.title}</h2>
            </div>

            <p className="dashboard-card__value">{item.value}</p>
            <p className="dashboard-card__description">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="dashboard__welcome dashboard-card">
        <h2>ESP32 Smart Panel</h2>
        <p>
          Your dashboard layout is ready. Hardware integration will be added in
          a later development phase.
        </p>
      </section>
    </div>
  );
}
