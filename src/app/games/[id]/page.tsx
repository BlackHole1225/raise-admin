"use client"
import EditGameForm from "@/features/games/components/editgame";

type EditProps = {
  params: {id: number};
};

const GameEdit: React.FC<EditProps> = ({
  params
}) => {
  return(
    <>
      <EditGameForm
        gameId={params.id.toString()}
      />
    </>
  )
};

export default GameEdit;