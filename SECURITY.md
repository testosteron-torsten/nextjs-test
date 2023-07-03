1. Do you need to configure CORS for your setup?

In the case of Supabase, we configured CORS to allow requests from our Next.js application's domain to access Supabase resources, by using Supabase's dashboard.

2. Describe how you configured a CSP for your project.

We used the next-secure-headers package. This package allows us to set various security-related headers, including CSP. 

3. Describe if/how your Database-Layer is vulnerable to SQL Injection and what you need to avoid to be safe.

Supabase provides protection against SQL Injection attacks by automatically sanitizing and escaping user input. 

4. Describe if/how your View-Layer is vulnerable to XSS and what you need to avoid to be safe.

In Next.js, we could use libraries like sanitize-html or xss to sanitize user-generated content before rendering it in our views. Additionally, Next.js provides automatic XSS protection by default by escaping user input in dynamic content when using JSX templates. 