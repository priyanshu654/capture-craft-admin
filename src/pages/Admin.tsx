const Admin = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-24 text-center">
        <h1 className="font-playfair text-4xl">Admin Dashboard</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Authentication and content management will be enabled after connecting Supabase.
          You’ll be able to edit hero and about content, manage services and gallery images, and
          update contact info with uploads and optimization.
        </p>
        <div className="mt-8">
          <a
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-primary-foreground shadow-md"
            href="https://docs.lovable.dev/integrations/supabase/"
            target="_blank"
            rel="noreferrer"
          >
            Connect Supabase to Enable Admin
          </a>
        </div>
      </div>
    </main>
  );
};

export default Admin;
