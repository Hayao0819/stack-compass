// manifest-types.ts
export type ManifestContent =
  // biome-ignore lint/suspicious/noExplicitAny: TODO: 後で直す
  | { type: "json"; content: any } // package.json, composer.json など
  // biome-ignore lint/suspicious/noExplicitAny: TODO: 後で直す
  | { type: "toml"; content: Record<string, any> } // Cargo.toml, pyproject.toml
  | { type: "gomod"; content: { module: string; require: string[] } } // go.mod
  | { type: "raw"; content: string }; // requirements.txt など

export abstract class Detector {
  constructor(
    protected files: string[],
    protected manifests: Record<string, ManifestContent> = {},
    protected langs: string[] = [],
  ) {}

  // --- 共通ユーティリティ ---
  protected hasFile(name: string | RegExp): boolean {
    return this.files.some((f) =>
      typeof name === "string" ? f.endsWith(name) : name.test(f),
    );
  }

  protected hasJsonDependency(file: string, dep: string): boolean {
    const m = this.manifests[file];
    return (
      m?.type === "json" &&
      (m.content.dependencies?.[dep] !== undefined ||
        m.content.devDependencies?.[dep] !== undefined)
    );
  }

  protected hasTomlDependency(file: string, dep: string): boolean {
    const m = this.manifests[file];
    return (
      m?.type === "toml" &&
      (m.content.dependencies?.[dep] !== undefined ||
        m.content.devDependencies?.[dep] !== undefined)
    );
  }

  protected hasRawMatch(file: string, regex: RegExp): boolean {
    const m = this.manifests[file];
    return m?.type === "raw" && regex.test(m.content);
  }

  protected hasLang(lang: string): boolean {
    return this.langs.includes(lang);
  }

  // --- 各 Detector 実装が定義する ---
  abstract detectByFiles(): boolean;
  abstract detectByManifests(): boolean;
  abstract detectByLangs(): boolean;

  detect(): boolean {
    if (this.detectByFiles()) return true;
    return this.detectByManifests() && this.detectByLangs();
  }
}
