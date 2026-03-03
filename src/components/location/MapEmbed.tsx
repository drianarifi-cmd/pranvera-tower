export default function MapEmbed() {
  const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  const query = 'Pranvera+Tower+Pristina+Kosovo';

  return (
    <div className="w-full h-[500px] relative">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(30%) invert(10%)' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=${query}&zoom=16`}
        title="Pranvera Tower location map"
      />
    </div>
  );
}
