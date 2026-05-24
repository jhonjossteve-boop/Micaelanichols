import "./globals.css";

export const metadata = {
  title: "Micaela Nichols, RN | Registered Nurse — New Rochelle, NY",
  description:
    "Compassionate Registered Nurse and Columbia University graduate dedicated to patient-centered care, clinical excellence, and improving community health outcomes.",
  keywords: ["Registered Nurse", "RN", "Columbia University", "New Rochelle NY"],
  openGraph: {
    title: "Micaela Nichols, RN | Registered Nurse",
    description:
      "Compassionate Registered Nurse dedicated to patient-centered care and clinical excellence.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
