import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Page introuvable</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
