import React from "react";
import { useOutletContext } from "react-router-dom";
import { PageHead, Card } from "../../../components/common/PagePrimitives";
import ReviewQueue from "../components/ReviewQueue";
import { permissionService } from "../../../services/auth/permissionService";
import { Lock } from "lucide-react";

export default function AcademicMaintainerPage() {
  const { notify, user } = useOutletContext();

  const canAccess = permissionService.hasPermission("REVIEW_MATERIAL", user?.role);

  if (!canAccess) {
    return (
      <>
        <PageHead
          eyebrow="ACADEMIC MODERATION"
          title="Maintainer Console"
          desc="Review, approve, reject and unpublish academic materials."
        />
        <Card style={{ textAlign: "center", padding: "60px 20px" }}>
          <Lock size={50} style={{ marginBottom: "15px", opacity: 0.5 }} />
          <h3 style={{ marginBottom: "5px" }}>Access Denied</h3>
          <p style={{ color: "var(--gray)" }}>
            Only academic maintainers and admins can access this console.
          </p>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHead
        eyebrow="ACADEMIC MODERATION"
        title="Maintainer Console"
        desc="Review, approve, reject and unpublish academic materials."
      />
      <ReviewQueue notify={notify} user={user} />
    </>
  );
}
