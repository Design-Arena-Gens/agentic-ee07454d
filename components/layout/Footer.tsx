export function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="container py-8 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>? {new Date().getFullYear()} NovaStore. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="hover:text-brand-accent" href="#">Privacy</a>
          <a className="hover:text-brand-accent" href="#">Terms</a>
          <a className="hover:text-brand-accent" href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}

