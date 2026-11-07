# Landing-page isolation

Adding, editing, or publishing a landing page MUST NOT change any other landing page. This is a standing user requirement.

- Keep each new client in its own directory with self-contained HTML, CSS, JavaScript, images, forms, and tracking. Do not modify shared/root assets to implement client-specific changes.
- This workspace's Git origin is `Sachita007/super-shine-landing-pages`. Do not push or deploy that root when publishing another client.
- Publish each client from an isolated checkout of its dedicated repository and hosting project. Copy only that client's directory into its publishing root; never copy the parent build or Vercel configuration.
- Before publishing, record protected local-file hashes, existing repository branch SHAs, hosting settings, and public-page hashes. After publishing, compare them and verify the new live page, including mobile rendering.
- Do not stage unrelated changes, reuse another client's form or tracking IDs, or alter its domains, DNS, hosting settings, content, or assets.
- Do not publish new photos or other unapproved content without user approval. Hostinger changes always need explicit approval.

## Deployment targets

| Client | Local source | GitHub repository | GitHub Pages |
| --- | --- | --- | --- |
| Super Shine | Workspace root | `Sachita007/super-shine-landing-pages` | `https://sachita007.github.io/super-shine-landing-pages/` |
| Diamond Auto Restoration | `diamond-auto-restoration/` | `Sachita007/diamond-auto-restoration` | `https://sachita007.github.io/diamond-auto-restoration/` |
| 719 Auto Customs | `719-auto-customs/` | `Sachita007/719-auto-customs` | `https://sachita007.github.io/719-auto-customs/` |

719 is a static site served from `main` at `/` with `.nojekyll`. Its two quote forms remain clearly labelled preview-only: no lead transmission, storage, or success redirect. Connect them only to a user-supplied, verified 719 destination. The approved hero is `assets/corvette.webp`, not video.
