import { type Language } from "@hex/i18n";

import { type Context, results } from "@dext/web/page";

interface PageProps {
  lang: Language;
}

const Page = (_ctx: Context<PageProps>) => {
  return results.reactView(
    <div>
      <h1>Homepage</h1>
    </div>,
    {
      title: "Homepage",
      description: "This is the homepage",
      layout: "@app/shared/layout/layout.tsx",
    },
  );
};

export { Page, Page as default };
