export default function ComplianceDashboard() {
  // Helper: แสดง client cell
  const ClientCell = ({ completed, required, missing, score }) => {
    if (completed === null) return <span className="text-muted">—</span>;
    const color = missing === 0 ? "#198754" : "#dc3545";
    return (
      <div>
        <div className="fw-semibold" style={{ fontSize: "13px", color }}>
          {missing === 0 ? "Complete" : `${missing} Missing`}
        </div>
        <div className="text-muted" style={{ fontSize: "11px" }}>
          {completed} / {required} completed
        </div>
        <div
          style={{
            fontSize: "11px",
            color:
              score >= 80 ? "#198754" : score >= 60 ? "#ffc107" : "#dc3545",
            fontWeight: 600,
          }}
        >
          {score}% Match
        </div>
      </div>
    );
  };

  // Mock data — จะ replace ด้วย API /api/compliance/dashboard ทีหลัง
  const mockWorkers = [
    {
      id: 1,
      name: "Roberto Santos",
      position: "Rigger",
      alerts: { expired: 1, dueSoon: 1 },
      clients: {
        chevron: { required: 26, completed: 15, missing: 11, score: 58 },
        erawan: { required: 40, completed: 18, missing: 22, score: 45 },
        ptt: null,
        valeura: null,
      },
    },
    {
      id: 2,
      name: "Somchai Jaidee",
      position: "6G Welder",
      alerts: { expired: 0, dueSoon: 1 },
      clients: {
        chevron: { required: 26, completed: 11, missing: 15, score: 42 },
        erawan: { required: 40, completed: 17, missing: 23, score: 42 },
        ptt: null,
        valeura: null,
      },
    },
    {
      id: 3,
      name: "Ahmad Bin Hassan",
      position: "Rigger",
      alerts: { expired: 0, dueSoon: 0 },
      clients: {
        chevron: { required: 26, completed: 26, missing: 0, score: 100 },
        erawan: null,
        ptt: null,
        valeura: null,
      },
    },
  ];

  return (
    <div className="container-fluid p-4">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">Compliance Center</h2>
          <p className="text-muted mb-0">
            Certification Monitoring, Gap Analysis & Position Matching
          </p>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
          }}
          className="mb-4"
        >
          {[
            {
              icon: "⚠️",
              value: 15,
              label: "Expired",
              bg: "#fff5f5",
              bar: "#dc3545",
              color: "text-danger",
            },
            {
              icon: "🔔",
              value: 2,
              label: "Critical",
              bg: "#fff8e1",
              bar: "#ffc107",
              color: "text-warning",
            },
            {
              icon: "🕐",
              value: 5,
              label: "Due Soon",
              bg: "#e8f4fd",
              bar: "#0dcaf0",
              color: "text-info",
            },
            {
              icon: "✅",
              value: 120,
              label: "Valid",
              bg: "#f0fff4",
              bar: "#198754",
              color: "text-success",
            },
          ].map((card) => (
            <div key={card.label} className="card shadow-sm border-0">
              <div className="card-body d-flex align-items-center gap-3 px-4 py-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    background: card.bg,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{card.icon}</span>
                </div>
                <div>
                  <div
                    className={`${card.color} fw-bold`}
                    style={{ fontSize: "28px", lineHeight: 1 }}
                  >
                    {card.value}
                  </div>
                  <div className="text-muted" style={{ fontSize: "13px" }}>
                    {card.label}
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: "4px",
                  background: card.bar,
                  borderRadius: "0 0 4px 4px",
                }}
              />
            </div>
          ))}
        </div>

        {/* Worker Compliance Overview */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-bottom py-3 px-4">
            <h6 className="fw-bold mb-0">Worker Compliance Overview</h6>
          </div>
          <div className="card-body p-0">
            <table
              className="table table-hover align-middle mb-0"
              style={{ fontSize: "13px" }}
            >
              <thead className="table-light">
                <tr>
                  <th className="ps-4 pe-4 py-2 text-dark fw-bold">Worker</th>
                  <th className="pe-4 py-2 text-dark fw-bold">Position</th>
                  <th className="pe-4 py-2 text-dark fw-bold text-center">
                    Cert Alerts
                  </th>
                  <th className="pe-4 py-2 text-dark fw-bold text-center">
                    Chevron
                  </th>
                  <th className="pe-4 py-2 text-dark fw-bold text-center">
                    Erawan
                  </th>
                  <th className="pe-4 py-2 text-dark fw-bold text-center">
                    PTT
                  </th>
                  <th className="pe-4 py-2 text-dark fw-bold text-center">
                    Valeura
                  </th>
                  <th className="pe-4 py-2 text-dark fw-bold text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockWorkers.map((w) => (
                  <tr key={w.id}>
                    <td className="ps-4 pe-4 py-2 fw-medium">{w.name}</td>
                    <td className="pe-4 py-2">{w.position}</td>

                    {/* Cert Alerts */}
                    <td className="pe-4 py-2 text-center">
                      {w.alerts.expired === 0 && w.alerts.dueSoon === 0 ? (
                        <span
                          className="badge bg-success px-2 py-1"
                          style={{ fontSize: "11px" }}
                        >
                          ✅ All Valid
                        </span>
                      ) : (
                        <div className="d-flex flex-column align-items-center gap-1">
                          {w.alerts.expired > 0 && (
                            <span
                              className="badge bg-danger px-2 py-1"
                              style={{ fontSize: "11px" }}
                            >
                              🔴 {w.alerts.expired} Expired
                            </span>
                          )}
                          {w.alerts.dueSoon > 0 && (
                            <span
                              className="badge bg-warning text-dark px-2 py-1"
                              style={{ fontSize: "11px" }}
                            >
                              🟡 {w.alerts.dueSoon} Due Soon
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Client columns */}
                    {["chevron", "erawan", "ptt", "valeura"].map((client) => (
                      <td key={client} className="pe-4 py-2 text-center">
                        <ClientCell
                          {...(w.clients[client] ?? { completed: null })}
                        />
                      </td>
                    ))}

                    {/* Actions */}
                    <td className="pe-4 py-2 text-center">
                      <button
                        className="btn btn-sm btn-outline-primary px-2 py-0"
                        style={{ fontSize: "12px" }}
                      >
                        View Gap
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
