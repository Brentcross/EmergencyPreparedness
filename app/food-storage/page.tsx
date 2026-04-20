import dynamic from "next/dynamic";

const FoodStorageSurvey = dynamic(() => import("@/components/FoodStorageSurvey"), { ssr: false });

export default function FoodStoragePage() {
  return <FoodStorageSurvey />;
}
