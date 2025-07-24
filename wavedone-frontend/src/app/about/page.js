export const metadata = {
  title: "About Us - Wavedone",
  description: "Learn more about Wavedone Digital Solutions and our mission to empower Africa's digital future.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">About Wavedone</h1>

      <section className="mb-12">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Wavedone Digital Solutions Ltd is on a mission to become Africa’s #1 platform for AI-powered digital tools,
          creative products, micro-learning content, and service subscriptions. We believe in empowering individuals
          and businesses across the continent by providing innovative, accessible, and high-quality digital resources.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Our platform is built with a mobile-first approach, ensuring a seamless user experience for everyone.
          We are committed to fostering a vibrant community of creators, learners, and users, all contributing to
          and benefiting from Africa&apos;s burgeoning digital economy.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Vision</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          To be the leading catalyst for digital transformation and innovation in Africa, providing tools and resources
          that enable creators to thrive and users to achieve their personal and professional goals.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Values</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2">
          <li><span className="font-semibold">Innovation:</span> Continuously seeking and implementing cutting-edge solutions.</li>
          <li><span className="font-semibold">Empowerment:</span> Providing tools and opportunities for growth and success.</li>
          <li><span className="font-semibold">Community:</span> Fostering a supportive and collaborative ecosystem.</li>
          <li><span className="font-semibold">Accessibility:</span> Ensuring our platform is easy to use and available to all.</li>
          <li><span className="font-semibold">Integrity:</span> Operating with transparency and ethical practices.</li>
        </ul>
      </section>
    </div>
  );
}
