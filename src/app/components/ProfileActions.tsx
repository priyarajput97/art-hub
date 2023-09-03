import IconMore from "@/app/icon-components/IconMore";
import { IUser } from "../profile/page";
import ButtonOutline from "../utils-components/ButtonOutline";

const ProfileActions = ({ user }: { user: IUser }) => {
  return (
    <div className="flex items-center">
      <span className="text-xl mr-auto">{user?.username}</span>
      <ButtonOutline title="Follow" classes="mr-2" />
      <IconMore className="mr-2 cursor-pointer" />
    </div>
  );
};

export default ProfileActions;
