import brushesBG from "../../../public/brushes-bg.jpg";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  return (
    <div className="h-screen flex items-center">
      <img
        src={brushesBG.src}
        className="h-screen grow-0 dark:opacity-50 hidden lg:inline-block overflow-hidden object-cover"
      />
      <div className="basis-full lg:basis-1/2">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
