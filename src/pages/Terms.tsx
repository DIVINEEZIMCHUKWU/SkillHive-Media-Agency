export default function Terms() {
 return (
  <div className="pt-24 pb-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-blue">
   <h1 className="text-3xl md:text-5xl font-black mb-8 text-brand-black dark:text-white">Terms & Conditions</h1>
   <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
   
   <h2 className="text-2xl font-bold mt-10 mb-4 text-brand-black dark:text-white">1. Acceptance of Terms</h2>
   <p className="text-gray-600">
    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
   </p>

   <h2 className="text-2xl font-bold mt-10 mb-4 text-brand-black dark:text-white">2. Use License</h2>
   <p className="text-gray-600">
    All content provided on the SkillHive Media Agency website is for informational purposes only. You may not modify, copy, distribute, or reproduce any content without clear permission.
   </p>
  </div>
 );
}
