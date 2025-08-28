import { Detector, type ManifestContent } from "./base";

// ================= Web系 =================
export class NextDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Next", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile("next.config.js") || this.hasFile("next.config.mjs");
  }
  detectByManifests(): boolean {
    return this.hasJsonDependency("package.json", "next");
  }
  detectByLangs(): boolean {
    return this.hasLang("JavaScript") || this.hasLang("TypeScript");
  }
}

export class ReactDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("React", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile(/App\.(t|j)sx$/);
  }
  detectByManifests(): boolean {
    return this.hasJsonDependency("package.json", "react");
  }
  detectByLangs(): boolean {
    return this.hasLang("JavaScript") || this.hasLang("TypeScript");
  }
}

export class VueDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Vue", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile("vue.config.js");
  }
  detectByManifests(): boolean {
    return this.hasJsonDependency("package.json", "vue");
  }
  detectByLangs(): boolean {
    return this.hasLang("JavaScript") || this.hasLang("TypeScript");
  }
}

export class AngularDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Angular", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile("angular.json");
  }
  detectByManifests(): boolean {
    return this.hasJsonDependency("package.json", "@angular/core");
  }
  detectByLangs(): boolean {
    return this.hasLang("TypeScript");
  }
}

export class SvelteDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Svelte", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile("svelte.config.js") || this.hasFile("svelte.config.ts");
  }
  detectByManifests(): boolean {
    return this.hasJsonDependency("package.json", "svelte");
  }
  detectByLangs(): boolean {
    return this.hasLang("JavaScript") || this.hasLang("TypeScript");
  }
}

export class ExpressDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Express", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return false;
  }
  detectByManifests(): boolean {
    return this.hasJsonDependency("package.json", "express");
  }
  detectByLangs(): boolean {
    return this.hasLang("JavaScript") || this.hasLang("TypeScript");
  }
}

export class NestDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Nest", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return false;
  }
  detectByManifests(): boolean {
    return this.hasJsonDependency("package.json", "@nestjs/core");
  }
  detectByLangs(): boolean {
    return this.hasLang("TypeScript");
  }
}

// ================= Python系 =================
export class DjangoDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Django", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile("manage.py") || this.hasFile(/settings\.py$/);
  }
  detectByManifests(): boolean {
    return (
      this.hasRawMatch("requirements.txt", /django/i) ||
      this.hasTomlDependency("pyproject.toml", "django")
    );
  }
  detectByLangs(): boolean {
    return this.hasLang("Python");
  }
}

export class FlaskDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Flask", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile("app.py");
  }
  detectByManifests(): boolean {
    return (
      this.hasRawMatch("requirements.txt", /flask/i) ||
      this.hasTomlDependency("pyproject.toml", "flask")
    );
  }
  detectByLangs(): boolean {
    return this.hasLang("Python");
  }
}

// ================= Java系 =================
export class SpringDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Spring", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile("pom.xml") || this.hasFile("build.gradle");
  }
  detectByManifests(): boolean {
    return (
      this.hasRawMatch("pom.xml", /spring-boot-starter/) ||
      this.hasRawMatch("build.gradle", /org\.springframework\.boot/)
    );
  }
  detectByLangs(): boolean {
    return this.hasLang("Java");
  }
}

// ================= PHP系 =================
export class LaravelDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Laravel", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile("artisan");
  }
  detectByManifests(): boolean {
    return this.hasJsonDependency("composer.json", "laravel/framework");
  }
  detectByLangs(): boolean {
    return this.hasLang("PHP");
  }
}

// ================= Rust/Go系 =================
export class GoDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Go", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile("go.mod");
  }
  detectByManifests(): boolean {
    const m = this.manifests["go.mod"];
    return m?.type === "gomod" && !!m.content.module;
  }
  detectByLangs(): boolean {
    return this.hasLang("Go");
  }
}

export class RustDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Rust", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile("Cargo.toml");
  }
  detectByManifests(): boolean {
    return (
      this.hasTomlDependency("Cargo.toml", "tokio") ||
      this.hasTomlDependency("Cargo.toml", "rocket")
    );
  }
  detectByLangs(): boolean {
    return this.hasLang("Rust");
  }
}

// ================= Infrastructure / Ops =================
export class DockerDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Docker", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return (
      this.hasFile(/(^|\/)Dockerfile$/i) || this.hasFile(/(^|\/)dockerfile$/i)
    );
  }
  detectByManifests(): boolean {
    return (
      this.hasRawMatch("Dockerfile", /FROM\s+\S+/i) ||
      this.hasRawMatch("dockerfile", /FROM\s+\S+/i)
    );
  }
  detectByLangs(): boolean {
    return false;
  }
}

export class DockerComposeDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("DockerCompose", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile(/docker-compose\.ya?ml$/i);
  }
  detectByManifests(): boolean {
    return (
      this.hasRawMatch("docker-compose.yml", /services\s*:/i) ||
      this.hasRawMatch("docker-compose.yaml", /services\s*:/i)
    );
  }
  detectByLangs(): boolean {
    return false;
  }
}

export class KubernetesDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Kubernetes", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return (
      this.hasFile(/(^|\/)deployment\.ya?ml$/i) ||
      this.hasFile(/(^|\/)k8s\//i) ||
      this.hasFile(/(^|\/)kubernetes\//i)
    );
  }
  detectByManifests(): boolean {
    return (
      this.hasRawMatch("k8s.yaml", /kind\s*:\s*(Deployment|Service|Pod)/i) ||
      this.hasRawMatch("deployment.yaml", /kind\s*:\s*Deployment/i)
    );
  }
  detectByLangs(): boolean {
    return false;
  }
}

export class TerraformDetector extends Detector {
  constructor(
    files: string[],
    manifests: Record<string, ManifestContent> = {},
    langs: string[] = [],
  ) {
    super("Terraform", files, manifests, langs);
  }
  detectByFiles(): boolean {
    return this.hasFile(/\.tf$/);
  }
  detectByManifests(): boolean {
    return this.hasRawMatch("main.tf", /resource\s+"[^"]+"/i);
  }
  detectByLangs(): boolean {
    return false;
  }
}
