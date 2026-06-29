'use client';

import { useContent } from "@/contexts/ContentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FileText, Image, Type, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContactManagement } from "./ContactManagement";
import { JobApplications } from "./JobApplications";
import { HomePageCMS } from "./HomePageCMS";
import { AboutPageCMS } from "./AboutPageCMS";
import { ServicesPageCMS } from "./ServicesPageCMS";
import { ContactPageCMS } from "./ContactPageCMS";
import { PortfolioPageCMS } from "./PortfolioPageCMS";
import { CareerPageCMS } from "./CareerPageCMS";
import { FooterPageCMS } from "./FooterPageCMS";
export function AdminContent({
  activeTab
}) {
  const {
    content,
    updateField,
    savePage,
    uploadFieldFile,
    loadPage
  } = useContent();
  const {
    toast
  } = useToast();

  // Content is already loaded via initialContent or can be loaded on-demand
  // Removing the loop that was causing re-render freezes

  const handleFieldUpdate = (pageId, fieldId, value) => {
    updateField(pageId, fieldId, value);
  };
  const handleSavePage = async pageId => {
    try {
      await savePage(pageId);
      toast({
        title: "Saved",
        description: `${pageId} saved.`
      });
    } catch {
      toast({
        title: "Error",
        description: `Failed to save ${pageId}.`,
        variant: "destructive"
      });
    }
  };
  const getFieldIcon = type => {
    switch (type) {
      case 'text':
        return <Type className="w-4 h-4" />;
      case 'textarea':
        return <FileText className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };
  const renderDashboard = () => <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your website content and analytics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card hover className="p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CMS</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold text-primary">{content.length}</div> */}
            <p className="text-xs text-muted-foreground">Active content pages</p>
          </CardContent>
        </Card>

        <Card hover className="p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Fields</CardTitle>
            <Type className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {content.reduce((total, page) => total + page.fields.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Editable content fields</p>
          </CardContent>
        </Card>

        <Card hover className="p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Today</div>
            <p className="text-xs text-muted-foreground">Recent changes made</p>
          </CardContent>
        </Card>

        <Card hover className="p-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <div className="h-2 w-2 bg-success rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Live</div>
            <p className="text-xs text-muted-foreground">Site is published</p>
          </CardContent>
        </Card>
      </div>
    </div>;

  // const renderHomePageEditor = () => {
  //   const homePage = content.find(page => page.id === 'home');
  //   if (!homePage) return null;

  //   const collectFieldsByPrefix = (fields: ContentField[], prefix: string): ContentField[] => {
  //     let result: ContentField[] = [];
  //     for (const field of fields) {
  //       if (field.id.startsWith(prefix)) {
  //         result.push(field);
  //       }
  //       if (field.fields && field.fields.length > 0) {
  //         result = [...result, ...collectFieldsByPrefix(field.fields, prefix)];
  //       }
  //     }
  //     return result;
  //   };

  //   const getSectionFields = (prefix: string) => {
  //     return homePage.fields ? collectFieldsByPrefix(homePage.fields, prefix) : [];
  //   };

  //   const getSectionIcon = (section: string) => {
  //     switch (section) {
  //       case 'hero': return <Image className="w-5 h-5" />;
  //       case 'principles': return <Video className="w-5 h-5" />;
  //       case 'authority': return <Users className="w-5 h-5" />;
  //       case 'services': return <SettingsIcon className="w-5 h-5" />;
  //       case 'stats': return <BarChart3 className="w-5 h-5" />;
  //       case 'testimonials': return <MessageSquare className="w-5 h-5" />;
  //       case 'footer': return <Phone className="w-5 h-5" />;
  //       default: return <FileText className="w-5 h-5" />;
  //     }
  //   };

  //   const renderField = (field: ContentField, path: string[] = []) => {
  //     const keyPath = [...path, field.id].join('/');
  //     // If field is group or repeater, render recursively
  //     if (field.type === 'group' || field.type === 'repeater') {
  //       const children = field.fields || [];
  //       const seenIds = new Set<string>();
  //       const uniqueChildren = children.filter(child => {
  //         if (seenIds.has(child.id)) return false;
  //         seenIds.add(child.id);
  //         return true;
  //       });
  //       return (
  //         <div key={keyPath} className="border p-3 rounded-md mb-2">
  //           <h5 className="font-semibold mb-2">{field.label}</h5>
  //           {uniqueChildren.map(child => renderField(child, [...path, field.id]))}
  //         </div>
  //       );
  //     }

  //     return (
  //       <div key={keyPath} className="space-y-2">
  //         <label className="text-sm font-medium text-foreground flex items-center gap-2">
  //           {getFieldIcon(field.type)}
  //           {field.label}
  //         </label>

  //         {field.type === "textarea" ? (
  //           <Textarea
  //             value={field.value as string}
  //             onChange={(e) => handleFieldUpdate("home", keyPath, e.target.value)}
  //             placeholder={`Enter ${field.label.toLowerCase()}`}
  //             className="min-h-24 resize-vertical"
  //           />
  //         ) : field.type === "image" ? (
  //           <>
  //             <Input
  //               type="file"
  //               accept="image/*"
  //               onChange={async (e) => {
  //                 const file = e.target.files?.[0];
  //                 if (file) {
  //                   try {
  //                     const url = await uploadFieldFile('home', keyPath, file);
  //                     handleFieldUpdate('home', keyPath, url);
  //                   } catch {
  //                     toast({ title: 'Upload failed', variant: 'destructive' });
  //                   }
  //                 }
  //               }}
  //             />
  //             <Input
  //               type="url"
  //               value={field.value as string}
  //               onChange={(e) => handleFieldUpdate("home", keyPath, e.target.value)}
  //               placeholder="Enter image URL or upload file"
  //             />
  //           </>
  //         ) : field.type === "video" ? (
  //           <>
  //             <Input
  //               type="file"
  //               accept="video/*"
  //               onChange={async (e) => {
  //                 const file = e.target.files?.[0];
  //                 if (file) {
  //                   try {
  //                     const url = await uploadFieldFile('home', keyPath, file);
  //                     handleFieldUpdate('home', keyPath, url);
  //                   } catch {
  //                     toast({ title: 'Upload failed', variant: 'destructive' });
  //                   }
  //                 }
  //               }}
  //             />
  //             <Input
  //               type="url"
  //               value={field.value as string}
  //               onChange={(e) => handleFieldUpdate("home", keyPath, e.target.value)}
  //               placeholder="Enter video URL or upload file"
  //             />
  //           </>
  //         ) : (
  //           <Input
  //             type="text"
  //             value={field.value as string}
  //             onChange={(e) => handleFieldUpdate("home", keyPath, e.target.value)}
  //             placeholder={`Enter ${field.label.toLowerCase()}`}
  //           />
  //         )}
  //       </div>
  //     );
  //   };

  //   return (
  //     <div className="space-y-6">
  //       <Accordion type="single" collapsible className="space-y-4">
  //         <AccordionItem value="hero" className="border border-border rounded-lg">
  //           <AccordionTrigger className="px-6 py-4 hover:no-underline">
  //             <div className="flex items-center gap-3">
  //               {getSectionIcon('hero')}
  //               <div className="text-left">
  //                 <h4 className="text-lg font-semibold">Hero Section</h4>
  //               </div>
  //             </div>
  //           </AccordionTrigger>
  //           <AccordionContent className="px-6 pb-6">
  //             <div className="grid gap-4 md:grid-cols-2">
  //               {getSectionFields('hero').map(f => renderField(f, ['home','hero']))}
  //             </div>
  //           </AccordionContent>
  //         </AccordionItem>

  //         <AccordionItem value="principles" className="border border-border rounded-lg">
  //           <AccordionTrigger className="px-6 py-4 hover:no-underline">
  //             <div className="flex items-center gap-3">
  //               {getSectionIcon('principles')}
  //               <div className="text-left">
  //                 <h4 className="text-lg font-semibold">12 Principles Section</h4>
  //               </div>
  //             </div>
  //           </AccordionTrigger>
  //           <AccordionContent className="px-6 pb-6">
  //             <div className="grid gap-4 md:grid-cols-2">
  //               {getSectionFields('principles').map(f => renderField(f, ['principles']))}
  //             </div>
  //           </AccordionContent>
  //         </AccordionItem>

  //         <AccordionItem value="authority" className="border border-border rounded-lg">
  //           <AccordionTrigger className="px-6 py-4 hover:no-underline">
  //             <div className="flex items-center gap-3">
  //               {getSectionIcon('authority')}
  //               <div className="text-left">
  //                 <h4 className="text-lg font-semibold">Authority Section</h4>
  //               </div>
  //             </div>
  //           </AccordionTrigger>
  //           <AccordionContent className="px-6 pb-6">
  //             <div className="grid gap-4 md:grid-cols-2">
  //               {getSectionFields('authority').map(f => renderField(f, ['authority']))}
  //             </div>
  //           </AccordionContent>
  //         </AccordionItem>

  //         <AccordionItem value="book-home" className="border border-border rounded-lg">
  //           <AccordionTrigger className="px-6 py-4 hover:no-underline">
  //             <div className="flex items-center gap-3">
  //               {getSectionIcon('book-home')}
  //               <div className="text-left">
  //                 <h4 className="text-lg font-semibold">Book Section</h4>
  //               </div>
  //             </div>
  //           </AccordionTrigger>
  //           <AccordionContent className="px-6 pb-6">
  //             <div className="grid gap-4 md:grid-cols-2">
  //               {getSectionFields('book-home').map(f => renderField(f, ['book-home']))}
  //             </div>
  //           </AccordionContent>
  //         </AccordionItem>

  //         <AccordionItem value="multimedia" className="border border-border rounded-lg">
  //           <AccordionTrigger className="px-6 py-4 hover:no-underline">
  //             <div className="flex items-center gap-3">
  //               {getSectionIcon('multimedia')}
  //               <div className="text-left">
  //                 <h4 className="text-lg font-semibold">Multi Media Section</h4>
  //               </div>
  //             </div>
  //           </AccordionTrigger>
  //           <AccordionContent className="px-6 pb-6">
  //             <div className="grid gap-4 md:grid-cols-2">
  //               {getSectionFields('multimedia').map(f => renderField(f, ['multimedia']))}
  //             </div>
  //           </AccordionContent>
  //         </AccordionItem>

  //         <AccordionItem value="success" className="border border-border rounded-lg">
  //           <AccordionTrigger className="px-6 py-4 hover:no-underline">
  //             <div className="flex items-center gap-3">
  //               {getSectionIcon('success')}
  //               <div className="text-left">
  //                 <h4 className="text-lg font-semibold">Success Stories Section</h4>
  //               </div>
  //             </div>
  //           </AccordionTrigger>
  //           <AccordionContent className="px-6 pb-6">
  //             <div className="grid gap-4 md:grid-cols-2">
  //               {getSectionFields('success').map(f => renderField(f, ['success']))}
  //             </div>
  //           </AccordionContent>
  //         </AccordionItem>

  //         <AccordionItem value="recruiting" className="border border-border rounded-lg">
  //           <AccordionTrigger className="px-6 py-4 hover:no-underline">
  //             <div className="flex items-center gap-3">
  //               {getSectionIcon('recruiting')}
  //               <div className="text-left">
  //                 <h4 className="text-lg font-semibold">Recruiting Section</h4>
  //               </div>
  //             </div>
  //           </AccordionTrigger>
  //           <AccordionContent className="px-6 pb-6">
  //             <div className="grid gap-4 md:grid-cols-2">
  //               {getSectionFields('recruiting').map(f => renderField(f, ['recruiting']))}
  //             </div>
  //           </AccordionContent>
  //         </AccordionItem>
  //       </Accordion>

  //       <div className="flex gap-4 pt-6 border-t">
  //         <Button
  //           onClick={() => handleSavePage('home')}
  //           className="btn-hero"
  //         >
  //           <Save className="w-4 h-4 mr-2" />
  //           Save Home Page
  //         </Button>
  //         <Button
  //           variant="outline"
  //           onClick={() => window.open('/', '_blank')}
  //         >
  //           Preview Changes
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // };

  // const renderPages = () => (
  //   <div className="space-y-6">
  //     <div>
  //       <h2 className="text-3xl font-bold text-primary mb-2">Content Management System</h2>
  //     </div>

  //     <Tabs defaultValue={content[0]?.id || 'home'} className="space-y-6">
  //       <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-flex">
  //         {content.map((page) => (
  //           <TabsTrigger key={page.id} value={page.id} className="text-sm">
  //             {page.title}
  //           </TabsTrigger>
  //         ))}
  //       </TabsList>

  //       {content.map((page) => (
  //         <TabsContent key={page.id} value={page.id} className="space-y-6">
  //           {page.id === "home" ? (
  //             <div>Home page editor coming soon</div>
  //           ) : (
  //             <>
  //               <div className="flex items-center gap-2 mb-6">
  //                 <h3 className="text-2xl font-bold text-primary">{page.title}</h3>
  //                 <Badge variant="secondary">{page.fields.length} fields</Badge>
  //               </div>

  //               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  //                 {page.fields.map((field) => (
  //                   <Card key={field.id} className="card-elegant">
  //                     <CardHeader className="pb-3">
  //                       <CardTitle className="flex items-center gap-2 text-lg">
  //                         {getFieldIcon(field.type)}
  //                         {field.label}
  //                       </CardTitle>
  //                     </CardHeader>
  //                     <CardContent>
  //                       {field.type === "textarea" ? (
  //                         <Textarea
  //                           value={field.value}
  //                           onChange={(e) =>
  //                             handleFieldUpdate(page.id, field.id, e.target.value)
  //                           }
  //                           placeholder={`Enter ${field.label.toLowerCase()}`}
  //                           className="min-h-24 resize-vertical"
  //                         />
  //                       ) : (
  //                         <Input
  //                           type={field.type === "image" ? "url" : "text"}
  //                           value={field.value}
  //                           onChange={(e) =>
  //                             handleFieldUpdate(page.id, field.id, e.target.value)
  //                           }
  //                           placeholder={
  //                             field.type === "image"
  //                               ? "Enter image URL or path"
  //                               : `Enter ${field.label.toLowerCase()}`
  //                           }
  //                         />
  //                       )}

  //                       {field.type === "image" && field.value && (
  //                         <div className="mt-3">
  //                           <p className="text-sm text-muted-foreground mb-2">Preview:</p>
  //                           <div className="w-full h-20 bg-muted rounded-md flex items-center justify-center overflow-hidden">
  //                             {field.value.startsWith("http") ||
  //                               field.value.startsWith("/") ? (
  //                               <img
  //                                 src={getAssetUrl(field.value as string)}
  //                                 alt="Preview"
  //                                 className="w-full h-full object-cover"
  //                                 onError={(e) => {
  //                                   const target = e.target as HTMLImageElement;
  //                                   target.style.display = "none";
  //                                   target.nextElementSibling!.classList.remove("hidden");
  //                                 }}
  //                               />
  //                             ) : null}
  //                             <div className="hidden text-sm text-muted-foreground">
  //                               Image preview not available
  //                             </div>
  //                           </div>
  //                         </div>
  //                       )}
  //                     </CardContent>
  //                   </Card>
  //                 ))}
  //               </div>

  //               <div className="flex gap-4 pt-6 border-t">
  //                 <Button onClick={() => handleSavePage(page.id)} className="btn-hero">
  //                   <Save className="w-4 h-4 mr-2" />
  //                   Save {page.title}
  //                 </Button>
  //                 <Button variant="outline" onClick={() => window.open("/", "_blank")}>
  //                   Preview Changes
  //                 </Button>
  //               </div>
  //             </>
  //           )}
  //         </TabsContent>
  //       ))}
  //     </Tabs>
  //   </div>
  // );

  // const renderPlaceholder = (title: string, description: string, icon: React.ReactNode) => (
  //   <div className="space-y-6">
  //     <div>
  //       <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
  //       <p className="text-muted-foreground">{description}</p>
  //     </div>

  //     <Card className="card-elegant">
  //       <CardContent className="flex flex-col items-center justify-center py-16">
  //         <div className="mb-4 p-3 bg-muted rounded-full">
  //           {icon}
  //         </div>
  //         <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
  //         <p className="text-muted-foreground text-center max-w-md">
  //           This feature is currently under development. Stay tuned for updates!
  //         </p>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );

  switch (activeTab) {
    case 'dashboard':
      return renderDashboard();
    case 'users':
      return <ContactManagement />;
    case 'job-applications':
      return <JobApplications />;
    case 'home-cms':
      return <HomePageCMS />;
    case 'about-cms':
      return <AboutPageCMS />;
    case 'services-cms':
      return <ServicesPageCMS />;
    case 'contact-cms':
      return <ContactPageCMS />;
    case 'portfolio-cms':
      return <PortfolioPageCMS />;
    case 'career-cms':
      return <CareerPageCMS />;
    case 'footer-cms':
      return <FooterPageCMS />;
    default:
      return renderDashboard();
  }
}
