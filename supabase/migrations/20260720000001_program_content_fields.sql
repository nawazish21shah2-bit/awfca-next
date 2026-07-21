-- Add dynamic content fields to programs table
-- Using JSONB in body column for flexible, per-program content management

-- No schema changes needed - we'll use the existing body JSONB column
-- This migration documents the expected structure:

-- body jsonb structure:
-- {
--   "expect": {
--     "title": "What to expect",
--     "text": "Supporters can expect...",
--     "items": [
--       { "title": "Community-Centered Delivery", "text": "Programs are guided..." },
--       { "title": "Accountable Stewardship", "text": "We focus on clear reporting..." }
--     ]
--   },
--   "how": {
--     "title": "How we work", 
--     "text": "We follow a structured approach...",
--     "items": [
--       { "question": "01. Identify Community Needs", "answer": "We begin by..." },
--       { "question": "02. Plan & Implement Programs", "answer": "We design practical..." }
--     ]
--   },
--   "content": [
--     "Full program description paragraph 1...",
--     "Full program description paragraph 2..."
--   ],
--   "faq": {
--     "title": "Frequently asked questions",
--     "text": "Learn how AWFCA programs work...",
--     "items": [
--       { "question": "How are donations used?", "answer": "Donations are stewarded..." }
--     ]
--   }
-- }

-- Add comment to document the structure
comment on column public.programs.body is 'Dynamic program content: expect (what to expect section), how (how we work section), content (full description), faq (program-specific FAQs)';