import { ArrowRight, CheckCircle2 } from "lucide-react";
import React, { useState } from 'react';

import { submitToFormsubmit } from '../lib/formUtil';

export default function GetStarted() {
 const [submitted, setSubmitted] = useState(false);

 return (
  <div className="pt-24 pb-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white relative flex-grow">
   <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none"></div>
   
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-16">
     <h1 className="text-3xl md:text-5xl font-bold text-brand-black dark:text-brand-white mb-6">
      Let's Grow <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Your Business</span>
     </h1>
     <p className="text-xl text-brand-black/70 dark:text-brand-white/70">
      Fill out the form below to book a free discovery call. We'll discuss
      your goals, audit your current strategy, and see if we're a good
      fit.
     </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
     {/* Form */}
     <div className="lg:col-span-3 bg-brand-white dark:bg-brand-black border border-brand-blue/30 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-sm">
      <h2 className="text-2xl font-bold text-brand-black dark:text-brand-white mb-8">
       Tell us about your project
      </h2>
      {submitted ? (
       <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center my-8">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
         <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Project Request Submitted!</h3>
        <p className="text-green-700 dark:text-green-400 mb-6">Thank you for getting in touch. We will review your requirements and reach out to you shortly.</p>
        <button onClick={() => setSubmitted(false)} className="bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition-colors">
         Submit Another Request
        </button>
       </div>
      ) : (
      <form
       className="space-y-6"
       onSubmit={async (e) => {
        await submitToFormsubmit(e, "https://formsubmit.co/f231b39002390ba5ad204d349f4c4144", () => setSubmitted(true));
       }}
      >
       <input type="hidden" name="_captcha" value="false" />
       <input type="hidden" name="_template" value="box" />
       <input type="hidden" name="_subject" value="New Business Growth Discovery Lead | SkillHive" />
       <input type="hidden" name="_autoresponse" value="Hi there, thanks for booking a discovery call with SkillHive. We have received your request and our team will reach out to you shortly!" />
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
         <label
          htmlFor="firstName"
          className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2"
         >
          First Name *
         </label>
         <input
          type="text"
          id="firstName"
          name="firstName"
          required
          placeholder="Peter"
          className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white placeholder-brand-black/50 dark:placeholder-brand-white/50 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
         />
        </div>
        <div>
         <label
          htmlFor="lastName"
          className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2"
         >
          Last Name *
         </label>
         <input
          type="text"
          id="lastName"
          name="lastName"
          required
          placeholder="Jimmy"
          className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white placeholder-brand-black/50 dark:placeholder-brand-white/50 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
         />
        </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
         <label
          htmlFor="email"
          className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2"
         >
          Work Email *
         </label>
         <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white placeholder-brand-black/50 dark:placeholder-brand-white/50 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
         />
        </div>
        <div>
         <label
          htmlFor="whatsapp"
          className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2"
         >
          WhatsApp Number *
         </label>
         <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          required
          className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white placeholder-brand-black/50 dark:placeholder-brand-white/50 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
         />
        </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
         <label
          htmlFor="company"
          className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2"
         >
          Company Name
         </label>
         <input
          type="text"
          id="company"
          name="company"
          className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white placeholder-brand-black/50 dark:placeholder-brand-white/50 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
         />
        </div>
        <div>
         <label
          htmlFor="website"
          className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2"
         >
          Website URL (Optional)
         </label>
         <input
          type="url"
          id="website"
          name="website"
          className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white placeholder-brand-black/50 dark:placeholder-brand-white/50 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
          placeholder="https://"
         />
        </div>
       </div>

       <div>
        <label className="block text-sm font-medium text-brand-black dark:text-brand-white mb-3">
         Which services are you interested in? *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
         {[
          "Social Media Management",
          "Facebook & Instagram Ads",
          "Content Creation/Graphic Design",
          "Website Development",
         ].map((service) => (
          <label
           key={service}
           className="flex items-center gap-3 p-3 bg-brand-white dark:bg-brand-black border border-brand-blue/30 rounded-xl cursor-pointer hover:bg-white/10 transition-colors"
          >
           <input
            type="checkbox"
            name="services[]"
            value={service}
            className="w-5 h-5 text-brand-blue rounded border-gray-600 bg-brand-white dark:bg-brand-black focus:ring-brand-blue focus:ring-offset-gray-900"
           />
           <span className="text-sm text-brand-black dark:text-brand-white">{service}</span>
          </label>
         ))}
        </div>
       </div>

       <div>
        <label
         htmlFor="budget"
         className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2"
        >
         YOUR BUDGET
        </label>
        <input
         type="text"
         id="budget"
         name="budget"
         placeholder="e.g. $2,500"
         className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
        />
       </div>

       <div>
        <label
         htmlFor="goals"
         className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2"
        >
         What are your main goals? *
        </label>
        <textarea
         id="goals"
         name="goals"
         required
         rows={4}
         className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white placeholder-brand-black/50 dark:placeholder-brand-white/50 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all resize-none"
         placeholder="Tell us what you're trying to achieve..."
        ></textarea>
       </div>

       <div className="flex flex-col sm:flex-row gap-4">
        <button
         type="submit"
         className="w-full bg-brand-blue text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg "
        >
         SEND MESSAGE
         <ArrowRight className="w-5 h-5" />
        </button>
       </div>
      </form>
      )}
     </div>

     {/* Info Sidebar */}
     <div className="lg:col-span-2 space-y-8">
      <div className="bg-brand-white dark:bg-brand-black border border-brand-blue/30 backdrop-blur-md rounded-3xl p-8">
       <h3 className="text-xl font-bold text-brand-black dark:text-brand-white mb-6">
        What happens next?
       </h3>
       <ul className="space-y-6">
        <li className="flex gap-4">
         <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
          1
         </div>
         <div>
          <h4 className="font-semibold text-brand-blue dark:text-blue-300 mb-1">
           Submit Request
          </h4>
          <p className="text-sm text-brand-black/70 dark:text-brand-white/70">
           Fill out the form with your details and goals.
          </p>
         </div>
        </li>
        <li className="flex gap-4">
         <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
          2
         </div>
         <div>
          <h4 className="font-semibold text-brand-blue dark:text-blue-300 mb-1">
           Schedule Call
          </h4>
          <p className="text-sm text-brand-black/70 dark:text-brand-white/70">
           We'll send you a link to book a time that works for you.
          </p>
         </div>
        </li>
        <li className="flex gap-4">
         <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
          3
         </div>
         <div>
          <h4 className="font-semibold text-brand-blue dark:text-blue-300 mb-1">
           Discovery Session
          </h4>
          <p className="text-sm text-brand-black/70 dark:text-brand-white/70">
           A 30-minute deep dive into your business and how we can
           help.
          </p>
         </div>
        </li>
        <li className="flex gap-4">
         <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
          4
         </div>
         <div>
          <h4 className="font-semibold text-brand-blue dark:text-blue-300 mb-1">
           Custom Proposal
          </h4>
          <p className="text-sm text-brand-black/70 dark:text-brand-white/70">
           We'll deliver a tailored strategy and pricing for your
           approval.
          </p>
         </div>
        </li>
       </ul>
      </div>

      <div className="bg-gradient-to-br from-brand-blue to-blue-800 text-white rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-white/10">
       <h3 className="text-xl font-bold mb-4">Why SkillHive?</h3>
       <ul className="space-y-3">
        <li className="flex items-center gap-3">
         <CheckCircle2 className="w-5 h-5 text-brand-blue dark:text-blue-300" />
         <span className="text-sm">Data-driven strategies</span>
        </li>
        <li className="flex items-center gap-3">
         <CheckCircle2 className="w-5 h-5 text-brand-blue dark:text-blue-300" />
         <span className="text-sm">Transparent reporting</span>
        </li>
        <li className="flex items-center gap-3">
         <CheckCircle2 className="w-5 h-5 text-brand-blue dark:text-blue-300" />
         <span className="text-sm">Dedicated account manager</span>
        </li>
        <li className="flex items-center gap-3">
         <CheckCircle2 className="w-5 h-5 text-brand-blue dark:text-blue-300" />
         <span className="text-sm">Proven track record</span>
        </li>
       </ul>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
