const Logo = () => {
  return (
    <img
      src="/flow_cropped.png"
      alt="FLOW"
      className="block h-[22px] md:h-[24px] w-auto select-none"
      style={{ objectFit: 'contain' }}
      loading="eager"
      decoding="async"
    />
  );
};

export default Logo;

