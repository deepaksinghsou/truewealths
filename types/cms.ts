export type CmsContent = {
  home: {
    heading: string;
    subheading: string;
    description: string;
    intro: string;
    steps: string[];
    servicesPreview: string[];
    ctaText: string;
  };
  about: {
    heading: string;
    founderName: string;
    founderRole: string;
    philosophy: string;
    credentials: string[];
  };
  services: {
    heading: string;
    items: Array<{ title: string; description: string }>;
  };
  howWeWork: {
    heading: string;
    steps: string[];
  };
  contact: {
    heading: string;
    mobile: string;
    email: string;
    closingLine: string;
  };
  legal: {
    heading: string;
    disclaimer: string;
    privacy: string;
    riskDisclosure: string;
  };
};
