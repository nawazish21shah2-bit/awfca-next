-- Seed sites (Canada active; UK & Pakistan preconfigured) and Canada content placeholders.
-- Full content seeding is performed by scripts/seed-canada.ts after migration.

insert into public.sites (code, name, country_code, hostname, locale, is_active, settings)
values
  (
    'ca',
    'Arrahman Welfare Foundation Canada',
    'CA',
    'localhost',
    'en',
    true,
    jsonb_build_object(
      'shortName', 'AWFCA',
      'phone', '416-471-9636',
      'email', 'info@awfca.ca',
      'donateEmail', 'donate@awfca.ca',
      'address', '1515-70 Mornelle Court, Scarborough, ON M1E 4S8',
      'donateUrl', 'https://app.irm.io/awfca.ca'
    )
  ),
  (
    'uk',
    'Arrahman Welfare Foundation UK',
    'GB',
    'uk.awfca.org',
    'en',
    false,
    jsonb_build_object('shortName', 'AWFUK', 'comingSoon', true)
  ),
  (
    'pk',
    'Arrahman Welfare Foundation Pakistan',
    'PK',
    'pk.awfca.org',
    'en',
    false,
    jsonb_build_object('shortName', 'AWFPK', 'comingSoon', true)
  )
on conflict (code) do nothing;

-- Also allow common Canada production hostnames as aliases via settings notes.
-- Additional hostname rows can be added later; public resolver also checks SITE_HOST_MAP env.
