import { Routes, Route } from "react-router-dom";
import AdminLoginPage from "./Components/Login"; 
import AdminDashboard from "./Components/Admin"; 
import App from "./App"; 
import "./index.css"; 
import "./App.css"
import { Helmet } from "react-helmet";



function Index() {
 
  return (<>
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "S Sidharth",
      "alternateName": "CallMeSidhu",
      "url": "https://callmesidhu.pages.dev",
      "sameAs": [
        "https://github.com/callmesidhu",
        "https://linkedin.com/in/callmesidhu",
        "https://instagram.com/callmesidhu__",
        "https://xyphx.com"
      ],
      "jobTitle": "Full Stack Developer & Freelancer",
      "worksFor": {
        "@type": "Organization",
        "name": "XyphX"
      },
      "alumniOf": "Your College Name Here",
      "skills": [
        "React.js",
        "Node.js",
        "Django",
        "Flutter",
        "Firebase",
        "FastAPI",
        "Machine Learning",
        "Cybersecurity"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Freelancer",
        "description": "Available for freelance full stack development, mobile app development, and AI-based projects.",
        "estimatedSalary": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": {
            "@type": "QuantitativeValue",
            "value": "25",
            "unitText": "HOUR"
          }
        }
      }
    })
  }}
/>

  <Helmet>
  <title>Call Me Sidhu | Full Stack Developer & Tech Enthusiast</title>
  <meta name="description" content="Sidhu (aka CallMeSidhu) - Full stack web & app developer, founder of XyphX, passionate about React, Node, Django and tech innovation." />
  <meta name="keywords" content="callmesidhu, Call Me Sidhu, sidhu, XyphX, tech enthusiast, full stack developer, web developer, app developer, react, node, django, github" />
  <meta property="og:title" content="Call Me Sidhu - Full Stack Developer" />
  <meta property="og:description" content="Founder of XyphX. Passionate about web & app dev using React, Node, Django, and more." />
  <meta property="og:url" content="https://callmesidhu.pages.dev" />
  <meta property="og:type" content="website" />
  <meta name="robots" content="index, follow" />
</Helmet>
    <Routes>
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/" element={<App />} /> 
    </Routes>
    </>
  );
}

export default Index;
