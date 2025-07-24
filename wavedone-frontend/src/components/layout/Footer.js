export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-700 text-gray-300 p-6 text-center mt-auto">
      <div className="container mx-auto">
        <p>&copy; {currentYear} Wavedone Digital Solutions Ltd. All rights reserved.</p>
        <p className="text-sm mt-2">
          Empowering Africa&apos;s Digital Future.
        </p>
        {/* Optional: Add social media links or other footer content here */}
        {/* <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-white">Facebook</a>
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
        </div> */}
      </div>
    </footer>
  );
}
