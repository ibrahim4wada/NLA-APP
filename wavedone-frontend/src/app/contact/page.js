'use client'; // For form handling

import { useState } from 'react';
import Button from '@/components/ui/Button';

export const metadata = { // This might not work as expected in a 'use client' component for page-level metadata.
                          // For App Router, metadata should ideally be in server components or layout.
                          // If this page remains 'use client', metadata might need to be set in layout or a parent server component.
  title: "Contact Us - Wavedone",
  description: "Get in touch with Wavedone Digital Solutions. We'd love to hear from you.",
};


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    console.log('Contact form submitted:', formData);
    // TODO: Implement actual form submission logic (e.g., API call to a backend endpoint)
    // For now, simulate a delay and success/error message
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate success for now
    setSubmitMessage('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">Contact Us</h1>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
          Have questions, feedback, or partnership inquiries? Fill out the form below, and our team will get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          <div>
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </Button>
          </div>

          {submitMessage && (
            <p className={`mt-4 text-center text-sm ${submitMessage.includes('Thank you') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {submitMessage}
            </p>
          )}
        </form>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Other ways to reach us:</h3>
        <p className="text-gray-700 dark:text-gray-300">Email: <a href="mailto:support@wavedone.com" className="text-indigo-600 hover:underline dark:text-indigo-400">support@wavedone.com</a></p>
        {/* <p className="text-gray-700 dark:text-gray-300">Phone: +234 XXX XXXXXXX (Coming Soon)</p> */}
      </div>
    </div>
  );
}
