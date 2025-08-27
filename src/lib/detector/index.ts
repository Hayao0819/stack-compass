// index.ts

import type { Detector, ManifestContent } from "./base";
import {
  AngularDetector,
  DjangoDetector,
  DockerComposeDetector,
  DockerDetector,
  ExpressDetector,
  FlaskDetector,
  GoDetector,
  KubernetesDetector,
  LaravelDetector,
  NestDetector,
  NextDetector,
  ReactDetector,
  RustDetector,
  SpringDetector,
  SvelteDetector,
  TerraformDetector,
  VueDetector,
} from "./detectors";

export function runDetectors(
  files: string[],
  manifests: Record<string, ManifestContent> = {},
  langs: string[] = [],
): string[] {
  const detectors: Detector[] = [
    new NextDetector(files, manifests, langs),
    new ReactDetector(files, manifests, langs),
    new VueDetector(files, manifests, langs),
    new AngularDetector(files, manifests, langs),
    new SvelteDetector(files, manifests, langs),
    new ExpressDetector(files, manifests, langs),
    new NestDetector(files, manifests, langs),
    new DjangoDetector(files, manifests, langs),
    new FlaskDetector(files, manifests, langs),
    new SpringDetector(files, manifests, langs),
    new LaravelDetector(files, manifests, langs),
    new GoDetector(files, manifests, langs),
    new RustDetector(files, manifests, langs),
    // infra/ops detectors
    new DockerDetector(files, manifests, langs),
    new DockerComposeDetector(files, manifests, langs),
    new KubernetesDetector(files, manifests, langs),
    new TerraformDetector(files, manifests, langs),
  ];

  return detectors
    .filter((d) => d.detect())
    .map((d) => d.constructor.name.replace("Detector", ""));
}
