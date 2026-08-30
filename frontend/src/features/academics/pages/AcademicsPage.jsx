import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ChevronRight, Download, FileText, Upload, AlertCircle, Lock } from "lucide-react";
import { Card, PageHead } from "../../../components/common/PagePrimitives";
import UploadDemo from "../components/UploadDemo";
import ReviewQueue from "../../academic-maintainer/components/ReviewQueue";
import { academicsService } from "../../../services/api/academicsService";
import { permissionService } from "../../../services/auth/permissionService";

export default function AcademicsPage({ role }) {
  const { notify, user } = useOutletContext();
  const navigate = useNavigate();
  const [tab, setTab] = useState("browse");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await academicsService.getMaterials();
      if (response.ok) {
        setMaterials(response.data);
      } else {
        setError("Failed to load materials");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (material) => {
    notify(`Downloading: ${material.title}`);
  };

  const handleUpload = () => {
    const canUpload = permissionService.canPerformAction("UPLOAD_MATERIAL", user);
    
    if (!canUpload.allowed) {
      if (canUpload.reason === "LOGIN_REQUIRED") {
        notify("Please login to upload materials");
        navigate("/login");
      }
      return;
    }

    setTab("upload");
  };

  const handleReview = () => {
    const canReview = permissionService.canPerformAction("REVIEW_MATERIAL", user);
    
    if (!canReview.allowed) {
      notify("Only maintainers and admins can review materials");
      return;
    }

    setTab("review");
  };

  return (
    <>
      <PageHead
        eyebrow="ACADEMIC RESOURCE HUB"
        title="Academics"
        desc="Department → Semester → Subject → Study Materials"
        action={
          permissionService.hasPermission("UPLOAD_MATERIAL", user?.role) ? (
            <button className="primary" onClick={handleUpload}>
              <Upload size={16} /> Upload material
            </button>
          ) : permissionService.hasPermission("REVIEW_MATERIAL", user?.role) ? (
            <button className="primary" onClick={handleReview}>
              Review queue
            </button>
          ) : null
        }
      />
      <div className="academic-nav">
        <button className={tab === "browse" ? "active" : ""} onClick={() => setTab("browse")}>
          Browse materials
        </button>
        {permissionService.hasPermission("UPLOAD_MATERIAL", user?.role) && (
          <button className={tab === "upload" ? "active" : ""} onClick={() => setTab("upload")}>
            My uploads
          </button>
        )}
        {permissionService.hasPermission("REVIEW_MATERIAL", user?.role) && (
          <button className={tab === "review" ? "active" : ""} onClick={() => setTab("review")}>
            Maintainer review
          </button>
        )}
        <button>Departments</button>
      </div>

      {tab === "browse" && (
        <>
          <div className="academic-path">
            <span>Computer Science</span>
            <ChevronRight />
            <span>Semester 5</span>
            <ChevronRight />
            <b>All Subjects</b>
          </div>

          {loading && <div className="loading-state">Loading materials...</div>}

          {error && (
            <div className="error-state">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          {!loading && materials.length === 0 && (
            <div className="empty-state">
              <FileText size={40} />
              <p>No materials available for this selection</p>
            </div>
          )}

          {!loading && materials.length > 0 && (
            <div className="material-grid">
              {materials.map((m) => (
                <Card key={m.id}>
                  <div className="file-icon">
                    <FileText />
                  </div>
                  <span className="pill">{m.type}</span>
                  <h3>{m.title}</h3>
                  <p>
                    {m.subject} · Sem {m.semester}
                  </p>
                  <div className="material-meta">
                    <small>{m.views} views · {m.downloads} downloads</small>
                  </div>
                  <div className="material-foot">
                    <span className="status green">Approved</span>
                    <button className="outline small" onClick={() => handleDownload(m)}>
                      <Download size={14} /> Download
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "upload" && (
        permissionService.hasPermission("UPLOAD_MATERIAL", user?.role) ? (
          <UploadDemo notify={notify} />
        ) : (
          <Card style={{ textAlign: "center", padding: "60px 20px" }}>
            <Lock size={40} style={{ marginBottom: "10px", opacity: 0.5 }} />
            <p>You don't have permission to upload materials</p>
          </Card>
        )
      )}

      {tab === "review" && (
        permissionService.hasPermission("REVIEW_MATERIAL", user?.role) ? (
          <ReviewQueue notify={notify} user={user} />
        ) : (
          <Card style={{ textAlign: "center", padding: "60px 20px" }}>
            <Lock size={40} style={{ marginBottom: "10px", opacity: 0.5 }} />
            <p>Only maintainers and admins can review materials</p>
          </Card>
        )
      )}
    </>
  );
}