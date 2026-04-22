"use client";

import { useState } from "react";
import styles from "./page.module.css";

const FlowerShape = ({ color = "#ff9eaa" }: { color?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <circle cx="50" cy="22" r="22" fill={color} opacity="0.9" />
    <circle cx="50" cy="78" r="22" fill={color} opacity="0.9" />
    <circle cx="23" cy="41" r="22" fill={color} opacity="0.9" />
    <circle cx="77" cy="41" r="22" fill={color} opacity="0.9" />
    <circle cx="34" cy="71" r="22" fill={color} opacity="0.9" />
    <circle cx="66" cy="71" r="22" fill={color} opacity="0.9" />
    <circle cx="50" cy="50" r="16" fill="#ffe066" />
  </svg>
);

const LeafShape = ({ color = "#a0e8af" }: { color?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <path d="M10 90 Q 10 10, 90 10 Q 90 90, 10 90 Z" fill={color} opacity="0.8" />
  </svg>
);

export default function Home() {
  const [step, setStep] = useState<"intro" | "form" | "bye">("intro");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal menyimpan nomor, coba lagi ya!");
      }

      setMessage({ type: "success", text: "Yay! Nomor berhasil dikirim~ \u2728" });
      setPhone(""); // Reset form on success
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Gagal menghubungi server :(" });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhone(value);
  };

  return (
    <main className={styles.container}>
      <div className={styles.flower1}><FlowerShape color="#ffb3c6" /></div>
      <div className={styles.flower2}><FlowerShape color="#ffc2d1" /></div>
      <div className={styles.flower3}><LeafShape color="#c1fba4" /></div>
      <div className={styles.flower4}><FlowerShape color="#ffe5ec" /></div>
      <div className={styles.flower5}><LeafShape color="#a0e8af" /></div>

      <div className={styles.card}>
        {step === "intro" && (
          <div className={styles.header} style={{ marginBottom: 0 }}>
            <div className={styles.icon}>👋</div>
            <h1 className={styles.maintitle}>
              halo zara adinda prameswari!
            </h1>
            <p className={styles.subtitle} style={{ marginBottom: "2rem" }}>
              ada pesen nih buat kamu, mau liat gak?
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.button} onClick={() => setStep("form")}>
                Hi! Mau dong 🌸
              </button>
              <button className={styles.buttonSecondary} onClick={() => setStep("bye")}>
                Bye~ 🏃‍♀️
              </button>
            </div>
          </div>
        )}

        {step === "bye" && (
          <div className={styles.header} style={{ marginBottom: 0 }}>
            <div className={styles.icon}>😿</div>
            <h1 className={styles.maintitle}>
              yahh...
            </h1>
            <p className={styles.subtitle} style={{ marginBottom: "2rem" }}>
              gapapa deh, have a great day zara adinda prameswari!
            </p>
            <button className={styles.buttonSecondary} onClick={() => setStep("intro")}>
              Kembali
            </button>
          </div>
        )}

        {step === "form" && (
          <>
            <div className={styles.header}>
              <div className={styles.icon}>🌷</div>
              <h1 className={styles.maintitle}>
                may i borrow your whatsapp number ?
              </h1>
              <p className={styles.subtitle}>Tolong isi di bawah ini ya~</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={styles.input}
                  placeholder="Cth: 081234567890"
                  minLength={10}
                  maxLength={15}
                  required
                  disabled={loading}
                  autoComplete="off"
                />
              </div>

              <button 
                type="submit" 
                className={styles.button} 
                disabled={loading || phone.length < 10}
              >
                {loading ? (
                  <>
                    <div className={styles.spinner}></div>
                    Mengirim...
                  </>
                ) : (
                  "Kirim Nomor 💌"
                )}
              </button>

              {message && (
                <div
                  className={`${styles.message} ${
                    message.type === "success" ? styles.messageSuccess : styles.messageError
                  }`}
                >
                  {message.text}
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </main>
  );
}
