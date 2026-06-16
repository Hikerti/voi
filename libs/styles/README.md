# CSS architecture

Global CSS is loaded from `app/layout.tsx` in this order:

1. `normalize.css`
2. `variables.css`
3. `base.css`
4. `legacy/webflow.css`
5. `legacy/creativenest.webflow.css`
6. `layouts/*`
7. `components/*`
8. `utils.css`
9. temporary app-level hotfix files

The full Webflow layer stays in `legacy/` until selector-level cleanup is proven
by manual visual QA. Do not remove legacy selectors by static class search alone.
