import GuestProvider from "@/providers/GuestProvider";
 

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestProvider>{children}</GuestProvider>;
}
