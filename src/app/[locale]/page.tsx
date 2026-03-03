export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-6xl text-cream mb-4">Pranvera Tower</h1>
        <p className="section-label">Locale: {locale}</p>
      </div>
    </main>
  );
}
