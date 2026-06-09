export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Tech-IT</h3>
            <p className="text-sm leading-relaxed">
              Votre partenaire de confiance pour le matériel informatique haut de gamme.
              Des composants soigneusement sélectionnés pour les passionnés et les professionnels.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Catégories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Accueil</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Service Client</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition-colors cursor-pointer">Contact</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {year} Tech-IT. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
