import React, { useState, useEffect } from "react";

export default function DogSprite({ currentAction, style }) {
  const [speechBubble, setSpeechBubble] = useState(null);
  const [thoughtBubble, setThoughtBubble] = useState(null);

  useEffect(() => {
    if (currentAction) {
      const [action, ...params] = currentAction.split(':');

      if (action === 'say') {
        const [message, duration] = params;
        setSpeechBubble({ message, duration });
        setThoughtBubble(null);
        // Clear speech bubble after duration
        const timer = setTimeout(() => {
          setSpeechBubble(null);
        }, duration * 1000);
        return () => clearTimeout(timer);
      }

      if (action === 'think') {
        const [message, duration] = params;
        setThoughtBubble({ message, duration });
        setSpeechBubble(null);
        // Clear thought bubble after duration
        const timer = setTimeout(() => {
          setThoughtBubble(null);
        }, duration * 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentAction]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      {/* Speech/Thought bubble container */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99999,
        pointerEvents: 'none',
        width: 'auto',
        height: 'auto',
      }}>
        {(speechBubble || thoughtBubble) && (
          <div
            style={{
              position: 'relative',
              backgroundColor: speechBubble ? '#fff' : '#f0f0f0',
              padding: '8px 12px',
              borderRadius: '12px',
              border: '2px solid #000',
              maxWidth: '200px',
              minWidth: '50px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#000',
              zIndex: 99999,
            }}
          >
            {speechBubble ? (
              <>
                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '10px solid #fff'
                }} />
                {speechBubble.message}
              </>
            ) : (
              <>
                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '10px solid #f0f0f0'
                }} />
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                  {thoughtBubble.message.split('').map((char, i) => (
                    <span key={i} style={{ fontSize: '20px' }}>•</span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Sprite SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 100 100"
        version="1.1"
        xmlSpace="preserve"
      >
        <g>
          {/* Body */}
          <path
            d="M50,85 C35,85 25,75 25,60 C25,45 35,35 50,35 C65,35 75,45 75,60 C75,75 65,85 50,85 Z"
            fill="#8B4513"
            stroke="#000"
            strokeWidth="1.5"
          />

          {/* Head */}
          <path
            d="M50,35 C65,35 75,25 75,10 C75,5 70,0 65,0 C60,0 55,5 50,10 C45,5 40,0 35,0 C30,0 25,5 25,10 C25,25 35,35 50,35 Z"
            fill="#8B4513"
            stroke="#000"
            strokeWidth="1.5"
          />

          {/* Left Ear */}
          <path
            d="M35,0 C30,0 25,5 25,10 C25,15 20,20 15,15 C10,10 15,5 20,0 C25,-5 30,0 35,0 Z"
            fill="#A0522D"
            stroke="#000"
            strokeWidth="1.5"
          />

          {/* Right Ear */}
          <path
            d="M65,0 C70,0 75,5 75,10 C75,15 80,20 85,15 C90,10 85,5 80,0 C75,-5 70,0 65,0 Z"
            fill="#A0522D"
            stroke="#000"
            strokeWidth="1.5"
          />

          {/* Snout */}
          <path
            d="M45,25 C45,25 50,30 55,25 C60,20 55,15 50,15 C45,15 40,20 45,25 Z"
            fill="#A0522D"
            stroke="#000"
            strokeWidth="1.5"
          />

          {/* Nose */}
          <path
            d="M48,22 C48,22 50,24 52,22 C54,20 52,18 50,18 C48,18 46,20 48,22 Z"
            fill="#000"
          />

          {/* Left Eye */}
          <path
            d="M40,15 C40,15 42,17 44,15 C46,13 44,11 42,11 C40,11 38,13 40,15 Z"
            fill="#000"
          />

          {/* Right Eye */}
          <path
            d="M56,15 C56,15 58,17 60,15 C62,13 60,11 58,11 C56,11 54,13 56,15 Z"
            fill="#000"
          />

          {/* Tongue */}
          <path
            d="M45,30 C45,30 50,35 55,30 C55,30 50,40 45,30 Z"
            fill="#FF69B4"
            stroke="#000"
            strokeWidth="1"
          />

          {/* Left Paw */}
          <path
            d="M35,85 C35,85 40,90 45,85 C45,85 40,95 35,85 Z"
            fill="#A0522D"
            stroke="#000"
            strokeWidth="1.5"
          />

          {/* Right Paw */}
          <path
            d="M55,85 C55,85 60,90 65,85 C65,85 60,95 55,85 Z"
            fill="#A0522D"
            stroke="#000"
            strokeWidth="1.5"
          />

          {/* Tail */}
          <path
            d="M25,60 C25,60 15,55 10,60 C5,65 15,70 25,65 C25,65 20,75 25,60 Z"
            fill="#8B4513"
            stroke="#000"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}
