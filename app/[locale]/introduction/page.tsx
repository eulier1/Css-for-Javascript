import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/src/i18n/routing";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudinaryGallery } from "@/components/ui/cloudinary-gallery";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { ExternalLink as TrackedExternalLink } from "@/components/tracked-link";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Introduction({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering for this locale
  setRequestLocale(locale);

  const t = await getTranslations("Content.module1");

  return (
    <div className="flex flex-1 flex-col bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <Card className="m-6 md:m-8 lg:m-12">
          <CardHeader className="px-8 md:px-12 lg:px-16 pt-8 md:pt-12 lg:pt-16 pb-6">
            <CardTitle className="mb-6">
              <h1 className="scroll-m-20 text-4xl md:text-5xl font-extrabold tracking-tight text-balance leading-tight">
                {t("section1.title")}
              </h1>
            </CardTitle>
            <CardDescription className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {t.rich("section1.description", {
                link: (chunks) => (
                  <TrackedExternalLink
                    href="https://the-joy-of-react-notes.vercel.app"
                    className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                    resourceName="joy_of_react"
                  >
                    {chunks}
                    <ExternalLink className="h-4 w-4" />
                  </TrackedExternalLink>
                ),
                strong: (chunks) => (
                  <strong className="font-bold text-foreground">
                    {chunks}
                  </strong>
                ),
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 md:px-12 lg:px-16 pb-8 md:pb-12 lg:pb-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight mt-8 mb-6 text-foreground">
                {t("section2.title")}
              </h2>
              <div className="space-y-6 text-base md:text-lg leading-relaxed">
                <p className="text-muted-foreground">
                  {t("section2.description.paragraph1")}
                </p>
                <p className="text-muted-foreground">
                  {t.rich("section2.description.paragraph2", {
                    link1: (chunks) => (
                      <TrackedExternalLink
                        href="https://www.hubermanlab.com/episode/using-failures-movement-and-balance-to-learn-faster"
                        className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                        resourceName="huberman_lab"
                      >
                        {chunks}
                        <ExternalLink className="h-4 w-4" />
                      </TrackedExternalLink>
                    ),
                    link2: (chunks) => (
                      <TrackedExternalLink
                        href="https://www.youtube.com/watch?v=-71zdXCMU6A&t=2622s"
                        className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                        resourceName="growth_mindset"
                      >
                        {chunks}
                        <ExternalLink className="h-4 w-4" />
                      </TrackedExternalLink>
                    ),
                  })}
                </p>
                <p className="text-muted-foreground">
                  {t.rich("section2.description.paragraph3", {
                    link: (chunks) => (
                      <TrackedExternalLink
                        href="https://academicaffairs.arizona.edu/l2l-strategy-interleaving"
                        className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                        resourceName="interleaving_strategy"
                      >
                        {chunks}
                        <ExternalLink className="h-4 w-4" />
                      </TrackedExternalLink>
                    ),
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
