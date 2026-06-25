import { Mail, Phone, MapPin, MessageCircle, CheckCircle } from 'lucide-react';
import { submitToFormsubmit } from '../lib/formUtil';
import { useState } from 'react';

export default function Contact() {
 const [submitted, setSubmitted] = useState(false);

 return (
  <div className="pt-24 pb-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white relative flex-grow">
   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none"></div>
   
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-20">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-black dark:text-white mb-6">Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Touch</span></h1>
    <p className="text-sm sm:text-base text-brand-black/70 dark:text-brand-white/70 leading-relaxed">
      Have a question or ready to start a project? We'd love to hear from you. Reach out to our team below.
     </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
     {/* Contact Info */}
    <div>
     <h2 className="text-2xl font-bold text-brand-black dark:text-white mb-8">Contact Information</h2>
      <div className="space-y-8 mb-12">
       <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-brand-blue/20 to-blue-600/20 rounded-xl flex items-center justify-center text-brand-blue dark:text-blue-400 flex-shrink-0 border border-gray-200 dark:border-white/5">
         <Mail className="w-6 h-6" />
        </div>
        <div>
         <h3 className="text-lg font-semibold text-brand-black dark:text-white mb-1">Email Us</h3>
         <p className="text-brand-black/70 dark:text-brand-white/70 break-words whitespace-normal">Skillhivedigitalagency@gmail.com</p>
         <p className="text-sm text-gray-500 mt-1 break-words whitespace-normal">We aim to reply within 24 hours.</p>
        </div>
       </div>
       
       <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-brand-blue/20 to-blue-600/20 rounded-xl flex items-center justify-center text-brand-blue dark:text-blue-400 flex-shrink-0 border border-gray-200 dark:border-white/5">
         <Phone className="w-6 h-6" />
        </div>
        <div>
         <h3 className="text-lg font-semibold text-brand-black dark:text-white mb-1">Call Us</h3>
         <p className="text-brand-black/70 dark:text-brand-white/70 break-words whitespace-normal">08125650249</p>
         <p className="text-sm text-gray-500 mt-1 break-words whitespace-normal">Mon-Fri from 9am to 6pm.</p>
        </div>
       </div>

       <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-brand-blue/20 to-blue-600/20 rounded-xl flex items-center justify-center text-brand-blue dark:text-blue-400 flex-shrink-0 border border-gray-200 dark:border-white/5">
         <MapPin className="w-6 h-6" />
        </div>
        <div>
         <h3 className="text-lg font-semibold text-brand-black dark:text-white mb-1">Visit Us</h3>
         <p className="text-brand-black/70 dark:text-brand-white/70 break-words whitespace-normal">Abia State, Imo State, Enugu State and Remotely</p>
        </div>
       </div>
      </div>

      <div className="bg-brand-white dark:bg-brand-black border border-brand-blue/30 backdrop-blur-md rounded-3xl p-8">
       <h3 className="text-lg sm:text-xl font-bold text-brand-black dark:text-white mb-4">Fastest Way to Reach Us</h3>
       <p className="text-sm sm:text-base text-brand-black/70 dark:text-brand-white/70 mb-6">Need an immediate response? Send us a message directly on WhatsApp.</p>
       <a
        href="https://wa.me/2348125650249?text=Hello%20SkillHive%20Media%20Agency%2C%20I%20came%20directly%20from%20your%20Website%20and%20I%20want%20to%20make%20an%20enquiry"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1EBE5D] transition-colors w-full justify-center shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:-translate-y-0.5"
       >
        <MessageCircle className="w-5 h-5" />
        Chat on WhatsApp
       </a>
      </div>
     </div>

     {/* Contact Form */}
     <div className="bg-brand-white dark:bg-brand-black border border-brand-blue/30 backdrop-blur-md rounded-3xl p-10 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-brand-black dark:text-white mb-8">Send a Message</h2>
      {submitted ? (
       <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
         <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-700 dark:text-green-400 mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
        <button onClick={() => setSubmitted(false)} className="bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition-colors">
         Send Another Message
        </button>
       </div>
      ) : (
       <form className="space-y-6" onSubmit={async (e) => {
        await submitToFormsubmit(e, "https://formsubmit.co/f231b39002390ba5ad204d349f4c4144", () => setSubmitted(true));
       }}>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
         <label htmlFor="firstName" className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2">First Name</label>
         <input
          type="text"
          id="firstName"
          name="firstName"
          required
          className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white placeholder-brand-black/50 dark:placeholder-brand-white/50 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
          placeholder="Peter"
         />
        </div>
        <div>
         <label htmlFor="lastName" className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2">Last Name</label>
         <input
          type="text"
          id="lastName"
          name="lastName"
          required
          className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white placeholder-brand-black/50 dark:placeholder-brand-white/50 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
          placeholder="Jimmy"
         />
        </div>
       </div>

       <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2">Email Address</label>
        <input
         type="email"
         id="email"
         name="email"
         required
         className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white placeholder-brand-black/50 dark:placeholder-brand-white/50 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
         placeholder="john@example.com"
        />
       </div>

       <div>
        <label htmlFor="subject" className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2">Subject</label>
        <select
         id="subject"
         name="subject"
         required
         className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all appearance-none"
        >
         <option className="bg-brand-white text-brand-black dark:bg-brand-black dark:text-brand-white">General Inquiry</option>
         <option className="bg-brand-white text-brand-black dark:bg-brand-black dark:text-brand-white">Service Pricing</option>
         <option className="bg-brand-white text-brand-black dark:bg-brand-black dark:text-brand-white">Partnership</option>
         <option className="bg-brand-white text-brand-black dark:bg-brand-black dark:text-brand-white">Other</option>
        </select>
       </div>

       <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-black dark:text-brand-white mb-2">Message</label>
        <textarea
         id="message"
         name="message"
         rows={5}
         required
         className="w-full px-4 py-3 rounded-xl bg-brand-white dark:bg-brand-black border border-brand-blue/30 text-brand-black dark:text-brand-white placeholder-brand-black/50 dark:placeholder-brand-white/50 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all resize-none"
         placeholder="How can we help you?"
        ></textarea>
       </div>
       
       <input type="hidden" name="_captcha" value="false" />
       <input type="hidden" name="_template" value="box" />
       <input type="hidden" name="_subject" value="New Contact Inquiry | SkillHive" />
       <input type="hidden" name="_autoresponse" value="Hi there, thanks for reaching out to SkillHive! We have received your message and will get back to you as soon as possible." />

       <button
        type="submit"
        className="w-full bg-brand-blue text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-600 transition-colors shadow-lg "
       >
        Send Message
       </button>
      </form>
      )}
     </div>
    </div>
   </div>
  </div>
 );
}
