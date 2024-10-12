import { Header } from "@/features/auth/components/header";
import { ForgotPasswordContainer } from "@/features/auth/components/forgotPassword/index.container";

const ForgotPassword = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <ForgotPasswordContainer />
      </div>
    </>
  );
};

export default ForgotPassword;
