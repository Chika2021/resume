import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div style={{
      background: '#020207',
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'flex-start', justifyContent: 'center',
      padding: '80px',
      fontFamily: 'sans-serif',
    }}>
      <p style={{ color: '#00f5d4', fontSize: 22, letterSpacing: 6, margin: '0 0 16px' }}>
        FULL-STACK ENGINEER · IT CONSULTANT
      </p>
      <h1 style={{ color: 'white', fontSize: 72, fontWeight: 800, margin: '0 0 24px', lineHeight: 1.1 }}>
        Anya Chika Amaechi
      </h1>
      <p style={{ color: '#9999cc', fontSize: 28, margin: 0 }}>
        Next.js · NestJS · Flutter · Spring Boot · 9+ Years
      </p>
      <p style={{ color: '#8b5cf6', fontSize: 22, marginTop: 48, letterSpacing: 2 }}>
        amaechichika9@gmail.com
      </p>
    </div>
  );
}