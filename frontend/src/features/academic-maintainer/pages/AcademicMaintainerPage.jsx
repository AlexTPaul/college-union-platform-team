import React from "react";
import { useOutletContext } from "react-router-dom";
import { PageHead, Card } from "../../../components/common/PagePrimitives";
import ReviewQueue from "../components/ReviewQueue";
export default function AcademicMaintainerPage(){ const {notify}=useOutletContext();
  return <>
    <PageHead eyebrow="ACADEMIC MODERATION" title="Maintainer Console" desc="Review, approve, reject and unpublish academic materials."/>
    <ReviewQueue notify={notify}/>
  </>;
}
