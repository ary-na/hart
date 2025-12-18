// src/app/layout.tsx

import { cn } from "@hart/lib/utils";
import "@hart/lib/styles/__root.css";
import { metadata } from "@hart/lib/config/metadata";
import RootShell from "@hart/components/RootShell";
import { Providers } from "@hart/lib/config/providers";
import { fontClassName } from "@hart/lib/config/fonts";

export { metadata };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontClassName)} suppressHydrationWarning>
        <Providers>
          <RootShell>{children}</RootShell>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
