// src/app/user/profile/page.tsx

// Next.js imports
import { redirect } from "next/navigation";

// NextAuth imports
import { getServerSession } from "next-auth/next";

// Auth options import
import { authOptions } from "@hart/server/auth/nAuth";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!session) redirect("/login");
  return (
    <section className="p-8">
      <h1>{session.user.username}&apos;s Profile</h1>
    <div className="space-y-4 border rounded-lg p-6">
        {user.id && (
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
        )}

        {user.username && (
          <p>
            <strong>Username:</strong> {user.username}
          </p>
        )}

        {user.email && (
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        )}

        {user.role && (
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        )}
      </div>
    </section>
  );
};

export default Profile;
