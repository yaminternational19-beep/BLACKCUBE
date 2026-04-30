'use client';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface ContentField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'video' | 'repeater' | 'group' | 'list' | 'file';
  value?: string | unknown;
  fields?: ContentField[];
}





export interface ContentPage {
  id: string;
  title: string;
  fields: ContentField[];
}

interface ContentContextType {
  content: ContentPage[];
  updateField: (pageId: string, fieldId: string, value: string) => void;
  savePage: (pageId: string) => Promise<void>;
  uploadFieldFile: (pageId: string, fieldId: string, file: File) => Promise<string>;
  loadPage: (pageId: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Mock data for demonstration
const initialContent: ContentPage[] = [
  {
    id: 'home',
    title: 'Home Page',
    fields: [
      {
        id: 'hero-title',
        label: 'Hero Title',
        type: 'text',
        value: 'Welcome to Our Website'
      },
      {
        id: 'hero-subtitle',
        label: 'Hero Subtitle',
        type: 'textarea',
        value: 'This is a sample subtitle for the hero section'
      },
      {
        id: 'hero-image',
        label: 'Hero Image',
        type: 'image',
        value: '/hero-image.jpg'
      }
    ]
  },
  {
    id: 'about',
    title: 'About Page',
    fields: [
      {
        id: 'about-title',
        label: 'About Title',
        type: 'text',
        value: 'About Us'
      },
      {
        id: 'about-content',
        label: 'About Content',
        type: 'textarea',
        value: 'This is the about page content'
      }
    ]
  },
  {
    id: 'services',
    title: 'Services Page',
    fields: [
      {
        id: 'services-title',
        label: 'Services Title',
        type: 'text',
        value: 'Our Services'
      },
      {
        id: 'services-content',
        label: 'Services Content',
        type: 'textarea',
        value: 'This is the services page content'
      }
    ]
  },
  {
    id: 'contact',
    title: 'Contact Page',
    fields: [
      {
        id: 'contact-title',
        label: 'Contact Title',
        type: 'text',
        value: 'Contact Us'
      },
      {
        id: 'contact-content',
        label: 'Contact Content',
        type: 'textarea',
        value: 'This is the contact page content'
      }
    ]
  }
];

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentPage[]>(initialContent);

  const updateField = useCallback((pageId: string, fieldId: string, value: string) => {
    setContent(prev => 
      prev.map(page => 
        page.id === pageId 
          ? {
              ...page,
              fields: page.fields.map(field => 
                field.id === fieldId 
                  ? { ...field, value }
                  : field
              )
            }
          : page
      )
    );
  }, []);

  const savePage = useCallback(async (pageId: string) => {
    // Mock save functionality
    console.log(`Saving page: ${pageId}`);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Page ${pageId} saved successfully`);
        resolve();
      }, 1000);
    });
  }, []);

  const uploadFieldFile = useCallback(async (pageId: string, fieldId: string, file: File): Promise<string> => {
    // Mock file upload functionality
    console.log(`Uploading file for page: ${pageId}, field: ${fieldId}`);
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const mockUrl = `/uploads/${file.name}`;
        console.log(`File uploaded: ${mockUrl}`);
        resolve(mockUrl);
      }, 1000);
    });
  }, []);

  const loadPage = useCallback(async (pageId: string) => {
    // Mock load functionality
    console.log(`Loading page: ${pageId}`);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Page ${pageId} loaded successfully`);
        resolve();
      }, 500);
    });
  }, []);

  return (
    <ContentContext.Provider value={{
      content,
      updateField,
      savePage,
      uploadFieldFile,
      loadPage
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
