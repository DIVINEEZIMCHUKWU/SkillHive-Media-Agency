export default function Privacy() {
 return (
  <div className="pt-24 pb-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-blue">
   <h1 className="text-3xl md:text-5xl font-black mb-8 text-brand-black dark:text-white">Privacy Policy</h1>
   <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
   
   <h2 className="text-2xl font-bold mt-10 mb-4 text-brand-black dark:text-white">1. Information We Collect</h2>
   <p className="text-gray-600">
    We collect information you provide directly to us, such as when you request a consultation, fill out a form, or communicate with us through our website.
   </p>

   <h2 className="text-2xl font-bold mt-10 mb-4 text-brand-black dark:text-white">2. How We Use Information</h2>
   <p className="text-gray-600">
    We use the information we collect to provide, maintain, and improve our services, develop new services, and protect SkillHive Media Agency and our users.
   </p>

   <h2 className="text-2xl font-bold mt-10 mb-4 text-brand-black dark:text-white">3. Contact Us</h2>
   <p className="text-gray-600">
    If you have any questions about this Privacy Policy, please contact us at privacy@skillhivemedia.com.
   </p>
  </div>
 );
}
