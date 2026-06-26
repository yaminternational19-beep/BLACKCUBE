'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, Eye } from "lucide-react";
import { pageApi } from "@/api";
import { useToast } from "@/hooks/use-toast";

// Custom Admin Input Component
const AdminInput = ({
  className = "",
  ...props
}) => <input className={`w-full px-4 py-3 bg-primary-slate/30 border border-white/20 rounded-xl text-white placeholder-primary-gray focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all duration-200 hover:bg-primary-slate/40 ${className}`} {...props} />;

// Custom Admin Textarea Component
const AdminTextarea = ({
  className = "",
  ...props
}) => <textarea className={`w-full px-4 py-3 bg-primary-slate/30 border border-white/20 rounded-xl text-white placeholder-primary-gray focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue resize-none transition-all duration-200 hover:bg-primary-slate/40 ${className}`} {...props} />;
export function ContactPageCMS() {
  const [heroContent, setHeroContent] = useState({
    title: 'Get In Touch',
    subtitle: "Have a question or ready to start your next project? We're here to help and would love to hear from you",
    primaryCta: 'Send Message',
    secondaryCta: 'View Services'
  });

  // Channels Intro card (title/desc/badge)
  const [channelsIntro, setChannelsInfo] = useState({
    title: 'Get in Touch with Us Today!',
    description: 'Whether you’re interested in our services, have questions about a project, or want to explore partnerships, reach out to our team through any of the channels below.',
    badgeText: 'Feel free to contact us through any of the following channels'
  });

  // Email contacts section
  const [emailSectionTitle, setEmailSectionTitle] = useState('Contact Us Via Email');
  const [emailContacts, setEmailContacts] = useState([{
    label: 'For General Inquiries',
    value: 'info@blackcube.ae'
  }, {
    label: 'For Business Collaborations',
    value: 'partnerships@blackcube.ae'
  }, {
    label: 'For Job Opportunities',
    value: 'careers@blackcube.ae'
  }]);

  // Phone contacts section
  const [phoneSectionTitle, setPhoneSectionTitle] = useState('Contact Us By Phone');
  const [phoneContacts, setPhoneContacts] = useState([{
    label: 'General Enquiries',
    value: '+1-XXX-XXX-XXXX'
  }, {
    label: 'Business Collaborations',
    value: '+1-XXX-XXX-XXXX'
  }, {
    label: 'Free Consultation',
    value: '+1-XXX-XXX-XXXX'
  }]);

  // Online Inquiry form section
  const [contactFormSection, setContactFormSection] = useState({
    title: 'Online Inquiry Form',
    description: "Please fill in the following details, and we'll get back to you within 24 hours.",
    formLabels: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone Number',
      service: 'Select Service',
      company: 'Company / Organization Name',
      subject: 'Subject',
      message: 'Message'
    },
    placeholders: {
      name: 'Enter your Name',
      email: 'Enter your Email',
      phone: 'Enter your Phone Number',
      service: 'Choose a service',
      company: 'Enter Name',
      subject: 'Select your Subject',
      message: 'Enter your Message'
    },
    submitButton: 'Send your Inquiry',
    submittingButton: 'Sending...'
  });
  const [serviceOptions, setServiceOptions] = useState(['Web Development', 'Mobile App Development', 'UI/UX Design', 'Digital Marketing']);
  const [subjectOptions, setSubjectOptions] = useState([{
    value: 'general',
    label: 'General Inquiry'
  }, {
    value: 'project',
    label: 'New Project'
  }, {
    value: 'support',
    label: 'Support'
  }]);

  // Post-form info cards
  const [responseCard, setResponseCard] = useState({
    title: 'Our Response',
    description: 'We strive to address inquiries promptly. Whether you have a specific project in mind or need advice, we’re here to assist you at every step.'
  });
  const [privacyCard, setPrivacyCard] = useState({
    title: 'Privacy Assurance',
    description: 'Your information will only be used to address your inquiry and will not be shared with third parties without consent.'
  });

  // Office Locations section
  const [officeLocationsSection, setOfficeLocationsSection] = useState({
    title: 'Office Locations',
    subtitle: 'Visit our offices to have a face-to-face discussion with our team.'
  });
  const [officeLocations, setOfficeLocations] = useState([{
    city: 'New York City',
    address: '123 Main Street, Suite 456, New York, NY 10001',
    ctaText: 'Get Direction'
  }, {
    city: 'San Francisco',
    address: '789 Tech Avenue, 10th Floor, San Francisco, CA 94105',
    ctaText: 'Get Direction'
  }]);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');
  const {
    toast
  } = useToast();
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await pageApi.get('contact');
        if (response.success && response.data) {
          const fields = response.data.fields || [];
          fields.forEach(field => {
            if (field.id === 'heroContent' && field.value) setHeroContent(field.value);
            if (field.id === 'channelsIntro' && field.value) setChannelsInfo(field.value);
            if (field.id === 'emailSectionTitle' && field.value) setEmailSectionTitle(field.value);
            if (field.id === 'emailContacts' && field.value) setEmailContacts(field.value);
            if (field.id === 'phoneSectionTitle' && field.value) setPhoneSectionTitle(field.value);
            if (field.id === 'phoneContacts' && field.value) setPhoneContacts(field.value);
            if (field.id === 'contactFormSection' && field.value) setContactFormSection(field.value);
            if (field.id === 'serviceOptions' && field.value) setServiceOptions(field.value);
            if (field.id === 'subjectOptions' && field.value) setSubjectOptions(field.value);
            if (field.id === 'responseCard' && field.value) setResponseCard(field.value);
            if (field.id === 'privacyCard' && field.value) setPrivacyCard(field.value);
            if (field.id === 'officeLocationsSection' && field.value) setOfficeLocationsSection(field.value);
            if (field.id === 'officeLocations' && field.value) setOfficeLocations(field.value);
          });
        }
      } catch (error) {
        console.error('Failed to load contact page data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      const pageData = {
        id: 'contact',
        title: 'Contact Page',
        fields: [{
          id: 'heroContent',
          label: 'Hero Content',
          type: 'object',
          value: heroContent
        }, {
          id: 'channelsIntro',
          label: 'Channels Intro',
          type: 'object',
          value: channelsIntro
        }, {
          id: 'emailSectionTitle',
          label: 'Email Section Title',
          type: 'string',
          value: emailSectionTitle
        }, {
          id: 'emailContacts',
          label: 'Email Contacts',
          type: 'array',
          value: emailContacts
        }, {
          id: 'phoneSectionTitle',
          label: 'Phone Section Title',
          type: 'string',
          value: phoneSectionTitle
        }, {
          id: 'phoneContacts',
          label: 'Phone Contacts',
          type: 'array',
          value: phoneContacts
        }, {
          id: 'contactFormSection',
          label: 'Contact Form Section',
          type: 'object',
          value: contactFormSection
        }, {
          id: 'serviceOptions',
          label: 'Service Options',
          type: 'array',
          value: serviceOptions
        }, {
          id: 'subjectOptions',
          label: 'Subject Options',
          type: 'array',
          value: subjectOptions
        }, {
          id: 'responseCard',
          label: 'Response Card',
          type: 'object',
          value: responseCard
        }, {
          id: 'privacyCard',
          label: 'Privacy Card',
          type: 'object',
          value: privacyCard
        }, {
          id: 'officeLocationsSection',
          label: 'Office Locations Section',
          type: 'object',
          value: officeLocationsSection
        }, {
          id: 'officeLocations',
          label: 'Office Locations',
          type: 'array',
          value: officeLocations
        }]
      };
      await pageApi.update('contact', pageData);
      setSaveStatus('success');
      toast({
        title: "Success!",
        description: "Contact page content saved successfully to database."
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save contact page:', error);
      setSaveStatus('error');
      toast({
        title: "Error",
        description: error.message || "Failed to save contact page content. Please try again.",
        variant: "destructive"
      });
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  // CRUD helpers
  const addEmailContact = () => setEmailContacts([...emailContacts, {
    label: 'New label',
    value: 'example@example.com'
  }]);
  const updateEmailContact = (index, field, value) => {
    const updated = [...emailContacts];
    updated[index][field] = value;
    setEmailContacts(updated);
  };
  const deleteEmailContact = index => setEmailContacts(emailContacts.filter((_, i) => i !== index));
  const addPhoneContact = () => setPhoneContacts([...phoneContacts, {
    label: 'New label',
    value: '+1-XXX-XXX-XXXX'
  }]);
  const updatePhoneContact = (index, field, value) => {
    const updated = [...phoneContacts];
    updated[index][field] = value;
    setPhoneContacts(updated);
  };
  const deletePhoneContact = index => setPhoneContacts(phoneContacts.filter((_, i) => i !== index));
  const addServiceOption = () => setServiceOptions([...serviceOptions, 'New Service']);
  const updateServiceOption = (index, value) => {
    const updated = [...serviceOptions];
    updated[index] = value;
    setServiceOptions(updated);
  };
  const deleteServiceOption = index => setServiceOptions(serviceOptions.filter((_, i) => i !== index));
  const addSubjectOption = () => setSubjectOptions([...subjectOptions, {
    value: 'custom',
    label: 'Custom'
  }]);
  const updateSubjectOption = (index, field, value) => {
    const updated = [...subjectOptions];
    updated[index][field] = value;
    setSubjectOptions(updated);
  };
  const deleteSubjectOption = index => setSubjectOptions(subjectOptions.filter((_, i) => i !== index));
  const addOfficeLocation = () => setOfficeLocations([...officeLocations, {
    city: 'City',
    address: 'Address',
    ctaText: 'Get Direction'
  }]);
  const updateOfficeLocation = (index, field, value) => {
    const updated = [...officeLocations];
    updated[index][field] = value;
    setOfficeLocations(updated);
  };
  const deleteOfficeLocation = index => setOfficeLocations(officeLocations.filter((_, i) => i !== index));
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Contact Page CMS</h2>
        <Button onClick={handleSave} className="group" disabled={loading || saveStatus === 'saving'}>
          <Save className="w-4 h-4 mr-2" />
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="flex w-full overflow-x-auto justify-start hide-scrollbar gap-2 p-1 bg-primary-slate/30 rounded-xl mb-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="channels-intro">Channels Intro</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="form-options">Form Options</TabsTrigger>
          <TabsTrigger value="offices">Office Locations</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Hero Section Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <AdminInput value={heroContent.title} onChange={e => setHeroContent({
                ...heroContent,
                title: e.target.value
              })} placeholder="Enter title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <AdminTextarea value={heroContent.subtitle} onChange={e => setHeroContent({
                ...heroContent,
                subtitle: e.target.value
              })} placeholder="Enter subtitle" rows={3} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary CTA</label>
                  <AdminInput value={heroContent.primaryCta} onChange={e => setHeroContent({
                  ...heroContent,
                  primaryCta: e.target.value
                })} placeholder="Primary CTA text" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary CTA</label>
                  <AdminInput value={heroContent.secondaryCta} onChange={e => setHeroContent({
                  ...heroContent,
                  secondaryCta: e.target.value
                })} placeholder="Secondary CTA text" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Channels Intro */}
        <TabsContent value="channels-intro" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Channels Intro Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <AdminInput value={channelsIntro.title} onChange={e => setChannelsInfo({
                ...channelsIntro,
                title: e.target.value
              })} placeholder="Intro title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <AdminTextarea value={channelsIntro.description} onChange={e => setChannelsInfo({
                ...channelsIntro,
                description: e.target.value
              })} placeholder="Intro description" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Badge Text</label>
                <AdminInput value={channelsIntro.badgeText} onChange={e => setChannelsInfo({
                ...channelsIntro,
                badgeText: e.target.value
              })} placeholder="Badge text" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Contacts */}
        <TabsContent value="email" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Email Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={emailSectionTitle} onChange={e => setEmailSectionTitle(e.target.value)} placeholder="Section title" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Email Contacts</h3>
                <Button onClick={addEmailContact} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Email
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emailContacts.map((row, index) => <Card key={index} hover className="p-4">
                    <CardContent className="p-3 space-y-2">
                      <AdminInput value={row.label} onChange={e => updateEmailContact(index, 'label', e.target.value)} placeholder="Label" />
                      <AdminInput value={row.value} onChange={e => updateEmailContact(index, 'value', e.target.value)} placeholder="Email address" />
                      <Button size="sm" variant="outline" onClick={() => deleteEmailContact(index)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Phone Contacts */}
        <TabsContent value="phone" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Phone Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={phoneSectionTitle} onChange={e => setPhoneSectionTitle(e.target.value)} placeholder="Section title" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Phone Contacts</h3>
                <Button onClick={addPhoneContact} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Phone
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phoneContacts.map((row, index) => <Card key={index} hover className="p-4">
                    <CardContent className="p-3 space-y-2">
                      <AdminInput value={row.label} onChange={e => updatePhoneContact(index, 'label', e.target.value)} placeholder="Label" />
                      <AdminInput value={row.value} onChange={e => updatePhoneContact(index, 'value', e.target.value)} placeholder="Phone number" />
                      <Button size="sm" variant="outline" onClick={() => deletePhoneContact(index)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Form Content */}
        <TabsContent value="form" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Online Inquiry Form Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Form Title</label>
                <AdminInput value={contactFormSection.title} onChange={e => setContactFormSection({
                ...contactFormSection,
                title: e.target.value
              })} placeholder="Form title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Form Subtitle</label>
                <AdminTextarea value={contactFormSection.description} onChange={e => setContactFormSection({
                ...contactFormSection,
                description: e.target.value
              })} placeholder="Form subtitle" rows={3} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name Label</label>
                  <AdminInput value={contactFormSection.formLabels.name} onChange={e => setContactFormSection({
                  ...contactFormSection,
                  formLabels: {
                    ...contactFormSection.formLabels,
                    name: e.target.value
                  }
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Label</label>
                  <AdminInput value={contactFormSection.formLabels.email} onChange={e => setContactFormSection({
                  ...contactFormSection,
                  formLabels: {
                    ...contactFormSection.formLabels,
                    email: e.target.value
                  }
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Label</label>
                  <AdminInput value={contactFormSection.formLabels.phone} onChange={e => setContactFormSection({
                  ...contactFormSection,
                  formLabels: {
                    ...contactFormSection.formLabels,
                    phone: e.target.value
                  }
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Service Label</label>
                  <AdminInput value={contactFormSection.formLabels.service} onChange={e => setContactFormSection({
                  ...contactFormSection,
                  formLabels: {
                    ...contactFormSection.formLabels,
                    service: e.target.value
                  }
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company Label</label>
                  <AdminInput value={contactFormSection.formLabels.company} onChange={e => setContactFormSection({
                  ...contactFormSection,
                  formLabels: {
                    ...contactFormSection.formLabels,
                    company: e.target.value
                  }
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject Label</label>
                  <AdminInput value={contactFormSection.formLabels.subject} onChange={e => setContactFormSection({
                  ...contactFormSection,
                  formLabels: {
                    ...contactFormSection.formLabels,
                    subject: e.target.value
                  }
                })} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Submit Button Text</label>
                  <AdminInput value={contactFormSection.submitButton} onChange={e => setContactFormSection({
                  ...contactFormSection,
                  submitButton: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Submitting Button Text</label>
                  <AdminInput value={contactFormSection.submittingButton} onChange={e => setContactFormSection({
                  ...contactFormSection,
                  submittingButton: e.target.value
                })} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Response Card Title</label>
                  <AdminInput value={responseCard.title} onChange={e => setResponseCard({
                  ...responseCard,
                  title: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Privacy Card Title</label>
                  <AdminInput value={privacyCard.title} onChange={e => setPrivacyCard({
                  ...privacyCard,
                  title: e.target.value
                })} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Response Card Description</label>
                  <AdminTextarea value={responseCard.description} onChange={e => setResponseCard({
                  ...responseCard,
                  description: e.target.value
                })} rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Privacy Card Description</label>
                  <AdminTextarea value={privacyCard.description} onChange={e => setPrivacyCard({
                  ...privacyCard,
                  description: e.target.value
                })} rows={3} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Form Options (services, subjects) */}
        <TabsContent value="form-options" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Service Options</h3>
            <Button onClick={addServiceOption} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
          <div className="space-y-2">
            {serviceOptions?.map((opt, i) => <div key={i} className="flex items-center space-x-2">
                <AdminInput value={opt} onChange={e => updateServiceOption(i, e.target.value)} placeholder="Service option" />
                <Button size="sm" variant="outline" onClick={() => deleteServiceOption(i)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>)}
          </div>

          <div className="flex items-center justify-between pt-6">
            <h3 className="text-lg font-semibold">Subject Options</h3>
            <Button onClick={addSubjectOption} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          </div>
          <div className="space-y-2">
            {subjectOptions?.map((opt, i) => <Card key={i} hover className="p-4">
                <CardContent className="p-3 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <AdminInput value={opt.label} onChange={e => updateSubjectOption(i, 'label', e.target.value)} placeholder="Label (e.g., General Inquiry)" />
                    <AdminInput value={opt.value} onChange={e => updateSubjectOption(i, 'value', e.target.value)} placeholder="Value (e.g., general)" />
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" onClick={() => deleteSubjectOption(i)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </TabsContent>

        {/* Office Locations */}
        <TabsContent value="offices" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle>Office Locations Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <AdminInput value={officeLocationsSection.title} onChange={e => setOfficeLocationsSection({
                ...officeLocationsSection,
                title: e.target.value
              })} placeholder="Section title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                <AdminTextarea value={officeLocationsSection.subtitle} onChange={e => setOfficeLocationsSection({
                ...officeLocationsSection,
                subtitle: e.target.value
              })} placeholder="Section subtitle" rows={3} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <h3 className="text-lg font-semibold">Locations</h3>
                <Button onClick={addOfficeLocation} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Location
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {officeLocations.map((loc, i) => <Card key={i} hover className="p-4">
                    <CardContent className="p-3 space-y-2">
                      <AdminInput value={loc.city} onChange={e => updateOfficeLocation(i, 'city', e.target.value)} placeholder="City" />
                      <AdminInput value={loc.address} onChange={e => updateOfficeLocation(i, 'address', e.target.value)} placeholder="Address" />
                      <AdminInput value={loc.ctaText} onChange={e => updateOfficeLocation(i, 'ctaText', e.target.value)} placeholder="Button text" />
                      <Button size="sm" variant="outline" onClick={() => deleteOfficeLocation(i)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Section */}
        <TabsContent value="preview" className="space-y-6">
          <Card hover className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Live Preview (Hero)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary-black/50 rounded-lg p-6 border border-white/10">
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold text-white">
                    {heroContent.title}
                  </h1>
                  <p className="text-primary-gray text-lg max-w-2xl mx-auto">
                    {heroContent.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button>
                      {heroContent.primaryCta}
                    </Button>
                    <Button variant="outline">
                      {heroContent.secondaryCta}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}
