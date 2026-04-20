import dynamic from "next/dynamic";

const PreparednessSurvey = dynamic(() => import("@/components/PreparednessSurvey"), { ssr: false });

export default function PreparednessPage() {
  return <PreparednessSurvey />;
}
