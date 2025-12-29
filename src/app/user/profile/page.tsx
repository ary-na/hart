// src/app/user/profile/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@hart/server/auth/nAuth";
import { ModalController } from "@hart/lib/ui";
import UpdatePasswordModal from "@hart/components/UpdatePasswordModal";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = session.user;

  return (
    <section className="container max-w-4xl mx-auto p-8">
      <h1>{user.username}&apos;s Profile</h1>
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {user.role == "admin" && (
            <li>
              <Link href="/admin">Dashboard</Link>
            </li>
          )}
          <li>Profile</li>
        </ul>
      </div>

      <div className="flex gap-2 flex-col justify-between sm:flex-row">
        <ul className="space-y-4">
          <li>
            <strong>Username:</strong> {user.username}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          {user.role == "admin" && (
            <li>
              <strong>Role:</strong> {user.role}
            </li>
          )}
        </ul>
        <ModalController
          trigger="Update Password"
          className="btn-primary btn-sm"
          ariaLabel="Update your password"
          ModalComponent={UpdatePasswordModal}
        />
      </div>
    </section>
  );
};

export default Profile;
