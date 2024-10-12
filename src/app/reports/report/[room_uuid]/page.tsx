import ReportDetail from "@/features/reports/components/report/detail";
import { useEffect } from "react";

// import EsportsGameView from "@/features/esports/components/view";
type ReportDeatailPageProps = {
  params: { room_uuid: string };
};
const EsportsGameViewPage: React.FC<ReportDeatailPageProps> = ({
  params,
}) => {
  return (
    <div>
      <ReportDetail room_uuid={params.room_uuid} />
    </div>
  );
};

export default EsportsGameViewPage;
