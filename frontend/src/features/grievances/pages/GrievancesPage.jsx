import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ClipboardList, CheckCircle2, Clock3, AlertCircle, Lock } from "lucide-react";
import { Card, PageHead } from "../../../components/common/PagePrimitives";
import { grievancesService } from "../../../services/api/grievancesService";
import { permissionService } from "../../../services/auth/permissionService";

export default function GrievancesPage() {
  const { notify, user } = useOutletContext();
  const navigate = useNavigate();
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

  const handleNewGrievance = () => {
    const canSubmit = permissionService.canPerformAction("SUBMIT_GRIEVANCE", user);
    
    if (!canSubmit.allowed) {
      if (canSubmit.reason === "LOGIN_REQUIRED") {
        notify("Please login to submit a grievance");
        navigate("/login");
      }
      return;
    }

    notify("Demo: grievance form opened");
  };

  const handleUpdateGrievance = (grievanceId, newStatus) => {
    const canUpdate = permissionService.canPerformAction("ACCEPT_GRIEVANCE", user);
    
    if (!canUpdate.allowed) {
      notify("Only maintainers and admins can update grievances");
      return;
    }

    setGrievances(
      grievances.map((g) => 
        g.id === grievanceId ? { ...g, status: newStatus } : g
      )
    );
    notify(`Grievance ${grievanceId} updated to ${newStatus}`);
  };

  const activeCount = grievances.filter((g) => g.status !== "resolved").length;
  const canManageGrievances = permissionService.hasPermission("ACCEPT_GRIEVANCE", user?.role);

  return (
    <>
      <PageHead
        eyebrow="STUDENT SUPPORT"
        title="Grievances"
        desc="Raise an issue and track what happens next."
        action={
          <button className="primary" onClick={handleNewGrievance}>
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
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span className={"status " + (g.status === "resolved" ? "green" : "amber")}>
                    {g.status.charAt(0).toUpperCase() + g.status.slice(1)}
                  </span>
                  {canManageGrievances && g.status !== "resolved" && (
                    <button
                      className="ghost small"
                      onClick={() => handleUpdateGrievance(g.id, "resolved")}
                      title="Resolve this grievance"
                    >
                      ✓
                    </button>
                  )}
                </div>
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