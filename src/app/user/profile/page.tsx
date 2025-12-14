import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@hart/server/auth/nAuth";
import { ChangePasswordButton } from "@hart/lib/ui";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = session.user;

  return (
    <section className="p-8">
      <h1>{user.username}&apos;s Profile</h1>

      <div className="space-y-4 border rounded-lg p-6">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.role == "admin" && (
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        )}
      </div>

      <ChangePasswordButton />
    </section>
  );
};

export default Profile;
