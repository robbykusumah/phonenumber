import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const numbers = await prisma.phoneNumber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", backgroundColor: "#fff5f8", minHeight: "100vh" }}>
      <h1 style={{ color: "#ff7b8c", marginBottom: "1rem" }}>Daftar Nomor Masuk 💌</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <thead>
          <tr style={{ background: "#ff9eaa", color: "white", textAlign: "left" }}>
            <th style={{ padding: "1rem" }}>ID</th>
            <th style={{ padding: "1rem" }}>Nomor WhatsApp</th>
            <th style={{ padding: "1rem" }}>Waktu Masuk</th>
          </tr>
        </thead>
        <tbody>
          {numbers.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ padding: "2rem", textAlign: "center", color: "#8c7b7b" }}>Belum ada nomor yang masuk nih... 😿</td>
            </tr>
          ) : (
            numbers.map((num) => (
              <tr key={num.id} style={{ borderBottom: "1px solid #ffd1dc" }}>
                <td style={{ padding: "1rem", color: "#8c7b7b", fontSize: "0.85rem" }}>{num.id}</td>
                <td style={{ padding: "1rem", fontWeight: "bold", color: "#5c4f4f" }}>{num.phone}</td>
                <td style={{ padding: "1rem", color: "#8c7b7b" }}>{new Date(num.createdAt).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
