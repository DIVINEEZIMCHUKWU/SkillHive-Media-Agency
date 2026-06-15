import React from 'react';
import { getLeads, saveLeads } from './store';

export const submitToFormsubmit = async (e: React.FormEvent, formUrl: string, onSuccess: () => void) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  // Convert to JSON
  const data: Record<string, string | string[]> = {};
  formData.forEach((value, key) => {
    if (data[key]) {
      if (Array.isArray(data[key])) {
        (data[key] as string[]).push(value as string);
      } else {
        data[key] = [data[key] as string, value as string];
      }
    } else {
      data[key] = value as string;
    }
  });

  if (!formData.has('_subject')) {
    formData.append('_subject', "New Submission from SkillHive Website");
    data['_subject'] = "New Submission from SkillHive Website";
  }
  
  if (!formData.has('_autoresponse')) {
    formData.append('_autoresponse', "Thank you for reaching out to SkillHive. We have received your message and will get back to you shortly.");
    data['_autoresponse'] = "Thank you for reaching out to SkillHive. We have received your message and will get back to you shortly.";
  }

  if (!formData.has('_template')) {
    formData.append('_template', "box");
    data['_template'] = "box";
  }

  // Save it locally for Admin dashboard
  const leads = getLeads();
  leads.push({
    id: Date.now().toString(),
    date: new Date().toISOString(),
    ...data
  });
  saveLeads(leads);
  
  // Attempt FormSubmit via our backend proxy to avoid showing the preview URL in the email
  try {
    const payload = {
      _formUrl: formUrl,
      ...data
    };
    const response = await fetch('/api/contact', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      console.error("Formsubmit responded with an error:", await response.text());
    }
  } catch (err) {
    console.error("Submit failed.", err);
  }

  onSuccess();
};
