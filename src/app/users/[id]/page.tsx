import UserProfileComponent from "@/features/users/components/userProfile";
type UserProfileProps = {
  params: { id: number };
};
const UserProfile = ({ params }: UserProfileProps) => {
  return (
    <>
      <UserProfileComponent id={params.id} />
    </>
  );
};

export default UserProfile;
