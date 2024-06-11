import Image from "next/image";

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  imageUrl,
  bio,
  username,
}) => {
  return (
    <>
      <h1 className="textwhite">Profile header</h1>
      <div className="flex w-full flex-col justify-start">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 object-cover">
              <Image
                src={imageUrl}
                alt="profile image"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-left text-2xl text-white font-bold">
                {name}
              </h2>
              <p className="text-left text-gray-500">@{username}</p>
            </div>
          </div>
        </div>
        <p className="mt-6 max-w-lg text-white">{bio}</p>
      </div>
    </>
  );
};

export default ProfileHeader;
