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
  
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const referer = origin || 'https://skillhivedigital.agency/contact';

  const proxyPayload = {
    _formUrl: formUrl,
    ...data
  };
  const directPayload = { ...data };
  const ajaxUrl = formUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/');

  const submitDirectly = async () => {
    const response = await fetch(ajaxUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': origin,
        'Referer': referer
      },
      body: JSON.stringify(directPayload)
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Direct FormSubmit failed: ${response.status} ${response.statusText} ${text}`);
    }
  };

  let submittedSuccessfully = false;
  try {
    const response = await fetch('/api/contact', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(proxyPayload)
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Proxy request failed: ${response.status} ${response.statusText} ${text}`);
    }
    submittedSuccessfully = true;
  } catch (err) {
    console.warn("Proxy contact submission failed, falling back to FormSubmit directly.", err);
    try {
      await submitDirectly();
      submittedSuccessfully = true;
    } catch (directError) {
      console.error("Direct FormSubmit fallback failed.", directError);
    }
  }

  if (submittedSuccessfully) {
    onSuccess();
  } else {
    throw new Error("Contact form submission failed.");
  }
};
