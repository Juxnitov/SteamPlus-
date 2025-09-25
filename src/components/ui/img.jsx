export default function Img({ src, alt, className }) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
    />
  );
}