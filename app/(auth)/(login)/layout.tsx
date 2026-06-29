import GuestProvider from "@/providers/GuestProvider";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestProvider>{children}</GuestProvider>;
}
