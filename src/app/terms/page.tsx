"use client";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-semibold mb-6">利用規約</h1>
      <p className="mb-4">
        この利用規約（以下「本規約」といいます。）は、本サービスの利用条件を定めるものです。以下はダミーの内容です。実際に公開する場合は、法務担当者と相談の上、内容を作成してください。
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">第1条（適用）</h2>
      <p className="mb-4">
        本規約は、本サービスの利用に関する一切の関係に適用されます。
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">第2条（禁止事項）</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>法令または公序良俗に反する行為</li>
        <li>他の利用者、第三者の権利を侵害する行為</li>
        <li>当社が不適切と判断する行為</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 mb-2">第3条（免責事項）</h2>
      <p className="mb-4">
        当社は、本サービスに関して発生した損害について、一切の責任を負いません。
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">第4条（変更）</h2>
      <p className="mb-4">
        当社は、必要と判断した場合には、本規約を変更することができます。変更後の規約は、本サイトに掲載した時点から効力を生じます。
      </p>
    </div>
  );
}
