import EsportsGameView from "@/features/esports/components/view";
type EsportsGameViewPageProps = {
  params: { id: number };
};
const EsportsGameViewPage: React.FC<EsportsGameViewPageProps> = ({
  params,
}) => {
  return (
    <>
      <EsportsGameView gameId={params.id} />
    </>
  );
};

export default EsportsGameViewPage;
