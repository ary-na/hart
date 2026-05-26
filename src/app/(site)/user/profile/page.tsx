// src/app/user/profile/page.tsx

import Link from "next/link";
import Image from "next/image";
import { auth } from "@hart/server/auth/auth";
import { redirect } from "next/navigation";
import { ModalController } from "@hart/lib/ui";
import UpdatePasswordModal from "@hart/components/user/UpdatePasswordModal";
import { connectToDatabase } from "@hart/server/db/mongodb";
import { User } from "@hart/server/models";

const Profile = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/signin");

  let avatarName: string | undefined;
  let lastName: string | undefined;

  try {
    await connectToDatabase();
    const userDoc = await User.findById(user.id)
      .select("avatarName lastName")
      .lean();
    avatarName = userDoc?.avatarName;
    lastName = userDoc?.lastName;
  } catch {
    // ignore profile enrichment failures
  }

  const initials = user.firstName?.[0]?.toUpperCase() ?? "U";
  const avatarSrc = avatarName ? `/api/user/avatar/${avatarName}` : null;

  return (
    <section className="h-container py-20 my-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="h-reveal">
          <p className="text-sm uppercase tracking-[0.35em] opacity-60">
            Account
          </p>
          <h1 className="mt-2">Profile</h1>
        </div>
        <div className="breadcrumbs text-sm mb-2 h-reveal">
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
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm h-reveal">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-base-300 bg-base-200">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={`${user.firstName}'s avatar`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-semibold">
                  {initials}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                {user.firstName} {lastName ?? ""}
              </h2>
              <p className="text-sm opacity-70">{user.email}</p>
              <p className="text-xs uppercase tracking-[0.3em] opacity-50 mt-1">
                {user.role}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-base-300 bg-base-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">
                Name
              </p>
              <p className="mt-2 text-sm font-semibold">
                {user.firstName} {lastName ?? ""}
              </p>
            </div>
            <div className="rounded-xl border border-base-300 bg-base-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">
                Email
              </p>
              <p className="mt-2 text-sm font-semibold">{user.email}</p>
            </div>
            {user.role === "admin" && (
              <div className="rounded-xl border border-base-300 bg-base-50 p-4">
                <p className="text-xs uppercase tracking-[0.3em] opacity-60">
                  Role
                </p>
                <p className="mt-2 text-sm font-semibold">{user.role}</p>
              </div>
            )}
          </div>
        </div>

        <div
          className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm h-reveal"
          style={{ ["--reveal-delay" as never]: "120ms" }}
        >
          <h2 className="text-lg font-semibold">Account actions</h2>
          <p className="mt-2 text-sm opacity-70">
            Keep your account secure and up to date.
          </p>
          <div className="mt-6">
            <ModalController
              trigger="Update Password"
              className="btn-primary btn-sm"
              ariaLabel="Update your password"
              ModalComponent={UpdatePasswordModal}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
