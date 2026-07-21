export type AppRole = "super_admin" | "site_editor";
export type PublishStatus = "draft" | "published";
export type SubmissionStatus =
  | "new"
  | "in_progress"
  | "resolved"
  | "spam"
  | "archived";
export type SubmissionType = "contact" | "volunteer";
export type MediaKind = "image" | "pdf" | "other";

export type Site = {
  id: string;
  code: string;
  name: string;
  country_code: string;
  hostname: string;
  locale: string;
  is_active: boolean;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  is_super_admin: boolean;
  created_at: string;
  updated_at: string;
};

export type SiteMembership = {
  id: string;
  user_id: string;
  site_id: string;
  role: AppRole;
  created_at: string;
  site?: Site;
};

export type MediaAsset = {
  id: string;
  site_id: string | null;
  kind: MediaKind;
  bucket: string;
  path: string;
  public_url: string | null;
  file_name: string;
  mime_type: string;
  size_bytes: number;
  alt_text: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type BlogBody = {
  opening?: string[];
  quote?: string;
  body?: string[];
  heading?: string;
  headingText?: string;
  bullets?: string[];
  tags?: string[];
};

export type Post = {
  id: string;
  site_id: string | null;
  override_of_id: string | null;
  slug: string;
  title: string;
  excerpt: string;
  published_at: string | null;
  image_url: string | null;
  image_asset_id: string | null;
  body: BlogBody;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[];
  status: PublishStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type ProgramImage = {
  id: string;
  program_id: string;
  media_asset_id: string | null;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type ProgramExpectItem = {
  title: string;
  text: string;
};

export type ProgramHowItem = {
  question: string;
  answer: string;
};

export type ProgramFaqItem = {
  question: string;
  answer: string;
};

export type ProgramBody = {
  expect?: {
    title?: string;
    text?: string;
    items?: ProgramExpectItem[];
  };
  how?: {
    title?: string;
    text?: string;
    items?: ProgramHowItem[];
  };
  content?: string[];
  faq?: {
    title?: string;
    text?: string;
    items?: ProgramFaqItem[];
  };
  gallery?: string[];
};

export type Program = {
  id: string;
  site_id: string | null;
  override_of_id: string | null;
  slug: string;
  nav_label: string;
  category: string;
  title: string;
  image_url: string | null;
  image_asset_id: string | null;
  summary: string[];
  body: ProgramBody;
  seo_title: string | null;
  seo_description: string | null;
  status: PublishStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  gallery?: ProgramImage[];
};

export type FaqCategory = {
  id: string;
  site_id: string | null;
  override_of_id: string | null;
  code: string;
  label: string;
  sort_order: number;
  status: PublishStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type FaqItem = {
  id: string;
  site_id: string | null;
  override_of_id: string | null;
  category_id: string | null;
  question: string;
  answer: string;
  placement: string;
  status: PublishStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type TeamMember = {
  id: string;
  site_id: string | null;
  override_of_id: string | null;
  slug: string;
  name: string;
  role: string;
  bio: string;
  image_url: string | null;
  image_asset_id: string | null;
  status: PublishStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Report = {
  id: string;
  site_id: string | null;
  override_of_id: string | null;
  year: string;
  report_type: string;
  title: string;
  cover_image_url: string | null;
  cover_asset_id: string | null;
  pdf_url: string | null;
  pdf_asset_id: string | null;
  external_url: string | null;
  description: string | null;
  status: PublishStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type AchievementCounter = {
  id: string;
  site_id: string | null;
  override_of_id: string | null;
  key: string;
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  placement: string;
  image_url: string | null;
  description: string | null;
  status: PublishStatus;
  sort_order: number;
  as_of_date: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type FormSubmission = {
  id: string;
  site_id: string;
  type: SubmissionType;
  status: SubmissionStatus;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  message: string | null;
  availability: string | null;
  skills: string | null;
  preferred_roles: string | null;
  city: string | null;
  country: string | null;
  consent_version: string | null;
  consent_at: string | null;
  source_url: string | null;
  source_hostname: string | null;
  assigned_to: string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type StaffSession = {
  user: { id: string; email: string };
  profile: Profile;
  memberships: SiteMembership[];
  sites: Site[];
  isSuperAdmin: boolean;
};
