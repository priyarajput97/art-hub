import Link from "next/link";
import IconAdd from "@/app/icon-components/IconAdd";
import IconMore from "@/app/icon-components/IconMore";
import { IUser } from "../profile/page";
import EditProfile from "./EditProfile";

const MyProfileActions = ({ user }: { user: IUser | null }) => {
  return (
    <div className="flex items-center">
      <span className="text-xl mr-auto">{user?.username}</span>
      <Link href="create-post">
        <IconAdd className="mr-2 h-6 w-6 cursor-pointer" />
      </Link>
      <EditProfile />
      <IconMore className="mr-2 cursor-pointer" />
    </div>
  );
};

export default MyProfileActions;
