// import EsportsGameView from "@/features/esports/components/view";
type TeamAvatarProps = {
   url: string;
   is_winner: boolean
};
const TeamAvatar: React.FC<TeamAvatarProps> = ({
  url,
  is_winner
}) => {
  return (
    <div>
      <img src={url} alt="" className={`w-40 h-40 rounded-2xl ${is_winner?'border-2 border-red-500':''} shadow-lg mx-10`}/>
      {/* <EsportsGameView gameId={params.id} /> */}
    </div>
  );
};

export default TeamAvatar;
