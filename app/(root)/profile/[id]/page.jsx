import { fetchUser } from "@/lib/actions/user.actions";

const page = async ({ userId }) => {
  const userInfo = await fetchUser(userId);

  return (
    <div>
      <h1 className="head-text">Profile</h1>
    </div>
  );
};

export default page;
