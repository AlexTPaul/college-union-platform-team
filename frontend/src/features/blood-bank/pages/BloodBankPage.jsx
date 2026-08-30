import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Droplets, HeartPulse, Phone, AlertCircle } from "lucide-react";
import { Card, PageHead } from "../../../components/common/PagePrimitives";
import { bloodBankService } from "../../../services/api/bloodBankService";

export default function BloodBankPage() {
  const { notify } = useOutletContext();
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDonorsAndRequests();
  }, []);

  const loadDonorsAndRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const [donorsResponse, requestsResponse] = await Promise.all([
        bloodBankService.getDonors(),
        bloodBankService.getRequests(),
      ]);

      if (donorsResponse.ok) {
        setDonors(donorsResponse.data);
      }
      if (requestsResponse.ok) {
        setRequests(requestsResponse.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!selectedBloodGroup) {
      notify("Please select a blood group");
      return;
    }
    setLoading(true);
    try {
      const response = await bloodBankService.getDonors({ bloodGroup: selectedBloodGroup });
      if (response.ok) {
        setDonors(response.data);
        notify(`Found ${response.data.length} donors`);
      }
    } catch (err) {
      notify("Error searching for donors");
    } finally {
      setLoading(false);
    }
  };

  const bloodGroups = bloodBankService.getBloodGroups();
  const urgentRequests = requests.filter((r) => r.urgency === "high");

  return (
    <>
      <PageHead
        eyebrow="COMMUNITY SUPPORT"
        title="Blood Bank"
        desc="Connect verified donors and urgent blood requests."
      />

      <div className="blood-hero">
        <div>
          <span className="eyebrow light">DONATE • SUPPORT • SAVE</span>
          <h2>Every donor can make a difference.</h2>
          <p>Donor information is private and shared only through approved request workflows.</p>
          <button
            className="primary"
            onClick={() => notify("Demo: donor registration opened")}
          >
            Register as donor
          </button>
        </div>
        <Droplets size={90} />
      </div>

      {error && (
        <div className="error-state">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      <div className="blood-grid">
        <Card>
          <div className="card-head">
            <div>
              <h3>Find a donor</h3>
              <p>Search available, opted-in donors</p>
            </div>
          </div>
          <div className="blood-select">
            <select value={selectedBloodGroup} onChange={(e) => setSelectedBloodGroup(e.target.value)}>
              <option value="">Select blood group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            <button className="primary" onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {donors.length > 0 ? (
            donors.map((donor) => (
              <div key={donor.id} className="donor">
                <div className="bloodtype">{donor.bloodGroup}</div>
                <div>
                  <b>{donor.verified ? "Verified donor" : "Donor"}</b>
                  <span>{donor.campus ? "Campus" : "Nearby"} · Last donation: {donor.lastDonation}</span>
                </div>
                <button className="outline" onClick={() => notify("Demo: contact request sent")}>
                  Request
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", padding: "20px", color: "var(--gray)" }}>
              No donors found. Try searching with a blood group.
            </p>
          )}
        </Card>

        <Card>
          <h3>Active requests ({requests.length})</h3>
          {requests.length === 0 ? (
            <p style={{ textAlign: "center", padding: "20px", color: "var(--gray)" }}>
              No active requests
            </p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="request">
                <div className="bloodtype">{req.bloodGroup}</div>
                <div>
                  <b>{req.requester}</b>
                  <span>
                    {req.hospital} · {req.createdAt}
                  </span>
                </div>
                <span className={`status ${req.urgency === "high" ? "red" : "amber"}`}>
                  {req.urgency === "high" ? "Urgent" : "Open"}
                </span>
              </div>
            ))
          )}
        </Card>
      </div>
    </>
  );
}