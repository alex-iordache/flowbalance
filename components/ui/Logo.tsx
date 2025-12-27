const Logo = () => {
  return (
    <div style={{ 
      position: 'absolute', 
      left: '15%', 
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/flow_cropped.png" 
        alt="Flow Logo" 
        style={{ 
          height: '32px',
          maxWidth: '120px',
          objectFit: 'contain',
          filter: 'var(--logo-filter)'
        }} 
      />
    </div>
  );
};

export default Logo;

