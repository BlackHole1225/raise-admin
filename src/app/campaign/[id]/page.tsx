"use client"
import KycForm from "@/features/games/components/kycform";

type EditProps = {
  params: {id: number};
};

const GameEdit: React.FC<EditProps> = ({
  params
}) => {
  return(
    <>
        <KycForm
        gameId={params.id.toString()}
      />
    </>
  )
};

export default GameEdit;