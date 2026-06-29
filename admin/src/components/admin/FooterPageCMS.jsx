import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/api";

export function FooterPageCMS() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [footerData, setFooterData] = useState({
    company_name: '',
    email: '',
    phone: '',
    address: '',
    copyright_text: '',
    privacy_policy_text: '',
    terms_conditions_text: '',
    cookie_policy_text: '',
    social_links: {
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: ''
    },
    custom_links: []
  });

  useEffect(() => {
    // Fetch initial data
    const fetchFooter = async () => {
      try {
        const res = await axiosInstance.get('/admin/footer/');
        if (res.data) {
          const data = res.data;
          setFooterData({
            ...data,
            social_links: data.social_links || { linkedin: '', twitter: '', instagram: '', facebook: '' },
            custom_links: data.custom_links || []
          });
        }
      } catch (e) {
        console.error('Error fetching footer:', e);
      }
    };
    fetchFooter();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post('/admin/footer/', footerData);
      if (res.data) {
        toast({ title: 'Saved', description: 'Footer updated successfully.' });
      } else {
        toast({ title: 'Error', description: 'Failed to update footer.', variant: 'destructive' });
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to update footer.', variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">Footer Settings</h2>
        <p className="text-muted-foreground">Manage global footer information.</p>
      </div>

      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Footer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>
            <input 
              type="text" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={footerData.company_name || ''} 
              onChange={e => setFooterData({...footerData, company_name: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={footerData.email || ''} 
              onChange={e => setFooterData({...footerData, email: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <input 
              type="text" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={footerData.phone || ''} 
              onChange={e => setFooterData({...footerData, phone: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <textarea 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={footerData.address || ''} 
              onChange={e => setFooterData({...footerData, address: e.target.value})} 
            />
          </div>

          <div className="pt-4 pb-2 border-b">
            <h3 className="text-lg font-semibold">Legal & Copyright</h3>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Copyright Text</label>
            <input 
              type="text" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={footerData.copyright_text || ''} 
              onChange={e => setFooterData({...footerData, copyright_text: e.target.value})} 
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Privacy Policy Content</label>
              <textarea 
                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={footerData.privacy_policy_text || ''} 
                onChange={e => setFooterData({...footerData, privacy_policy_text: e.target.value})} 
                placeholder="Enter privacy policy text here..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Terms & Conditions Content</label>
              <textarea 
                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={footerData.terms_conditions_text || ''} 
                onChange={e => setFooterData({...footerData, terms_conditions_text: e.target.value})} 
                placeholder="Enter terms and conditions text here..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cookie Policy Content</label>
              <textarea 
                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={footerData.cookie_policy_text || ''} 
                onChange={e => setFooterData({...footerData, cookie_policy_text: e.target.value})} 
                placeholder="Enter cookie policy text here..."
              />
            </div>
          </div>

          <div className="pt-4 pb-2 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">Custom Links</h3>
            <Button variant="outline" size="sm" onClick={() => setFooterData({...footerData, custom_links: [...(footerData.custom_links || []), {label: '', url: ''}]})}>
              + Add New URL
            </Button>
          </div>

          <div className="space-y-4">
            {(footerData.custom_links || []).map((link, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <input 
                  type="text" 
                  placeholder="Link Label (e.g. Support)"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={link.label}
                  onChange={e => {
                    const newLinks = [...footerData.custom_links];
                    newLinks[idx].label = e.target.value;
                    setFooterData({...footerData, custom_links: newLinks});
                  }}
                />
                <input 
                  type="text" 
                  placeholder="URL (e.g. /support)"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={link.url}
                  onChange={e => {
                    const newLinks = [...footerData.custom_links];
                    newLinks[idx].url = e.target.value;
                    setFooterData({...footerData, custom_links: newLinks});
                  }}
                />
                <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" onClick={() => {
                  const newLinks = footerData.custom_links.filter((_, i) => i !== idx);
                  setFooterData({...footerData, custom_links: newLinks});
                }}>
                  Remove
                </Button>
              </div>
            ))}
            {(!footerData.custom_links || footerData.custom_links.length === 0) && (
              <p className="text-sm text-muted-foreground">No custom links added yet.</p>
            )}
          </div>

          <div className="pt-4 pb-2 border-b">
            <h3 className="text-lg font-semibold">Social Media Links</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">LinkedIn URL</label>
              <input 
                type="url" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={footerData.social_links?.linkedin || ''} 
                onChange={e => setFooterData({...footerData, social_links: {...footerData.social_links, linkedin: e.target.value}})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Twitter URL</label>
              <input 
                type="url" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={footerData.social_links?.twitter || ''} 
                onChange={e => setFooterData({...footerData, social_links: {...footerData.social_links, twitter: e.target.value}})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Instagram URL</label>
              <input 
                type="url" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={footerData.social_links?.instagram || ''} 
                onChange={e => setFooterData({...footerData, social_links: {...footerData.social_links, instagram: e.target.value}})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Facebook URL</label>
              <input 
                type="url" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={footerData.social_links?.facebook || ''} 
                onChange={e => setFooterData({...footerData, social_links: {...footerData.social_links, facebook: e.target.value}})} 
              />
            </div>
          </div>
          
          <div className="pt-4">
            <Button onClick={handleSave} disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              Save Footer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
