import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { ClipboardList, CheckCircle2, Clock3, AlertCircle } from "lucide-react";
import { Card, PageHead } from "../../../components/common/PagePrimitives";
import { grievancesService } from "../../../services/api/grievancesService";

export default function GrievancesPage() {
  const { notify } = useOutletContext();
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGrievances();
  }, []);

  const loadGrievances = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await grievancesService.getMyGrievances();
      if (response.ok) {
        setGrievances(response.data);
      } else {
        setError("Failed to load grievances");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const activeCount = grievances.filter((g) => g.status !== "resolved").length;

  return (
    <>
      <PageHead
        eyebrow="STUDENT SUPPORT"
        title="Grievances"
        desc="Raise an issue and track what happens next."
        action={
          <button className="primary" onClick={() => notify("Demo: grievance form opened")}>
            + New grievance
          </button>
        }
      />

      <div className="grievance-layout">
        <Card>
          <div className="card-head">
            <div>
              <h3>My grievances</h3>
              <p>Private to your account</p>
            </div>
            <span className="pill">{activeCount} active</span>
          </div>

          {loading && <p style={{ textAlign: "center", padding: "20px" }}>Loading grievances...</p>}

          {error && (
            <div style={{ textAlign: "center", padding: "20px", color: "var(--red)" }}>
              <AlertCircle size={20} style={{ marginBottom: "10px" }} />
              <p>{error}</p>
            </div>
          )}

          {!loading && grievances.length === 0 && (
            <p style={{ textAlign: "center", padding: "20px", color: "var(--gray)" }}>
              No grievances submitted yet
            </p>
          )}

          {!loading &&
            grievances.map((g) => (
              <div className="grievance-row" key={g.id}>
                <div className="g-icon">
                  <ClipboardList size={18} />
                </div>
                <div className="row-main">
                  <b>
                    {g.id} · {g.title}
                  </b>
                  <span>Updated {g.updatedAt}</span>
                </div>
                <span className={"status " + (g.status === "resolved" ? "green" : "amber")}>
                  {g.status.charAt(0).toUpperCase() + g.status.slice(1)}
                </span>
              </div>
            ))}
        </Card>

        <Card>
          <h3>How it works</h3>
          <div className="timeline">
            {["Submitted", "Acknowledged", "Assigned", "Under Review", "Resolved"].map(
              (x, i) => (
                <div className={i < 3 ? "done" : ""} key={x}>
                  <span>{i < 3 ? <CheckCircle2 size={17} /> : <Clock3 size={17} />}</span>
                  <b>{x}</b>
                </div>
              )
            )}
          </div>
          <button
            className="outline full"
            onClick={() => notify("Demo: grievance tracking opened")}
          >
            Track a grievance
          </button>
        </Card>
      </div>
    </>
  );
}