const SplineBackground = () => {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <iframe
          src="https://app.spline.design/community/file/80f399ca-105a-46e0-a4ae-c9f6ea1bd5c2"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ pointerEvents: 'none' }}
        ></iframe>
      </div>
    );
  };
  
  export default SplineBackground;